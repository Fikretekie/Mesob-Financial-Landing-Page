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
}

export interface FinancialSummary {
  totalCashOnHand: number;
  totalExpenses: number;
  totalPayable: number;
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
