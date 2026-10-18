import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import worker from '../src/customer-overlay.js';
import {prepareConfirmations, confirmationInsert, sendConfirmations} from '../src/waitlist-confirmation.js';

function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('CREATE TABLE customer_waitlist (name TEXT,email TEXT UNIQUE,phone TEXT,postal_code TEXT,water_need TEXT,source TEXT,marketing_consent INTEGER,status TEXT)');
  const prepare = (sql, values = []) => ({
    bind: (...args) => prepare(sql, args),
    run: async () => ({meta: {changes: Number(sqlite.prepare(sql).run(...values).changes)}}),
    all: async () => ({results: sqlite.prepare(sql).all(...values)}),
    first: async () => sqlite.prepare(sql).get(...values) ?? null
  });
  return {sqlite, prepare, async batch(statements) {
    sqlite.exec('BEGIN');
    try { const results=[]; for (const statement of statements) results.push(await statement.run()); sqlite.exec('COMMIT'); return results; }
    catch(error) { sqlite.exec('ROLLBACK'); throw error; }
  }};
}
const originalFetch = globalThis.fetch, originalNow = Date.now;
let clock = 1800000000000, calls = [], responseStatus = 200;
Date.now = () => clock;
globalThis.fetch = async (url, options) => {
  if (String(url).includes('api.resend.com')) {
    calls.push({payload:JSON.parse(options.body),key:options.headers['Idempotency-Key']});
    return Response.json(responseStatus===200?{id:'email_'+calls.length}:{error:'provider error'}, {status:responseStatus});
  }
  assert.ok(String(url).endsWith('/api/v1/waitlist'), 'Only the existing admin sync is permitted');
  return Response.json({ok:true}, {status:201});
};
const request = data => new Request('https://www.wateroncall.ca/api/waitlist', {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});
const newLead = {name:'<b>New subscriber</b>',email:'new@example.test'};
try {
  const db = database(), env = {PRODUCTION_DB:db,RESEND_API_KEY:'re_test'};
  await db.prepare("INSERT INTO customer_waitlist (name,email) VALUES ('Historical','old@example.test')").run();
  assert.equal((await worker.fetch(request({email:'invalid'}),env,{})).status,400);
  assert.equal(calls.length,0);
  assert.equal((await worker.fetch(request(newLead),env,{})).status,200);
  const confirmation = calls.filter(call=>call.payload.to?.[0]===newLead.email);
  assert.equal(confirmation.length,1);
  assert.ok(confirmation[0].payload.html.includes('&lt;b&gt;New subscriber&lt;/b&gt;'));
  assert.ok(!confirmation[0].payload.html.includes('<b>New subscriber</b>'));
  assert.equal(confirmation[0].payload.reply_to,'info@wateroncall.ca');
  assert.match(confirmation[0].payload.text,/does not place an order or take a payment/);
  assert.equal((await db.prepare('SELECT status FROM waitlist_confirmation_queue WHERE email=?').bind(newLead.email).first()).status,'sent');
  assert.equal((await db.prepare('SELECT count(*) AS n FROM waitlist_confirmation_queue').first()).n,1,'No historical subscriber email');
  const sentCount = calls.length;
  assert.equal((await (await worker.fetch(request(newLead),env,{})).json()).duplicate,true);
  await sendConfirmations(env);
  assert.equal(calls.length,sentCount,'Duplicate signup/scheduler does not send again');

  const retryDb=database(), retryEnv={PRODUCTION_DB:retryDb};
  calls=[];
  await worker.fetch(request({name:'Retry',email:'retry@example.test'}),retryEnv,{});
  assert.equal((await retryDb.prepare('SELECT status FROM waitlist_confirmation_queue').first()).status,'queued');
  assert.equal(calls.length,0,'Missing provider config leaves confirmation durable');
  retryEnv.RESEND_API_KEY='re_test'; responseStatus=503;
  await sendConfirmations(retryEnv);
  const first=calls.at(-1);
  await sendConfirmations(retryEnv);
  assert.equal(calls.length,1,'No immediate retry storm');
  clock+=301000;responseStatus=200;
  await Promise.all([sendConfirmations(retryEnv),sendConfirmations(retryEnv)]);
  assert.equal(calls.length,2,'Concurrent processors claim a single send');
  assert.equal(calls[1].key,first.key,'Stable provider idempotency');
  assert.deepEqual(calls[1].payload,first.payload,'Stable retry payload');
  assert.equal((await retryDb.prepare('SELECT status FROM waitlist_confirmation_queue').first()).status,'sent');

  await confirmationInsert(retryDb,{name:'Stale',email:'stale@example.test'}).run();
  await retryDb.prepare("UPDATE waitlist_confirmation_queue SET status='sending',first_attempt_at=?,last_attempt_at=? WHERE email='stale@example.test'").bind(clock/1000-24*3600,clock/1000-24*3600).run();
  const beforeStale=calls.length;await sendConfirmations(retryEnv);
  assert.equal(calls.length,beforeStale,'No ambiguous retries after safe provider window');
  assert.equal((await retryDb.prepare("SELECT status FROM waitlist_confirmation_queue WHERE email='stale@example.test'").first()).status,'needs_review');
  await confirmationInsert(retryDb,{name:'Permanent',email:'permanent@example.test'}).run();responseStatus=422;
  await sendConfirmations(retryEnv);clock+=301000;await sendConfirmations(retryEnv);
  assert.equal((await retryDb.prepare("SELECT status FROM waitlist_confirmation_queue WHERE email='permanent@example.test'").first()).status,'needs_review');

  const rollbackDb=database();await prepareConfirmations(rollbackDb);
  await confirmationInsert(rollbackDb,{name:'Conflict',email:'conflict@example.test'}).run();
  const oldError=console.error;console.error=()=>{};
  try { assert.equal((await worker.fetch(request({name:'Conflict',email:'conflict@example.test'}),{PRODUCTION_DB:rollbackDb},{})).status,500); }
  finally { console.error=oldError; }
  assert.equal((await rollbackDb.prepare('SELECT count(*) AS n FROM customer_waitlist').first()).n,0,'Queue failure rolls back signup');
  console.log('PASS waitlist confirmation, duplicate protection, atomic save, retries, provider failures, concurrency and no historical sends');
} finally { globalThis.fetch=originalFetch;Date.now=originalNow; }
