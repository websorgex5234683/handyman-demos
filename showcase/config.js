// SHOWCASE — fictional example business for portfolio / social media. NOT a real company.
window.SITE = {
  showPlaceholders: false,
  demo: false,
  sample: true,
  heroImage: "photos/hero.jpg",
  business: {
    name: "Sunny Side Handyman",
    tagline: "Fast, friendly fixes for your home — done right the first time.",
    city: "Orlando", state: "FL",
    phone: "+14075550123", phoneDisplay: "(407) 555-0123",
    email: "hello@example.com",
    address: "",
    hours: "Mon–Sat 8am–6pm",
    yearsInBusiness: "12",
    licensed: true, insured: true, freeQuotes: true, licenseNumber: "",
    logo: ""
  },
  leads: { formEndpoint: "", email: "", sms: "" },
  services: [
    { name: "TV & Shelf Mounting", icon: "📺", desc: "Clean, level, wires hidden.", priceFrom: "$89" },
    { name: "Drywall Repair", icon: "🧱", desc: "Holes, cracks and water damage patched.", priceFrom: "$120" },
    { name: "Interior Painting", icon: "🎨", desc: "Rooms, trim and doors — neat lines.", priceFrom: "$250" },
    { name: "Fence & Gate Repair", icon: "🪵", desc: "Leaning posts, broken boards, sagging gates.", priceFrom: "$150" },
    { name: "Furniture Assembly", icon: "🪑", desc: "Beds, desks, shelves, outdoor sets.", priceFrom: "$65" },
    { name: "Faucets & Fixtures", icon: "🚰", desc: "Leaks, new faucets, toilet repairs.", priceFrom: "$95" }
  ],
  serviceArea: ["Orlando", "Winter Park", "Kissimmee", "Altamonte Springs", "Oviedo", "Lake Mary"],
  gallery: [
    { photo: "photos/g4.jpg", caption: "Window trim sealed & caulked" },
    { photo: "photos/g2.jpg", caption: "Backyard deck build" },
    { photo: "photos/g3.jpg", caption: "Drywall patch & plaster" },
    { photo: "photos/g1.jpg", caption: "Ceiling & walls repainted" },
    { photo: "photos/g5.jpg", caption: "Custom cuts for a shelving project" },
    { photo: "photos/g6.jpg", caption: "Accent wall in a fresh blue" }
  ],
  reviews: [
    { name: "Jessica M.", text: "Showed up on time, mounted our TV and hid every wire. Super clean work!", stars: 5, source: "" },
    { name: "Robert K.", text: "Fixed our fence in one afternoon. Fair price and great communication.", stars: 5, source: "" },
    { name: "Angela T.", text: "Patched and painted two walls — you can't even tell there was damage.", stars: 5, source: "" }
  ],
  reviewsLink: "",
  faq: [
    { q: "Do you give free estimates?", a: "Yes — send a photo or describe the job and you'll get a quote, free." },
    { q: "Are you licensed and insured?", a: "Yes, fully licensed and insured for your peace of mind." },
    { q: "Do you guarantee your work?", a: "Yes. If something isn't right, it gets fixed." }
  ],
  payments: ["Cash", "Card", "Zelle", "Venmo"],
  social: {}
};
