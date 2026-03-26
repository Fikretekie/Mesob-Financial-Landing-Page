'use client'

import { SummaryCard } from '@/components/demo/SummaryCard';
import { AreaChart } from '@/components/demo/AreaChart';
import type { FinancialSummary, ChartDataPoint } from '@/types';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

interface DashboardProps {
  summary: FinancialSummary;
  cashOnHandData: ChartDataPoint[];
  revenueData: ChartDataPoint[];
  expenseData: ChartDataPoint[];
  payableData: ChartDataPoint[];
}

export function Dashboard({ summary, cashOnHandData, revenueData, expenseData, payableData }: DashboardProps) {

  const hasTransactions = cashOnHandData.length > 0 || revenueData.length > 0 || expenseData.length > 0;

  const handleGetStarted = () => {
    window.open('https://app.meksova.com/signup', '_blank');
  };

// Calculate percentage change from chart data
const getChange = (data: ChartDataPoint[]): { text: string; type: 'positive' | 'negative' | 'neutral' } => {
  if (data.length < 2) return { text: 'No change', type: 'neutral' };
  
  // Find the first NON-ZERO entry to use as baseline
  let baselineIndex = -1;
  let baseline = 0;
  
  for (let i = 0; i < data.length; i++) {
    const value = data[i]?.amount ?? 0;
    if (value !== 0) {
      baseline = value;
      baselineIndex = i;
      break;
    }
  }
  
  // If no non-zero value found, everything is zero
  if (baselineIndex === -1) {
    return { text: 'No change', type: 'neutral' };
  }
  
  // If we only have one non-zero entry, show as baseline (no comparison possible)
  if (baselineIndex === data.length - 1) {
    return { text: 'No change', type: 'neutral' };
  }
  
  // Get current value (last entry)
  const current = data[data.length - 1]?.amount ?? 0;
  
  // If current equals baseline
  if (current === baseline) {
    return { text: 'No change', type: 'neutral' };
  }
  
  // Calculate percentage change from baseline to current
  const change = ((current - baseline) / Math.abs(baseline)) * 100;
  const roundedChange = Math.round(change);
  
  if (isNaN(change) || !isFinite(change)) {
    return { text: 'No change', type: 'neutral' };
  }
  
  if (roundedChange === 0) {
    return { text: 'No change', type: 'neutral' };
  }
  
  const sign = roundedChange > 0 ? '+' : '';
  
  return {
    text: `${sign}${roundedChange}% vs last month`,
    type: roundedChange > 0 ? 'positive' : 'negative'
  };
};

  const cashChange = getChange(cashOnHandData);
  const expenseChange = getChange(expenseData);
  const payableChange = getChange(payableData);
  const revenueChange = getChange(revenueData);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {hasTransactions && (
        <div className="relative overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 sm:p-6 border border-blue-500/50 shadow-lg shadow-blue-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center animate-pulse flex-shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    Ready to unlock all features?
                  </h3>
                </div>
              </div>
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto bg-white text-blue-600 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 animate-pulse text-sm sm:text-base"
              >
                Get Started for Free
              </button>
            </div>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-75 blur-xl -z-10 animate-pulse"></div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <SummaryCard
          title="TOTAL CASH ON HAND"
          amount={summary.totalCashOnHand}
          change={cashChange.text}
          changeType={cashChange.type}
          icon="cash"
          chartColor="#41926f"
        />
        <SummaryCard
          title="TOTAL EXPENSES"
          amount={summary.totalExpenses}
          change={expenseChange.text}
          changeType={expenseChange.type}
          icon="expense"
          chartColor="#a7565d"
        />
        <SummaryCard
          title="TOTAL PAYABLE"
          amount={summary.totalPayable}
          change={payableChange.text}
          changeType={payableChange.type}
          icon="payable"
          chartColor="#c7ae4f"
        />
        <SummaryCard
          title="Revenue"
          amount={summary.revenue}
          change={revenueChange.text}
          changeType={revenueChange.type}
          icon="revenue"
          chartColor="#2b427d"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-center">
        <AreaChart data={cashOnHandData} title="TOTAL CASH ON HAND" color="#10b981" />
        <AreaChart data={revenueData} title="REVENUE" color="#3b82f6" />
        <AreaChart data={payableData} title="TOTAL PAYABLE" color="#f59e0b" />
        <AreaChart data={expenseData} title="TOTAL EXPENSES" color="#f43f5e" />
      </div>
    </div>
  );
}
