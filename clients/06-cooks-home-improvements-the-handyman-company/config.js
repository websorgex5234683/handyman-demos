// =====================================================
//  HANDYMAN SITE CONFIG — edit ONLY this file per client
//  Rule: never invent data. Leave "" or [] if unknown.
//  Empty fields/sections are hidden automatically.
// =====================================================
// SOURCE: client list from Kirill (name, city/state, email). Everything else empty — not researched yet.
// SOURCE (2026-11-08): angi.com profile 'Cooks Home Improvements, LLC', Amelia OH — services, payments, free estimates, warranties.
// Phone NOT confirmed (BBB lists a 'The Handyman Company' in Amelia, but not proven same business) — ask client.
window.SITE = {
  // true = show grey [placeholders] for empty fields (for preview/editing)
  // false = hide everything that is empty (for live site)
  showPlaceholders: false,

  // true = yellow 'Demo preview' bar on top. Set false when client approves.
  demo: true,

  business: {
    name: "Cooks Home Improvements / The Handyman Company",            // "Mike's Handyman Services"
    ownerName: "",       // "Mike Johnson"
    tagline: "",         // short line, e.g. "Small repairs done right"
    city: "Amelia",            // "Austin"
    state: "OH",           // "TX"
    phone: "",           // "+15125551234" (digits, with country code)
    phoneDisplay: "",    // "(512) 555-1234"
    email: "cookshomeimprovementllc@gmail.com",
    address: "",         // street address, only if public
    hours: "",           // "Mon–Sat 8am–6pm"
    yearsInBusiness: "", // only if real
    licensed: false,     // set true ONLY if verified
    insured: false,
    freeQuotes: true,  // true ONLY if confirmed (shows 'Free quotes')      // set true ONLY if verified
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
    { name: "Plumbing", icon: "🚰", desc: "", priceFrom: "" },
    { name: "Basement Remodeling", icon: "🏠", desc: "", priceFrom: "" },
    { name: "Doors", icon: "🚪", desc: "", priceFrom: "" },
    { name: "Exterior Painting", icon: "🎨", desc: "", priceFrom: "" },
    { name: "Ceiling Fans", icon: "🌀", desc: "", priceFrom: "" },
    { name: "Window Treatments", icon: "🪟", desc: "", priceFrom: "" },
    { name: "Garage & Shed Building", icon: "🛠️", desc: "", priceFrom: "" }
  ],

  // ["Austin", "Round Rock"] or ZIP codes
  serviceArea: ["Amelia"],

  // { before: "img/1-before.jpg", after: "img/1-after.jpg", caption: "" }
  gallery: [],

  // REAL reviews only: { name: "", text: "", stars: 5, source: "Google" }
  reviews: [],
  reviewsLink: "",       // link to Google/Yelp reviews page

  // { q: "", a: "" }
  faq: [
    { q: "Do you give free estimates?", a: "Yes, estimates are free." },
    { q: "Do you offer a warranty?", a: "Yes, we offer warranties on our work." }
  ],

  payments: ["Check", "Credit Card", "PayPal", "Venmo", "Financing available"],          // ["Cash", "Zelle", "Card"]

  social: { google: "", facebook: "", instagram: "", yelp: "", nextdoor: "" }
};
