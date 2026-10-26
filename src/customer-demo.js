const icon = (paths) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths+'</svg>';

const css = `
#customer-order-demo{max-width:600px;margin:auto;color:#1d374a;font-family:Arial,Helvetica,sans-serif}
#customer-order-demo *{box-sizing:border-box}
#customer-order-demo [hidden]{display:none!important}
#customer-order-demo .cd-top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:22px}
#customer-order-demo .cd-top a{color:#21668d;font-size:14px}
#customer-order-demo h1{font-size:34px;line-height:1.1;letter-spacing:-.8px;margin:0 0 22px}
#customer-order-demo h2{font-size:24px;line-height:1.25;margin:0 0 18px}
#customer-order-demo .cd-card{background:#fff;border:1px solid #d6e5ee;border-radius:16px;padding:22px}
#customer-order-demo .cd-section+.cd-section{border-top:1px solid #dce7ee;margin-top:20px;padding-top:20px}
#customer-order-demo .cd-address{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-bottom:22px}
#customer-order-demo .cd-address strong{display:block;font-size:22px;line-height:1.3}
#customer-order-demo .cd-muted{color:#667d8d;line-height:1.5;margin:8px 0 0}
#customer-order-demo .cd-link{background:none;border:0;padding:5px 0;color:#21668d;font:inherit;cursor:pointer}
#customer-order-demo .cd-fields{display:grid;grid-template-columns:1fr 1fr;gap:16px}
#customer-order-demo label,#customer-order-demo legend{font-size:17px;font-weight:700;margin-bottom:12px}
#customer-order-demo select,#customer-order-demo input:not([type=checkbox]):not([type=radio]),#customer-order-demo textarea{font:inherit;font-size:18px;color:#172f41;width:100%;min-width:0;background:#f0f6fc;border:1.5px solid #bdceda;border-radius:12px;min-height:58px;padding:12px}
#customer-order-demo textarea{resize:vertical}
#customer-order-demo fieldset{padding:0;margin:0;border:0;min-width:0}
#customer-order-demo .cd-timing{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;background:#f0f5fc;padding:6px;border-radius:15px}
#customer-order-demo .cd-timing label{position:relative;display:block;margin:0;font-size:17px;text-align:center;cursor:pointer}
#customer-order-demo .cd-timing input{position:absolute;opacity:0;width:1px;height:1px;padding:0}
#customer-order-demo .cd-timing span{display:flex;align-items:center;justify-content:center;min-height:58px;border-radius:11px;padding:10px 4px}
#customer-order-demo .cd-timing input:checked+span{background:#12354b;color:#fff}
#customer-order-demo .cd-timing input:focus-visible+span{outline:3px solid #0877f9;outline-offset:2px}
#customer-order-demo .cd-date{margin-top:16px}
#customer-order-demo .cd-check{display:flex;align-items:flex-start;gap:13px;font-size:18px;font-weight:400;line-height:1.5;margin:0;cursor:pointer}
#customer-order-demo input[type=checkbox]{width:25px;height:25px;min-width:25px;margin:1px 0 0;padding:0;accent-color:#12354b}
#customer-order-demo details{margin-top:20px}
#customer-order-demo summary{font-size:19px;font-weight:700;color:#21668d;cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:16px;align-items:center}
#customer-order-demo summary::after{content:'⌄';font-weight:400}
#customer-order-demo details[open]>summary::after{content:'⌃'}
#customer-order-demo .cd-details{padding-top:18px;display:grid;gap:16px}
#customer-order-demo .cd-payment{font-size:18px;line-height:1.55;margin:22px 0}
#customer-order-demo .cd-policy{font-size:14px;margin:12px 0 24px}
#customer-order-demo .cd-policy summary{font-size:14px;font-weight:400;text-decoration:underline;justify-content:flex-start}
#customer-order-demo .cd-policy p{font-size:14px;line-height:1.5;color:#667d8d}
#customer-order-demo .cd-primary{width:100%;min-height:60px;border:0;border-radius:12px;background:#12354b;color:#fff;font:inherit;font-size:20px;padding:14px;cursor:pointer}
#customer-order-demo button:focus-visible,#customer-order-demo a:focus-visible,#customer-order-demo summary:focus-visible{outline:3px solid #0877f9;outline-offset:3px}
#customer-order-demo .cd-bottom{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;border-top:1px solid #dce7ee;margin-top:20px;padding:22px 0 8px;color:#657d8e;text-align:center;font-size:14px}
#customer-order-demo .cd-bottom span{display:flex;align-items:center;flex-direction:column;gap:10px}
#customer-order-demo .cd-bottom svg{width:25px;height:25px}
#customer-order-demo .cd-note{font-size:13px;line-height:1.5;color:#667d8d;text-align:center;margin:18px 0 0}
#customer-order-demo .cd-review-list{margin:0}
#customer-order-demo .cd-review-list>div{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #e1eaf0;padding:15px 0;line-height:1.5}
#customer-order-demo dt{color:#667d8d}
#customer-order-demo dd{margin:0;text-align:right;font-weight:700;overflow-wrap:anywhere}
#customer-order-demo .cd-back{display:block;margin:18px auto 0}
@media(max-width:450px){#customer-order-demo .cd-card{padding:18px}#customer-order-demo .cd-fields{gap:12px}#customer-order-demo select,#customer-order-demo input:not([type=checkbox]):not([type=radio]){font-size:16px;padding:10px}#customer-order-demo .cd-timing label{font-size:15px}#customer-order-demo .cd-check,#customer-order-demo .cd-payment{font-size:17px}#customer-order-demo h1{font-size:30px}}
`;

export function customerDemo(shell) {
  return shell('Customer Demo | Water OnCall', `<main class="demo" style="max-width:680px"><style>${css}</style>
<div id="customer-order-demo">
 <div class="cd-top"><span class="pill">Customer demo · sample details</span><a href="/">Back to customer page</a></div>
 <h1 id="cd-heading" tabindex="-1">Order water</h1>
 <form id="cd-order" class="cd-scene">
  <div class="cd-card">
   <div class="cd-section">
    <div class="cd-address"><div><strong id="cd-address-text">123 Sample Lane</strong><p class="cd-muted">Home · Lincoln</p></div><button class="cd-link" id="cd-change-address" type="button" aria-controls="cd-address-editor" aria-expanded="false">Change</button></div>
    <div id="cd-address-editor" class="cd-date" hidden><label for="cd-address">Sample delivery address</label><input id="cd-address" value="123 Sample Lane" maxlength="120"><button type="button" class="cd-link" id="cd-save-address">Save address</button></div>
    <div class="cd-fields"><div><label for="cd-type">Filling</label><select id="cd-type"><option>Cistern</option><option>Pool</option><option>Hot tub</option><option>Other</option></select></div><div><label for="cd-size">Water amount</label><select id="cd-size"><option>2,000 Imp gal</option><option>2,500 Imp gal</option><option>3,000 Imp gal</option></select></div></div>
   </div>
   <div class="cd-section"><fieldset><legend>When do you need it?</legend><div class="cd-timing"><label><input type="radio" name="timing" value="Flexible" checked><span>Flexible</span></label><label><input type="radio" name="timing" value="Choose date"><span>Choose date</span></label><label><input type="radio" name="timing" value="Urgent"><span>Urgent</span></label></div></fieldset><p id="cd-timing-note" class="cd-muted">Next 1–2 business days</p><div id="cd-date-field" class="cd-date" hidden><label for="cd-date">Delivery date</label><input id="cd-date" type="date"></div></div>
   <div class="cd-section"><label for="cd-hauler">Water hauler</label><select id="cd-hauler"><option value="preferred">Use my specific water hauler</option><option value="first">Use first available</option></select><p id="cd-hauler-name" class="cd-muted">Mak B’s Water Haulage</p></div>
   <div class="cd-section"><label class="cd-check"><input id="cd-recurring" type="checkbox"><span>Make this a recurring delivery</span></label><div id="cd-repeat-fields" class="cd-details" hidden><div><label for="cd-repeat">Repeat</label><select id="cd-repeat"><option>Every week</option><option>Every 2 weeks</option><option>Every 4 weeks</option></select></div><div><label for="cd-repeat-end">End date</label><input id="cd-repeat-end" type="date"></div></div><details><summary>Delivery details &amp; instructions</summary><div class="cd-details"><div><label for="cd-hose">Hose distance</label><select id="cd-hose"><option>50 feet or less</option><option>51–100 feet</option><option>101–150 feet</option></select></div><div><label for="cd-notes">Delivery instructions</label><textarea id="cd-notes" rows="3" maxlength="500"></textarea></div></div></details></div>
  </div>
  <p class="cd-payment" id="cd-payment">Your card will not be charged now. It is charged when your preferred water hauler accepts your order, before delivery.</p>
  <label class="cd-check"><input id="cd-agreement" type="checkbox" required><span>I agree to the cancellation &amp; extra charge policy.</span></label>
  <details class="cd-policy"><summary>Cancellation &amp; extra charge policy</summary><p>Review the full policy in the live application before placing an order. This demo does not place an order or take a payment.</p></details>
  <button class="cd-primary" type="submit">Review order</button>
 </form>
 <section id="cd-review" class="cd-scene" hidden><div class="cd-card"><h2>Review your request</h2><dl class="cd-review-list"><div><dt>Delivery address</dt><dd id="cd-review-address"></dd></div><div><dt>Water</dt><dd id="cd-review-water"></dd></div><div><dt>When</dt><dd id="cd-review-timing"></dd></div><div><dt>Water hauler</dt><dd id="cd-review-hauler"></dd></div><div id="cd-review-repeat-row" hidden><dt>Recurring delivery</dt><dd id="cd-review-repeat"></dd></div></dl><p class="cd-payment" id="cd-review-payment"></p><p class="cd-muted" id="cd-review-offers" hidden>Available water haulers respond with their delivery date and price. You can accept an offer or wait for more.</p><p class="cd-note">Sample request only. No real order or payment is made.</p></div><button id="cd-place" class="cd-primary" type="button" style="margin-top:22px">Place demo request</button><button id="cd-edit" class="cd-link cd-back" type="button">Edit order</button></section>
 <section id="cd-confirmation" class="cd-scene" hidden aria-live="polite"><div class="cd-card"><h2>Your demo request has been placed.</h2><p id="cd-confirmation-copy" class="cd-payment"></p><p class="cd-muted">No real order was created and no payment was taken.</p><button id="cd-again" class="cd-primary" type="button" style="margin-top:24px">Try again</button></div></section>
 <div class="cd-bottom" aria-label="Customer navigation preview"><span>${icon('<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 3h6v4H9zM9 11h6M9 15h6"/>')}My orders</span><span>${icon('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6M9 15h4"/>')}Invoices</span><span>${icon('<circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0 1 16 0v3"/>')}Profile</span><span>${icon('<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>')}More</span></div>
 <p class="cd-note">Explore using sample details. Nothing here creates an order or takes payment.</p>
</div>
<script>
(() => {
 const root=document.getElementById('customer-order-demo');
 const $=id=>root.querySelector('#'+id);
 const preferredCopy='Your card will not be charged now. It is charged when your preferred water hauler accepts your order, before delivery.';
 const firstCopy='Your card will not be charged now. You choose a water hauler’s offer and pay before delivery.';
 const show=(id,title)=>{root.querySelectorAll('.cd-scene').forEach(scene=>{scene.hidden=scene.id!==id;});$('cd-heading').textContent=title;$('cd-heading').focus();root.scrollIntoView({behavior:'smooth',block:'start'});};
 $('cd-change-address').addEventListener('click',()=>{const open=$('cd-address-editor').hidden;$('cd-address-editor').hidden=!open;$('cd-change-address').setAttribute('aria-expanded',String(open));if(open)$('cd-address').focus();});
 $('cd-save-address').addEventListener('click',()=>{const address=$('cd-address').value.trim();if(!address){$('cd-address').focus();return;}$('cd-address-text').textContent=address;$('cd-address-editor').hidden=true;$('cd-change-address').setAttribute('aria-expanded','false');});
 root.querySelectorAll('input[name=timing]').forEach(input=>input.addEventListener('change',()=>{const timing=root.querySelector('input[name=timing]:checked').value;$('cd-date-field').hidden=timing!=='Choose date';$('cd-date').required=timing==='Choose date';$('cd-timing-note').textContent=timing==='Flexible'?'Next 1–2 business days':timing==='Urgent'?'As soon as an available water hauler can deliver.':'';}));
 $('cd-hauler').addEventListener('change',()=>{const preferred=$('cd-hauler').value==='preferred';$('cd-hauler-name').hidden=!preferred;$('cd-payment').textContent=preferred?preferredCopy:firstCopy;});
 $('cd-recurring').addEventListener('change',()=>{$('cd-repeat-fields').hidden=!$('cd-recurring').checked;$('cd-repeat-end').required=$('cd-recurring').checked;});
 $('cd-order').addEventListener('submit',event=>{event.preventDefault();const preferred=$('cd-hauler').value==='preferred',timing=root.querySelector('input[name=timing]:checked').value;$('cd-review-address').textContent=$('cd-address-text').textContent+', Lincoln';$('cd-review-water').textContent=$('cd-type').value+' · '+$('cd-size').value;$('cd-review-timing').textContent=timing==='Choose date'?$('cd-date').value:timing==='Flexible'?'Flexible · next 1–2 business days':'Urgent';$('cd-review-hauler').textContent=preferred?'Mak B’s Water Haulage':'First available';$('cd-review-payment').textContent=preferred?preferredCopy:firstCopy;$('cd-review-offers').hidden=preferred;$('cd-review-repeat-row').hidden=!$('cd-recurring').checked;$('cd-review-repeat').textContent=$('cd-repeat').value+' until '+$('cd-repeat-end').value;show('cd-review','Review order');});
 $('cd-edit').addEventListener('click',()=>show('cd-order','Order water'));
 $('cd-place').addEventListener('click',()=>{const preferred=$('cd-hauler').value==='preferred';$('cd-confirmation-copy').textContent=preferred?'Your request would go to your preferred water hauler. Your card would be charged when they accept, before delivery.':'Your request would go to available water haulers. They respond with a delivery date and price, and you choose an offer before payment.';show('cd-confirmation','Request placed');});
 $('cd-again').addEventListener('click',()=>show('cd-order','Order water'));
})();
</script></main>`);
}
