// Approved water-hauler landing page. Inline demos stay local and never create orders or timesheets.
export const haulerCss = "@media(max-width:720px){.links a.hauler-nav{display:inline-flex;font-size:12px;padding:10px 12px;background:#e9f3ff;color:#0757a7;border-radius:9px}.links .btn{display:none}}";

const pageMarkup = String.raw`<div id="woc-haulers-clean">
  <style>
    #woc-haulers-clean{color-scheme:light dark;--woc-bg:light-dark(#f3f8ff,#101c29);--woc-surface:light-dark(#ffffff,#172738);--woc-soft:light-dark(#f1f6ff,#152536);--woc-ink:light-dark(#132f4b,#e8f0f9);--woc-muted:light-dark(#5d7186,#adbed0);--woc-blue:light-dark(#0877f9,#66acff);--woc-button:light-dark(#0877f9,#2589ff);--woc-on-button:#ffffff;--woc-line:light-dark(#dfe8f3,#314355);--woc-tint:light-dark(#e7f2ff,#223b54);--woc-green:light-dark(#267044,#88d6a5);font:400 14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--woc-ink);background:var(--woc-bg);width:100%;text-align:left}
    #woc-haulers-clean *{box-sizing:border-box}
    #woc-haulers-clean a{color:inherit;text-decoration:none}
    #woc-haulers-clean button,#woc-haulers-clean summary{font:inherit}
    #woc-haulers-clean .cursor-interaction,#woc-haulers-clean a{cursor:pointer}
    #woc-haulers-clean a:focus-visible,#woc-haulers-clean summary:focus-visible,#woc-haulers-clean button:focus-visible{outline:3px solid var(--woc-blue);outline-offset:4px}
    #woc-haulers-clean .woc-header{position:sticky;top:0;z-index:20;background:var(--woc-surface);border-bottom:1px solid var(--woc-line)}
    #woc-haulers-clean .woc-nav{max-width:940px;margin:auto;min-height:72px;padding:15px 26px;display:flex;align-items:center;justify-content:space-between;gap:20px}
    #woc-haulers-clean .woc-brand{white-space:nowrap;font-size:22px;font-weight:800;letter-spacing:-.8px;line-height:1.2}
    #woc-haulers-clean .woc-brand span{color:var(--woc-blue)}
    #woc-haulers-clean .woc-links{display:flex;align-items:center;gap:21px;font-size:13px;font-weight:650}
    #woc-haulers-clean .woc-login{padding:9px 13px;border-radius:9px;color:var(--woc-blue);background:var(--woc-tint)}
    #woc-haulers-clean .woc-mobile-menu{display:none;position:relative}
    #woc-haulers-clean summary{list-style:none;cursor:inherit}
    #woc-haulers-clean summary::-webkit-details-marker{display:none}
    #woc-haulers-clean .woc-mobile-menu>summary{display:flex;align-items:center;justify-content:center;min-width:42px;min-height:42px;color:var(--woc-ink)}
    #woc-haulers-clean .woc-menu-panel{position:absolute;z-index:5;right:0;top:48px;min-width:160px;padding:7px;background:var(--woc-surface);border:1px solid var(--woc-line);border-radius:12px;box-shadow:0 10px 25px light-dark(#132f4b14,#00000030)}
    #woc-haulers-clean .woc-menu-panel a{display:block;padding:11px}
    #woc-haulers-clean .woc-main{max-width:730px;margin:auto;padding:28px 24px 30px}
    #woc-haulers-clean .woc-intro{background:var(--woc-soft);border:1px solid var(--woc-line);border-radius:20px;padding:28px}
    #woc-haulers-clean .woc-eyebrow{margin:0 0 17px;color:var(--woc-muted);font-size:12px;font-weight:650}
    #woc-haulers-clean h1{margin:0;font-size:32px;line-height:1.18;letter-spacing:-1px;font-weight:650;color:var(--woc-ink)}
    #woc-haulers-clean h1 span{display:block;color:var(--woc-blue)}
    #woc-haulers-clean .woc-lead{font-size:14px;line-height:1.65;color:var(--woc-muted);max-width:480px;margin:14px 0 22px}
    #woc-haulers-clean .woc-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:30px}
    #woc-haulers-clean .woc-action{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:10px;min-height:46px;padding:11px 17px;font-size:13px;font-weight:700;line-height:1.35}
    #woc-haulers-clean .woc-action-primary{background:var(--woc-button);color:var(--woc-on-button)}
    #woc-haulers-clean .woc-action-secondary{background:var(--woc-tint);color:var(--woc-blue)}
    #woc-haulers-clean .woc-section-label{font-size:17px;font-weight:650;line-height:1.4;letter-spacing:-.2px;margin:0 0 12px}
    #woc-haulers-clean .woc-features{margin:0}
    #woc-haulers-clean .woc-feature{scroll-margin-top:90px;border-top:1px solid var(--woc-line)}
    #woc-haulers-clean .woc-feature:first-child{border-top:0}
    #woc-haulers-clean .woc-feature>summary{display:flex;align-items:flex-start;gap:15px;padding:19px 0;min-height:88px}
    #woc-haulers-clean .woc-feature:last-child:not([open])>summary{padding-bottom:0}
    #woc-haulers-clean .woc-icon{flex:0 0 43px;height:43px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:var(--woc-surface);color:var(--woc-blue)}
    #woc-haulers-clean .woc-icon svg{width:21px;height:21px;stroke-width:1.8}
    #woc-haulers-clean .woc-feature-text{flex:1;min-width:0}
    #woc-haulers-clean .woc-feature-title{display:block;font-size:16px;line-height:1.45;font-weight:600;letter-spacing:-.15px;margin:0 0 4px}
    #woc-haulers-clean .woc-feature-description{display:block;font-size:13px;line-height:1.55;color:var(--woc-muted);margin:0}
    #woc-haulers-clean .woc-demo-label{display:block;margin-top:6px;font-size:12px;line-height:1.4;color:var(--woc-blue);text-decoration:underline;text-underline-offset:3px}
    #woc-haulers-clean .woc-collapse-label{display:none}
    #woc-haulers-clean .woc-feature[open] .woc-expand-label{display:none}
    #woc-haulers-clean .woc-feature[open] .woc-collapse-label{display:inline}
    #woc-haulers-clean .woc-chevron{flex:0 0 17px;width:17px;height:17px;color:var(--woc-blue);margin-top:5px;transition:transform .16s}
    #woc-haulers-clean .woc-feature[open] .woc-chevron{transform:rotate(180deg)}
    #woc-haulers-clean .woc-demo{margin:0 0 20px 58px;padding:17px;background:var(--woc-surface);border:1px solid var(--woc-line);border-radius:12px;font-size:13px;color:var(--woc-ink)}
    #woc-haulers-clean .woc-demo-top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:13px}
    #woc-haulers-clean .woc-demo-top strong{font-size:14px;font-weight:650}
    #woc-haulers-clean .woc-sample{color:var(--woc-muted);font-size:11px;font-weight:400}
    #woc-haulers-clean .woc-demo-location{font-weight:650;margin:0 0 3px}
    #woc-haulers-clean .woc-demo-meta{color:var(--woc-muted);margin:0;font-size:12px;line-height:1.6}
    #woc-haulers-clean .woc-demo-footer{border-top:1px solid var(--woc-line);margin-top:12px;padding-top:11px;font-size:12px;color:var(--woc-muted)}
    #woc-haulers-clean .woc-pill{display:inline-block;border-radius:6px;padding:3px 7px;background:var(--woc-tint);color:var(--woc-blue);font-size:11px;white-space:nowrap}
    #woc-haulers-clean .woc-check{display:flex;gap:8px;align-items:center;padding:6px 0;font-size:12px}
    #woc-haulers-clean .woc-check svg{color:var(--woc-green);width:16px;height:16px;flex-shrink:0}
    #woc-haulers-clean .woc-job{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;padding:10px 0;border-top:1px solid var(--woc-line)}
    #woc-haulers-clean .woc-job:first-of-type{border-top:0;padding-top:0}
    #woc-haulers-clean .woc-job:last-child{padding-bottom:0}
    #woc-haulers-clean .woc-job strong{display:block;font-weight:600;font-size:12px}
    #woc-haulers-clean .woc-job small{color:var(--woc-muted);font-size:11px}
    #woc-haulers-clean .woc-complete{background:light-dark(#eaf5ed,#203d2b);color:var(--woc-green)}
    #woc-haulers-clean .woc-schedule{width:100%;border-collapse:collapse;font-size:12px}
    #woc-haulers-clean .woc-schedule th{text-align:left;color:var(--woc-muted);font-weight:500;padding:0 8px 8px 0}
    #woc-haulers-clean .woc-schedule td{border-top:1px solid var(--woc-line);padding:9px 8px 9px 0;vertical-align:top}
    #woc-haulers-clean .woc-clock{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
    #woc-haulers-clean .woc-clock-status{font-size:14px;font-weight:600;margin:0}
    #woc-haulers-clean .woc-small-button{background:var(--woc-button);color:var(--woc-on-button);border:0;border-radius:8px;padding:9px 13px;min-height:42px;font-size:12px;font-weight:650}
    #woc-haulers-clean .woc-route{margin:0 0 12px;padding-left:20px;font-size:12px}
    #woc-haulers-clean .woc-route li{padding:4px 0 4px 3px}
    #woc-haulers-clean .woc-route span{color:var(--woc-muted)}
    #woc-haulers-clean .woc-route-status{color:var(--woc-muted);font-size:12px;margin:10px 0 0}
    #woc-haulers-clean .woc-questions{background:var(--woc-surface);border:1px solid var(--woc-line);border-radius:18px;padding:24px 26px;margin-top:20px}
    #woc-haulers-clean .woc-questions h2{font-size:19px;line-height:1.4;letter-spacing:-.3px;font-weight:650;margin:0 0 9px}
    #woc-haulers-clean .woc-question{border-top:1px solid var(--woc-line)}
    #woc-haulers-clean .woc-question:first-of-type{border-top:0}
    #woc-haulers-clean .woc-question summary{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:13px 0;font-size:13px;font-weight:600;min-height:46px}
    #woc-haulers-clean .woc-question summary>span:last-child{color:var(--woc-blue);font-size:18px;font-weight:400}
    #woc-haulers-clean .woc-question[open] summary>span:last-child{transform:rotate(45deg)}
    #woc-haulers-clean .woc-question p{font-size:13px;color:var(--woc-muted);line-height:1.65;margin:0 0 16px}
    #woc-haulers-clean .woc-footer{padding:0 22px 23px;text-align:center;font-size:12px;line-height:1.7;color:var(--woc-muted)}
    #woc-haulers-clean .woc-footer p{margin:0}
    #woc-haulers-clean .woc-footer a{color:var(--woc-blue)}
    @media(max-width:540px){#woc-haulers-clean .woc-nav{padding:12px 18px;min-height:64px;gap:10px}#woc-haulers-clean .woc-brand{font-size:20px}#woc-haulers-clean .woc-links{gap:7px;font-size:12px}#woc-haulers-clean .woc-desktop-link{display:none}#woc-haulers-clean .woc-mobile-menu{display:block}#woc-haulers-clean .woc-login{padding:9px 11px}#woc-haulers-clean .woc-main{padding:20px 14px 23px}#woc-haulers-clean .woc-intro{padding:23px 20px;border-radius:17px}#woc-haulers-clean h1{font-size:29px;letter-spacing:-.8px}#woc-haulers-clean .woc-lead{font-size:13px;margin-bottom:20px}#woc-haulers-clean .woc-actions{margin-bottom:29px;gap:8px}#woc-haulers-clean .woc-action{padding:11px 13px;font-size:12px}#woc-haulers-clean .woc-feature>summary{gap:12px;padding:18px 0}#woc-haulers-clean .woc-icon{flex-basis:38px;height:38px}#woc-haulers-clean .woc-icon svg{width:19px;height:19px}#woc-haulers-clean .woc-feature-title{display:block;font-size:15px}#woc-haulers-clean .woc-feature-description{display:block;font-size:12px}#woc-haulers-clean .woc-chevron{flex-basis:15px;width:15px}#woc-haulers-clean .woc-demo{margin-left:0;padding:14px}#woc-haulers-clean .woc-questions{padding:20px;border-radius:16px}#woc-haulers-clean .woc-questions h2{font-size:18px}}
    @media(prefers-reduced-motion:reduce){#woc-haulers-clean .woc-chevron{transition:none}}
  </style>
  <header class="woc-header">
    <nav class="woc-nav" aria-label="Main navigation">
      <a class="woc-brand" href="/" aria-label="Water OnCall home"><span>Water</span> OnCall</a>
      <div class="woc-links">
        <a class="woc-desktop-link" href="https://app.wateroncall.ca/customer/orders/create">Order Water</a>
        <a class="woc-desktop-link" data-public-contact href="mailto:info@wateroncall.ca">Contact us</a>
        <a class="woc-login" href="https://app.wateroncall.ca/login">Log in</a>
        <details class="woc-mobile-menu">
          <summary class="cursor-interaction" aria-label="More links"><svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg></summary>
          <div class="woc-menu-panel"><a href="https://app.wateroncall.ca/customer/orders/create">Order Water</a><a href="mailto:info@wateroncall.ca">Contact us</a></div>
        </details>
      </div>
    </nav>
  </header>
  <main class="woc-main">
    <section class="woc-intro" aria-labelledby="woc-hauler-heading">
      <p class="woc-eyebrow">For water haulers</p>
      <h1 id="woc-hauler-heading">Grow your business.<span>Manage your day.</span></h1>
      <p class="woc-lead">Connect with customers in your area and keep your deliveries, trucks and team organized in one place.</p>
      <div class="woc-actions">
        <a class="woc-action woc-action-primary" href="https://app.wateroncall.ca/hauler/register">Apply to join</a>
        <button class="woc-action woc-action-secondary cursor-interaction" type="button" id="woc-explore">See it in action <svg  aria-hidden="true" style="width:15px;height:15px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></button>
      </div>
      <h2 class="woc-section-label">Tools for your water hauling business</h2>
      <div class="woc-features">
        <details class="woc-feature" name="hauler-feature" id="woc-orders-example">
          <summary class="cursor-interaction"><span class="woc-icon"><svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M22 8c0-2.3-.8-4.3-2-6"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/></svg></span><span class="woc-feature-text"><span class="woc-feature-title">New orders in your area</span><span class="woc-feature-description">Get email or text alerts for nearby water requests. You choose your price and delivery date.</span><span class="woc-demo-label"><span class="woc-expand-label">View demo</span><span class="woc-collapse-label">Close demo</span></span></span><svg  class="woc-chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
          <div class="woc-demo"><div class="woc-demo-top"><strong>New water request</strong><span class="woc-sample">Example</span></div><p class="woc-demo-location">Sample community</p><p class="woc-demo-meta">Pool · 3,000 imp. gal.<br>Requested delivery: Friday</p><div class="woc-demo-footer">Review the request and offer your price and available date.</div></div>
        </details>
        <details class="woc-feature" name="hauler-feature">
          <summary class="cursor-interaction"><span class="woc-icon"><svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg></span><span class="woc-feature-text"><span class="woc-feature-title">Daily truck checks</span><span class="woc-feature-description">Complete daily circle checks from your phone and keep your inspection records together.</span><span class="woc-demo-label"><span class="woc-expand-label">View demo</span><span class="woc-collapse-label">Close demo</span></span></span><svg  class="woc-chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
          <div class="woc-demo"><div class="woc-demo-top"><strong>Truck 01 · Daily circle check</strong><span class="woc-sample">Example</span></div><div class="woc-check"><svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> Inspection items completed</div><div class="woc-check"><svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> Driver notes recorded</div><div class="woc-check"><svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> Saved to inspection history</div></div>
        </details>
        <details class="woc-feature" name="hauler-feature">
          <summary class="cursor-interaction"><span class="woc-icon"><svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg></span><span class="woc-feature-text"><span class="woc-feature-title">Delivery management</span><span class="woc-feature-description">Keep new requests, scheduled loads and completed deliveries organized in one place.</span><span class="woc-demo-label"><span class="woc-expand-label">View demo</span><span class="woc-collapse-label">Close demo</span></span></span><svg  class="woc-chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
          <div class="woc-demo"><div class="woc-demo-top"><strong>Your deliveries</strong><span class="woc-sample">Example</span></div><div class="woc-job"><div><strong>Pool · Sample community</strong><small>3,000 imp. gal. · Truck 01</small></div><span class="woc-pill">Scheduled</span></div><div class="woc-job"><div><strong>Cistern · Smithville</strong><small>2,000 imp. gal. · Truck 02</small></div><span class="woc-pill woc-complete">Completed</span></div></div>
        </details>
        <details class="woc-feature" name="hauler-feature">
          <summary class="cursor-interaction"><span class="woc-icon"><svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg></span><span class="woc-feature-text"><span class="woc-feature-title">Employee scheduling</span><span class="woc-feature-description">Schedule your team, assign trucks and see who is working each day.</span><span class="woc-demo-label"><span class="woc-expand-label">View demo</span><span class="woc-collapse-label">Close demo</span></span></span><svg  class="woc-chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
          <div class="woc-demo"><div class="woc-demo-top"><strong>Team schedule</strong><span class="woc-sample">Example</span></div><table class="woc-schedule"><thead><tr><th scope="col">Employee</th><th scope="col">Monday</th><th scope="col">Truck</th></tr></thead><tbody><tr><td>Driver 1</td><td>7 a.m.–4 p.m.</td><td>01</td></tr><tr><td>Driver 2</td><td>8 a.m.–4 p.m.</td><td>02</td></tr></tbody></table></div>
        </details>
        <details class="woc-feature" name="hauler-feature">
          <summary class="cursor-interaction"><span class="woc-icon"><svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6h4"/></svg></span><span class="woc-feature-text"><span class="woc-feature-title">Time clock &amp; timesheets</span><span class="woc-feature-description">Let employees punch in and out from their phones and keep track of their hours.</span><span class="woc-demo-label"><span class="woc-expand-label">View demo</span><span class="woc-collapse-label">Close demo</span></span></span><svg  class="woc-chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
          <div class="woc-demo"><div class="woc-demo-top"><strong>Time clock</strong><span class="woc-sample">Interactive example</span></div><div class="woc-clock"><div aria-live="polite"><p class="woc-clock-status" id="woc-clock-status">Ready to start your day?</p><p class="woc-demo-meta" id="woc-clock-detail">Your hours are saved to your timesheet.</p></div><button class="woc-small-button cursor-interaction" id="woc-clock-button" type="button">Punch in</button></div></div>
        </details>
        <details class="woc-feature" name="hauler-feature">
          <summary class="cursor-interaction"><span class="woc-icon"><svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg></span><span class="woc-feature-text"><span class="woc-feature-title">Delivery routing</span><span class="woc-feature-description">Plan deliveries and fill station stops. Re-optimize from your location as the day changes.</span><span class="woc-demo-label"><span class="woc-expand-label">View demo</span><span class="woc-collapse-label">Close demo</span></span></span><svg  class="woc-chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
          <div class="woc-demo"><div class="woc-demo-top"><strong>Your day on the road</strong><span class="woc-sample">Example</span></div><ol class="woc-route"><li>Start <span>· Your current location</span></li><li>Fill <span>· Water station</span></li><li>Deliver <span>· Customer delivery</span></li><li>Finish <span>· Return to yard</span></li></ol><div class="woc-demo-footer">Completed deliveries drop off the remaining route when you optimize again.</div></div>
        </details>
      </div>
    </section>
    <section class="woc-questions" aria-labelledby="woc-faq-heading">
      <h2 id="woc-faq-heading">A few common questions</h2>
      <details class="woc-question"><summary class="cursor-interaction"><span>Do I choose which orders I accept?</span><span aria-hidden="true">+</span></summary><p>Yes. Review requests in your area and offer your price and delivery date. The customer can then choose your offer.</p></details>
      <details class="woc-question"><summary class="cursor-interaction"><span>Can my drivers use Water OnCall?</span><span aria-hidden="true">+</span></summary><p>Your drivers can view their schedules and assigned deliveries, complete daily truck checks, and punch in and out from their phones.</p></details>
    </section>
  </main>
  <footer class="woc-footer"><p>Connecting customers and water haulers.</p><p>Water OnCall · Your area · <a href="mailto:info@wateroncall.ca">Contact us</a></p></footer>
  <script>
    (() => {
      const root = document.getElementById('woc-haulers-clean');
      const featureRows = [...root.querySelectorAll('.woc-feature')];
      featureRows.forEach(row => row.querySelector('summary').addEventListener('click', () => {
        featureRows.forEach(other => { if (other !== row) other.open = false; });
      }));
      root.querySelector('#woc-explore').addEventListener('click', () => {
        const example = root.querySelector('#woc-orders-example');
        featureRows.forEach(other => { if (other !== example) other.open = false; });
        example.open = true;
        example.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
      });
      let clockedIn = false;
      root.querySelector('#woc-clock-button').addEventListener('click', () => {
        clockedIn = !clockedIn;
        root.querySelector('#woc-clock-status').textContent = clockedIn ? 'You’re punched in' : 'You’re punched out';
        root.querySelector('#woc-clock-detail').textContent = clockedIn ? 'Your time is being recorded.' : 'Your shift is saved to your timesheet.';
        root.querySelector('#woc-clock-button').textContent = clockedIn ? 'Punch out' : 'Punch in';
      });
    })();
  </script>
</div>
`;

export function haulerContent() { return pageMarkup; }

export function haulerPage() {
  return "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Water Haulers | Water OnCall</title><meta name=\"description\" content=\"Find new water orders in your area and manage daily truck checks, deliveries, employee schedules, timesheets and delivery routes with Water OnCall.\"><style>html{color-scheme:light}body{margin:0;background:#f3f8ff;color:#132f4b;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif}</style></head><body>" + pageMarkup + "</body></html>";
}
