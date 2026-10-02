// Shared facts for the marketing site. Copy lives in src/i18n/site/<lng>.json;
// this file only holds what is the same in every language.

export const SITE_URL = "https://meksova.com";
export const APP_URL = "https://app.meksova.com";
export const LOGIN_URL = `${APP_URL}/login`;

export const CONTACT = {
  phone: "+1 (614) 966-5005",
  phoneHref: "tel:+16149665005",
  email: "info@meksova.com",
  address: "3130 Westerville Rd, Columbus, OH 43224",
  mapsHref: "https://www.google.com/maps?cid=14178045998735940585",
};

export const GOOGLE_REVIEWS = {
  rating: "4.8",
  count: 6,
  href: "https://www.google.com/maps?cid=14178045998735940585",
};

export const PRICES = {
  monthly: "$29.99",
  yearly: "$299.99",
  yearlyPerMonth: "$24.99",
};

export const SOCIALS = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61579534023491" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/mesobfinancial" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@mesob85" },
];

// One entry per trade. `slug` is the public page (/for/<slug>/), `demo` the
// ad demo (/demo/<demo>/), `id` the key under site.industries in the locales.
// `features` picks which feature cards the industry page shows, in order.
const DRIVING = ["mileage", "trips", "sync", "scan", "payables", "reports", "multi", "accountant"];
const STOCK = ["sync", "scan", "inventory", "payables", "reports", "documents", "multi", "accountant"];

export const INDUSTRIES = [
  { id: "truck", slug: "trucking", demo: "truck", icon: "truck", preview: "ifta",
    features: ["mileage", "fuel", "ifta", "scan", "sync", "payables", "multi", "accountant"] },
  { id: "rideshare", slug: "rideshare", demo: "rideshare", icon: "rideshare", preview: "miles",
    features: ["mileage", "trips", "sync", "fuel", "scan", "payables", "reports", "accountant"] },
  { id: "groceries", slug: "grocery-stores", demo: "groceries", icon: "groceries", preview: "books", features: STOCK },
  { id: "cafe", slug: "cafes-restaurants", demo: "cafe", icon: "cafe", preview: "books", features: STOCK },
  { id: "construction", slug: "construction", demo: "construction", icon: "construction", preview: "books", features: DRIVING },
  { id: "cleaning", slug: "cleaning", demo: "cleaning", icon: "cleaning", preview: "books", features: DRIVING },
  { id: "beauty", slug: "beauty-barbers", demo: "beauty", icon: "beauty", preview: "books", features: STOCK },
  { id: "ecommerce", slug: "ecommerce", demo: "ecommerce", icon: "ecommerce", preview: "books", features: STOCK },
  { id: "contentCreator", slug: "content-creators", demo: "content-creator", icon: "content-creator", preview: "books",
    features: ["sync", "scan", "payables", "reports", "documents", "multi", "accountant", "export"] },
  { id: "households", slug: "households", demo: "households", icon: "households", preview: "books",
    features: ["sync", "scan", "payables", "reports", "documents", "multi", "export", "accountant"] },
  { id: "other", slug: "small-business", demo: "other", icon: "other", preview: "books",
    features: ["sync", "scan", "payables", "inventory", "reports", "documents", "multi", "accountant"] },
];

export const getIndustry = (slug) => INDUSTRIES.find((industry) => industry.slug === slug);

// Sample IFTA quarter used by the trucking preview (matches the demo's trips).
export const IFTA_SAMPLE = [
  { state: "OH", miles: 358, gallons: 142.0 },
  { state: "IN", miles: 218, gallons: 216.8 },
  { state: "PA", miles: 115, gallons: 96.5 },
  { state: "IL", miles: 58, gallons: null },
  { state: "WV", miles: 26, gallons: null },
];

export const NAV = [
  { key: "industries", href: "/industries/" },
  { key: "features", href: "/#features" },
  { key: "pricing", href: "/pricing/" },
  { key: "blog", href: "/blog/" },
  { key: "about", href: "/about/" },
];
