'use client'

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { Transaction } from '@/types';
import { expensesByPurpose, isOpenPayable, remainingOf, runningSeries, summarize } from '@/utils/demoAccounting';

const STORAGE_KEY = 'mesob_demo_transactions';
const MAX_DEMO_TRANSACTIONS = 7;

const initialTransactions: Transaction[] = [];

// Each industry demo keeps its own transactions, so trying Trucking and then
// Cafe never mixes data. Sample rows are seeded on first visit and do not
// count toward the demo cap — visitors always get MAX_DEMO_TRANSACTIONS of
// their own. All figures come from the app's accounting engine
// (utils/demoAccounting.ts), so they match app.meksova.com.
export function useTransactions(industrySlug: string, sampleTransactions: Transaction[] = []) {
  const storageKey = `${STORAGE_KEY}_${industrySlug}`;
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [loaded, setLoaded] = useState(false);

  const ownCount = transactions.filter((t) => !t.sample).length;
  const hasReachedLimit = ownCount >= MAX_DEMO_TRANSACTIONS;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let next: Transaction[] = sampleTransactions;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) next = JSON.parse(stored);
    } catch (error) {
      console.error('Error loading transactions from localStorage:', error);
    }
    setTransactions(next);
    setLoaded(true);
    // sampleTransactions is rebuilt per render; the storage key is the identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Persist even an empty list, so clearing the samples sticks across reloads.
  useEffect(() => {
    if (!loaded || typeof window === 'undefined') return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions to localStorage:', error);
    }
  }, [transactions, loaded, storageKey]);

  const nextIds = (prev: Transaction[]) => ({
    id: Math.max(...prev.map((t) => t.id), 0) + 1,
    srNo: Math.max(...prev.map((t) => t.srNo), 0) + 1,
  });

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'srNo'>) => {
    if (ownCount >= MAX_DEMO_TRANSACTIONS) return false;
    setTransactions((prev) => [...prev, { ...transaction, ...nextIds(prev) }]);
    return true;
  }, [ownCount]);

  // Paying a recorded payable, the way the app does it: the payable's
  // remaining balance drops (Paid / Partially Paid) and a Pay record linked by
  // payableId takes the cash out.
  const payPayable = useCallback((payableId: number, amount: number) => {
    if (ownCount >= MAX_DEMO_TRANSACTIONS) return false;
    setTransactions((prev) => {
      const payable = prev.find((t) => t.id === payableId);
      if (!payable || !isOpenPayable(payable)) return prev;
      const paid = Math.min(amount, remainingOf(payable));
      const remaining = Number((remainingOf(payable) - paid).toFixed(2));
      const purpose = payable.description.replace(/^Payable\s*/i, '');
      const updated = prev.map((t) =>
        t.id === payableId
          ? { ...t, remainingAmount: remaining, status: remaining <= 0 ? ('Paid' as const) : ('Partially Paid' as const) }
          : t,
      );
      return [
        ...updated,
        {
          ...nextIds(prev),
          date: new Date().toISOString(),
          description: `Paid [Cash] ${remaining <= 0 ? 'Full' : 'Partial'} Payment for ${purpose}`,
          debit: paid,
          credit: 0,
          type: 'expense' as const,
          category: 'Payment',
          payableId,
        },
      ];
    });
    return true;
  }, [ownCount]);

  const deleteTransaction = useCallback((id: number) => {
    setTransactions((prev) => {
      const target = prev.find((t) => t.id === id);
      let next = prev.filter((t) => t.id !== id && !(target?.category === 'Payable' && t.payableId === id));
      // Deleting a payment puts its amount back on the payable it settled.
      if (target?.payableId != null) {
        next = next.map((t) => {
          if (t.id !== target.payableId) return t;
          const remaining = Number((remainingOf(t) + target.debit).toFixed(2));
          return { ...t, remainingAmount: remaining, status: remaining >= t.debit ? ('Payable' as const) : ('Partially Paid' as const) };
        });
      }
      return next.map((t, index) => ({ ...t, srNo: index + 1 }));
    });
  }, []);

  const clearSamples = useCallback(() => {
    setTransactions((prev) => prev.filter((t) => !t.sample).map((t, index) => ({ ...t, srNo: index + 1 })));
  }, []);

  const resetTransactions = useCallback(() => {
    setTransactions([]);
  }, []);

  const summary = useMemo(() => summarize(transactions), [transactions]);
  const series = useMemo(() => runningSeries(transactions), [transactions]);
  const expenseRows = useMemo(() => expensesByPurpose(transactions), [transactions]);
  const openPayables = useMemo(() => transactions.filter(isOpenPayable), [transactions]);

  const sortedTransactions = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [transactions],
  );

  return {
    transactions: sortedTransactions,
    summary,
    cashOnHandData: series.cash,
    revenueData: series.revenue,
    expenseData: series.expenses,
    payableData: series.payable,
    expenseRows,
    openPayables,
    hasReachedLimit,
    transactionCount: ownCount,
    maxTransactions: MAX_DEMO_TRANSACTIONS,
    hasSamples: transactions.some((t) => t.sample),
    addTransaction,
    payPayable,
    deleteTransaction,
    clearSamples,
    resetTransactions,
  };
}
