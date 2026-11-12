// =====================================================
//  HANDYMAN SITE CONFIG — edit ONLY this file per client
//  Rule: never invent data. Leave "" or [] if unknown.
//  Empty fields/sections are hidden automatically.
// =====================================================
// SOURCES (checked 2026-11-08): email — client list; address, hours — threebestrated.com;
// payments, specialty — homeguide.com. Years in business: sources disagree (2013 vs 21 yrs) → left empty.
// Phone, Facebook/Instagram links, photos, full services list — NOT FOUND, ask Roman.
window.SITE = {
  // true = show grey [placeholders] for empty fields (for preview/editing)
  // false = hide everything that is empty (for live site)
  showPlaceholders: false,

  // true = yellow 'Demo preview' bar on top. Set false when client approves.
  demo: true,

  business: {
    name: "Roman's Handyman", // "Mike's Handyman Services"
    ownerName: "",       // "Mike Johnson"
    tagline: "",         // short line, e.g. "Small repairs done right"
    city: "Huntington Beach",            // "Austin"
    state: "CA",           // "TX"
    phone: "",           // "+15125551234" (digits, with country code)
    phoneDisplay: "",    // "(512) 555-1234"
    email: "romanshandyman@gmail.com",
    address: "2320 Huntington St, Unit 3, Huntington Beach, CA 92648",         // street address, only if public
    hours: "Mon–Sat 9am–5pm, Sun closed",           // "Mon–Sat 8am–6pm"
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
  services: [
    { name: "Plumbing Relocation", icon: "🚰", desc: "", priceFrom: "" }
  ],

  // ["Austin", "Round Rock"] or ZIP codes
  serviceArea: ["Huntington Beach"],

  // { before: "img/1-before.jpg", after: "img/1-after.jpg", caption: "" }
  gallery: [],

  // REAL reviews only: { name: "", text: "", stars: 5, source: "Google" }
  reviews: [],
  reviewsLink: "https://www.homeadvisor.com/rated.RomansHandyman.43844837.html",       // link to Google/Yelp reviews page

  // { q: "", a: "" }
  faq: [],

  payments: ["Cash", "Check", "Venmo", "Apple Pay"],          // ["Cash", "Zelle", "Card"]

  social: { google: "", facebook: "", instagram: "", yelp: "", nextdoor: "" }
};
