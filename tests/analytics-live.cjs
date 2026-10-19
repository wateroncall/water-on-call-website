const { chromium } = require('playwright');
(async () => {
 const browser=await chromium.launch({headless:true});
 try {
  const page=await browser.newPage();
  if(process.env.GA_USE_CANDIDATE_CSP==='1'){
   const {default:worker}=await import('../src/customer-overlay.js');
   const candidate=await worker.fetch(new Request('https://www.wateroncall.ca/'),{},{});
   const policy=candidate.headers.get('content-security-policy');
   await page.route('https://www.wateroncall.ca/**',async route=>{
    const upstream=await route.fetch();
    await route.fulfill({response:upstream,headers:{...upstream.headers(),'content-security-policy':policy}});
   });
  }
  const failed=[],blocked=[],responses=[],collects=[];
  page.on('console',m=>{if(/Content Security|Refused to|gtag|analytics/i.test(m.text()))blocked.push(m.text().replace(/https:\/\/[^\\s'\"]+/g,url=>url.split('?')[0]).slice(0,500));});
  page.on('pageerror',e=>blocked.push(e.message));
  page.on('requestfailed',r=>{if(/google|analytics|gtag/i.test(r.url()))failed.push({host:new URL(r.url()).host,error:r.failure()?.errorText});});
  page.on('response',async r=>{
   const u=new URL(r.url());
   if(u.hostname.endsWith('googletagmanager.com'))responses.push({host:u.hostname,path:u.pathname,status:r.status()});
   if(/google-analytics\.com$|analytics\.google\.com$/.test(u.hostname)&&u.pathname.includes('collect')){
    const params=new URLSearchParams(u.search); const body=r.request().postData()||'';
    const extra=new URLSearchParams(body.split('\n')[0]);for(const [k,v] of extra)if(!params.has(k))params.set(k,v);
    collects.push({host:u.hostname,path:u.pathname,status:r.status(),measurement:params.get('tid'),event:params.get('en'),page:params.get('dl')});
   }
  });
  const response=await page.goto('https://www.wateroncall.ca/',{waitUntil:'domcontentloaded',timeout:30000});
  for(let i=0;i<25&&!collects.length;i++)await page.waitForTimeout(1000);
  console.log(JSON.stringify({http:response.status(),title:await page.title(),tagPresent:await page.locator('script[src*="googletagmanager.com/gtag/js"]').count(),tagResponses:responses,collection:collects,failed,console:blocked},null,2));
  if(!collects.some(c=>c.status>=200&&c.status<300&&c.measurement==='G-V0DES2LJNP'&&c.event==='page_view'))process.exitCode=1;
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
