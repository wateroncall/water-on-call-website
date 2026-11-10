const emailIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
const textIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>';
const contactLink = '<a class="woc-header-contact" data-public-contact href="mailto:info@wateroncall.ca" title="Email Water OnCall">' + emailIcon + '<span>Contact us</span></a><a class="woc-header-text" data-public-text href="sms:+12894028775" title="Text Water OnCall">' + textIcon + '<span>Text us</span></a>';

const headerStyles = `<style id="woc-public-header-styles">
[data-public-header]{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid #dfe7f1}
[data-public-header] .nav{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:1120px;width:100%;height:72px;margin:0 auto;padding:0 22px}
[data-public-header] .brand{color:#132f4b;font-size:23px;font-weight:800;letter-spacing:-.7px;white-space:nowrap;text-decoration:none}
[data-public-header] .brand b{color:#087cff}
[data-public-header] .links{display:flex;align-items:center;gap:14px}
[data-public-header] .woc-header-contact,[data-public-header] .woc-header-text{box-sizing:border-box;display:inline-flex!important;align-items:center;justify-content:center;gap:6px;min-height:44px;padding:10px 13px;border:1px solid #087cff;border-radius:9px;font-family:inherit;font-size:13px;font-weight:600;line-height:1.4;text-decoration:none;white-space:nowrap}
[data-public-header] .woc-header-contact{background:#087cff;color:#fff!important}
[data-public-header] .woc-header-text{background:#fff;color:#087cff!important}
[data-public-header] .woc-header-contact svg,[data-public-header] .woc-header-text svg{flex-shrink:0}
[data-public-header] .woc-header-contact:focus-visible,[data-public-header] .woc-header-text:focus-visible{outline:3px solid #ffb640;outline-offset:3px}
html #woc-hauler-complete-preview .woc-page{overflow:clip}
#woc-hauler-complete-preview header[data-public-header]{display:grid;grid-template-columns:minmax(0,1fr) auto auto auto;gap:10px}
#woc-hauler-complete-preview header[data-public-header]>.woc-brand{grid-column:1;grid-row:1;white-space:nowrap}
#woc-hauler-complete-preview header[data-public-header]>.woc-header-actions{grid-column:2;grid-row:1;margin:0}
#woc-hauler-complete-preview header[data-public-header]>.woc-header-contact{grid-column:3;grid-row:1}
#woc-hauler-complete-preview header[data-public-header]>.woc-header-text{grid-column:4;grid-row:1}
@media(max-width:720px){
 [data-public-header] .nav{gap:8px;padding:0 14px}
 [data-public-header] .brand{font-size:21px}
 [data-public-header] .links{gap:6px}
 [data-public-header] .links>a:not(.hauler-nav):not(.woc-header-contact):not(.woc-header-text){display:none}
 [data-public-header] .nav{height:auto;min-height:72px;flex-wrap:wrap;padding-top:10px;padding-bottom:10px}
 [data-public-header] .links{width:100%;flex-wrap:nowrap;justify-content:space-between}
 [data-public-header] .links .hauler-nav{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-height:44px;padding:10px;border-radius:9px;background:#e8f2ff;color:#0757a7;font-size:12px;font-weight:600;text-decoration:none;white-space:nowrap}
 [data-public-header] .links .woc-header-contact,[data-public-header] .links .woc-header-text{padding:10px;font-size:12px}
}
@media(max-width:600px){
 #woc-hauler-complete-preview header[data-public-header]{grid-template-columns:1fr 1fr;padding:12px 18px}
 #woc-hauler-complete-preview header[data-public-header]>.woc-brand{font-size:21px}
 #woc-hauler-complete-preview header[data-public-header]>.woc-brand{grid-column:1/-1}
 #woc-hauler-complete-preview header[data-public-header]>.woc-header-contact{grid-column:1;grid-row:3}
 #woc-hauler-complete-preview header[data-public-header]>.woc-header-text{grid-column:2;grid-row:3}
 #woc-hauler-complete-preview header[data-public-header]>.woc-header-actions{grid-column:1/-1;grid-row:2;justify-content:flex-end}
}
@media(max-width:360px){
 [data-public-header] .nav{gap:6px;padding:0 10px}
 [data-public-header] .brand{font-size:17px}
 [data-public-header] .links{gap:5px}
 [data-public-header] .links .hauler-nav,[data-public-header] .links .woc-header-contact,[data-public-header] .links .woc-header-text{padding:9px 7px;font-size:11px}
 #woc-hauler-complete-preview header[data-public-header]>.woc-brand{font-size:20px}
}
</style>`;

// Keep email and text support in the banner; ordering stays in the page content.
export function addContactHeader(html) {
  if (html.includes('data-public-text')) return html;
  const header = '<header data-public-header><div class="wrap nav"><a class="brand" href="/"><b>Water</b> OnCall</a><nav class="links" aria-label="Main navigation"><a class="hauler-nav" href="/haulers">Water Haulers</a>' + contactLink + '</nav></div></header>';

  if (html.includes('<header class="woc-header">')) {
    html = html.replace(/<header class="woc-header">[\s\S]*?<\/header>/, header);
  } else if (html.includes('<header>')) {
    html = html.replace('<header>', '<header data-public-header>');
    html = html.replace('</nav>', contactLink + '</nav>');
  } else {
    // Signup pages previously placed this same brand above their form.
    html = html.replace(/(<main class="wrap">\s*)<a class="brand" href="\/">\s*<b>Water<\/b> OnCall<\/a>/, '$1');
    html = html.replace(/<body([^>]*)>/, '<body$1>' + header);
  }

  return html.replace('</head>', headerStyles + '</head>');
}

