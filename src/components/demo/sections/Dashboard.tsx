'use client'

import { SummaryCard } from '@/components/demo/SummaryCard';
import { AreaChart } from '@/components/demo/AreaChart';
import type { FinancialSummary, ChartDataPoint } from '@/types';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardProps {
  summary: FinancialSummary;
  cashOnHandData: ChartDataPoint[];
  revenueData: ChartDataPoint[];
  expenseData: ChartDataPoint[];
  payableData: ChartDataPoint[];
}

export function Dashboard({ summary, cashOnHandData, revenueData, expenseData, payableData }: DashboardProps) {
  const { t } = useTranslation();

  const hasTransactions = cashOnHandData.length > 0 || revenueData.length > 0 || expenseData.length > 0;

  const handleGetStarted = () => {
    window.open('https://app.meksova.com/signup', '_blank');
  };

  const getChange = (data: ChartDataPoint[]): { text: string; type: 'positive' | 'negative' | 'neutral' } => {
    if (data.length < 2) return { text: t('demo.dashboard.noChange'), type: 'neutral' };

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

    if (baselineIndex === -1) {
      return { text: t('demo.dashboard.noChange'), type: 'neutral' };
    }

    if (baselineIndex === data.length - 1) {
      return { text: t('demo.dashboard.noChange'), type: 'neutral' };
    }

    const current = data[data.length - 1]?.amount ?? 0;

    if (current === baseline) {
      return { text: t('demo.dashboard.noChange'), type: 'neutral' };
    }

    const change = ((current - baseline) / Math.abs(baseline)) * 100;
    const roundedChange = Math.round(change);

    if (isNaN(change) || !isFinite(change)) {
      return { text: t('demo.dashboard.noChange'), type: 'neutral' };
    }

    if (roundedChange === 0) {
      return { text: t('demo.dashboard.noChange'), type: 'neutral' };
    }

    const sign = roundedChange > 0 ? '+' : '';

    return {
      text: t('demo.dashboard.changeVsLastMonth', {
        sign,
        percent: Math.abs(roundedChange),
      }),
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 sm:p-5 border border-blue-400/40 shadow-lg shadow-blue-500/20">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug m-0">
                  {t('demo.dashboard.unlockFeatures')}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleGetStarted}
                className="bg-white text-blue-600 font-bold py-2.5 px-6 sm:px-8 rounded-lg hover:bg-blue-50 transition-colors shadow-md text-sm sm:text-base"
              >
                {t('demo.dashboard.getStartedFree')}
              </button>
            </div>
          </div>
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-60 blur-xl -z-10 pointer-events-none"
            aria-hidden
          />
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <SummaryCard
          title={t('demo.dashboard.totalCashOnHand')}
          amount={summary.totalCashOnHand}
          change={cashChange.text}
          changeType={cashChange.type}
          icon="cash"
          chartColor="#41926f"
        />
        <SummaryCard
          title={t('demo.dashboard.totalExpenses')}
          amount={summary.totalExpenses}
          change={expenseChange.text}
          changeType={expenseChange.type}
          icon="expense"
          chartColor="#a7565d"
        />
        <SummaryCard
          title={t('demo.dashboard.totalPayable')}
          amount={summary.totalPayable}
          change={payableChange.text}
          changeType={payableChange.type}
          icon="payable"
          chartColor="#c7ae4f"
        />
        <SummaryCard
          title={t('demo.dashboard.revenue')}
          amount={summary.revenue}
          change={revenueChange.text}
          changeType={revenueChange.type}
          icon="revenue"
          chartColor="#2b427d"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-center">
        <AreaChart data={cashOnHandData} title={t('demo.dashboard.totalCashOnHand')} color="#10b981" />
        <AreaChart data={revenueData} title={t('demo.dashboard.revenue')} color="#3b82f6" />
        <AreaChart data={payableData} title={t('demo.dashboard.totalPayable')} color="#f59e0b" />
        <AreaChart data={expenseData} title={t('demo.dashboard.totalExpenses')} color="#f43f5e" />
      </div>
    </div>
  );
}
