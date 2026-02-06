'use client'

import { SummaryCard } from '@/components/demo/SummaryCard';
import { AreaChart } from '@/components/demo/AreaChart';
import type { FinancialSummary, ChartDataPoint } from '@/types';

interface DashboardProps {
  summary: FinancialSummary;
  cashOnHandData: ChartDataPoint[];
  revenueData: ChartDataPoint[];
  expenseData: ChartDataPoint[];
  payableData: ChartDataPoint[];
}

export function Dashboard({ summary, cashOnHandData, revenueData, expenseData, payableData }: DashboardProps) {
  return (
    <div className="p-6 space-y-6">
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
