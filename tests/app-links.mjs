import assert from 'node:assert/strict';
import worker from '../src/customer-overlay.js';
for (const path of ['/', '/haulers', '/cisterns', '/pools', '/faq', '/service-area', '/check-availability', '/join', '/demo/customer', '/demo/hauler']) {
  const response = await worker.fetch(new Request('https://www.wateroncall.ca'+path), {}, {});
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.match(html, /href="https:\/\/app\.wateroncall\.ca\/customer\/orders\/create">Order Water<\/a>/, path);
  assert.match(html, /href="https:\/\/app\.wateroncall\.ca\/login">Log in<\/a>/, path);
  if (path === '/') assert.match(html, /invited Mak B’s pilot customers/);
}
console.log('PASS Order Water and login destinations across all public pages; pilot limitation shown on homepage');
