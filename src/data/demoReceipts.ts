// Sample receipts for the demo's "Scan Receipt" (the app OCRs a real photo;
// the demo has no server, so visitors scan one of these). Vendor names are
// fictional. Each receipt carries what the scan "reads" and where the app
// would route it: operating expense, goods for resale (COGS), inventory, or a
// fixed asset — and, for fuel, the state + gallons that feed IFTA.

export type ScanDestination = 'expense' | 'cogs' | 'inventory' | 'fixed';

export interface DemoReceipt {
  id: string;
  vendor: string;
  address: string;
  state?: string;
  gallons?: number;
  lines: { desc: string; amount: number }[];
  tax?: number;
  category: string;
  destination: ScanDestination;
  itemName?: string;
}

export const receiptTotal = (r: DemoReceipt) =>
  Number((r.lines.reduce((sum, l) => sum + l.amount, 0) + (r.tax ?? 0)).toFixed(2));

const RECEIPTS: Record<string, DemoReceipt[]> = {
  truck: [
    {
      id: 'truck-fuel', vendor: 'Interstate Fuel Stop #412', address: 'I-70 Exit 91, Indianapolis, IN',
      state: 'IN', gallons: 98.4,
      lines: [{ desc: 'Diesel #2  98.40 gal @ $3.789', amount: 372.84 }],
      category: 'Fuel Expense', destination: 'expense',
    },
    {
      id: 'truck-repair', vendor: 'Crossroads Truck Service', address: '2210 Harmon Rd, Columbus, OH',
      lines: [{ desc: 'Oil & filter change', amount: 189.0 }, { desc: 'Brake inspection', amount: 75.0 }],
      category: 'Truck Repairs and Maintenance', destination: 'expense',
    },
  ],
  rideshare: [
    {
      id: 'ride-fuel', vendor: 'Corner Fuel Co.', address: '41 High St, Columbus, OH',
      state: 'OH', gallons: 11.62,
      lines: [{ desc: 'Regular  11.62 gal @ $3.299', amount: 38.33 }],
      category: 'Fuel', destination: 'expense',
    },
    {
      id: 'ride-lube', vendor: 'QuickLube Express', address: '980 Morse Rd, Columbus, OH',
      lines: [{ desc: 'Synthetic oil change', amount: 54.99 }, { desc: 'Wiper blades (pair)', amount: 24.0 }],
      category: 'Vehicle Maintenance & Repairs', destination: 'expense',
    },
  ],
  households: [
    {
      id: 'home-groceries', vendor: 'FreshMart Grocery', address: '1500 Main St',
      lines: [{ desc: 'Produce', amount: 23.4 }, { desc: 'Dairy', amount: 11.85 }, { desc: 'Bakery', amount: 4.29 }],
      category: 'Food & Groceries', destination: 'expense',
    },
  ],
  groceries: [
    {
      id: 'groc-wholesale', vendor: 'Valley Wholesale Foods', address: '77 Distribution Way',
      lines: [{ desc: 'Produce, mixed case x12', amount: 386.4 }, { desc: 'Dairy case x6', amount: 214.2 }],
      category: 'Cost of Goods Sold (COGS)', destination: 'inventory', itemName: 'Wholesale produce & dairy',
    },
  ],
  cafe: [
    {
      id: 'cafe-supply', vendor: 'Metro Restaurant Supply', address: '310 Market St',
      lines: [{ desc: 'Coffee beans, 20 lb', amount: 168.0 }, { desc: 'Milk, 6 gal', amount: 27.54 }, { desc: 'Cups, 1000 ct', amount: 64.9 }],
      category: 'Food Costs', destination: 'cogs',
    },
  ],
  cleaning: [
    {
      id: 'clean-supply', vendor: 'BrightClean Supply', address: '58 Commerce Dr',
      lines: [{ desc: 'Disinfectant, 4 gal', amount: 48.76 }, { desc: 'Microfiber cloths x24', amount: 22.8 }, { desc: 'Mop heads x4', amount: 19.96 }],
      category: 'Cleaning Supplies (disinfectants, mops, vacuums)', destination: 'expense',
    },
  ],
  beauty: [
    {
      id: 'beauty-supply', vendor: 'Glow Beauty Supply', address: '12 Salon Row',
      lines: [{ desc: 'Color developer x6', amount: 59.7 }, { desc: 'Shampoo, 1 gal x2', amount: 71.98 }, { desc: 'Gloves, 100 ct', amount: 12.49 }],
      category: 'Hair & Beauty Products', destination: 'expense',
    },
  ],
  ecommerce: [
    {
      id: 'ecom-pack', vendor: 'PackRight Packaging', address: '400 Freight Ave',
      lines: [{ desc: 'Mailer boxes x200', amount: 96.0 }, { desc: 'Packing tape x12', amount: 33.48 }],
      category: 'Packaging and Shipping Materials', destination: 'expense',
    },
  ],
  construction: [
    {
      id: 'build-supply', vendor: 'BuildRight Supply Co.', address: '901 Lumber Ln',
      lines: [{ desc: '2x4 studs x40', amount: 158.0 }, { desc: 'Romex 12/2, 250 ft', amount: 132.47 }, { desc: 'Drywall screws, 5 lb', amount: 28.99 }],
      category: 'Construction Materials (pipes, wiring, paint)', destination: 'expense',
    },
  ],
  'content-creator': [
    {
      id: 'creator-mic', vendor: 'CameraPro Outlet', address: '25 Studio Blvd',
      lines: [{ desc: 'Wireless mic kit', amount: 249.0 }],
      category: 'Equipment purchases or rentals (cameras, mics, lights)', destination: 'fixed', itemName: 'Wireless mic kit',
    },
  ],
  other: [
    {
      id: 'other-office', vendor: 'OfficePlus Supplies', address: '8 Park Plaza',
      lines: [{ desc: 'Printer paper x5', amount: 34.95 }, { desc: 'Ink cartridge', amount: 23.35 }],
      category: 'Supplies', destination: 'expense',
    },
  ],
};

export const getDemoReceipts = (slug: string) => RECEIPTS[slug] ?? RECEIPTS.other;
