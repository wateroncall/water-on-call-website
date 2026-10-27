import assert from 'node:assert/strict';
import vm from 'node:vm';
import worker from '../src/customer-overlay.js';
import {analyticsConfig, searchPages} from '../src/marketing.js';

const origin = 'https://www.wateroncall.ca';
for (const path of Object.keys(searchPages)) {
  const response = await worker.fetch(new Request(origin+path+'?email=private@example.test'), {}, {});
  const html = await response.text();
  assert.equal(response.status, 200, path);
  assert.equal((html.match(/name="description"/g) || []).length, 1, path);
  assert.ok(html.includes('<link rel="canonical" href="'+origin+path+'">'), path);
  assert.ok(!html.includes('private@example.test'), 'No query values in metadata');
  assert.ok(html.includes('property="og:title"'), path);
}
const sitemap = await worker.fetch(new Request(origin+'/sitemap.xml'), {}, {});
assert.equal(sitemap.headers.get('content-type'), 'application/xml; charset=utf-8');
const xml = await sitemap.text();
assert.equal((xml.match(/<loc>/g) || []).length, Object.keys(searchPages).length);
assert.ok(!xml.includes('/demo/') && !xml.includes('/api/'));
const robots = await (await worker.fetch(new Request(origin+'/robots.txt'), {}, {})).text();
assert.ok(robots.includes('Sitemap: '+origin+'/sitemap.xml'));
const demo = await (await worker.fetch(new Request(origin+'/demo/customer'), {}, {})).text();
assert.ok(demo.includes('content="noindex, follow"'));

const config = analyticsConfig(new URL(origin+'/cisterns?utm_source=google&utm_medium=cpc&utm_campaign=niagara_cistern_launch&utm_content=cistern_ad&email=private@example.test&gclid=private-tracking&address=123+Road'), 'https://example.test/?email=secret@example.test');
assert.equal(config.page_location, origin+'/cisterns');
assert.equal(config.campaign_source, 'google');
assert.equal(config.campaign_medium, 'cpc');
assert.equal(config.campaign_name, 'niagara_cistern_launch');
assert.equal(config.campaign_content, 'cistern_ad');
assert.ok(!JSON.stringify(config).includes('private'));
assert.ok(!JSON.stringify(config).includes('secret'));
assert.equal(config.allow_ad_personalization_signals, false);
const untrusted = analyticsConfig(new URL(origin+'/join?utm_source=private@example.test&utm_campaign=Jane_Doe&utm_content=123_Main_Street'));
assert.equal(untrusted.campaign_source, undefined);
assert.equal(untrusted.campaign_name, undefined);
assert.equal(untrusted.campaign_content, undefined);

// Execute the actual signup client with local form, network and Analytics
// stubs. A lead is counted only after a new signup is confirmed by the server.
const join = await (await worker.fetch(new Request(origin+'/join'), {}, {})).text();
const scripts = Array.from(join.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g), match => match[1]);
const signupScript = scripts.find(script => script.includes("signupForm.addEventListener"));
assert.ok(signupScript);
for (const [reply, status, expected] of [[{ok:true}, 200, 1], [{ok:true,duplicate:true}, 200, 0], [{error:'Try again'}, 500, 0]]) {
  const events = [], navigations = [], timers = new Map(), handlers = {}, message = {focus(){}}, button = {}, form = {querySelector(){return button;},reset(){}};
  const sandbox = {window:{
      location:{assign:url=>navigations.push(url)},
      setTimeout:callback=>{const id=timers.size+1;timers.set(id,callback);return id;},
      clearTimeout:id=>timers.delete(id),
      gtag:(...args)=>{events.push(args);args[2]?.event_callback?.();}
    }, document:{querySelector:selector=>selector==='#f'?{addEventListener:(name,callback)=>{handlers[name]=callback;}}:message},
    FormData:class { *[Symbol.iterator](){yield ['name','Private Name'];yield ['email','private@example.test'];yield ['phone','905-555-0100'];} },
    fetch:async()=>({ok:status<400,json:async()=>reply})};
  vm.runInNewContext(signupScript, sandbox);
  await handlers.submit({preventDefault(){},currentTarget:form});
  assert.equal(events.filter(event=>event[1]==='generate_lead').length, expected);
  assert.deepEqual(navigations,expected?['/join/thanks']:[],'Only saved new signups navigate to the completion goal');
  for(const callback of timers.values())callback();
  assert.equal(navigations.length,expected,'Analytics callbacks and fallback cannot navigate twice');
  assert.ok(!JSON.stringify(events).includes('Private') && !JSON.stringify(events).includes('private@example.test') && !JSON.stringify(events).includes('905-555'));
}
console.log('PASS search metadata, sitemap, demo indexing, safe campaign attribution and confirmed-new-signup lead events');
