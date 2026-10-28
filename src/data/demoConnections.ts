// Sample bank (Plaid) and point-of-sale (Square) feeds for the demo's
// Connections page. They play the part of what a real connection imports in
// app.meksova.com: bank rows land in the Review screen first; Square sales
// import straight in as income. Merchant names are fictional.
//
// `amount` follows Plaid's sign convention, as the app's review screen does:
// negative = money in, positive = money out. `purpose` is a category from the
// industry's own list, used as the starting guess the visitor can change.

export interface FeedRow {
  key: string;
  name: string;
  daysAgo: number;
  amount: number;
  purpose: string;
}

type Feeds = { bank: FeedRow[]; square: FeedRow[]; squareMore: FeedRow[] };

const square = (slug: string, purpose: string, amounts: number[], more: number[]): Pick<Feeds, 'square' | 'squareMore'> => ({
  square: amounts.map((amount, i) => ({ key: `${slug}-sq-${i}`, name: 'Card sale', daysAgo: i, amount: -amount, purpose })),
  squareMore: more.map((amount, i) => ({ key: `${slug}-sq-more-${i}`, name: 'Card sale', daysAgo: 0, amount: -amount, purpose })),
});

const FEEDS: Record<string, Feeds> = {
  truck: {
    bank: [
      { key: 'truck-b0', name: 'MIDWEST FREIGHT BROKERS ACH', daysAgo: 1, amount: -2450, purpose: 'Freight Income' },
      { key: 'truck-b1', name: 'INTERSTATE FUEL STOP #412', daysAgo: 2, amount: 412.6, purpose: 'Fuel Expense' },
      { key: 'truck-b2', name: 'CROSSROADS TRUCK SERVICE', daysAgo: 4, amount: 264, purpose: 'Truck Repairs and Maintenance' },
      { key: 'truck-b3', name: 'TURNPIKE E-TOLL', daysAgo: 5, amount: 38.4, purpose: 'Toll Charges' },
    ],
    ...square('truck', 'Freight Income', [620, 480], [350]),
  },
  rideshare: {
    bank: [
      { key: 'rs-b0', name: 'RIDESHARE WEEKLY PAYOUT', daysAgo: 1, amount: -864.2, purpose: 'Fare from Passengers' },
      { key: 'rs-b1', name: 'QUICKFILL GAS #88', daysAgo: 2, amount: 52.3, purpose: 'Fuel' },
      { key: 'rs-b2', name: 'SPARKLE CAR WASH', daysAgo: 3, amount: 18, purpose: 'Vehicle Maintenance & Repairs' },
      { key: 'rs-b3', name: 'DRIVER BONUS PAYOUT', daysAgo: 4, amount: -120, purpose: 'Bonuses and Incentives' },
    ],
    ...square('rs', 'Fare from Passengers', [45, 38], [27]),
  },
  households: {
    bank: [
      { key: 'hh-b0', name: 'EMPLOYER PAYROLL DIRECT DEP', daysAgo: 2, amount: -1700, purpose: 'Salary/Wages' },
      { key: 'hh-b1', name: 'FRESHMART GROCERY', daysAgo: 3, amount: 96.4, purpose: 'Food & Groceries' },
      { key: 'hh-b2', name: 'CITY TRANSIT PASS', daysAgo: 5, amount: 62, purpose: 'Transportation' },
      { key: 'hh-b3', name: 'MAPLE APARTMENTS RENT', daysAgo: 6, amount: 1450, purpose: 'Housing' },
    ],
    ...square('hh', 'Self-Employment/Side Hustles', [80, 45], [60]),
  },
  groceries: {
    bank: [
      { key: 'gr-b0', name: 'GREENVALLEY PRODUCE WHOLESALE', daysAgo: 1, amount: 740, purpose: 'Cost of Goods Sold (COGS)' },
      { key: 'gr-b1', name: 'CITY POWER & LIGHT', daysAgo: 3, amount: 212.5, purpose: 'Utilities' },
      { key: 'gr-b2', name: 'DELIVERY APP PAYOUT', daysAgo: 4, amount: -184, purpose: 'Delivery Fees' },
      { key: 'gr-b3', name: 'PAYROLL - STORE STAFF', daysAgo: 6, amount: 960, purpose: 'Labor Costs' },
    ],
    ...square('gr', 'Gross Sales', [1240, 980, 1105], [860]),
  },
  cafe: {
    bank: [
      { key: 'cf-b0', name: 'HARBOR FOOD SUPPLY', daysAgo: 1, amount: 486, purpose: 'Food Costs' },
      { key: 'cf-b1', name: 'BEANCRAFT COFFEE ROASTERS', daysAgo: 3, amount: 214, purpose: 'Food Costs' },
      { key: 'cf-b2', name: 'PAYROLL - KITCHEN', daysAgo: 4, amount: 1180, purpose: 'Labor Costs' },
      { key: 'cf-b3', name: 'MAIN ST PROPERTIES RENT', daysAgo: 6, amount: 1600, purpose: 'Rent or Lease' },
    ],
    ...square('cf', 'Food Sales', [865, 742, 918], [640]),
  },
  cleaning: {
    bank: [
      { key: 'cl-b0', name: 'BRIGHTOFFICE LLC ACH', daysAgo: 1, amount: -1200, purpose: 'Recurring Residential Cleaning Contracts' },
      { key: 'cl-b1', name: 'PRO CLEAN SUPPLY CO', daysAgo: 2, amount: 138.9, purpose: 'Cleaning Supplies (disinfectants, mops, vacuums)' },
      { key: 'cl-b2', name: 'HOSTSTAY TURNOVER PAYOUT', daysAgo: 4, amount: -450, purpose: 'Airbnb Turnover Services' },
      { key: 'cl-b3', name: 'QUICKFILL GAS #88', daysAgo: 5, amount: 44.2, purpose: 'Fuel and Transportation' },
    ],
    ...square('cl', 'Recurring Residential Cleaning Contracts', [150, 220], [180]),
  },
  beauty: {
    bank: [
      { key: 'bt-b0', name: 'SALON PRO DISTRIBUTORS', daysAgo: 2, amount: 268, purpose: 'Hair & Beauty Products' },
      { key: 'bt-b1', name: 'SUITE 12 BOOTH RENT', daysAgo: 3, amount: 600, purpose: 'Rent and Utilities' },
      { key: 'bt-b2', name: 'CITY POWER & LIGHT', daysAgo: 5, amount: 84.6, purpose: 'Rent and Utilities' },
      { key: 'bt-b3', name: 'BOOKING APP PAYOUT', daysAgo: 6, amount: -540, purpose: 'Haircuts and Hairstyling' },
    ],
    ...square('bt', 'Haircuts and Hairstyling', [185, 240, 130], [95]),
  },
  ecommerce: {
    bank: [
      { key: 'ec-b0', name: 'STOREFRONT PAYOUT', daysAgo: 1, amount: -1384.5, purpose: 'Online Product Sales' },
      { key: 'ec-b1', name: 'BRIGHTPACK SHIPPING SUPPLY', daysAgo: 2, amount: 96.8, purpose: 'Packaging and Shipping Materials' },
      { key: 'ec-b2', name: 'SOCIAL ADS BILLING', daysAgo: 4, amount: 210, purpose: 'Online Advertising (Meta, Google, SEO)' },
      { key: 'ec-b3', name: 'MARKETPLACE SELLER FEES', daysAgo: 5, amount: 142.3, purpose: 'Platform Fees (Shopify, Amazon seller fees)' },
    ],
    ...square('ec', 'Online Product Sales', [64, 120, 88], [72]),
  },
  construction: {
    bank: [
      { key: 'cn-b0', name: 'HOMEOWNER DEPOSIT - REMODEL', daysAgo: 1, amount: -3200, purpose: 'Home Remodeling and Renovation Contracts' },
      { key: 'cn-b1', name: 'BUILDERS SUPPLY DEPOT', daysAgo: 2, amount: 684.2, purpose: 'Construction Materials (pipes, wiring, paint)' },
      { key: 'cn-b2', name: 'QUICKFILL GAS #88', daysAgo: 3, amount: 71.5, purpose: 'Vehicle Fuel and Maintenance' },
      { key: 'cn-b3', name: 'ACE ELECTRIC SUBCONTRACT', daysAgo: 5, amount: 900, purpose: 'Subcontractor Wages' },
    ],
    ...square('cn', 'Repair and Installation Jobs', [450, 380], [260]),
  },
  'content-creator': {
    bank: [
      { key: 'cc-b0', name: 'VIDEO PLATFORM AD REVENUE', daysAgo: 2, amount: -812.4, purpose: 'Ad revenue (YouTube, Facebook, etc.)' },
      { key: 'cc-b1', name: 'BRANDCO SPONSORSHIP', daysAgo: 3, amount: -1500, purpose: 'Sponsorship deals' },
      { key: 'cc-b2', name: 'CUTPRO EDITING SUITE', daysAgo: 4, amount: 29.99, purpose: 'Software subscriptions (editing tools, cloud storage)' },
      { key: 'cc-b3', name: 'FREELANCE EDITOR PAYMENT', daysAgo: 6, amount: 300, purpose: 'Contractors or freelancers (editors, thumbnail designers)' },
    ],
    ...square('cc', 'Sponsorship deals', [120, 85], [60]),
  },
  other: {
    bank: [
      { key: 'ot-b0', name: 'CLIENT PAYMENT ACH', daysAgo: 1, amount: -1250, purpose: 'Services' },
      { key: 'ot-b1', name: 'OFFICE DEPOT SUPPLIES', daysAgo: 2, amount: 88.4, purpose: 'Supplies' },
      { key: 'ot-b2', name: 'CITY POWER & LIGHT', daysAgo: 4, amount: 132, purpose: 'Utilities' },
      { key: 'ot-b3', name: 'SUITE 5 RENT', daysAgo: 6, amount: 1100, purpose: 'Rent' },
    ],
    ...square('ot', 'Sales', [210, 165, 98], [140]),
  },
};

export const getConnectionFeeds = (slug: string): Feeds => FEEDS[slug] ?? FEEDS.other;

export const feedDateKey = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const feedIsoDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(12, 0, 0, 0);
  return d.toISOString();
};
