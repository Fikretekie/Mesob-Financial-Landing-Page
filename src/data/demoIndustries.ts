import type { Transaction } from '@/types';

// One entry per industry demo. Each gets its own URL (/demo/<slug>/) so ads
// can link straight to it. `localeId` matches the ids in the `businessTypes`
// array of the locale files; `businessType` matches the keys in
// utils/businessTypes.js that drive the Add Transaction categories.

type SampleSeed = {
  daysAgo: number;
  kind: 'income' | 'expense';
  purpose: string;
  amount: number;
};

export interface DemoIndustry {
  slug: string;
  localeId: string;
  businessType: string;
  samples: SampleSeed[];
}

export const DEMO_INDUSTRIES: DemoIndustry[] = [
  {
    slug: 'truck',
    localeId: 'truck',
    businessType: 'Trucking',
    samples: [
      { daysAgo: 24, kind: 'income', purpose: 'Freight Income', amount: 4850 },
      { daysAgo: 20, kind: 'expense', purpose: 'Fuel Expense', amount: 1120 },
      { daysAgo: 13, kind: 'income', purpose: 'Fuel Surcharge Revenue', amount: 640 },
      { daysAgo: 8, kind: 'expense', purpose: 'Truck Repairs and Maintenance', amount: 780 },
      { daysAgo: 3, kind: 'expense', purpose: 'Toll Charges', amount: 96 },
    ],
  },
  {
    slug: 'rideshare',
    localeId: 'rideshare',
    businessType: 'RideShare Drivers/Partners',
    samples: [
      { daysAgo: 22, kind: 'income', purpose: 'Fare from Passengers', amount: 1260 },
      { daysAgo: 18, kind: 'expense', purpose: 'Fuel', amount: 215 },
      { daysAgo: 12, kind: 'income', purpose: 'Bonuses and Incentives', amount: 180 },
      { daysAgo: 7, kind: 'expense', purpose: 'Rideshare Fees', amount: 310 },
      { daysAgo: 2, kind: 'expense', purpose: 'Vehicle Maintenance & Repairs', amount: 140 },
    ],
  },
  {
    slug: 'households',
    localeId: 'households',
    businessType: 'Individual/Households',
    samples: [
      { daysAgo: 25, kind: 'income', purpose: 'Salary/Wages', amount: 3400 },
      { daysAgo: 23, kind: 'expense', purpose: 'Housing', amount: 1450 },
      { daysAgo: 16, kind: 'expense', purpose: 'Food & Groceries', amount: 385 },
      { daysAgo: 10, kind: 'income', purpose: 'Self-Employment/Side Hustles', amount: 420 },
      { daysAgo: 4, kind: 'expense', purpose: 'Transportation', amount: 160 },
    ],
  },
  {
    slug: 'groceries',
    localeId: 'groceries',
    businessType: 'Groceries',
    samples: [
      { daysAgo: 21, kind: 'income', purpose: 'Gross Sales', amount: 6200 },
      { daysAgo: 19, kind: 'expense', purpose: 'Cost of Goods Sold (COGS)', amount: 3100 },
      { daysAgo: 14, kind: 'expense', purpose: 'Labor Costs', amount: 1400 },
      { daysAgo: 9, kind: 'income', purpose: 'Delivery Fees', amount: 350 },
      { daysAgo: 3, kind: 'expense', purpose: 'Utilities', amount: 410 },
    ],
  },
  {
    slug: 'cafe',
    localeId: 'cafe',
    businessType: 'Cafe / Restaurants',
    samples: [
      { daysAgo: 20, kind: 'income', purpose: 'Food Sales', amount: 5300 },
      { daysAgo: 17, kind: 'expense', purpose: 'Food Costs', amount: 1850 },
      { daysAgo: 12, kind: 'income', purpose: 'Beverage Sales', amount: 1900 },
      { daysAgo: 8, kind: 'expense', purpose: 'Labor Costs', amount: 2100 },
      { daysAgo: 2, kind: 'expense', purpose: 'Rent or Lease', amount: 1600 },
    ],
  },
  {
    slug: 'cleaning',
    localeId: 'cleaning',
    businessType: 'Cleaning Services',
    samples: [
      { daysAgo: 23, kind: 'income', purpose: 'Recurring Residential Cleaning Contracts', amount: 2400 },
      { daysAgo: 18, kind: 'expense', purpose: 'Cleaning Supplies (disinfectants, mops, vacuums)', amount: 260 },
      { daysAgo: 11, kind: 'income', purpose: 'Airbnb Turnover Services', amount: 900 },
      { daysAgo: 6, kind: 'expense', purpose: 'Employee Wages', amount: 1300 },
      { daysAgo: 2, kind: 'expense', purpose: 'Fuel and Transportation', amount: 140 },
    ],
  },
  {
    slug: 'beauty',
    localeId: 'beauty',
    businessType: 'Beauty & Grooming',
    samples: [
      { daysAgo: 22, kind: 'income', purpose: 'Haircuts and Hairstyling', amount: 2800 },
      { daysAgo: 19, kind: 'expense', purpose: 'Hair & Beauty Products', amount: 420 },
      { daysAgo: 13, kind: 'income', purpose: 'Hair Coloring and Treatments', amount: 1150 },
      { daysAgo: 7, kind: 'expense', purpose: 'Rent and Utilities', amount: 1200 },
      { daysAgo: 3, kind: 'income', purpose: 'Product Retail (shampoos, conditioners, gels)', amount: 260 },
    ],
  },
  {
    slug: 'ecommerce',
    localeId: 'ecommerce',
    businessType: 'E-commerce Sellers',
    samples: [
      { daysAgo: 24, kind: 'income', purpose: 'Online Product Sales', amount: 3900 },
      { daysAgo: 21, kind: 'expense', purpose: 'Product Sourcing and Inventory', amount: 1600 },
      { daysAgo: 15, kind: 'expense', purpose: 'Platform Fees (Shopify, Amazon seller fees)', amount: 310 },
      { daysAgo: 9, kind: 'expense', purpose: 'Online Advertising (Meta, Google, SEO)', amount: 450 },
      { daysAgo: 4, kind: 'income', purpose: 'Bulk/Wholesale Orders', amount: 1250 },
    ],
  },
  {
    slug: 'construction',
    localeId: 'construction',
    businessType: 'Construction Trades',
    samples: [
      { daysAgo: 26, kind: 'income', purpose: 'Home Remodeling and Renovation Contracts', amount: 7800 },
      { daysAgo: 22, kind: 'expense', purpose: 'Construction Materials (pipes, wiring, paint)', amount: 2350 },
      { daysAgo: 15, kind: 'expense', purpose: 'Subcontractor Wages', amount: 1900 },
      { daysAgo: 9, kind: 'income', purpose: 'Repair and Installation Jobs', amount: 1350 },
      { daysAgo: 4, kind: 'expense', purpose: 'Vehicle Fuel and Maintenance', amount: 230 },
    ],
  },
  {
    slug: 'content-creator',
    localeId: 'contentCreator',
    businessType: 'Content Creator',
    samples: [
      { daysAgo: 23, kind: 'income', purpose: 'Ad revenue (YouTube, Facebook, etc.)', amount: 1450 },
      { daysAgo: 18, kind: 'income', purpose: 'Sponsorship deals', amount: 2000 },
      { daysAgo: 13, kind: 'expense', purpose: 'Equipment purchases or rentals (cameras, mics, lights)', amount: 890 },
      { daysAgo: 7, kind: 'expense', purpose: 'Contractors or freelancers (editors, thumbnail designers)', amount: 600 },
      { daysAgo: 3, kind: 'expense', purpose: 'Software subscriptions (editing tools, cloud storage)', amount: 75 },
    ],
  },
  {
    slug: 'other',
    localeId: 'other',
    businessType: 'Other',
    samples: [
      { daysAgo: 21, kind: 'income', purpose: 'Sales', amount: 3200 },
      { daysAgo: 16, kind: 'expense', purpose: 'Supplies', amount: 540 },
      { daysAgo: 10, kind: 'expense', purpose: 'Rent', amount: 1100 },
      { daysAgo: 4, kind: 'income', purpose: 'Services', amount: 850 },
    ],
  },
];

export const getDemoIndustry = (slug: string) =>
  DEMO_INDUSTRIES.find((industry) => industry.slug === slug);

// Builds the sample transactions in the same shape the Add Transaction dialog
// produces, dated relative to today so the charts always look current.
export function buildSampleTransactions(industry: DemoIndustry): Transaction[] {
  const now = Date.now();
  return [...industry.samples]
    .sort((a, b) => b.daysAgo - a.daysAgo)
    .map((seed, index) => {
      const isIncome = seed.kind === 'income';
      return {
        id: index + 1,
        srNo: index + 1,
        date: new Date(now - seed.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        description: `${isIncome ? 'Receive' : 'Paid'} [Cash] ${seed.purpose}`,
        debit: isIncome ? 0 : seed.amount,
        credit: isIncome ? seed.amount : 0,
        type: isIncome ? 'income' : 'expense',
        category: seed.purpose,
        sample: true,
      };
    });
}
