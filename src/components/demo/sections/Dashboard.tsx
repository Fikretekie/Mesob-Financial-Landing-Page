'use client'

import { SummaryCard } from '@/components/demo/SummaryCard';
import { AreaChart } from '@/components/demo/AreaChart';
import type { FinancialSummary, ChartDataPoint } from '@/types';
import { Sparkles } from 'lucide-react';

interface DashboardProps {
  summary: FinancialSummary;
  cashOnHandData: ChartDataPoint[];
  revenueData: ChartDataPoint[];
  expenseData: ChartDataPoint[];
  payableData: ChartDataPoint[];
}

export function Dashboard({ summary, cashOnHandData, revenueData, expenseData, payableData }: DashboardProps) {
 
    // Check if user has at least one transaction
  const hasTransactions = cashOnHandData.length > 0 || revenueData.length > 0 || expenseData.length > 0;

    const handleGetStarted = () => {
    // Replace with your actual signup/pricing link
    window.open('https://app.mesobfinancial.com/signup', '_blank');
  };
  return (
    <div className="p-6 space-y-6">
            {/* Get Started Banner - Shows after first transaction */}
      {hasTransactions && (
        <div className="relative overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 border border-blue-500/50 shadow-lg shadow-blue-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Ready to unlock all features?
                  </h3>
                  
                </div>
              </div>
              <button
                onClick={handleGetStarted}
                className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 animate-pulse"
              >
                Get Started for Free
              </button>
            </div>
          </div>
          {/* Decorative animated border */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-75 blur-xl -z-10 animate-pulse"></div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="TOTAL CASH ON HAND"
          amount={summary.totalCashOnHand}
          change="No change"
          changeType="neutral"
          icon="cash"
          chartColor="#10b981"
        />
        <SummaryCard
          title="TOTAL EXPENSES"
          amount={summary.totalExpenses}
          change="+300% vs last month"
          changeType="negative"
          icon="expense"
          chartColor="#f43f5e"
        />
        <SummaryCard
          title="TOTAL PAYABLE"
          amount={summary.totalPayable}
          change="No change"
          changeType="neutral"
          icon="payable"
          chartColor="#f59e0b"
        />
        <SummaryCard
          title="Revenue"
          amount={summary.revenue}
          change="+5134% vs last month"
          changeType="positive"
          icon="revenue"
          chartColor="#3b82f6"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChart
          data={cashOnHandData}
          title="TOTAL CASH ON HAND"
          color="#10b981"
        />
        <AreaChart
          data={revenueData}
          title="REVENUE"
          color="#3b82f6"
        />
        <AreaChart
          data={payableData}
          title="TOTAL PAYABLE"
          color="#f59e0b"
        />
        <AreaChart
          data={expenseData}
          title="TOTAL EXPENSES"
          color="#f43f5e"
        />
      </div>
    </div>
  );
}
