const SAFE_RETRY_SECONDS = 23 * 60 * 60;
const RETRY_SECONDS = 5 * 60;

export async function prepareConfirmations(db) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS waitlist_confirmation_queue (
    email TEXT PRIMARY KEY, name TEXT NOT NULL, event_id TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'queued', attempts INTEGER NOT NULL DEFAULT 0,
    first_attempt_at INTEGER, last_attempt_at INTEGER, sent_at INTEGER,
    provider_message_id TEXT
  )`).run();
}

export function confirmationInsert(db, lead) {
  return db.prepare('INSERT INTO waitlist_confirmation_queue (email,name,event_id) VALUES (?,?,?)')
    .bind(lead.email, lead.name, crypto.randomUUID());
}

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function message(row) {
  const text = `Hi ${row.name},\n\nYou're on the Water OnCall launch list. We'll email you when customer ordering opens in your area. Joining the list does not place an order or take a payment.\n\nQuestions, or want to leave the list? Reply to this email or contact info@wateroncall.ca.\n\nWater OnCall\nhttps://www.wateroncall.ca`;
  return {
    from: 'Water OnCall <website@notify.wateroncall.ca>', to: [row.email], reply_to: 'info@wateroncall.ca',
    subject: 'You’re on the Water OnCall launch list', text,
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Water OnCall signup confirmation</title></head><body style="font:16px/1.6 Arial,sans-serif;color:#102b46;margin:24px"><main style="max-width:560px;margin:auto"><h1 style="font-size:26px">You’re on the launch list.</h1><p>Hi ${escapeHtml(row.name)},</p><p>We’ll email you when customer ordering opens in your area.</p><p>Joining the list does not place an order or take a payment.</p><p>Questions, or want to leave the list? Reply to this email or contact <a href="mailto:info@wateroncall.ca">info@wateroncall.ca</a>.</p><p>Water OnCall<br><a href="https://www.wateroncall.ca">www.wateroncall.ca</a></p></main></body></html>`
  };
}

// The stored event and payload stay fixed across retries. Historical subscribers
// are never backfilled into this queue; only new, atomically saved signups enter it.
export async function sendConfirmations(env) {
  const db = env.PRODUCTION_DB;
  if (!db || !env.RESEND_API_KEY) return;
  await prepareConfirmations(db);
  const now = Math.floor(Date.now() / 1000);
  await db.prepare("UPDATE waitlist_confirmation_queue SET status='needs_review' WHERE status IN ('queued','failed','sending') AND first_attempt_at IS NOT NULL AND first_attempt_at < ?")
    .bind(now - SAFE_RETRY_SECONDS).run();
  const rows = await db.prepare("SELECT * FROM waitlist_confirmation_queue WHERE attempts < 3 AND (status IN ('queued','failed') OR (status='sending' AND last_attempt_at <= ?)) AND (last_attempt_at IS NULL OR last_attempt_at <= ?) ORDER BY rowid LIMIT 10")
    .bind(now - RETRY_SECONDS, now - RETRY_SECONDS).all();
  for (const row of rows.results || []) {
    const claim = await db.prepare("UPDATE waitlist_confirmation_queue SET status='sending', attempts=attempts+1, first_attempt_at=COALESCE(first_attempt_at,?), last_attempt_at=? WHERE email=? AND attempts < 3 AND (status IN ('queued','failed') OR (status='sending' AND last_attempt_at <= ?)) AND (last_attempt_at IS NULL OR last_attempt_at <= ?)")
      .bind(now, now, row.email, now - RETRY_SECONDS, now - RETRY_SECONDS).run();
    if (claim.meta?.changes !== 1) continue;
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST', headers: {Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json', 'Idempotency-Key': 'waitlist-confirmation-' + row.event_id},
        body: JSON.stringify(message(row)), signal: AbortSignal.timeout(15000)
      });
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        await db.prepare("UPDATE waitlist_confirmation_queue SET status='needs_review' WHERE email=? AND status='sending'").bind(row.email).run();
        continue;
      }
      const result = await response.json();
      if (!response.ok || typeof result.id !== 'string' || !result.id) throw new Error('Email provider did not confirm acceptance.');
      await db.prepare("UPDATE waitlist_confirmation_queue SET status='sent',sent_at=?,provider_message_id=? WHERE email=? AND status='sending'")
        .bind(now, result.id, row.email).run();
    } catch {
      await db.prepare("UPDATE waitlist_confirmation_queue SET status='failed' WHERE email=? AND status='sending'").bind(row.email).run();
      console.error('Waitlist confirmation needs retry', row.event_id);
    }
  }
}
