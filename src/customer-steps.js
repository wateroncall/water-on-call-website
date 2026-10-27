// Customer homepage section approved in the customer demo preview.
// All sample actions remain in the browser and never create orders or payments.
export function customerSteps() {
  return `<style>
  #woc-step-demos { color-scheme: light; }
  #woc-step-demos .woc-section {
    --woc-bg: #f2f7ff;
    --woc-fg: #132f4b;
    --woc-secondary: #5c7085;
    --woc-blue: #077bf9;
    --woc-soft: #ffffff;
    --woc-divider: #e2e9f3;
    --woc-on-blue: #ffffff;
    --woc-link: #0869d3;
    padding: 28px;
    border-radius: 22px;
    background: var(--woc-bg);
    border: 1px solid var(--woc-divider);
    color: var(--woc-fg);
    font: 400 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  #woc-step-demos .woc-section * { box-sizing: border-box; }
  #woc-step-demos .woc-brand { display: flex; align-items: center; gap: 7px; color: var(--woc-fg); font-size: 20px; font-weight: 500; letter-spacing: -.6px; }
  #woc-step-demos .woc-brand svg { width: 22px; height: 22px; }
  #woc-step-demos .woc-brand svg, #woc-step-demos .woc-word-water { color: var(--woc-blue); }
  #woc-step-demos h1 { margin: 19px 0 9px; color: var(--woc-fg); font-size: 29px; font-weight: 500; line-height: 1.18; letter-spacing: -.8px; }
  #woc-step-demos h1 span { color: var(--woc-blue); }
  #woc-step-demos .woc-subtitle { margin: 0 0 27px; color: var(--woc-secondary); font-size: 14px; }
  #woc-step-demos .woc-story { list-style: none; padding: 0; margin: 0; }
  #woc-step-demos .woc-step { position: relative; padding-bottom: 23px; }
  #woc-step-demos .woc-step:last-child { padding-bottom: 0; }
  #woc-step-demos .woc-step:not(:last-child)::before { content: ""; position: absolute; left: 23px; top: 54px; bottom: 5px; width: 1px; background: var(--woc-divider); }
  #woc-step-demos summary { display: grid; grid-template-columns: 48px minmax(0, 1fr) 18px; align-items: start; gap: 18px; list-style: none; }
  #woc-step-demos summary::-webkit-details-marker { display: none; }
  #woc-step-demos summary::marker { content: ""; }
  #woc-step-demos .woc-step-icon { display: grid; place-items: center; position: relative; width: 48px; height: 48px; border-radius: 50%; background: var(--woc-soft); color: var(--woc-blue); }
  #woc-step-demos .woc-step-icon > svg { width: 24px; height: 24px; }
  #woc-step-demos .woc-step-number { position: absolute; right: -3px; bottom: -3px; display: grid; place-items: center; width: 20px; height: 20px; background: var(--woc-bg); color: var(--woc-blue); border: 1px solid var(--woc-divider); border-radius: 50%; font-size: 11px; font-weight: 500; }
  #woc-step-demos .woc-step-heading { display: block; margin-bottom: 5px; color: var(--woc-fg); font-size: 18px; font-weight: 500; line-height: 1.35; letter-spacing: -.25px; }
  #woc-step-demos .woc-step-detail { display: block; color: var(--woc-secondary); font-size: 14px; }
  #woc-step-demos .woc-offer-labels { display: flex; flex-wrap: wrap; gap: 7px 16px; }
  #woc-step-demos .woc-offer-labels > span { display: inline-flex; align-items: center; gap: 5px; }
  #woc-step-demos .woc-offer-labels svg { width: 16px; height: 16px; color: var(--woc-blue); }
  #woc-step-demos .woc-demo-link { display: block; width: fit-content; margin-top: 7px; color: var(--woc-link); font-size: 12px; text-decoration: underline; text-underline-offset: 3px; }
  #woc-step-demos .woc-hide-label { display: none; }
  #woc-step-demos details[open] .woc-view-label { display: none; }
  #woc-step-demos details[open] .woc-hide-label { display: inline; }
  #woc-step-demos .woc-chevron { color: var(--woc-link); margin-top: 6px; }
  #woc-step-demos .woc-chevron svg { width: 18px; height: 18px; }
  #woc-step-demos details[open] .woc-chevron { transform: rotate(180deg); }
  #woc-step-demos .woc-step:last-child .woc-step-icon { background: var(--woc-blue); color: var(--woc-on-blue); }
  #woc-step-demos summary:focus-visible, #woc-step-demos button:focus-visible { outline: 3px solid var(--woc-link); outline-offset: 4px; }
  #woc-step-demos summary, #woc-step-demos button { cursor: pointer; }
  #woc-step-demos .woc-demo-screen { margin: 16px 0 0 66px; max-width: 430px; background: var(--woc-soft); border: 1px solid var(--woc-divider); border-radius: 15px; overflow: hidden; }
  #woc-step-demos .woc-demo-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--woc-divider); }
  #woc-step-demos .woc-demo-bar .woc-brand { font-size: 15px; letter-spacing: -.35px; }
  #woc-step-demos .woc-sample-label { color: var(--woc-secondary); font-size: 11px; white-space: nowrap; }
  #woc-step-demos .woc-demo-content { padding: 19px 18px; }
  #woc-step-demos h3 { color: var(--woc-fg); font-size: 20px; font-weight: 500; letter-spacing: -.4px; line-height: 1.3; margin: 0 0 16px; }
  #woc-step-demos .woc-fields { margin: 0; }
  #woc-step-demos .woc-field { padding: 9px 0; border-bottom: 1px solid var(--woc-divider); }
  #woc-step-demos .woc-field:first-child { padding-top: 0; }
  #woc-step-demos .woc-field dt { margin: 0 0 2px; color: var(--woc-secondary); font-size: 12px; }
  #woc-step-demos .woc-field dd { margin: 0; color: var(--woc-fg); font-size: 14px; }
  #woc-step-demos .woc-action { display: block; min-height: 44px; width: 100%; margin-top: 16px; padding: 11px 14px; border: 0; border-radius: 9px; background: var(--woc-blue); color: var(--woc-on-blue); font: inherit; font-size: 14px; font-weight: 500; }
  #woc-step-demos .woc-action-secondary { background: var(--woc-bg); color: var(--woc-link); }
  #woc-step-demos .woc-demo-note { color: var(--woc-secondary); font-size: 12px; margin: 12px 0 0; }
  #woc-step-demos .woc-offer-row { padding: 14px; background: var(--woc-bg); border-radius: 11px; margin-top: 12px; }
  #woc-step-demos .woc-offer-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 5px 15px; }
  #woc-step-demos .woc-offer-id { font-size: 14px; font-weight: 500; }
  #woc-step-demos .woc-offer-price { font-size: 21px; font-weight: 500; font-variant-numeric: tabular-nums; letter-spacing: -.5px; }
  #woc-step-demos .woc-offer-date { display: flex; align-items: center; gap: 6px; color: var(--woc-secondary); margin-top: 7px; font-size: 13px; }
  #woc-step-demos .woc-offer-date svg { width: 16px; height: 16px; color: var(--woc-blue); }
  #woc-step-demos .woc-offer-row .woc-action { margin-top: 12px; }
  #woc-step-demos .woc-total { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; margin-top: 15px; padding-top: 13px; font-weight: 500; border-top: 1px solid var(--woc-divider); }
  #woc-step-demos .woc-total-value { font-size: 20px; font-variant-numeric: tabular-nums; }
  #woc-step-demos .woc-status-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  #woc-step-demos .woc-status-heading > svg { width: 27px; height: 27px; color: var(--woc-blue); flex: none; }
  #woc-step-demos .woc-status-heading h3 { margin: 0; }
  #woc-step-demos .woc-confirmation p { margin: 0 0 15px; color: var(--woc-secondary); font-size: 13px; }
  #woc-step-demos .woc-delivery-stages { padding: 0; margin: 19px 0 0; list-style: none; display: grid; gap: 11px; }
  #woc-step-demos .woc-delivery-stages li { display: flex; align-items: center; gap: 8px; color: var(--woc-secondary); font-size: 13px; }
  #woc-step-demos .woc-delivery-stages svg { width: 17px; height: 17px; color: var(--woc-blue); }
  #woc-step-demos .woc-delivery-stages li:last-child { color: var(--woc-fg); font-weight: 500; }
  #woc-step-demos [hidden] { display: none !important; }
  @media (max-width: 460px) {
    #woc-step-demos .woc-section { padding: 22px 17px; border-radius: 18px; }
    #woc-step-demos h1 { font-size: 26px; margin-top: 18px; }
    #woc-step-demos summary { grid-template-columns: 40px minmax(0, 1fr) 16px; gap: 12px; }
    #woc-step-demos .woc-step-icon { width: 40px; height: 40px; }
    #woc-step-demos .woc-step-icon > svg { width: 21px; height: 21px; }
    #woc-step-demos .woc-step:not(:last-child)::before { left: 19px; top: 46px; }
    #woc-step-demos .woc-step-heading { font-size: 17px; }
    #woc-step-demos .woc-chevron svg { width: 16px; height: 16px; }
    #woc-step-demos .woc-demo-screen { margin-left: 0; position: relative; }
    #woc-step-demos .woc-demo-content { padding: 17px 15px; }
    #woc-step-demos .woc-demo-bar { padding: 12px 15px; gap: 8px; }
  }
</style>

<div id="woc-step-demos">
  <section class="woc-section" aria-labelledby="customer-title">
    <p class="customer-eyebrow">Launching soon in Niagara</p>
    <h1 id="customer-title">Order bulk water online.<br><span>Delivered by local haulers.</span></h1>
    <p class="woc-subtitle">For cisterns, pools, hot tubs and commercial use.</p>
    <div class="customer-actions"><a class="btn" data-lead-cta="coverage" href="/check-availability">Check your address</a><a class="btn alt" data-lead-cta="launch_list" href="/join">Launch updates</a></div>
    <p class="customer-launch-note" style="margin-bottom:27px">Join free. We’ll email you when ordering opens.</p>

    <ol class="woc-story">
      <li class="woc-step">
        <details name="woc-customer-demo" data-demo="order">
          <summary class="">
            <span class="woc-step-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg><span class="woc-step-number">1</span></span>
            <span>
              <span class="woc-step-heading" role="heading" aria-level="3">Order online</span>
              <span class="woc-step-detail">Tell us where, how much and when.</span>
              <span class="woc-demo-link"><span class="woc-view-label">View demo</span><span class="woc-hide-label">Hide demo</span></span>
            </span>
            <span class="woc-chevron"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="woc-demo-screen" aria-label="Sample online order screen">
            <div class="woc-demo-bar"><span class="woc-brand"><span><span class="woc-word-water">Water</span> OnCall</span></span><span class="woc-sample-label">Sample demo</span></div>
            <div class="woc-demo-content">
              <h3>Order bulk water</h3>
              <dl class="woc-fields">
                <div class="woc-field"><dt>Delivery type</dt><dd>Cistern</dd></div>
                <div class="woc-field"><dt>Water needed</dt><dd>2,000 Imp gal</dd></div>
                <div class="woc-field"><dt>Delivery address</dt><dd>123 Sample Lane, Niagara Region</dd></div>
                <div class="woc-field"><dt>When</dt><dd>Flexible · next 1–2 business days</dd></div>
                <div class="woc-field"><dt>Water hauler</dt><dd>Find an available hauler</dd></div>
              </dl>
              <button type="button" class="woc-action " data-open-demo="offers">See sample offers</button>
              <p class="woc-demo-note">Your card is charged when you accept an offer.</p>
            </div>
          </div>
        </details>
      </li>

      <li class="woc-step">
        <details name="woc-customer-demo" data-demo="offers">
          <summary class="">
            <span class="woc-step-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg><span class="woc-step-number">2</span></span>
            <span>
              <span class="woc-step-heading" role="heading" aria-level="3">Get water hauler offers</span>
              <span class="woc-step-detail woc-offer-labels"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>Price</span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>Available date</span></span>
              <span class="woc-demo-link"><span class="woc-view-label">View demo</span><span class="woc-hide-label">Hide demo</span></span>
            </span>
            <span class="woc-chevron"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="woc-demo-screen" aria-label="Sample water hauler offers screen">
            <div class="woc-demo-bar"><span class="woc-brand"><span><span class="woc-word-water">Water</span> OnCall</span></span><span class="woc-sample-label">Sample demo</span></div>
            <div class="woc-demo-content">
              <h3>Your delivery offers</h3>
              <p class="woc-demo-note">2,000 Imp gal · Sample totals in CAD</p>
              <div class="woc-offer-row">
                <div class="woc-offer-top"><span class="woc-offer-id">Offer A</span><span class="woc-offer-price">Price</span></div>
                <div class="woc-offer-date"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>Next business day</div>
                <button type="button" class="woc-action " data-review-offer="a">Review this offer</button>
              </div>
              <div class="woc-offer-row">
                <div class="woc-offer-top"><span class="woc-offer-id">Offer B</span><span class="woc-offer-price">Price</span></div>
                <div class="woc-offer-date"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>In 2 business days</div>
                <button type="button" class="woc-action woc-action-secondary " data-review-offer="b">Review this offer</button>
              </div>
              <p class="woc-demo-note">Choose an offer or wait for more.</p>
            </div>
          </div>
        </details>
      </li>

      <li class="woc-step">
        <details name="woc-customer-demo" data-demo="choose">
          <summary class="">
            <span class="woc-step-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg><span class="woc-step-number">3</span></span>
            <span>
              <span class="woc-step-heading" role="heading" aria-level="3">Choose an offer</span>
              <span class="woc-step-detail">Your card is charged when you accept an offer.</span>
              <span class="woc-demo-link"><span class="woc-view-label">View demo</span><span class="woc-hide-label">Hide demo</span></span>
            </span>
            <span class="woc-chevron"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="woc-demo-screen" aria-label="Sample offer review and confirmation screen">
            <div class="woc-demo-bar"><span class="woc-brand"><span><span class="woc-word-water">Water</span> OnCall</span></span><span class="woc-sample-label">Sample demo</span></div>
            <div class="woc-demo-content" aria-live="polite">
              <div data-choice-review>
                <h3>Review your offer</h3>
                <dl class="woc-fields">
                  <div class="woc-field"><dt>Selected offer</dt><dd data-choice-offer>Offer A</dd></div>
                  <div class="woc-field"><dt>Water needed</dt><dd>2,000 Imp gal</dd></div>
                  <div class="woc-field"><dt>Delivery date</dt><dd data-choice-date>Next business day</dd></div>
                  <div class="woc-field"><dt>Payment method</dt><dd>Sample card ···· 4242</dd></div>
                </dl>
                <div class="woc-total"><span>Total (CAD)</span><span class="woc-total-value" data-choice-total>Price</span></div>
                <button type="button" class="woc-action " data-accept-sample>Accept sample offer</button>
                <p class="woc-demo-note">Demo only · No payment is taken.</p>
              </div>
              <div class="woc-confirmation" data-choice-confirmed hidden>
                <div class="woc-status-heading"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg><h3>Delivery booked</h3></div>
                <p>Your sample offer has been accepted.</p>
                <dl class="woc-fields">
                  <div class="woc-field"><dt>Your water hauler</dt><dd data-choice-hauler>Sample Water Haulage</dd></div>
                  <div class="woc-field"><dt>Delivery date</dt><dd data-choice-date>Next business day</dd></div>
                  <div class="woc-field"><dt>Sample payment confirmed</dt><dd data-choice-total>Price</dd></div>
                </dl>
                <button type="button" class="woc-action " data-open-demo="delivery">View sample delivery</button>
              </div>
            </div>
          </div>
        </details>
      </li>

      <li class="woc-step">
        <details name="woc-customer-demo" data-demo="delivery">
          <summary class="">
            <span class="woc-step-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg><span class="woc-step-number">4</span></span>
            <span>
              <span class="woc-step-heading" role="heading" aria-level="3">Your water gets delivered.</span>
              <span class="woc-step-detail">A local water hauler delivers to your property.</span>
              <span class="woc-demo-link"><span class="woc-view-label">View demo</span><span class="woc-hide-label">Hide demo</span></span>
            </span>
            <span class="woc-chevron"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="woc-demo-screen" aria-label="Sample completed delivery and updates screen">
            <div class="woc-demo-bar"><span class="woc-brand"><span><span class="woc-word-water">Water</span> OnCall</span></span><span class="woc-sample-label">Sample demo</span></div>
            <div class="woc-demo-content">
              <div class="woc-status-heading"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg><h3>Water delivered</h3></div>
              <dl class="woc-fields">
                <div class="woc-field"><dt>Water delivered</dt><dd>2,000 Imp gal</dd></div>
                <div class="woc-field"><dt>Your water hauler</dt><dd data-choice-hauler>Sample Water Haulage</dd></div>
                <div class="woc-field"><dt>Delivery address</dt><dd>123 Sample Lane, Niagara Region</dd></div>
                <div class="woc-field"><dt>Sample total paid (CAD)</dt><dd data-choice-total>Price</dd></div>
              </dl>
              <ol class="woc-delivery-stages" aria-label="Sample delivery updates">
                <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>Delivery confirmed</li>
                <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>On the way</li>
                <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>Delivered</li>
              </ol>
            </div>
          </div>
        </details>
      </li>
    </ol>
  </section>
</div>

<script>
(() => {
  const root = document.getElementById('woc-step-demos');
  const demos = [...root.querySelectorAll('details[data-demo]')];
  const review = root.querySelector('[data-choice-review]');
  const confirmed = root.querySelector('[data-choice-confirmed]');
  const offers = {
    a: { label: 'Offer A', date: 'Next business day', total: 'Price', hauler: 'Sample Water Haulage' },
    b: { label: 'Offer B', date: 'In 2 business days', total: 'Price', hauler: 'Example Bulk Water' }
  };
  function openDemo(key) {
    const target = demos.find(demo => demo.dataset.demo === key);
    if (!target) return;
    demos.forEach(demo => { demo.open = demo === target; });
    target.querySelector('summary').focus({ preventScroll: true });
  }
  demos.forEach(demo => {
    demo.addEventListener('toggle', () => {
      if (demo.open) demos.forEach(other => { if (other !== demo) other.open = false; });
    });
  });
  root.querySelectorAll('[data-open-demo]').forEach(button => {
    button.addEventListener('click', () => openDemo(button.dataset.openDemo));
  });
  root.querySelectorAll('[data-review-offer]').forEach(button => {
    button.addEventListener('click', () => {
      const offer = offers[button.dataset.reviewOffer];
      root.querySelectorAll('[data-choice-offer]').forEach(node => { node.textContent = offer.label; });
      root.querySelectorAll('[data-choice-date]').forEach(node => { node.textContent = offer.date; });
      root.querySelectorAll('[data-choice-total]').forEach(node => { node.textContent = offer.total; });
      root.querySelectorAll('[data-choice-hauler]').forEach(node => { node.textContent = offer.hauler; });
      review.hidden = false;
      confirmed.hidden = true;
      openDemo('choose');
    });
  });
  root.querySelector('[data-accept-sample]').addEventListener('click', () => {
    review.hidden = true;
    confirmed.hidden = false;
    confirmed.querySelector('button').focus({ preventScroll: true });
  });
})();
</script>
`;
}
