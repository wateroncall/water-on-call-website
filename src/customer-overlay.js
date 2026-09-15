import base from './index.js';

const customerScript = `<style>
.woc-vendor{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;border:1px solid #dce8f3;border-radius:13px;padding:14px;margin:9px 0;background:#fff}.woc-vendor input,.woc-all input{width:auto;height:auto}.woc-price{font-weight:900}.woc-all{display:flex;gap:9px;align-items:center;font-weight:850;margin:14px 0}.woc-box{background:#f7fbff;border:1px solid #d6e8f8;border-radius:14px;padding:18px;margin-top:18px}@media(max-width:720px){.woc-vendor{grid-template-columns:auto 1fr}.woc-price{grid-column:2}}
</style><script>
(function(){
 const names=['Shining Star Water Haulage','Blue Spruce Water Haulage','Clear Creek Water Haulage','Country Roads Water Haulage'];
 let pref=names[0], backs=[names[1]];
 const oldStep=window.step;
 window.step=function(n){
  if(n!==2&&n!==3&&n!==4) return oldStep(n);
  const d=document.querySelector('#d'),dots=[...document.querySelectorAll('.dot')]; dots.forEach((x,i)=>x.classList.toggle('on',i<n));
  if(n===2){d.innerHTML='<h2>Choose your water haulers</h2><p class="muted">Select one preferred water hauler, then choose as many approved backup haulers as you want.</p><div class="woc-box"><h3>1. Preferred Water Hauler</h3><label>Preferred hauler</label><select id="woc-pref">'+names.map(x=>'<option>'+x+'</option>').join('')+'</select><div style="margin-top:8px"><span class="badge">✓ Public Health Certified</span> <strong> · Price</strong></div><p class="muted">Your preferred water hauler has <strong>8 hours</strong> to accept your delivery before it is offered to your selected backups.</p></div><div class="woc-box"><h3>2. Select Backup Water Haulers</h3><p class="muted">Choose one, several, all, or none. Each backup vendor’s price is shown.</p><label class="woc-all"><input id="woc-all" type="checkbox"> Select all approved backup haulers</label><div id="woc-vendors"></div><div id="woc-none" class="notice" style="display:none">No backups selected. Your request will remain with your preferred water hauler only.</div></div><div class="next"><button class="btn" id="woc-review">Continue to review</button></div>';
   document.querySelector('#woc-pref').addEventListener('change',e=>{pref=e.target.value;renderBackups()});
   document.querySelector('#woc-all').addEventListener('change',e=>{document.querySelectorAll('.woc-bk').forEach(x=>x.checked=e.target.checked);readBackups()});
   document.querySelector('#woc-review').addEventListener('click',()=>window.step(3)); renderBackups(); return;
  }
  if(n===3){const list=backs.length?backs.join(', '):'None selected';d.innerHTML='<h2>Review your delivery</h2><div class="summary"><div class="row"><span>2,500 gallon cistern delivery</span><strong>Price</strong></div><div class="row"><span>Hose distance · 24 ft</span><strong>Included</strong></div><div class="row"><span>Preferred Water Hauler</span><strong>'+pref+'</strong></div><div class="row"><span>Preferred response time</span><strong>8 hours</strong></div><div class="row"><span>Backup Water Haulers</span><strong>'+list+'</strong></div><div class="row"><span>Water OnCall service fee</span><strong>$5.99</strong></div><div class="row"><strong>Total</strong><strong>Shown before submitting</strong></div></div><div class="notice">Your preferred hauler receives the request first. If they do not accept within 8 hours, the request can be offered to the backup haulers you selected. Payment is charged only after a water hauler accepts the delivery.</div><div class="next"><button class="btn" onclick="step(4)">Submit delivery request</button></div>';return;}
  return oldStep(n);
 };
 function renderBackups(){const avail=names.filter(x=>x!==pref);backs=backs.filter(x=>avail.includes(x));const v=document.querySelector('#woc-vendors');if(!v)return;v.innerHTML=avail.map(x=>'<label class="woc-vendor"><input class="woc-bk" type="checkbox" value="'+x+'" '+(backs.includes(x)?'checked':'')+'><span><strong>'+x+'</strong><br><span class="badge">✓ Public Health Certified</span></span><span class="woc-price">Price</span></label>').join('');document.querySelectorAll('.woc-bk').forEach(x=>x.addEventListener('change',readBackups));readBackups();}
 function readBackups(){backs=[...document.querySelectorAll('.woc-bk:checked')].map(x=>x.value);const boxes=[...document.querySelectorAll('.woc-bk')],all=document.querySelector('#woc-all');if(all)all.checked=boxes.length>0&&boxes.every(x=>x.checked);const none=document.querySelector('#woc-none');if(none)none.style.display=backs.length?'none':'block';}
})();
</script>`;

export default {async fetch(req,env,ctx){const res=await base.fetch(req,env,ctx);if(new URL(req.url).pathname.replace(/\/$/,'')!=='/demo/customer'||res.status!==200)return res;let html=await res.text();html=html.replace('</body>',customerScript+'</body>');return new Response(html,{status:res.status,headers:res.headers});}};
