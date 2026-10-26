import {enhanceSearchMarkup, googleAnalyticsTag} from './marketing.js';
import base from './index.js';
import {prepareConfirmations, confirmationInsert, sendConfirmations} from './waitlist-confirmation.js';

const launchPage=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Join the Water OnCall Launch List</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;color:#132f4b;background:#f4f8ff}
.wrap{max-width:560px;margin:0 auto;padding:24px 18px 32px}
.brand{display:inline-block;font-size:25px;line-height:1.2;letter-spacing:-.8px;font-weight:800;text-decoration:none;color:#132f4b}
.brand b{color:#087cff}
.card{margin-top:18px;background:#fff;border:1px solid #d9e5f2;border-radius:17px;padding:20px}
.eyebrow{margin:0 0 8px;color:#087cff;font-size:11px;line-height:1.3;font-weight:750;letter-spacing:1px}
h1{font-size:32px;line-height:1.18;letter-spacing:-.9px;font-weight:750;margin:0 0 8px}
.intro{color:#60758d;font-size:14px;line-height:1.5;margin:0 0 18px}
.grid{display:grid;gap:12px}
.grid>div,.phone-postal>div{min-width:0}
.phone-postal{display:grid;grid-template-columns:1.35fr 1fr;gap:12px}
label{font-weight:650;font-size:13px;line-height:1.35;display:block;margin-bottom:5px}
input,select{width:100%;min-width:0;height:44px;border:1px solid #bdcfe2;border-radius:9px;padding:0 11px;font:inherit;font-size:16px;color:#132f4b;background:#fff}
input::placeholder{color:#8393a5;opacity:1}
.btn{width:100%;min-height:46px;border:0;border-radius:9px;background:#087cff;color:#fff;padding:10px 12px;font-family:inherit;font-weight:700;font-size:16px;line-height:1.4;cursor:pointer;margin-top:16px}
.btn:hover{background:#006ce5}
.btn:disabled{opacity:.65;cursor:wait}
.muted{font-size:12px;color:#60758d;line-height:1.5}
label .muted{font-weight:400}
.reassurance{text-align:center;margin:12px 0 0}
.consent{margin:12px 0 0}
.help{text-align:center;margin:12px 0 0}
.help a{color:#0877f9}
.msg{margin-top:12px;padding:12px;border-radius:9px;display:none}
.ok{display:block;background:#eaf8f1;color:#09633f}
.err{display:block;background:#fff0f0;color:#9b2222}
@media(max-width:650px){h1{font-size:27px}}
@media(max-width:360px){.wrap{padding-right:12px;padding-left:12px}.card{padding:16px}.phone-postal{gap:9px}label{font-size:12px}input,select{padding-right:8px;padding-left:8px}}
</style>
</head>
<body>
<main class="wrap">
<a class="brand" href="/"><b>Water</b> OnCall</a>
<section class="card" aria-labelledby="launch-heading">
<p class="eyebrow">NIAGARA PRE-LAUNCH</p>
<h1 id="launch-heading">Bulk water is coming.</h1>
<p class="intro">Get an email when online ordering opens in your area.</p>
<form id="f" name="launch-list">
<div class="grid">
<div>
<label for="signup-name">Name</label>
<input id="signup-name" name="name" required autocomplete="name" placeholder="Your name">
</div>
<div>
<label for="signup-email">Email</label>
<input id="signup-email" name="email" type="email" required autocomplete="email" placeholder="you@example.com">
</div>
<div class="phone-postal">
<div>
<label for="signup-phone">Mobile <span class="muted">(optional)</span></label>
<input id="signup-phone" name="phone" type="tel" autocomplete="tel" placeholder="905 555 0123">
</div>
<div>
<label for="signup-postal">Postal code</label>
<input id="signup-postal" name="postal_code" autocomplete="postal-code" placeholder="L0R 1S0" maxlength="7">
</div>
</div>
<div>
<label for="signup-need">Water for</label>
<select id="signup-need" name="water_need">
<option value="Cistern">Cistern</option>
<option value="Pool">Pool</option>
<option value="Hot tub">Hot tub</option>
<option value="Other">Other</option>
<option value="Not sure">Not sure yet</option>
</select>
</div>
</div>
<button class="btn" type="submit">Join launch list</button>
<p class="muted reassurance">Free to join. No order or payment.</p>
<p class="muted consent">By joining, you agree to receive Water OnCall launch and service updates. To leave the list, reply to our email or contact info@wateroncall.ca.</p>
<div id="msg" class="msg" role="status" aria-live="polite" tabindex="-1"></div>
</form>
<p class="muted help"><a href="mailto:info@wateroncall.ca">Contact Us</a> · <a href="/">Back to Water OnCall</a></p>
</section>
</main>
<script>document.querySelector('#f').addEventListener('focusin',()=>{if(typeof window.gtag==='function')window.gtag('event','lead_form_start',{form_name:'launch_list'})},{once:true});document.querySelector('#f').addEventListener('submit',async e=>{e.preventDefault();const f=e.currentTarget,b=f.querySelector('button'),m=document.querySelector('#msg');b.disabled=true;b.textContent='Joining…';m.className='msg';try{const data=Object.fromEntries(new FormData(f));const r=await fetch('/api/waitlist',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});const j=await r.json();if(!r.ok)throw new Error(j.error||'Unable to join right now.');m.textContent=j.duplicate?'Your email is already on the Water OnCall launch list. We’ll let you know when ordering opens in your area.':'You’re on the list! Look for your confirmation email, including in your spam folder. We’ll email you when ordering opens in your area.';m.className='msg ok';m.focus();if(!j.duplicate){if(typeof window.gtag==='function')window.gtag('event','generate_lead',{form_name:'launch_list',lead_type:'customer'});f.reset()}}catch(x){m.textContent=x.message;m.className='msg err'}finally{b.disabled=false;b.textContent='Join launch list'}});</script>
</body>
</html>`;

const ADMIN_WAITLIST_URL='https://wateroncall-backend-production-cov9zr.laravel.cloud/api/v1/waitlist';
async function syncAdminWaitlist(lead){
 const needs={'Cistern':'cistern','Pool':'pool','Hot tub':'hot_tub','Other':'other','Not sure':'other'};
 try{const r=await fetch(ADMIN_WAITLIST_URL,{method:'POST',headers:{'content-type':'application/json','accept':'application/json'},body:JSON.stringify({name:lead.name,email:lead.email,phone:lead.phone||null,postal_code:lead.postal||null,water_need:needs[lead.need]||'other',signup_type:'customer',source:'website',marketing_consent:true})});if(!r.ok)console.error('Laravel waitlist sync failed',r.status,await r.text());return r.ok}catch(err){console.error('Laravel waitlist sync failed',err);return false}
}

async function backfillAdminWaitlist(env){
 if(!env.PRODUCTION_DB)return;
 await env.PRODUCTION_DB.prepare('CREATE TABLE IF NOT EXISTS waitlist_admin_sync (email TEXT PRIMARY KEY, synced_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)').run();
 const rows=await env.PRODUCTION_DB.prepare('SELECT w.name,w.email,w.phone,w.postal_code,w.water_need FROM customer_waitlist w LEFT JOIN waitlist_admin_sync s ON lower(s.email)=lower(w.email) WHERE s.email IS NULL ORDER BY w.rowid LIMIT 8').all();
 for(const row of rows.results||[]){const lead={name:row.name,email:row.email,phone:row.phone||'',postal:row.postal_code||'',need:row.water_need||'Other'};if(await syncAdminWaitlist(lead))await env.PRODUCTION_DB.prepare('INSERT OR REPLACE INTO waitlist_admin_sync(email,synced_at) VALUES (?,CURRENT_TIMESTAMP)').bind(String(row.email).toLowerCase()).run()}
}

async function notifyWaitlist(env,lead){
 if(!env.RESEND_API_KEY)return {skipped:true,reason:'missing_secret'};
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const html='<h2>New Water OnCall customer launch-list signup</h2><p><strong>Name:</strong> '+esc(lead.name)+'</p><p><strong>Email:</strong> '+esc(lead.email)+'</p><p><strong>Phone:</strong> '+esc(lead.phone||'Not provided')+'</p><p><strong>Postal code:</strong> '+esc(lead.postal||'Not provided')+'</p><p><strong>Water need:</strong> '+esc(lead.need||'Not provided')+'</p><p><strong>Source:</strong> Website</p>';
 const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:'Water OnCall <website@notify.wateroncall.ca>',to:['info@wateroncall.ca'],reply_to:lead.email,subject:'New customer launch-list signup — '+lead.name,html})});
 const text=await r.text();if(!r.ok)console.error('Resend waitlist notification failed',r.status,text);return {status:r.status,ok:r.ok,body:text.slice(0,1000)};
}

const application = {async fetch(req,env,ctx){const url=new URL(req.url);const path=url.pathname.replace(/\/$/,'')||'/';
 if(path==='/api/availability'&&req.method==='POST'){
  if(Number(req.headers.get('content-length')||0)>8192)return Response.json({message:'Submission is too large.'},{status:413});
  try{const raw=await req.text();if(raw.length>8192)return Response.json({message:'Submission is too large.'},{status:413});JSON.parse(raw);const response=await fetch('https://wateroncall-backend-production-cov9zr.laravel.cloud/api/v1/booking-preview',{method:'POST',headers:{'content-type':'application/json','accept':'application/json'},body:raw,signal:AbortSignal.timeout(20000)});const result=await response.json();if(response.ok)return Response.json(result,{headers:{'cache-control':'no-store'}});return Response.json({message:response.status===422?(Object.values(result.errors||{}).flat()[0]||result.message||'Check the delivery details and try again.'):response.status===429?'Too many checks. Please wait a minute before trying again.':response.status===503?'Online coverage checks are being prepared. Join the launch list for follow-up.':'Coverage checks are temporarily unavailable.'},{status:[422,429,503].includes(response.status)?response.status:503});}catch{return Response.json({message:'Coverage checks are temporarily unavailable. Please try again or join the launch list.'},{status:503});}
 }
 if(path==='/join'&&req.method==='GET'){if(ctx&&ctx.waitUntil)ctx.waitUntil(backfillAdminWaitlist(env));return new Response(launchPage,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}})}
 if(path==='/api/waitlist'&&req.method==='POST'){
  if(!env.PRODUCTION_DB)return Response.json({error:'Launch list is temporarily unavailable.'},{status:503});
  let body;try{body=await req.json()}catch{return Response.json({error:'Invalid submission.'},{status:400})}
  const name=String(body.name||'').trim().slice(0,120),email=String(body.email||'').trim().toLowerCase().slice(0,200),phone=String(body.phone||'').trim().slice(0,40),postal=String(body.postal_code||'').trim().toUpperCase().slice(0,20),need=String(body.water_need||'').trim().slice(0,80);
  if(!name||!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return Response.json({error:'Please enter your name and a valid email address.'},{status:400});
  const lead={name,email,phone,postal,need};
  try{await prepareConfirmations(env.PRODUCTION_DB);await env.PRODUCTION_DB.batch([env.PRODUCTION_DB.prepare('INSERT INTO customer_waitlist (name,email,phone,postal_code,water_need,source,marketing_consent,status) VALUES (?,?,?,?,?,?,?,?)').bind(name,email,phone||null,postal||null,need||null,'website',1,'waiting'),confirmationInsert(env.PRODUCTION_DB,lead)]);const followups=Promise.allSettled([notifyWaitlist(env,lead),syncAdminWaitlist(lead),sendConfirmations(env)]);if(ctx&&ctx.waitUntil)ctx.waitUntil(followups);else await followups;return Response.json({ok:true});}
  catch(err){if(String(err).toLowerCase().includes('unique') && await env.PRODUCTION_DB.prepare('SELECT email FROM customer_waitlist WHERE email=?').bind(email).first()){if(ctx&&ctx.waitUntil)ctx.waitUntil(syncAdminWaitlist(lead));else await syncAdminWaitlist(lead);return Response.json({ok:true,duplicate:true})}console.error('waitlist insert failed',err);return Response.json({error:'We could not save your signup. Please try again.'},{status:500})}
 }
 const res=await base.fetch(req,env,ctx);if(path==='/'){let html=await res.text();html=html.replaceAll('href="https://app.wateroncall.ca/"','href="/join"');const headers=new Headers(res.headers);headers.delete('content-length');return new Response(html,{status:res.status,headers});}
 return res;},async scheduled(_event,env,ctx){ctx.waitUntil(Promise.allSettled([backfillAdminWaitlist(env),sendConfirmations(env)]))}};





async function secureResponse(response, request) {
 const headers = new Headers(response.headers);
 headers.set('x-content-type-options','nosniff');
 headers.set('x-frame-options','DENY');
 headers.set('referrer-policy','strict-origin-when-cross-origin');
 headers.set('permissions-policy','camera=(), microphone=(), geolocation=()');
 headers.set('content-security-policy',"default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://app.wateroncall.ca; script-src 'self' 'unsafe-inline' https://*.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; connect-src 'self' https://analytics.google.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; font-src 'self' data:");
 if(new URL(request.url).protocol==='https:') headers.set('strict-transport-security','max-age=15552000');
 if(new URL(request.url).pathname.startsWith('/api/')) headers.set('cache-control','no-store');
 let body=response.body;
 // Production public pages only; exclude API responses and preview hosts.
 if(['wateroncall.ca','www.wateroncall.ca'].includes(new URL(request.url).hostname)
    && headers.get('content-type')?.includes('text/html')) {
  body=enhanceSearchMarkup(await response.text(), new URL(request.url).pathname.replace(/\/$/,'') || '/').replace('<head>','<head>'+googleAnalyticsTag);
  headers.delete('content-length');
  headers.delete('etag');
 }
 return new Response(body,{status:response.status,statusText:response.statusText,headers});
}
export default {
 async fetch(req,env,ctx){
  const url=new URL(req.url);
  if(url.protocol==='http:' && ['wateroncall.ca','www.wateroncall.ca'].includes(url.hostname)){
   url.protocol='https:';
   return secureResponse(new Response(null,{status:308,headers:{location:url.href}}),req);
  }
  return secureResponse(await application.fetch(req,env,ctx),req);
 },
 scheduled(event,env,ctx){return application.scheduled(event,env,ctx);}
};



