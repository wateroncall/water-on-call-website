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


for(const path of ['/','/join','/haulers','/cisterns','/pools','/faq','/check-availability','/demo/customer','/demo/hauler']) {
 const r=await worker.fetch(new Request('https://www.wateroncall.ca'+path),{},{});
 const html=await r.text();
 assert.equal(r.status,200);
 assert.equal((html.match(/gtag\/js\?id=G-V0DES2LJNP/g)||[]).length,1,`One tag on ${path}`);
 assert.ok(html.indexOf('gtag/js?id=G-V0DES2LJNP')>html.indexOf('<head>'));
 assert.ok(html.indexOf('gtag/js?id=G-V0DES2LJNP')<html.indexOf('</head>'));
 const csp=r.headers.get('content-security-policy');
 assert.ok(csp.includes("script-src 'self' 'unsafe-inline' https://*.googletagmanager.com"));
 assert.ok(csp.includes("connect-src 'self' https://analytics.google.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com"));
}
const preview=await worker.fetch(new Request('https://preview.example.com/'),{},{});
assert.ok(!(await preview.text()).includes('gtag/js?id='));
const api=await worker.fetch(new Request('https://www.wateroncall.ca/api/waitlist',{method:'POST',body:'{}'}),{},{});
assert.ok(!(await api.text()).includes('gtag/js?id='));
console.log('PASS single production Analytics tag on every public page and allowed by CSP');

const analyticsPage=await worker.fetch(new Request('https://www.wateroncall.ca/'),{},{});
const connectDirective=analyticsPage.headers.get('content-security-policy').split(';').find(d=>d.trim().startsWith('connect-src')).trim().split(' ').slice(1);
assert.ok(connectDirective.includes('https://analytics.google.com'),'GA4 collection apex must be explicitly allowed; a subdomain wildcard does not match the apex.');
