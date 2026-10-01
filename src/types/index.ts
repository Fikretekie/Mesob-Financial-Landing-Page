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
}

export interface FinancialSummary {
  totalCashOnHand: number;
  totalExpenses: number;
  totalPayable: number;
  totalInventory: number;
  cogs: number;
  netIncome: number;
  estimatedTax: number;
  revenue: number;
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
  | 'user-profile'
  | 'backup-csv'
  | 'subscribe';
