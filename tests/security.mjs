import assert from 'node:assert/strict';
import worker from '../src/customer-overlay.js';
for (const host of ['wateroncall.ca','www.wateroncall.ca']) {
 const r=await worker.fetch(new Request(`http://${host}/join?source=test`),{},{});
 assert.equal(r.status,308);assert.equal(r.headers.get('location'),`https://${host}/join?source=test`);
}
for(const path of ['/','/join','/haulers','/missing','/__resend-test?run=1']) {
 const r=await worker.fetch(new Request('https://www.wateroncall.ca'+path),{},{});
 assert.ok(r.headers.get('content-security-policy').includes("object-src 'none'"));
 assert.equal(r.headers.get('x-frame-options'),'DENY');
 assert.ok(r.headers.get('strict-transport-security'));
 if(path.startsWith('/__resend'))assert.equal(r.status,404);
}
console.log('PASS public HTTPS, headers and diagnostic-route removal');
