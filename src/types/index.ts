export interface Transaction {
  id: number;
  date: string;
  srNo: number;
  description: string;
  debit: number;
  credit: number;
  type: 'income' | 'expense' | 'payable';
  category?: string;
  sample?: boolean;
  // Payables (category "Payable"): what is still owed and whether it is settled,
  // mirroring the app's status / remainingAmount on Payable transactions.
  status?: 'Payable' | 'Partially Paid' | 'Paid';
  remainingAmount?: number;
  // Payments of a recorded payable (category "Payment") point at it, like the
  // app's Pay.payableId.
  payableId?: number;
  // How a purchase is booked, as in the app's receipt scan: goods for resale
  // expensed as COGS, or an item capitalized as inventory / fixed asset.
  subType?: 'COGS';
  assetType?: 'current' | 'fixed';
  // Fixed assets only, as in the app's Add Transaction: straight-line over a
  // useful life, or a Section 179 full write-off in the month of purchase.
  depreciationMethod?: 'straight_line' | 'section_179';
  usefulLifeYears?: number;
  scanned?: boolean;
  // Brought in by a bank (Plaid) or POS (Square) connection rather than typed.
  synced?: 'bank' | 'pos';
}

export interface FinancialSummary {
  totalCashOnHand: number;
  totalExpenses: number;
  totalPayable: number;
  totalInventory: number;
  totalFixedAssets: number;
  cogs: number;
  netIncome: number;
  estimatedTax: number;
  revenue: number;
  /** Book depreciation on fixed assets to date (already inside totalExpenses). */
  depreciation: number;
}

export interface ChartDataPoint {
  date: string;
  amount: number;
}

export type ViewType =
  | 'dashboard'
  | 'financial-report'
  | 'receipts'
  | 'documents'
  | 'mileage-tracker'
  | 'trip-history'
  | 'fuel-purchase'
  | 'ifta-report'
  | 'connections'
  | 'review-transactions'
  | 'team'
  | 'user-profile'
  | 'backup-csv'
  | 'subscribe'
  | 'help';
