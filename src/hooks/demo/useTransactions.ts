'use client'

import { useState, useCallback, useMemo } from 'react';
import type { Transaction, FinancialSummary, ChartDataPoint } from '@/types';

// Demo starts with 0 transactions
const initialTransactions: Transaction[] = [];

const generateChartData = (transactions: Transaction[]): ChartDataPoint[] => {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const dataPoints: ChartDataPoint[] = [];
  let runningCash = 0;
  
  dataPoints.push({ date: 'Initial', amount: 0 });
  
  sortedTransactions.forEach(t => {
    runningCash += t.credit - t.debit;
    const date = new Date(t.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    dataPoints.push({ date: dateStr, amount: runningCash });
  });
  
  // Add future dates for visualization
  const lastDate = sortedTransactions.length > 0 ? new Date(sortedTransactions[sortedTransactions.length - 1].date) : new Date();
  for (let i = 1; i <= 3; i++) {
    const futureDate = new Date(lastDate);
    futureDate.setDate(futureDate.getDate() + i * 7);
    dataPoints.push({ 
      date: futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
      amount: runningCash 
    });
  }
  
  return dataPoints;
};

const generateRevenueData = (transactions: Transaction[]): ChartDataPoint[] => {
  const sortedTransactions = [...transactions].filter(t => t.type === 'income').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const dataPoints: ChartDataPoint[] = [];
  let runningRevenue = 0;
  
  dataPoints.push({ date: 'Initial', amount: 0 });
  
  sortedTransactions.forEach(t => {
    runningRevenue += t.credit;
    const date = new Date(t.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    dataPoints.push({ date: dateStr, amount: runningRevenue });
  });
  
  const lastDate = sortedTransactions.length > 0 ? new Date(sortedTransactions[sortedTransactions.length - 1].date) : new Date();
  for (let i = 1; i <= 3; i++) {
    const futureDate = new Date(lastDate);
    futureDate.setDate(futureDate.getDate() + i * 7);
    dataPoints.push({ 
      date: futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
      amount: runningRevenue 
    });
  }
  
  return dataPoints;
};

const generateExpenseData = (transactions: Transaction[]): ChartDataPoint[] => {
  const sortedTransactions = [...transactions].filter(t => t.type === 'expense').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const dataPoints: ChartDataPoint[] = [];
  let runningExpense = 0;
  
  dataPoints.push({ date: 'Initial', amount: 0 });
  
  sortedTransactions.forEach(t => {
    runningExpense += t.debit;
    const date = new Date(t.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    dataPoints.push({ date: dateStr, amount: runningExpense });
  });
  
  const lastDate = sortedTransactions.length > 0 ? new Date(sortedTransactions[sortedTransactions.length - 1].date) : new Date();
  for (let i = 1; i <= 3; i++) {
    const futureDate = new Date(lastDate);
    futureDate.setDate(futureDate.getDate() + i * 7);
    dataPoints.push({ 
      date: futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
      amount: runningExpense 
    });
  }
  
  return dataPoints;
};

const generatePayableData = (transactions: Transaction[]): ChartDataPoint[] => {
  const sortedTransactions = [...transactions].filter(t => t.type === 'payable').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const dataPoints: ChartDataPoint[] = [];
  let runningPayable = 0;
  
  dataPoints.push({ date: 'Initial', amount: 0 });
  
  sortedTransactions.forEach(t => {
    runningPayable += t.debit;
    const date = new Date(t.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    dataPoints.push({ date: dateStr, amount: runningPayable });
  });
  
  // Fill with constant value if no payable transactions
  const lastDate = sortedTransactions.length > 0 ? new Date(sortedTransactions[sortedTransactions.length - 1].date) : new Date();
  for (let i = 1; i <= 3; i++) {
    const futureDate = new Date(lastDate);
    futureDate.setDate(futureDate.getDate() + i * 7);
    dataPoints.push({ 
      date: futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
      amount: runningPayable 
    });
  }
  
  return dataPoints;
};

const MAX_DEMO_TRANSACTIONS = 7;

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'srNo'>) => {
    setTransactions(prev => {
      // Check if we've reached the limit
      if (prev.length >= MAX_DEMO_TRANSACTIONS) {
        setHasReachedLimit(true);
        return prev;
      }
      
      const newId = Math.max(...prev.map(t => t.id), 0) + 1;
      const newSrNo = Math.max(...prev.map(t => t.srNo), 0) + 1;
      const newTransactions = [...prev, { ...transaction, id: newId, srNo: newSrNo }];
      
      // Check if we've reached the limit after adding
      if (newTransactions.length >= MAX_DEMO_TRANSACTIONS) {
        setHasReachedLimit(true);
      }
      
      return newTransactions;
    });
  }, []);

  const deleteTransaction = useCallback((id: number) => {
    setTransactions(prev => {
      const newTransactions = prev.filter(t => t.id !== id);
      if (newTransactions.length < MAX_DEMO_TRANSACTIONS) {
        setHasReachedLimit(false);
      }
      return newTransactions;
    });
  }, []);

  const resetTransactions = useCallback(() => {
    setTransactions([]);
    setHasReachedLimit(false);
  }, []);

  const summary: FinancialSummary = useMemo(() => {
    const revenue = transactions.reduce((sum, t) => sum + t.credit, 0);
    const totalExpenses = transactions.reduce((sum, t) => sum + t.debit, 0);
    const totalCashOnHand = revenue - totalExpenses;
    const totalPayable = 0; // Start from 0
    
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

  const expenseBreakdown = useMemo(() => {
    const fuelExpense = transactions
      .filter(t => t.category === 'Fuel Expense')
      .reduce((sum, t) => sum + t.debit, 0);
    const wagesExpense = transactions
      .filter(t => t.category === 'Wages (Expense)')
      .reduce((sum, t) => sum + t.debit, 0);
    
    return {
      fuelExpense,
      wagesExpense,
      totalExpenses: fuelExpense + wagesExpense
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
    transactionCount: transactions.length,
    maxTransactions: MAX_DEMO_TRANSACTIONS,
    addTransaction,
    deleteTransaction,
    resetTransactions
  };
}
