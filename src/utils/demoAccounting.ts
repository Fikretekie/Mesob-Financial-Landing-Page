// Runs the demo's transactions through the app's own accounting engine
// (utils/accounting.js, copied from app.meksova.com) so every figure the demo
// shows — cash, revenue, expenses, payable, inventory, net income, tax — is
// computed exactly the way the product computes it.
//
// The demo stores its own lighter transaction shape; this file maps it onto
// the app's API shape:
//   income                 -> Receive
//   expense                -> Pay
//   category "Payable"     -> Payable (expense now, owed until paid; no cash)
//   category "Payment"     -> Pay linked to its payable via payableId
//   category "New Item"    -> New_Item (inventory asset, not an expense)
import {
  calculateDepreciationExpense,
  computeSummary,
  isCountableOutflow,
  outflowAmount,
} from '@/utils/accounting';
import type { ChartDataPoint, FinancialSummary, Transaction } from '@/types';

interface AppItem {
  id: number;
  transactionType: 'Receive' | 'Pay' | 'Payable' | 'New_Item';
  transactionAmount: number;
  transactionPurpose: string;
  createdAt: string;
  status?: string;
  remainingAmount?: number;
  payableId?: number;
  subType?: string;
  assetType?: string;
  assetName?: string;
  depreciationMethod?: string;
  usefulLifeYears?: number;
}

const SYSTEM_CATEGORIES = ['Payable', 'Payment', 'New Item'];

/** Row key for book depreciation in expensesByPurpose(); screens show a translated label. */
export const DEPRECIATION_ROW = '__depreciation__';

/** Human label for a transaction: its purpose, without the journal prefix. */
export const purposeOf = (tx: Transaction) =>
  (tx.category && !SYSTEM_CATEGORIES.includes(tx.category)
    ? tx.category
    : tx.description.replace(/^(Receive|Paid|Payable|New Item)(\s*\[Cash\])?\s*/i, '')
  ).replace(/\s*\(Expense\)\s*/i, '').trim();

/** Amount still owed on a payable (the full amount until a payment is made). */
export const remainingOf = (tx: Transaction) =>
  tx.remainingAmount != null ? tx.remainingAmount : tx.debit;

export const isOpenPayable = (tx: Transaction) =>
  tx.category === 'Payable' && tx.status !== 'Paid' && remainingOf(tx) > 0;

export function toAppItem(tx: Transaction): AppItem {
  const base = {
    id: tx.id,
    transactionPurpose: purposeOf(tx),
    createdAt: tx.date,
  };
  if (tx.type === 'income') {
    return { ...base, transactionType: 'Receive', transactionAmount: tx.credit };
  }
  if (tx.category === 'Payable') {
    const remaining = remainingOf(tx);
    // The app rewrites a payable's transactionAmount to the remaining balance
    // on each payment; mirror that so calculateTotalPayable reads the same.
    return {
      ...base,
      transactionType: 'Payable',
      transactionAmount: remaining,
      remainingAmount: remaining,
      status: tx.status ?? 'Payable',
    };
  }
  if (tx.category === 'New Item') {
    return {
      ...base,
      transactionType: 'New_Item',
      transactionAmount: tx.debit,
      subType: 'New_Item',
      assetType: tx.assetType ?? 'current',
      assetName: purposeOf(tx),
      ...(tx.assetType === 'fixed'
        ? { depreciationMethod: tx.depreciationMethod ?? 'straight_line', usefulLifeYears: tx.usefulLifeYears ?? 5 }
        : {}),
    };
  }
  return {
    ...base,
    transactionType: 'Pay',
    transactionAmount: tx.debit,
    ...(tx.subType ? { subType: tx.subType } : {}),
    ...(tx.payableId != null ? { payableId: tx.payableId } : {}),
  };
}

/** Depreciation on fixed assets from their purchase up to `asOf` (default now). */
export function depreciationTo(transactions: Transaction[], asOf: Date = new Date()): number {
  return parseFloat(calculateDepreciationExpense(transactions.map(toAppItem), { from: new Date(0), to: asOf })) || 0;
}

/**
 * Headline figures, computed the way app.meksova.com's Dashboard and Financial
 * Report do: the engine's accrual totals, plus book depreciation as an expense,
 * which lowers net income and the tax estimate and leaves fixed assets at net
 * book value (cost minus depreciation).
 */
export function summarize(transactions: Transaction[], asOf: Date = new Date()): FinancialSummary {
  const s = computeSummary(transactions.map(toAppItem), { normalize: false });
  const depreciation = depreciationTo(transactions, asOf);
  const totalExpenses = s.totalExpenses + depreciation;
  return {
    totalCashOnHand: s.totalCash,
    revenue: s.totalRevenue,
    totalExpenses,
    totalPayable: s.totalPayable,
    totalInventory: s.totalInventory,
    totalFixedAssets: s.totalFixedAssets - depreciation,
    cogs: s.cogs,
    netIncome: s.netIncome - depreciation,
    // 30% of net income (after depreciation), never below zero.
    estimatedTax: Math.max(0, s.totalRevenue - totalExpenses) * 0.3,
    depreciation,
  };
}

/** Expenses by purpose, using the engine's own rule for what counts. Book
 *  depreciation is listed too, so the breakdown foots to Total Expenses. */
export function expensesByPurpose(transactions: Transaction[], depreciationLabel = DEPRECIATION_ROW): [string, number][] {
  const items = transactions.map(toAppItem);
  const byId = new Map(items.map((item) => [item.id, item]));
  const groups: Record<string, number> = {};
  items.forEach((item) => {
    if (!isCountableOutflow(item, items)) return;
    // A payment against a payable is booked under the bill it settles.
    const label = (item.payableId != null && byId.get(item.payableId)?.transactionPurpose) || item.transactionPurpose || 'Other';
    groups[label] = (groups[label] || 0) + outflowAmount(item);
  });
  const depreciation = depreciationTo(transactions);
  if (depreciation > 0) groups[depreciationLabel] = (groups[depreciationLabel] || 0) + depreciation;
  return Object.entries(groups)
    .map(([label, amount]) => [label, Number(amount.toFixed(2))] as [string, number])
    .filter(([, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1]);
}

const pointDate = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/**
 * Running totals for the dashboard charts: the engine's figures after each
 * transaction, oldest first, starting from zero the day before the first one.
 */
export function runningSeries(transactions: Transaction[]) {
  const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const start = sorted.length ? new Date(sorted[0].date) : new Date();
  start.setDate(start.getDate() - 1);

  const series = {
    cash: [{ date: pointDate(start), amount: 0 }] as ChartDataPoint[],
    revenue: [{ date: pointDate(start), amount: 0 }] as ChartDataPoint[],
    expenses: [{ date: pointDate(start), amount: 0 }] as ChartDataPoint[],
    payable: [{ date: pointDate(start), amount: 0 }] as ChartDataPoint[],
  };
  sorted.forEach((tx, i) => {
    // Payments change a payable's remaining balance, so each point is computed
    // from the history up to it, with later payments not yet applied.
    const upTo = sorted.slice(0, i + 1).map((t) => {
      if (t.category !== 'Payable') return t;
      const paidLater = sorted
        .slice(i + 1)
        .filter((p) => p.payableId === t.id)
        .reduce((sum, p) => sum + p.debit, 0);
      if (!paidLater) return t;
      const remaining = remainingOf(t) + paidLater;
      return { ...t, remainingAmount: remaining, status: remaining > 0 ? ('Partially Paid' as const) : t.status };
    });
    const s = summarize(upTo, new Date(tx.date));
    const date = pointDate(new Date(tx.date));
    series.cash.push({ date, amount: s.totalCashOnHand });
    series.revenue.push({ date, amount: s.revenue });
    series.expenses.push({ date, amount: s.totalExpenses });
    series.payable.push({ date, amount: s.totalPayable });
  });
  return series;
}

/** Open payables bucketed by age: 0-30, 31-60, 61-90, 90+ days (remaining balance). */
export function payableAging(transactions: Transaction[], now: number = Date.now()): [number, number, number, number] {
  const buckets: [number, number, number, number] = [0, 0, 0, 0];
  transactions.filter(isOpenPayable).forEach((tx) => {
    const days = (now - new Date(tx.date).getTime()) / 86400000;
    const i = days <= 30 ? 0 : days <= 60 ? 1 : days <= 90 ? 2 : 3;
    buckets[i] += remainingOf(tx);
  });
  return buckets;
}
