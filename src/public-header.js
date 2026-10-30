const appLinks = '<a class="woc-app-link" href="https://app.wateroncall.ca/customer/orders/create">Order Water</a><a class="woc-app-link" href="https://app.wateroncall.ca/login">Log in</a>';

const contactLink = '<a class="woc-header-contact" data-public-contact href="mailto:info@wateroncall.ca">Contact us</a>' + appLinks;

const headerStyles = `<style id="woc-public-header-styles">
[data-public-header]{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid #dfe7f1}
[data-public-header] .nav{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:1120px;width:100%;height:72px;margin:0 auto;padding:0 22px}
[data-public-header] .brand{color:#132f4b;font-size:23px;font-weight:800;letter-spacing:-.7px;white-space:nowrap;text-decoration:none}
[data-public-header] .brand b{color:#087cff}
[data-public-header] .links{display:flex;align-items:center;gap:14px}
[data-public-header] .woc-header-contact{box-sizing:border-box;display:inline-flex!important;align-items:center;justify-content:center;min-height:44px;padding:10px 13px;border-radius:9px;background:#087cff;color:#fff!important;font-family:inherit;font-size:13px;font-weight:600;line-height:1.4;text-decoration:none;white-space:nowrap}
[data-public-header] .woc-header-contact:focus-visible{outline:3px solid #ffb640;outline-offset:3px}
html #woc-hauler-complete-preview .woc-page{overflow:clip}
#woc-hauler-complete-preview header[data-public-header]{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:10px}
#woc-hauler-complete-preview header[data-public-header]>.woc-brand{grid-column:1;grid-row:1;white-space:nowrap}
#woc-hauler-complete-preview header[data-public-header]>.woc-header-actions{grid-column:2;grid-row:1;margin:0}
#woc-hauler-complete-preview header[data-public-header]>.woc-header-contact{grid-column:3;grid-row:1}
@media(max-width:720px){
 [data-public-header] .nav{gap:8px;padding:0 14px}
 [data-public-header] .brand{font-size:21px}
 [data-public-header] .links{gap:6px}
 [data-public-header] .links>a:not(.hauler-nav):not(.woc-header-contact):not(.woc-app-link){display:none}
 [data-public-header] .nav{height:auto;min-height:72px;flex-wrap:wrap;padding-top:10px;padding-bottom:10px}
 [data-public-header] .links{flex-wrap:wrap}
 [data-public-header] .woc-app-link{display:inline-flex!important;align-items:center;min-height:44px;font-size:13px}
 [data-public-header] .links .hauler-nav{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-height:44px;padding:10px;border-radius:9px;background:#e8f2ff;color:#0757a7;font-size:12px;font-weight:600;text-decoration:none;white-space:nowrap}
 [data-public-header] .links .woc-header-contact{padding:10px;font-size:12px}
}
@media(max-width:600px){
 #woc-hauler-complete-preview header[data-public-header]{grid-template-columns:minmax(0,1fr) auto;padding:12px 18px}
 #woc-hauler-complete-preview header[data-public-header]>.woc-brand{font-size:21px}
 #woc-hauler-complete-preview header[data-public-header]>.woc-header-contact{grid-column:2;grid-row:1}
 #woc-hauler-complete-preview header[data-public-header]>.woc-header-actions{grid-column:1/-1;grid-row:2;justify-content:flex-end}
}
@media(max-width:360px){
 [data-public-header] .nav{gap:6px;padding:0 10px}
 [data-public-header] .brand{font-size:17px}
 [data-public-header] .links{gap:5px}
 [data-public-header] .links .hauler-nav,[data-public-header] .links .woc-header-contact{padding:9px 7px;font-size:11px}
 #woc-hauler-complete-preview header[data-public-header]>.woc-brand{font-size:20px}
}
[data-public-header] .woc-app-link{font-weight:700;text-decoration:none;white-space:nowrap}
</style>`;

// Public pages share one contact destination while keeping their existing actions.
export function addContactHeader(html) {
  if (html.includes('data-public-contact')) return html;

  if (html.includes('<header class="woc-header">')) {
    html = html.replace('<header class="woc-header">', '<header class="woc-header" data-public-header>');
    html = html.replace('<div class="woc-header-actions">', contactLink + '<div class="woc-header-actions">');
  } else if (html.includes('<header>')) {
    html = html.replace('<header>', '<header data-public-header>');
    html = html.replace('</nav>', contactLink + '</nav>');
  } else {
    const header = '<header data-public-header><div class="wrap nav"><a class="brand" href="/"><b>Water</b> OnCall</a><nav class="links" aria-label="Main navigation"><a class="hauler-nav" href="/haulers">Water Haulers</a>' + contactLink + '</nav></div></header>';
    // Signup pages previously placed this same brand above their form.
    html = html.replace(/(<main class="wrap">\s*)<a class="brand" href="\/">\s*<b>Water<\/b> OnCall<\/a>/, '$1');
    html = html.replace(/<body([^>]*)>/, '<body$1>' + header);
  }

  return html.replace('</head>', headerStyles + '</head>');
}
