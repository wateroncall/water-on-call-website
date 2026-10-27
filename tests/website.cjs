const http=require('node:http');const fs=require('node:fs');const path=require('node:path');const {pathToFileURL}=require('node:url');const {chromium}=require('playwright');const assert=require('node:assert/strict');
(async()=>{const root=path.resolve(__dirname,'..')+'/';fs.mkdirSync(root+'test-artifacts',{recursive:true});const tools=await import(pathToFileURL(root+'src/booking-tools.js'));const workerEntry=process.env.WEBSITE_WORKER_ENTRY||'src/customer-overlay.js';const worker=(await import(pathToFileURL(path.resolve(root,workerEntry)))).default;
assert.ok(Math.abs(tools.poolVolume({shape:'rectangle',unit:'metres',length:1,width:1,depth:1}).imperialGallons-219.969248299)<0.001);
assert.ok(Math.abs(tools.poolVolume({shape:'circle',unit:'metres',length:2,depth:1}).litres-Math.PI*1000)<0.001);
assert.throws(()=>tools.poolVolume({length:-1,width:2,depth:1}));
const originalFetch=global.fetch;global.fetch=async(url,opts)=>String(url).includes('/booking-preview')?Response.json({available:true,estimated_maximum_cents:25000,quote_required:false,window:'Oct 5–6',message:'This is a preliminary check. No booking or payment has been made.'}):originalFetch(url,opts);
const server=http.createServer(async(req,res)=>{try{let chunks=[];for await(const chunk of req)chunks.push(chunk);const data=Buffer.concat(chunks);const request=new Request('http://127.0.0.1:4173'+req.url,{method:req.method,headers:req.headers,...(req.method==='POST'?{body:data}: {})});const out=await worker.fetch(request,{},{});res.writeHead(out.status,Object.fromEntries(out.headers));res.end(Buffer.from(await out.arrayBuffer()));}catch(e){res.writeHead(500);res.end(String(e));}});await new Promise(r=>server.listen(4173,'127.0.0.1',r));
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:390,height:844}});let errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const path of ['/','/haulers','/cisterns','/service-area','/pools','/faq','/check-availability','/join','/demo/customer','/demo/hauler']){const response=await page.goto('http://127.0.0.1:4173'+path);assert.equal(response.status(),200,path);assert.ok((await page.locator('h1').count())>0,path);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'mobile overflow '+path);}
await page.goto('http://127.0.0.1:4173/');
const customerSteps=page.locator('#woc-step-demos');
assert.match(await page.locator('h1').innerText(),/Order bulk water online/);
assert.equal(await customerSteps.locator('details[data-demo]').count(),4);
assert.equal(await customerSteps.locator('details[open]').count(),0,'Demos start collapsed');
const demoPosts=[];
const recordDemoRequest=request=>{if(request.method()==='POST')demoPosts.push(request.url());};
page.on('request',recordDemoRequest);
await customerSteps.locator('[data-demo="order"]>summary').click();
await customerSteps.locator('[data-open-demo="offers"]').click();
assert.equal(await customerSteps.locator('details[open]').count(),1,'One customer demo is open');
const offersScreen=customerSteps.locator('[data-demo="offers"] .woc-demo-screen');
assert.ok(!(await offersScreen.innerText()).includes('Water Haulage'),'Offers do not reveal hauler names');
await customerSteps.locator('[data-review-offer="b"]').click();
const review=customerSteps.locator('[data-choice-review]');
assert.match(await review.innerText(),/Offer B/);
assert.equal(await review.locator('[data-choice-total]').innerText(),'Price');
assert.ok(!(await review.innerText()).includes('Example Bulk Water'),'The hauler is hidden before acceptance');
await customerSteps.locator('[data-accept-sample]').click();
const confirmation=customerSteps.locator('[data-choice-confirmed]');
assert.match(await confirmation.innerText(),/Delivery booked/);
assert.match(await confirmation.innerText(),/Example Bulk Water/);
await customerSteps.locator('[data-open-demo="delivery"]').click();
assert.equal(await customerSteps.locator('[data-demo="delivery"] [data-choice-total]').innerText(),'Price');
assert.match(await customerSteps.locator('[data-demo="delivery"] .woc-demo-screen').innerText(),/Delivered/);
assert.deepEqual(demoPosts,[],'Customer demos never submit an order or payment');
page.off('request',recordDemoRequest);
await page.setViewportSize({width:320,height:800});
for(const key of ['order','offers','choose','delivery']){
 await customerSteps.locator('[data-demo="'+key+'"]>summary').click();
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Customer demo fits at 320px: '+key);
}
await page.setViewportSize({width:390,height:844});
assert.equal(await page.getByRole('link',{name:'Water Haulers',exact:true}).isVisible(),true,'The homepage hauler link stays available on mobile');
await page.getByRole('link',{name:'Water Haulers',exact:true}).click();
assert.match(await page.locator('h1').innerText(),/More deliveries\.[\s\S]*Get paid faster\./);
assert.equal(await page.getByRole('link',{name:'Apply to join',exact:true}).getAttribute('href'),'https://app.wateroncall.ca/hauler/register');
assert.equal(await page.getByRole('link',{name:'Sign in',exact:true}).getAttribute('href'),'https://app.wateroncall.ca/hauler/login');
assert.equal(await page.getByRole('link',{name:/try.*demo/i}).count(),0,'The top demo link was removed');
assert.equal(await page.locator('.woc-flow-item').count(),4);
for(const id of ['customers','payments','orders','drivers']){
 await page.locator('#woc-'+id+'-toggle').click();
 assert.equal(await page.locator('.woc-feature-toggle[aria-expanded="true"]').count(),1,'Only one feature description is open');
 await page.locator('#woc-'+id+'-content [data-demo]').click();
 assert.equal(await page.locator('#woc-demo-scene').isVisible(),true);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Demo fits on mobile: '+id);
 if(id==='customers'){
  assert.match(await page.locator('#woc-demo-content').innerText(),/2,500 imp gal/);
  assert.match(await page.locator('#woc-demo-content').innerText(),/175\.00/);
  await page.locator('[data-order-action="accept"]').click();
  assert.equal(await page.locator('[data-order-status]').innerText(),'Accepted');
  assert.match(await page.locator('[data-order-result]').innerText(),/No booking or payment is made/);
 }else if(id==='payments'){
  const text=await page.locator('#woc-demo-content').innerText();
  for(const value of ['$175.00','$165.00','$340.00','Next payout'])assert.ok(text.includes(value),'Payment demo retains '+value);
 }else if(id==='orders'){
  assert.equal(await page.locator('[data-delivery-map]').isVisible(),true);
  await page.locator('[data-delivery-mode="list"]').click();
  assert.equal(await page.locator('.woc-delivery-stop').count(),5);
  await page.locator('[data-delivery-group="driver"]').click();
  assert.equal(await page.locator('.woc-delivery-list h3').count(),2);
  await page.locator('[data-delivery-hide]').click();
  assert.equal(await page.locator('.woc-delivery-stop').count(),0);
  assert.match(await page.locator('[data-delivery-results]').innerText(),/All five sample deliveries are completed/);
 }else{
  const schedule=page.locator('[data-driver-panel="scheduling"]');
  assert.ok((await schedule.innerText()).includes('Ryan Miller'));
  assert.deepEqual(await schedule.locator('thead th>span').allTextContents(),['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
  assert.equal(await schedule.locator('.hs-shift').count(),4);
  await schedule.locator('[data-driver-tool="timesheets"]').click();
  const timesheet=page.locator('[data-driver-panel="timesheets"]');
  assert.equal(await timesheet.isVisible(),true);
  const text=await timesheet.innerText();
  assert.ok(text.includes('Ryan Miller')&&text.includes('36h 00m recorded this week'));
  assert.ok(!(await page.locator('#woc-demo-content').innerText()).includes('Dan Houle'));
 }
 await page.locator('#woc-demo-scene [data-scene="home"]').click();
 assert.equal(await page.locator('#woc-home').isVisible(),true);
}
await page.setViewportSize({width:320,height:800});
assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'The page fits at 320px');
if(await page.locator('#woc-drivers-toggle').getAttribute('aria-expanded')!=='true')await page.locator('#woc-drivers-toggle').click();
await page.locator('#woc-drivers-content [data-demo]').click();
assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'The full seven-day schedule fits at 320px');
await page.setViewportSize({width:390,height:844});

await page.goto('http://127.0.0.1:4173/pools');await page.locator('[name=length]').fill('32');await page.locator('[name=width]').fill('16');await page.locator('[name=depth]').fill('5');assert.match(await page.locator('#pool-result').innerText(),/imperial gallons/);assert.match(await page.locator('#pool-result').innerText(),/6 loads/);await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:root+'test-artifacts/pool-mobile.png',fullPage:true});
await page.goto('http://127.0.0.1:4173/check-availability');await page.locator('[name=address_line1]').fill('123 Test Road');await page.locator('[name=city]').fill('Pelham');await page.locator('[name=postal_code]').fill('L0S 1E0');await page.locator('#availability button').click();await page.getByText('Current coverage found').waitFor();assert.match(await page.locator('#coverage-result').innerText(),/250.00/);assert.equal(await page.locator('#confirm-address').isVisible(),false);await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:root+'test-artifacts/coverage-mobile.png',fullPage:true});
await page.goto('http://127.0.0.1:4173/');await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:root+'test-artifacts/home-mobile.png',fullPage:true});await page.setViewportSize({width:1280,height:900});await page.goto('http://127.0.0.1:4173/haulers');await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:root+'test-artifacts/haulers-desktop.png',fullPage:true});
await page.setViewportSize({width:320,height:800});
await page.addInitScript(()=>{
 window.gtag=(_kind,event,details)=>{
  const events=JSON.parse(sessionStorage.getItem('signup-test-events')||'[]');
  events.push(event);
  sessionStorage.setItem('signup-test-events',JSON.stringify(events));
  if(typeof details?.event_callback==='function')details.event_callback();
 };
});
let signupOutcome='new';
await page.route('**/api/waitlist',async route=>{
 const duplicate=signupOutcome==='duplicate',failed=signupOutcome==='error';
 const headers={'content-type':'application/json'};
 if(!duplicate&&!failed)headers['set-cookie']='woc_launch_signup=confirmed; Path=/join; HttpOnly; SameSite=Lax';
 await route.fulfill({status:failed?503:200,headers,body:JSON.stringify(failed?{error:'Please try again.'}:duplicate?{ok:true,duplicate:true}:{ok:true})});
});
const signupEvents=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('signup-test-events')||'[]').filter(name=>name==='generate_lead').length);
await page.context().clearCookies();
await page.goto('http://127.0.0.1:4173/join/thanks');
assert.equal(new URL(page.url()).pathname,'/join','A direct confirmation-page visit returns to the signup form');
for(const outcome of ['new','duplicate','error']){
 signupOutcome=outcome;
 await page.context().clearCookies();
 await page.goto('http://127.0.0.1:4173/join');
 await page.evaluate(()=>sessionStorage.removeItem('signup-test-events'));
 await page.locator('[name="name"]').fill('Test Subscriber');
 await page.locator('[name="email"]').fill('signup-check@example.test');
 await page.getByRole('button',{name:'Join launch list',exact:true}).click();
 if(outcome==='new'){
  await page.waitForURL('**/join/thanks');
  assert.match(await page.locator('h1').innerText(),/You're on the list/);
  assert.equal(await signupEvents(),1,'A saved new signup records one lead and opens the completion page');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Confirmation page fits on mobile');
  await page.screenshot({path:root+'test-artifacts/signup-confirmation-mobile.png',fullPage:true});
 }else{
  await page.locator(outcome==='duplicate'?'#msg.ok':'#msg.err').waitFor();
  assert.equal(new URL(page.url()).pathname,'/join','Duplicates and failures stay on the form');
  assert.equal(await signupEvents(),0,'Duplicates and failures do not record new leads');
  assert.equal(await page.getByRole('button',{name:'Join launch list',exact:true}).isEnabled(),true);
  await page.goto('http://127.0.0.1:4173/join/thanks');
  assert.equal(new URL(page.url()).pathname,'/join','Duplicates and failures cannot open the completion page');
 }
}
assert.deepEqual(errors,[]);console.log('PASS: calculator math, 10 routes, mobile layouts, quote form interaction, and new/duplicate/failed signup conversion checks');await browser.close();await new Promise(r=>server.close(r));})().catch(e=>{console.error(e);process.exit(1)});


