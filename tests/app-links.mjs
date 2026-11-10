import assert from 'node:assert/strict';
import worker from '../src/customer-overlay.js';
for (const path of ['/', '/haulers', '/cisterns', '/pools', '/faq', '/service-area', '/check-availability', '/join', '/demo/customer', '/demo/hauler']) {
  const response = await worker.fetch(new Request('https://www.wateroncall.ca'+path), {}, {});
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
  assert.ok(header, path);
  assert.match(header, /href="mailto:info@wateroncall\.ca"/, path);
  assert.match(header, /href="sms:\+12894028775"/, path);
  assert.doesNotMatch(header, /class="woc-app-link"/, path);
  assert.doesNotMatch(html, /niagara|mak b[’']s|makbs/i, path);
  assert.ok(!/launch list|pre[ -]?launch|launching soon|when.{0,40}ordering opens|pilot customers/i.test(html), 'No outdated launch wording on '+path);
  if (path === '/') {
    assert.match(html, /Water OnCall is live/);
    assert.match(html, /href="https:\/\/app\.wateroncall\.ca\/customer\/orders\/create">Order Water<\/a>/);
    assert.match(html, /href="https:\/\/app\.wateroncall\.ca\/login">Log in<\/a>/);
  }
}
console.log('PASS email and text support across public headers; homepage ordering and login retained below');

