import {customerSteps} from './customer-steps.js';
import {searchRoute, serviceAreaContent} from './marketing.js';
import {haulerPage, haulerCss} from './haulers.js';
import { availabilityPage, poolCalculator, faqBody } from './booking-tools.js';
import { customerDemo, haulerDemo, flow, flowCss } from './demos.js';
const APP='https://app.wateroncall.ca';
const css=`[hidden]{display:none!important}.mobile-cta{display:none}@media(max-width:720px){.mobile-cta{display:flex;justify-content:center;gap:8px;position:fixed;bottom:0;left:0;right:0;background:#fff;padding:10px;border-top:1px solid #dce8f3;z-index:8}.mobile-cta .btn{font-size:13px;padding:10px 12px}body{padding-bottom:65px}}.content{padding-top:40px;padding-bottom:70px;max-width:960px}.content h1{font-size:clamp(32px,5vw,52px);line-height:1.1}.content>p{max-width:760px;line-height:1.6;color:#60768c}.faq{padding:15px 0;border-bottom:1px solid #dce8f3}.faq summary{cursor:pointer;font-weight:800}.faq p{max-width:760px}.card details{margin-top:14px}.links a:focus-visible,.btn:focus-visible,summary:focus-visible{outline:3px solid #ffb640;outline-offset:4px}*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;color:#102b46;background:#f6faff}a{color:inherit}.wrap{max-width:1120px;margin:auto;padding:0 22px}header{background:#fff;border-bottom:1px solid #dce8f3;position:sticky;top:0;z-index:5}.nav{height:74px;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{font-size:24px;font-weight:900;text-decoration:none}.brand b{color:#0877f9}.links{display:flex;gap:22px;align-items:center}.links a{text-decoration:none;font-weight:750;font-size:14px}.btn{display:inline-block;background:#0877f9;color:white!important;padding:12px 17px;border-radius:11px;text-decoration:none;font-weight:850;border:0;cursor:pointer}.btn.alt{background:#e9f3ff;color:#0757a7!important}.hero{padding:80px 0 55px;text-align:center}.pill{display:inline-block;padding:7px 12px;background:#e9f3ff;color:#0877f9;border-radius:999px;font-weight:850;font-size:13px}.hero h1{font-size:clamp(43px,7vw,76px);line-height:1.02;letter-spacing:-.04em;margin:18px auto;max-width:900px}.hero p{font-size:19px;line-height:1.6;color:#60768c;max-width:760px;margin:0 auto 27px}.actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}.grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;padding:20px 0 65px}.card{background:#fff;border:1px solid #dce8f3;border-radius:20px;padding:28px;box-shadow:0 12px 35px #06325e0c}.card h2{margin-top:0;font-size:27px}.card p,.muted{color:#60768c;line-height:1.6}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin:20px 0 70px}.step{background:white;border:1px solid #dce8f3;border-radius:16px;padding:22px}.num{font-size:30px;font-weight:950;color:#0877f9}.section-title{text-align:center;font-size:35px;margin-top:40px}.demo{max-width:900px;margin:45px auto;padding:0 22px 70px}.demohead{text-align:center;margin-bottom:25px}.demohead h1{font-size:45px;margin:8px}.progress{display:flex;justify-content:center;gap:7px;margin:20px}.dot{height:8px;width:42px;background:#d8e5f1;border-radius:20px}.dot.on{background:#0877f9}.panel{background:white;border:1px solid #dce8f3;border-radius:20px;padding:28px;box-shadow:0 12px 35px #06325e0c}.fields{display:grid;grid-template-columns:1fr 1fr;gap:16px}.field.full{grid-column:1/-1}label{font-weight:800;font-size:13px;display:block;margin-bottom:6px}input,select,textarea{width:100%;border:1px solid #bed0e1;border-radius:10px;padding:12px;font:inherit;background:#fff}input,select{height:48px}.next{display:flex;justify-content:flex-end;margin-top:22px}.badge{display:inline-block;background:#e5f8ef;color:#08764b;padding:5px 8px;border-radius:999px;font-size:11px;font-weight:850}.summary{display:grid;gap:10px}.row{display:flex;justify-content:space-between;border-bottom:1px solid #edf3f8;padding:10px 0}.notice{background:#eef6ff;border-left:4px solid #0877f9;padding:15px;border-radius:8px;margin:18px 0;font-weight:750}.selection{background:#f7fbff;border:1px solid #d6e8f8;border-radius:14px;padding:18px;margin-top:18px}.selection h3{margin:0 0 10px}.finish{text-align:center;padding:25px}.footer{border-top:1px solid #dce8f3;background:#fff;padding:30px 0;color:#60768c;font-size:13px}@media(max-width:720px){.links a:not(.btn){display:none}.grid,.steps,.fields{grid-template-columns:1fr}.field.full{grid-column:auto}.hero{padding-top:55px}}.lead-actions{justify-content:flex-start;margin:24px 0}.lead-section{margin-top:30px}.lead-promise{font-size:13px!important;margin:14px auto 0!important;max-width:630px!important}.service-links{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:20px}.service-links a{font-weight:750;color:#0757a7}.hero{padding-bottom:20px}.homepage-flows>.section-title:first-child{margin-top:0}@media(max-width:720px){.hero{padding:24px 0 4px}.hero h1{font-size:36px;line-height:1.06;margin:12px auto}.hero p{font-size:16px;line-height:1.45;margin-bottom:12px}.homepage-flows>.section-title:first-child{font-size:27px;margin:8px 0 0}.homepage-flows>.woc-flow:first-of-type{margin-top:12px}}`;

const customerCss = `
.customer-page{background:#f3f8ff;color:#132f4b;padding-bottom:0}
.customer-page .nav{height:72px;max-width:1120px}
.customer-page .brand{font-size:23px;letter-spacing:-.7px;white-space:nowrap}
.customer-page .links{gap:14px}
.customer-page .links .hauler-nav{display:inline-flex;align-items:center;min-height:44px;padding:10px 14px;border-radius:10px;background:#e8f2ff;color:#0757a7;font-size:13px;white-space:nowrap}
.customer-page .mobile-cta{display:none}
.customer-hero{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:60px;padding-top:56px;padding-bottom:42px}
.customer-eyebrow{color:#526b83;font-size:13px;font-weight:700;margin:0 0 14px}
.customer-intro h1{font-size:clamp(40px,4.7vw,60px);font-weight:850;line-height:1.08;letter-spacing:-1.8px;margin:0 0 20px}
.customer-intro h1 span{color:#0877f9}
.customer-intro>p:not(.customer-eyebrow):not(.customer-launch-note){color:#526b83;font-size:18px;line-height:1.6;max-width:455px;margin:0 0 24px}
.customer-actions{display:flex;gap:10px;flex-wrap:wrap}
.customer-actions .btn{display:inline-flex;justify-content:center;align-items:center;min-height:48px;padding:12px 16px;font-size:14px;text-align:center}
.customer-launch-note{color:#526b83;font-size:12px;line-height:1.5;margin:12px 0 0}
.customer-journey{min-width:0}
.customer-circle{position:relative;width:100%;max-width:464px;aspect-ratio:1;margin:0 auto;container-type:inline-size}
.customer-ring{display:block;position:absolute;inset:0;width:100%;height:100%}
.customer-ring path:nth-child(1){fill:#deecff}
.customer-ring path:nth-child(2){fill:#c9e2ff}
.customer-ring path:nth-child(3){fill:#b4d7ff}
.customer-ring path:nth-child(4){fill:#0877f9}
.customer-hub{position:absolute;left:50%;top:50%;width:44%;height:44%;transform:translate(-50%,-50%);border-radius:50%;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.02;font-size:clamp(22px,6.8cqw,32px);font-weight:800;letter-spacing:-1px}
.customer-hub span{color:#0877f9}
.customer-hub strong{font-weight:800}
.customer-flow-step{position:absolute;transform:translate(-50%,-50%);text-align:center;display:flex;flex-direction:column;align-items:center;width:28%;color:#132f4b}
.customer-flow-step:nth-of-type(2){left:50%;top:14.25%;width:42%}
.customer-flow-step:nth-of-type(3){left:85.75%;top:50%}
.customer-flow-step:nth-of-type(4){left:50%;top:85.75%;width:42%}
.customer-flow-step:nth-of-type(5){left:14.25%;top:50%;color:#fff}
.customer-flow-icon{position:relative;display:flex;align-items:center;justify-content:center;color:#0877f9;width:clamp(23px,6.2cqw,29px);height:clamp(23px,6.2cqw,29px);margin-bottom:7px}
.customer-flow-icon svg{width:100%;height:100%;stroke-width:1.8}
.customer-flow-icon b{position:absolute;right:100%;top:-2px;margin-right:6px;font-size:11px;line-height:18px;color:#132f4b}
.customer-flow-step:last-child .customer-flow-icon,.customer-flow-step:last-child .customer-flow-icon b{color:#fff}
.customer-flow-step h3{font-size:clamp(12px,3.5cqw,16px);line-height:1.2;font-weight:750;letter-spacing:-.15px;margin:0}
.customer-flow-caption{font-size:14px;color:#526b83;line-height:1.5;margin:18px 0 0;text-align:center}
.customer-help{max-width:780px;margin:0 auto 42px;padding:10px 24px;background:#fff;border:1px solid #e2eaf3;border-radius:18px}
.customer-help>h2{color:#132f4b;font-size:24px;font-weight:750;line-height:1.25;letter-spacing:-.4px;margin:20px 0 8px}
.customer-help details+details{border-top:1px solid #e2eaf3}
.customer-help summary{display:flex;align-items:center;justify-content:space-between;gap:18px;list-style:none;cursor:pointer;min-height:64px;padding:16px 0;font-size:16px;font-weight:750;line-height:1.4}
.customer-help summary::-webkit-details-marker{display:none}
.customer-help summary::after{content:'+';font-size:24px;font-weight:400;color:#0877f9;flex:none}
.customer-help details[open] summary::after{content:'−'}
.customer-help .customer-answer{padding:0 0 20px;color:#526b83;font-size:15px;line-height:1.6;max-width:640px}
.customer-answer p{margin:0 0 12px}
.customer-answer p:last-child{margin-bottom:0}
.customer-answer strong{color:#132f4b}
.customer-answer a{color:#0757a7;font-weight:750}
.customer-page .footer{line-height:1.9;margin:0}
.customer-page summary:focus-visible{outline:3px solid #ffb640;outline-offset:4px}
@media(max-width:760px){
 .customer-hero{grid-template-columns:1fr;gap:26px;max-width:530px;padding-top:28px;padding-bottom:28px}
 .customer-intro h1{font-size:40px;margin-bottom:14px}
 .customer-intro>p:not(.customer-eyebrow):not(.customer-launch-note){font-size:16px;line-height:1.5;margin-bottom:18px}
 .customer-eyebrow{margin-bottom:10px;font-size:12px}
 .customer-launch-note{margin-top:10px}
 .customer-actions .btn{flex:1 1 0;padding:12px 10px;font-size:13px}
 .customer-help{margin-left:22px;margin-right:22px;margin-bottom:28px;padding:4px 18px}
 .customer-flow-caption{font-size:13px;margin-top:12px}
 .customer-page .links>.btn{display:none}
 .customer-page .nav{gap:8px}
 .customer-page .brand{font-size:21px}
 .customer-page .links .hauler-nav{padding:10px 12px;font-size:12px}
 .customer-help summary{font-size:15px;min-height:62px}
}
@media(max-width:360px){
 .customer-page .wrap{padding-left:16px;padding-right:16px}
 .customer-page .brand{font-size:20px}
 .customer-page .links .hauler-nav{padding:9px;font-size:11px}
 .customer-intro h1{font-size:36px}
 .customer-actions .btn{flex:1 1 220px}
 .customer-help{margin-left:16px;margin-right:16px;padding-left:16px;padding-right:16px}
}
`;

const shell=(title,body,customer=false)=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="Water OnCall connects customers with approved bulk water haulers. Launching in Niagara, Ontario."><style>${css}${flowCss}${haulerCss}${customer?customerCss:''}</style></head><body${customer?' class="customer-page"':''}><header><div class="wrap nav"><a class="brand" href="/"><b>Water</b> OnCall</a><nav class="links" aria-label="Main navigation">${customer?'':'<a href="/check-availability">Coverage & pricing</a><a href="/faq">Questions</a>'}<a class="hauler-nav" href="/haulers">Water Haulers</a><a class="btn" data-lead-cta="launch_list" href="/join">${customer?'Get launch updates':'Join prelaunch list'}</a></nav></div></header>${body}<footer class="footer"><div class="wrap">© 2026 Water OnCall · Niagara, Ontario · <a href="/service-area">Niagara coverage</a> · <a href="/cisterns">Cistern water</a> · <a href="/pools">Pool water</a> · <a href="/faq">FAQ</a> · <a href="mailto:info@wateroncall.ca">info@wateroncall.ca</a></div></footer><aside class="mobile-cta" aria-label="Quick actions"><a class="btn" href="/check-availability">Check your address</a><a class="btn alt" href="/join">Launch updates</a></aside></body></html>`;
function home(){return shell('Bulk Water Delivery in Niagara | Water OnCall',`
<main>
 <div class="wrap" style="max-width:824px;padding-top:28px;padding-bottom:28px">${customerSteps()}</div>
 <section class="customer-help" id="customer-faq" aria-labelledby="customer-faq-title">
  <h2 id="customer-faq-title">Frequently asked questions</h2>
  <details name="customer-info">
   <summary>Do you deliver to my area?</summary>
   <div class="customer-answer">
    <p>Water OnCall is preparing to launch in Niagara. Coverage depends on your address and available local water haulers. <a href="/check-availability">Check your address</a> for a preliminary coverage result.</p>
   </div>
  </details>
  <details name="customer-info">
   <summary>Can I choose my usual water hauler?</summary>
   <div class="customer-answer">
    <p>Yes, if they’re approved on Water OnCall. Save them as your preferred hauler and send your request straight to them. You can also choose to get offers from available local water haulers.</p>
   </div>
  </details>
  <details name="customer-info">
   <summary>When is my credit card charged?</summary>
   <div class="customer-answer">
    <p><strong>First available:</strong> Your card is charged when you accept an offer.</p>
    <p><strong>Preferred hauler:</strong> With an approved total, your card is charged when your hauler accepts your request.</p>
    <p>Payment is collected before delivery.</p>
   </div>
  </details>
  <details name="customer-info">
   <summary>How much bulk water should I order?</summary>
   <div class="customer-answer">
    <p>For cisterns, order the amount needed to top up the tank. For pool fills and top-ups, <a href="/pools">use our pool calculator</a> to estimate the water needed. Delivery amounts are shown in imperial gallons.</p>
   </div>
  </details>
  <details name="customer-info">
   <summary>Can I set up recurring deliveries?</summary>
   <div class="customer-answer">
    <p>Yes. Set up recurring cistern deliveries with a repeat schedule and end date when ordering. Once the arrangement is accepted, your saved card is charged the day before each scheduled delivery.</p>
   </div>
  </details>
 </section>
</main>`,true)}

function haulers(){return haulerPage()}
function cisterns(){return shell('Cistern Water Delivery in Niagara | Water OnCall',`<main class="wrap content"><span class="pill">Cistern water · Preparing our Niagara launch</span><h1>Cistern water delivery, with your details in one place.</h1><p>Water OnCall is preparing an easier way for Niagara homeowners to request bulk water from approved local haulers. Save your fill-point instructions, choose your preferred hauler and follow delivery updates in your account.</p><div class="actions lead-actions"><a class="btn" href="/check-availability" data-lead-cta="coverage">Check coverage &amp; pricing</a><a class="btn alt" href="/join" data-lead-cta="launch_list">Get launch updates</a></div><section class="steps"><article class="step"><h2>Choose the amount</h2><p>Select imperial gallons per load and the number of loads. Your cistern capacity is separate from the amount of water you need to order.</p></article><article class="step"><h2>Review your request</h2><p>Include hose distance and access instructions. Review the maximum total and any published extras before booking. Your hauler confirms a flexible delivery date.</p></article><article class="step"><h2>Follow the delivery</h2><p>See confirmation and On the Way updates. Keep order messages together and review the new details when ordering again.</p></article></section><section class="card"><h2>Will my Niagara address be covered?</h2><p>Coverage depends on approved filling stations, driving distance, the hauler's service area and available truck capacity. Check the property address for a preliminary result.</p><a href="/service-area" data-lead-cta="service_area">Read about Niagara coverage</a></section><section class="lead-section"><h2>Before your first cistern delivery</h2><details class="faq"><summary>What information should I have ready?</summary><p>Your delivery address, the amount needed in imperial gallons, hose distance and instructions for finding the fill point. Include gate codes and access details in your private delivery instructions when booking.</p></details><details class="faq"><summary>Can I keep my preferred water hauler?</summary><p>You can set a preferred approved hauler in your profile and give that hauler the first opportunity to accept. You can also request the first available eligible hauler.</p></details><details class="faq"><summary>Can I order water today?</summary><p>Public customer ordering is being prepared. The coverage tool is a preliminary check and does not reserve a delivery. Join the launch list to hear when ordering opens in your area.</p></details><details class="faq"><summary>Does joining the list cost anything?</summary><p>No. Joining is free and does not place an order or take a payment.</p></details></section><section class="card lead-section"><h2>Hear when ordering opens.</h2><p>Join the Niagara launch list for an email update when customer ordering is available in your area.</p><a class="btn" href="/join" data-lead-cta="launch_list">Join the free launch list</a></section></main>`)}
function pools(){return shell('Pool Water Delivery in Niagara | Water OnCall',`<main class="wrap content"><span class="pill">Pool fills & top-ups · Niagara launch</span><h1>Plan your pool water delivery.</h1><p>Estimate the amount you need, check your address and request a hauler quote. Pool deliveries can require multiple loads over more than one day. Review the total and delivery plan before approving payment.</p>${poolCalculator()}<a class="btn" href="/check-availability">Check your delivery address</a> <a class="btn alt" href="/join">Get launch updates</a></main>`)}
export default{async fetch(req){let p=new URL(req.url).pathname.replace(/\/$/,'')||'/';const searchResponse=searchRoute(p);if(searchResponse)return searchResponse;let html=p==='/'?home():p==='/demo/customer'?customerDemo(shell):p==='/demo/hauler'?haulerDemo(shell):p==='/haulers'?haulers():p==='/cisterns'?cisterns():p==='/service-area'?shell('Niagara Water Delivery Coverage | Water OnCall',serviceAreaContent()):p==='/pools'?pools():p==='/faq'?shell('Water Delivery FAQ | Water OnCall',faqBody()):p==='/check-availability'?shell('Check Coverage & Pricing | Water OnCall',availabilityPage()):null;if(!html)return new Response('Not found',{status:404});return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=60','x-content-type-options':'nosniff','x-frame-options':'DENY'}})}};





