const ORIGIN = 'https://www.wateroncall.ca';

export const searchPages = {
  '/': ['Bulk Water Delivery in Niagara | Water OnCall', 'Preparing an easier way to book cistern, pool and hot tub water delivery in Niagara. Check your address and join the free Water OnCall launch list.'],
  '/cisterns': ['Cistern Water Delivery in Niagara | Water OnCall', 'Plan cistern water delivery in Niagara with approved local haulers. Check coverage, understand delivery amounts and get notified when ordering opens.'],
  '/pools': ['Pool Water Delivery in Niagara | Water OnCall', 'Plan a pool fill or top-up in Niagara. Estimate imperial gallons, understand multiple loads and check your address before Water OnCall launches.'],
  '/service-area': ['Niagara Water Delivery Coverage | Water OnCall', 'Check the planned Niagara launch area for cistern and pool water delivery. Availability and pricing depend on your address and approved hauler coverage.'],
  '/faq': ['Bulk Water Delivery Questions | Water OnCall Niagara', 'Answers about cistern and pool delivery, imperial gallons, preferred haulers, pricing and the upcoming Water OnCall launch in Niagara.'],
  '/haulers': ['Join the Niagara Water Hauler Network | Water OnCall', 'Apply to join the Water OnCall bulk water hauler network. Set your coverage and pricing, accept requests and manage delivery work in Niagara.'],
  '/check-availability': ['Check Water Delivery Coverage & Pricing | Water OnCall', 'Check your Niagara delivery address for preliminary bulk water coverage and pricing. Checking does not place an order or take a payment.'],
  '/join': ['Join the Niagara Water Delivery Launch List | Water OnCall', 'Get an email when Water OnCall customer ordering opens in your area. Join the free Niagara launch list for cistern, pool and hot tub water delivery.']
};

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));

export function searchRoute(path) {
  if (path === '/robots.txt') return new Response('User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+ORIGIN+'/sitemap.xml\n', {headers:{'content-type':'text/plain; charset=utf-8', 'cache-control':'public, max-age=3600'}});
  if (path === '/sitemap.xml') {
    const urls = Object.keys(searchPages).map(route => '<url><loc>'+ORIGIN+route+'</loc></url>').join('');
    return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls+'</urlset>', {headers:{'content-type':'application/xml; charset=utf-8', 'cache-control':'public, max-age=3600'}});
  }
  return null;
}

export function enhanceSearchMarkup(html, path) {
  const page = searchPages[path];
  if (!page) return path.startsWith('/demo/') ? html.replace('</head>', '<meta name="robots" content="noindex, follow"></head>') : html;
  const [title, description] = page;
  html = html.replace(/<title>[^<]*<\/title>/, '<title>'+escapeHtml(title)+'</title>');
  html = html.replace(/<meta name="description" content="[^"]*">/, '');
  const schema = {'@context':'https://schema.org', '@type':'Organization', name:'Water OnCall', url:ORIGIN, email:'info@wateroncall.ca', description:'A booking platform connecting customers with approved bulk water haulers. Preparing to launch in Niagara, Ontario.'};
  const metadata = '<meta name="description" content="'+escapeHtml(description)+'">'
    +'<link rel="canonical" href="'+ORIGIN+path+'">'
    +'<meta property="og:type" content="website"><meta property="og:site_name" content="Water OnCall">'
    +'<meta property="og:title" content="'+escapeHtml(title)+'"><meta property="og:description" content="'+escapeHtml(description)+'">'
    +'<meta property="og:url" content="'+ORIGIN+path+'">'
    +'<script type="application/ld+json">'+JSON.stringify(schema).replace(/</g, '\\u003c')+'</script>';
  return html.replace('</head>', metadata+'</head>');
}

// Only campaign labels from our prepared links are accepted. Never send form
// values, addresses, arbitrary URL parameters or search queries to Analytics.
export function analyticsConfig(location, referrer = '') {
  const result = {page_location:location.origin+location.pathname, page_referrer:referrer ? referrer.split(/[?#]/)[0] : '', allow_google_signals:false, allow_ad_personalization_signals:false};
  const campaigns = {
    utm_source:['google','partner','makbs','station','facebook','instagram'],
    utm_medium:['cpc','referral','offline','social','email'],
    utm_campaign:['niagara_launch','niagara_cistern_launch'],
    utm_content:['cistern_ad','bulk_water_ad','partner_card','station_card','customer_referral','social_post']
  };
  const params = new URLSearchParams(location.search || '');
  const names = {utm_source:'campaign_source',utm_medium:'campaign_medium',utm_campaign:'campaign_name',utm_content:'campaign_content'};
  for (const [parameter, allowed] of Object.entries(campaigns)) {
    const value = params.get(parameter);
    if (allowed.includes(value)) result[names[parameter]] = value;
  }
  return result;
}

export const googleAnalyticsTag = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-V0DES2LJNP"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-V0DES2LJNP', (${analyticsConfig.toString()})(window.location, document.referrer));
document.addEventListener('click', function(event) {
 const link = event.target.closest && event.target.closest('a[data-lead-cta]');
 if (!link) return;
 const destination = link.getAttribute('data-lead-cta');
 if (['coverage','launch_list','cisterns','service_area'].includes(destination)) gtag('event', 'lead_cta_click', {destination:destination});
});
</script>`;

export function serviceAreaContent() {
  return `<main class="wrap content"><span class="pill">Preparing our Niagara launch</span><h1>Water delivery coverage starts with your address.</h1><p>Water OnCall is preparing to connect Niagara customers with approved bulk water haulers for cistern deliveries, pool fills and hot tub top-ups.</p><div class="actions lead-actions"><a class="btn" data-lead-cta="coverage" href="/check-availability">Check coverage &amp; pricing</a><a class="btn alt" data-lead-cta="launch_list" href="/join">Get launch updates</a></div><section class="card lead-section"><h2>Planning for Niagara communities</h2><p>Our launch planning includes Lincoln and Beamsville, West Lincoln and Smithville, Pelham and Fonthill, Wainfleet, Port Colborne and surrounding Niagara communities.</p><p>Coverage is based on the driving distance from an approved filling station, the hauler's service area, truck capacity and the type of delivery. A community name alone does not confirm service at a property.</p><a href="/check-availability" data-lead-cta="coverage">Check your delivery address</a></section><section class="grid lead-section"><article class="card"><h2>Cistern water</h2><p>Prepare the amount you need in imperial gallons, the distance from the truck to your fill point and any access instructions.</p><a href="/cisterns" data-lead-cta="cisterns">Plan a cistern delivery</a></article><article class="card"><h2>Pool fills and top-ups</h2><p>Estimate the water needed and allow for multiple loads. Your hauler confirms the delivery plan before you approve a pool quote.</p><a href="/pools">Plan pool water delivery</a></article></section><section class="card"><h2>What happens after checking?</h2><p>The coverage tool gives a preliminary result. It does not reserve a truck, place an order or take a payment. Join the free launch list and we will email you when customer ordering opens in your area.</p><a class="btn" href="/join" data-lead-cta="launch_list">Join the Niagara launch list</a></section></main>`;
}
