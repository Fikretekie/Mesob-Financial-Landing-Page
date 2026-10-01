// Industry-specific screens for the demo: which app features each industry
// sees, plus the sample trips / fuel purchases / documents they open with.
// Trip and fuel shapes mirror the app's tripStorage / fuelStorage records so
// Trip History and the IFTA report compute the same way as the product.

export type DemoFeature = 'documents' | 'mileage' | 'trips' | 'fuel' | 'ifta';

export interface DemoTrip {
  id: string;
  dateKey: string;
  time: string;
  miles: number;
  durationSeconds: number;
  type: 'business' | 'personal';
  purpose: string;
  note: string;
  stateBreakdown: { state: string; miles: number }[];
  sample?: boolean;
}

export interface DemoFuelPurchase {
  id: string;
  dateKey: string;
  state: string;
  gallons: number;
  pricePerGallon: number | null;
  totalCost: number | null;
  sample?: boolean;
  // Created alongside a scanned fuel receipt; the receipt's transaction is
  // what counts toward the demo cap, so this one does not.
  linked?: boolean;
}

export interface DemoDocument {
  name: string;
  sizeKb: number;
  daysAgo: number;
}

type TripSeed = { daysAgo: number; time: string; minutes: number; type: DemoTrip['type']; purpose: string; note?: string; states: [string, number][] };
type FuelSeed = { daysAgo: number; state: string; gallons: number; price: number };

interface IndustryExtras {
  features: DemoFeature[];
  pos: boolean;
  trips?: TripSeed[];
  fuel?: FuelSeed[];
  documents: DemoDocument[];
}

const DRIVING: DemoFeature[] = ['documents', 'mileage', 'trips'];

const EXTRAS: Record<string, IndustryExtras> = {
  truck: {
    features: ['documents', 'mileage', 'trips', 'fuel', 'ifta'],
    pos: false,
    trips: [
      { daysAgo: 0, time: '6:10 AM', minutes: 412, type: 'business', purpose: 'Delivery', note: 'Columbus → Indianapolis', states: [['OH', 108], ['IN', 76]] },
      { daysAgo: 1, time: '5:40 AM', minutes: 545, type: 'business', purpose: 'Delivery', note: 'Indianapolis → Chicago', states: [['IN', 142], ['IL', 58]] },
      { daysAgo: 3, time: '7:05 AM', minutes: 380, type: 'business', purpose: 'Delivery', note: 'Pittsburgh → Columbus', states: [['PA', 62], ['WV', 14], ['OH', 112]] },
      { daysAgo: 4, time: '4:30 PM', minutes: 34, type: 'personal', purpose: 'Commute', states: [['OH', 18]] },
      { daysAgo: 5, time: '6:00 AM', minutes: 290, type: 'business', purpose: 'Delivery', note: 'Columbus → Pittsburgh', states: [['OH', 120], ['WV', 12], ['PA', 53]] },
    ],
    fuel: [
      { daysAgo: 1, state: 'IN', gallons: 118.4, price: 3.79 },
      { daysAgo: 3, state: 'OH', gallons: 142.0, price: 3.89 },
      { daysAgo: 5, state: 'PA', gallons: 96.5, price: 4.05 },
    ],
    documents: [
      { name: 'Truck insurance policy.pdf', sizeKb: 842, daysAgo: 40 },
      { name: 'IRP cab card.pdf', sizeKb: 214, daysAgo: 38 },
      { name: 'IFTA Q2 filing.pdf', sizeKb: 356, daysAgo: 70 },
      { name: 'Rate confirmation - Chicago load.pdf', sizeKb: 128, daysAgo: 1 },
    ],
  },
  rideshare: {
    features: ['documents', 'mileage', 'trips', 'fuel'],
    pos: false,
    trips: [
      { daysAgo: 0, time: '5:30 PM', minutes: 240, type: 'business', purpose: 'Other', note: 'Evening shift', states: [['OH', 86.4]] },
      { daysAgo: 1, time: '7:00 AM', minutes: 300, type: 'business', purpose: 'Other', note: 'Airport runs', states: [['OH', 112.3]] },
      { daysAgo: 2, time: '8:15 AM', minutes: 25, type: 'personal', purpose: 'Commute', states: [['OH', 12.1]] },
      { daysAgo: 4, time: '11:00 AM', minutes: 210, type: 'business', purpose: 'Delivery', note: 'Food delivery block', states: [['OH', 64.8]] },
    ],
    fuel: [
      { daysAgo: 1, state: 'OH', gallons: 11.2, price: 3.29 },
      { daysAgo: 4, state: 'OH', gallons: 9.8, price: 3.35 },
    ],
    documents: [
      { name: 'Vehicle registration.pdf', sizeKb: 190, daysAgo: 60 },
      { name: 'Rideshare insurance.pdf', sizeKb: 512, daysAgo: 45 },
      { name: '1099-K 2025.pdf', sizeKb: 98, daysAgo: 200 },
    ],
  },
  construction: {
    features: DRIVING,
    pos: false,
    trips: [
      { daysAgo: 0, time: '7:20 AM', minutes: 55, type: 'business', purpose: 'Client Visit', note: 'Kitchen remodel site', states: [['OH', 38.2]] },
      { daysAgo: 2, time: '9:10 AM', minutes: 70, type: 'business', purpose: 'Delivery', note: 'Materials pickup', states: [['OH', 52.6]] },
      { daysAgo: 3, time: '1:45 PM', minutes: 22, type: 'business', purpose: 'Client Visit', note: 'Estimate walkthrough', states: [['OH', 14.1]] },
    ],
    documents: [
      { name: 'Contractor license.pdf', sizeKb: 240, daysAgo: 90 },
      { name: 'Liability insurance certificate.pdf', sizeKb: 310, daysAgo: 30 },
      { name: 'Remodel contract - signed.pdf', sizeKb: 655, daysAgo: 12 },
    ],
  },
  cleaning: {
    features: DRIVING,
    pos: false,
    trips: [
      { daysAgo: 0, time: '8:00 AM', minutes: 35, type: 'business', purpose: 'Client Visit', note: 'Office clean - downtown', states: [['OH', 26.4]] },
      { daysAgo: 1, time: '10:30 AM', minutes: 50, type: 'business', purpose: 'Client Visit', note: 'Airbnb turnovers', states: [['OH', 41.0]] },
      { daysAgo: 4, time: '9:15 AM', minutes: 28, type: 'business', purpose: 'Delivery', note: 'Supply run', states: [['OH', 18.3]] },
    ],
    documents: [
      { name: 'Business license.pdf', sizeKb: 180, daysAgo: 120 },
      { name: 'Liability insurance.pdf', sizeKb: 402, daysAgo: 55 },
      { name: 'Office cleaning contract.pdf', sizeKb: 290, daysAgo: 20 },
    ],
  },
  groceries: {
    features: ['documents'],
    pos: true,
    documents: [
      { name: 'Retail food license.pdf', sizeKb: 260, daysAgo: 80 },
      { name: 'Store lease agreement.pdf', sizeKb: 910, daysAgo: 150 },
      { name: 'Supplier invoice - produce.pdf', sizeKb: 120, daysAgo: 3 },
    ],
  },
  cafe: {
    features: ['documents'],
    pos: true,
    documents: [
      { name: 'Food service permit.pdf', sizeKb: 230, daysAgo: 100 },
      { name: 'Lease agreement.pdf', sizeKb: 880, daysAgo: 160 },
      { name: 'Health inspection report.pdf', sizeKb: 175, daysAgo: 25 },
    ],
  },
  beauty: {
    features: ['documents'],
    pos: true,
    documents: [
      { name: 'Cosmetology license.pdf', sizeKb: 150, daysAgo: 110 },
      { name: 'Booth rental agreement.pdf', sizeKb: 320, daysAgo: 60 },
      { name: 'Product supplier invoice.pdf', sizeKb: 95, daysAgo: 6 },
    ],
  },
  ecommerce: {
    features: ['documents'],
    pos: true,
    documents: [
      { name: 'Seller permit.pdf', sizeKb: 140, daysAgo: 90 },
      { name: 'Wholesale purchase order.pdf', sizeKb: 210, daysAgo: 9 },
      { name: 'Shipping carrier invoice.pdf', sizeKb: 88, daysAgo: 4 },
    ],
  },
  households: {
    features: ['documents'],
    pos: false,
    documents: [
      { name: 'W-2 2025.pdf', sizeKb: 110, daysAgo: 200 },
      { name: 'Apartment lease.pdf', sizeKb: 760, daysAgo: 180 },
      { name: 'Car insurance card.jpg', sizeKb: 340, daysAgo: 30 },
    ],
  },
  'content-creator': {
    features: ['documents'],
    pos: false,
    documents: [
      { name: 'Sponsorship agreement.pdf', sizeKb: 430, daysAgo: 14 },
      { name: 'Camera gear receipt.pdf', sizeKb: 120, daysAgo: 13 },
      { name: '1099-NEC 2025.pdf', sizeKb: 90, daysAgo: 210 },
    ],
  },
  other: {
    features: ['documents'],
    pos: false,
    documents: [
      { name: 'Business license.pdf', sizeKb: 180, daysAgo: 120 },
      { name: 'Lease agreement.pdf', sizeKb: 760, daysAgo: 150 },
      { name: 'Insurance certificate.pdf', sizeKb: 300, daysAgo: 40 },
    ],
  },
};

export const getIndustryExtras = (slug: string): IndustryExtras => EXTRAS[slug] ?? EXTRAS.other;

export const dateKeyOf = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const daysAgoKey = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return dateKeyOf(d);
};

export function buildSampleTrips(slug: string): DemoTrip[] {
  return (getIndustryExtras(slug).trips ?? []).map((seed, i) => ({
    id: `sample-trip-${i}`,
    dateKey: daysAgoKey(seed.daysAgo),
    time: seed.time,
    miles: Number(seed.states.reduce((sum, [, miles]) => sum + miles, 0).toFixed(1)),
    durationSeconds: seed.minutes * 60,
    type: seed.type,
    purpose: seed.purpose,
    note: seed.note ?? '',
    stateBreakdown: seed.states.map(([state, miles]) => ({ state, miles })),
    sample: true,
  }));
}

export function buildSampleFuel(slug: string): DemoFuelPurchase[] {
  return (getIndustryExtras(slug).fuel ?? []).map((seed, i) => ({
    id: `sample-fuel-${i}`,
    dateKey: daysAgoKey(seed.daysAgo),
    state: seed.state,
    gallons: seed.gallons,
    pricePerGallon: seed.price,
    totalCost: Number((seed.gallons * seed.price).toFixed(2)),
    sample: true,
  }));
}
