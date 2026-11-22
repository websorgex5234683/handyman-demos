// =====================================================
//  HANDYMAN SITE CONFIG — edit ONLY this file per client
//  Rule: never invent data. Leave "" or [] if unknown.
//  Empty fields/sections are hidden automatically.
// =====================================================
// SOURCE: Google Maps listing (name, phone, area, reviews link), 22.11.2026. Everything else empty.
window.SITE = {
  // true = show grey [placeholders] for empty fields (for preview/editing)
  // false = hide everything that is empty (for live site)
  showPlaceholders: false,

  // true = yellow 'Demo preview' bar on top. Set false when client approves.
  demo: true,

  business: {
    name: "Hyde Park Home Pros",            // "Mike's Handyman Services"
    ownerName: "",       // "Mike Johnson"
    tagline: "",         // short line, e.g. "Small repairs done right"
    city: "Tampa Bay area",            // "Austin"
    state: "FL",           // "TX"
    phone: "+18139042134",           // "+15125551234" (digits, with country code)
    phoneDisplay: "(813) 904-2134",    // "(512) 555-1234"
    email: "",
    address: "",         // street address, only if public
    hours: "",           // "Mon–Sat 8am–6pm"
    yearsInBusiness: "", // only if real
    licensed: false,     // set true ONLY if verified
    insured: false,
    freeQuotes: false,  // true ONLY if confirmed (shows 'Free quotes')      // set true ONLY if verified
    licenseNumber: "",
    logo: ""             // path to image, e.g. "img/logo.png"
  },

  // Where quote requests go (decide with each client)
  leads: {
    formEndpoint: "",    // e.g. Formspree URL — sends silently, best option
    email: "",           // fallback: opens email app
    sms: ""              // fallback: opens SMS app, e.g. "+15125551234"
  },

  // { name: "TV Mounting", icon: "📺", desc: "", priceFrom: "" }
  services: [],

  // ["Austin", "Round Rock"] or ZIP codes
  serviceArea: [],

  // { before: "img/1-before.jpg", after: "img/1-after.jpg", caption: "" }
  gallery: [],

  // REAL reviews only: { name: "", text: "", stars: 5, source: "Google" }
  reviews: [],
  reviewsLink: "https://www.google.com/maps/place/Hyde+Park+Home+Pros/data=!4m7!3m6!1s0x85c238aa5b0a8f9b:0x478d079c122e6bfb!8m2!3d27.9345036!4d-82.4802732!16s%2Fg%2F11qg46lvz5!19sChIJm48KW6o4woUR-2suEpwHjUc",       // link to Google/Yelp reviews page

  // { q: "", a: "" }
  faq: [],

  payments: [],          // ["Cash", "Zelle", "Card"]

  social: { google: "https://www.google.com/maps/place/Hyde+Park+Home+Pros/data=!4m7!3m6!1s0x85c238aa5b0a8f9b:0x478d079c122e6bfb!8m2!3d27.9345036!4d-82.4802732!16s%2Fg%2F11qg46lvz5!19sChIJm48KW6o4woUR-2suEpwHjUc", facebook: "", instagram: "", yelp: "", nextdoor: "" }
};
