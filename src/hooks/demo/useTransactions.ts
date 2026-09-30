'use client'

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { Transaction, FinancialSummary, ChartDataPoint } from '@/types';

const STORAGE_KEY = 'mesob_demo_transactions';
const MAX_DEMO_TRANSACTIONS = 7;

// Demo starts with 0 transactions
const initialTransactions: Transaction[] = [];

const formatPointDate = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// Series start at zero on the day before their first entry.
const startLabel = (sorted: Transaction[]) => {
  const first = sorted.length > 0 ? new Date(sorted[0].date) : new Date();
  first.setDate(first.getDate() - 1);
  return formatPointDate(first);
};

const generateChartData = (transactions: Transaction[]): ChartDataPoint[] => {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const dataPoints: ChartDataPoint[] = [];
  let runningCash = 0;

  dataPoints.push({ date: startLabel(sortedTransactions), amount: 0 });

  sortedTransactions.forEach(t => {
    runningCash += t.credit - t.debit;
    const date = new Date(t.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    dataPoints.push({ date: dateStr, amount: runningCash });
  });

  return dataPoints;
};

const generateRevenueData = (transactions: Transaction[]): ChartDataPoint[] => {
  const sortedTransactions = [...transactions].filter(t => t.type === 'income').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const dataPoints: ChartDataPoint[] = [];
  let runningRevenue = 0;

  dataPoints.push({ date: startLabel(sortedTransactions), amount: 0 });

  sortedTransactions.forEach(t => {
    runningRevenue += t.credit;
    const date = new Date(t.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    dataPoints.push({ date: dateStr, amount: runningRevenue });
  });

  return dataPoints;
};

const generateExpenseData = (transactions: Transaction[]): ChartDataPoint[] => {
  const sortedTransactions = [...transactions].filter(t => t.type === 'expense').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const dataPoints: ChartDataPoint[] = [];
  let runningExpense = 0;

  dataPoints.push({ date: startLabel(sortedTransactions), amount: 0 });

  sortedTransactions.forEach(t => {
    runningExpense += t.debit;
    const date = new Date(t.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    dataPoints.push({ date: dateStr, amount: runningExpense });
  });

  return dataPoints;
};

const generatePayableData = (transactions: Transaction[]): ChartDataPoint[] => {
  const sortedTransactions = [...transactions].filter(t => t.category === 'Payable').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const dataPoints: ChartDataPoint[] = [];
  let runningPayable = 0;

  dataPoints.push({ date: startLabel(sortedTransactions), amount: 0 });

  sortedTransactions.forEach(t => {
    runningPayable += t.debit;
    const date = new Date(t.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    dataPoints.push({ date: dateStr, amount: runningPayable });
  });

  return dataPoints;
};

// Each industry demo keeps its own transactions, so trying Trucking and then
// Cafe never mixes data. Sample rows are seeded on first visit and do not
// count toward the demo cap — visitors always get MAX_DEMO_TRANSACTIONS of
// their own.
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

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'srNo'>) => {
    if (ownCount >= MAX_DEMO_TRANSACTIONS) return false;
    setTransactions(prev => {
      const newId = Math.max(...prev.map(t => t.id), 0) + 1;
      const newSrNo = Math.max(...prev.map(t => t.srNo), 0) + 1;
      return [...prev, { ...transaction, id: newId, srNo: newSrNo }];
    });
    return true;
  }, [ownCount]);

  const deleteTransaction = useCallback((id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id).map((t, index) => ({
      ...t,
      srNo: index + 1
    })));
  }, []);

  const clearSamples = useCallback(() => {
    setTransactions(prev => prev.filter(t => !t.sample).map((t, index) => ({
      ...t,
      srNo: index + 1
    })));
  }, []);

  const resetTransactions = useCallback(() => {
    setTransactions([]);
  }, []);

  const summary: FinancialSummary = useMemo(() => {
    const revenue = transactions.reduce((sum, t) => sum + t.credit, 0);
    const totalExpenses = transactions.reduce((sum, t) => sum + t.debit, 0);
    const totalCashOnHand = revenue - totalExpenses;
    const totalPayable = transactions
      .filter(t => t.category === 'Payable')
      .reduce((sum, t) => sum + t.debit, 0);

    return {
      totalCashOnHand,
      totalExpenses,
      totalPayable,
      revenue
    };
  }, [transactions]);

  const cashOnHandData = useMemo(() => generateChartData(transactions), [transactions]);
  const revenueData = useMemo(() => generateRevenueData(transactions), [transactions]);
  const expenseData = useMemo(() => generateExpenseData(transactions), [transactions]);
  const payableData = useMemo(() => generatePayableData(transactions), [transactions]);

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions]);

  // const expenseBreakdown = useMemo(() => {
  //   const fuelExpense = transactions
  //     .filter(t => t.category?.toLowerCase().includes('fuel'))
  //     .reduce((sum, t) => sum + t.debit, 0);
  //   const wagesExpense = transactions
  //     .filter(t => t.category?.toLowerCase().includes('wage') || 
  //                  t.category?.toLowerCase().includes('salary'))
  //     .reduce((sum, t) => sum + t.debit, 0);

  //   return {
  //     fuelExpense,
  //     wagesExpense,
  //     totalExpenses: fuelExpense + wagesExpense
  //   };
  // }, [transactions]);
  const expenseBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    let totalExpenses = 0;

    transactions.forEach((t) => {
      if (t.type === 'expense') {
        const amount = t.debit;
        const category = t.category || 'Other Expenses';

        breakdown[category] = (breakdown[category] || 0) + amount;
        totalExpenses += amount;
      }
    });

    return {
      ...breakdown,
      totalExpenses
    };
  }, [transactions]);
  return {
    transactions: sortedTransactions,
    summary,
    cashOnHandData,
    revenueData,
    expenseData,
    payableData,
    expenseBreakdown,
    hasReachedLimit,
    transactionCount: ownCount,
    maxTransactions: MAX_DEMO_TRANSACTIONS,
    hasSamples: transactions.some((t) => t.sample),
    addTransaction,
    deleteTransaction,
    clearSamples,
    resetTransactions
  };
}