'use client'

import { useMemo, useState, type ReactNode } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Wallet, ArrowUp, ArrowDown, FileText, Clock, PieChart as PieIcon, CircleCheck, Sparkles, type LucideIcon } from 'lucide-react';
import { AreaChart, Sparkline } from '@/components/demo/AreaChart';
import type { FinancialSummary, ChartDataPoint, Transaction } from '@/types';
import { useTranslation } from 'react-i18next';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup } from '@/utils/demoTracking';
import { purposeOf } from '@/utils/demoAccounting';

interface DashboardProps {
  summary: FinancialSummary;
  cashOnHandData: ChartDataPoint[];
  revenueData: ChartDataPoint[];
  expenseData: ChartDataPoint[];
  payableData: ChartDataPoint[];
  transactions: Transaction[];
  expenseRows: [string, number][];
  intro?: ReactNode;
  onViewAll: () => void;
}

type MetricKey = 'cash' | 'revenue' | 'expenses' | 'payable';

// Same metric colours as the app (FINANCIAL_COLORS): asset teal, income
// green, expense purple, payable amber. Green/red stay data-only.
const COLORS = {
  cash: '#00B4D8',
  revenue: '#00D97E',
  expenses: '#A855F7',
  payable: '#FFA53B',
  positive: '#00D97E',
  negative: '#FF4D4D',
};
const EXPENSE_COLORS = ['#A855F7', '#C084FC', '#8B5CF6', '#7C3AED', '#6D28D9'];

const money = (n: number, digits = 2) =>
  `${n < 0 ? '−' : ''}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

export function Dashboard({ summary, cashOnHandData, revenueData, expenseData, payableData, transactions, expenseRows, intro, onViewAll }: DashboardProps) {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();
  const [heroMetric, setHeroMetric] = useState<MetricKey>('cash');

  const getChange = (data: ChartDataPoint[]): string => {
    const values = data.map((d) => d.amount ?? 0);
    const baseline = values.find((v) => v !== 0);
    const current = values[values.length - 1] ?? 0;
    if (baseline === undefined || values.indexOf(baseline) === values.length - 1 || current === baseline) {
      return `— ${t('demo.dashboard.noChange')}`;
    }
    const change = Math.round(((current - baseline) / Math.abs(baseline)) * 100);
    if (!isFinite(change) || change === 0) return `— ${t('demo.dashboard.noChange')}`;
    return t('demo.dashboard.changeVsLastMonth', { sign: change > 0 ? '+' : '', percent: Math.abs(change) });
  };

  const metrics: Record<MetricKey, { label: string; value: number; color: string; icon: LucideIcon; data: ChartDataPoint[] }> = {
    cash: { label: t('demo.dashboard.totalCashOnHand'), value: summary.totalCashOnHand, color: COLORS.cash, icon: Wallet, data: cashOnHandData },
    revenue: { label: t('demo.dashboard.revenue'), value: summary.revenue, color: COLORS.revenue, icon: ArrowUp, data: revenueData },
    expenses: { label: t('demo.dashboard.totalExpenses'), value: summary.totalExpenses, color: COLORS.expenses, icon: ArrowDown, data: expenseData },
    payable: { label: t('demo.dashboard.totalPayable'), value: summary.totalPayable, color: COLORS.payable, icon: FileText, data: payableData },
  };
  const active = metrics[heroMetric];
  const ActiveIcon = active.icon;

  const income = summary.revenue;
  const outflow = summary.totalExpenses;
  const flowTotal = income + outflow;
  const net = income - outflow;

  const recent = transactions.slice(0, 6);

  // Same expense rule as the app: accrued payables count, item purchases
  // (inventory) and payments of an already-counted payable do not.
  const topExpenses = useMemo(() => expenseRows.slice(0, 5), [expenseRows]);
  const topExpenseTotal = topExpenses.reduce((sum, [, v]) => sum + v, 0);

  const rowStyle = (tx: Transaction) => {
    if (tx.type === 'income') return { color: COLORS.positive, sign: '+', label: t('demo.dashboard.typeIn') };
    if (tx.category === 'Payable') return { color: COLORS.payable, sign: '', label: t('demo.dashboard.typeOwed') };
    if (tx.category === 'New Item') return { color: COLORS.cash, sign: '−', label: t('demo.dashboard.typeOut') };
    return { color: COLORS.negative, sign: '−', label: t('demo.dashboard.typeOut') };
  };

  return (
    <div className="dm-stack">
      {intro}

      <section className="mk-card dm-upsell">
        <span className="mk-chip mk-chip--sm" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
          <Sparkles aria-hidden />
        </span>
        <div className="dm-upsell__text">
          <p className="dm-upsell__title">{t('demo.dashboard.unlockFeatures')}</p>
          <p className="dm-upsell__sub">{t('demo.signup.tagline')}</p>
        </div>
        <button type="button" className="mk-btn mk-btn--primary mk-btn--sm" onClick={() => goToSignup(industrySlug, 'dashboard_banner', true)}>
          {t('demo.dashboard.getStartedFree')}
        </button>
      </section>

      <div className="dm-grid dm-grid--hero">
        <section className="card-stats card-stats--hero" aria-live="polite">
          <div className="hero-body">
            <p className="card-stats__cat">{active.label}</p>
            <div className="hero-figure">
              <span className="card-stats__title" style={{ color: heroMetric === 'cash' ? (active.value < 0 ? COLORS.negative : 'var(--text-1)') : active.color }}>
                {money(active.value)}
              </span>
              <span className="hero-delta" style={{ color: active.color }}>{getChange(active.data)}</span>
            </div>

            <div className="hero-flow">
              <div className="hero-flow__row">
                <span className="hero-flow__lbl"><span className="hero-flow__dot" style={{ background: COLORS.positive }} />{t('demo.dashboard.moneyIn')}</span>
                <span className="hero-flow__val">{money(income, 0)}</span>
              </div>
              <div className="hero-flow__bar">
                <span style={{ width: `${flowTotal > 0 ? (income / flowTotal) * 100 : 50}%`, background: COLORS.positive, opacity: flowTotal > 0 ? 1 : 0.28 }} />
                <span style={{ width: `${flowTotal > 0 ? (outflow / flowTotal) * 100 : 50}%`, background: COLORS.negative, opacity: flowTotal > 0 ? 1 : 0.28 }} />
              </div>
              <div className="hero-flow__row">
                <span className="hero-flow__lbl"><span className="hero-flow__dot" style={{ background: COLORS.negative }} />{t('demo.dashboard.moneyOut')}</span>
                <span className="hero-flow__val">{money(outflow, 0)}</span>
              </div>
              <div className="hero-flow__net">
                <span className="hk">{t('demo.dashboard.netFlow')}</span>
                <span className="hv" style={{ color: net >= 0 ? COLORS.positive : COLORS.negative }}>
                  {net < 0 ? '−' : '+'}{money(Math.abs(net), 0)}
                </span>
              </div>
            </div>

            <div className="hero-subline">
              <div>
                <span className="hk">{t('demo.dashboard.transactionsCount')}</span>
                <span className="hv">{transactions.length}</span>
              </div>
              <div>
                <span className="hk">{t('demo.dashboard.taxSetAside')}</span>
                <span className="hv">{money(summary.estimatedTax, 0)}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mk-card chart-card">
          <div className="dash-panel-head" style={{ marginBottom: 8 }}>
            <span className="mk-chip mk-chip--sm" style={{ backgroundColor: `${active.color}26`, color: active.color }}>
              <ActiveIcon aria-hidden />
            </span>
            <div className="dash-panel-head__text">
              <span className="chart-card__title">{active.label}{t('demo.dashboard.chartSuffix')}</span>
              <span className="chart-card__sub">{money(active.value, 0)} · {getChange(active.data)}</span>
            </div>
          </div>
          <div className="chart-card__plot">
            <AreaChart data={active.data} color={active.color} id={heroMetric} />
          </div>
        </section>
      </div>

      <div className="dm-grid dm-grid--tiles">
        {(Object.keys(metrics) as MetricKey[]).map((key) => {
          const m = metrics[key];
          const Icon = m.icon;
          const selected = key === heroMetric;
          return (
            <button
              key={key}
              type="button"
              className={`card-stats card-stats--selectable${selected ? ' is-selected' : ''}`}
              style={{ '--tile-tint': `${m.color}1f`, '--tile-border': `${m.color}59`, '--tile-ring': m.color } as React.CSSProperties}
              onClick={() => setHeroMetric(key)}
              aria-pressed={selected}
            >
              <div className="card-stats__body">
                <div className="tile-head">
                  <span className="mk-chip" style={{ backgroundColor: `${m.color}26`, color: m.color }}>
                    <Icon aria-hidden />
                  </span>
                  <span className="card-stats__cat">{m.label}</span>
                </div>
                <div className="tile-foot">
                  <div className="card-stats__title">{money(m.value)}</div>
                  <Sparkline data={m.data} color={m.color} id={key} />
                </div>
                <span className="tile-delta" style={{ color: m.color }}>{getChange(m.data)}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="dm-grid dm-grid--split">
        <section className="mk-card dash-recent">
          <div className="dash-panel-head">
            <span className="mk-chip mk-chip--sm" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
              <Clock aria-hidden />
            </span>
            <span className="mk-eyebrow">{t('demo.dashboard.recentActivity')}</span>
            <button type="button" className="dash-viewall" onClick={onViewAll}>{t('demo.dashboard.viewAll')} →</button>
          </div>
          {recent.length === 0 ? (
            <div className="dash-empty">{t('demo.dashboard.noActivity')}</div>
          ) : (
            recent.map((tx) => {
              const style = rowStyle(tx);
              const amount = tx.type === 'income' ? tx.credit : tx.debit;
              return (
                <div className="dash-tx" key={tx.id}>
                  <span className="dash-tx__cat" style={{ backgroundColor: style.color }} />
                  <div className="dash-tx__main">
                    <div className="dash-tx__nm">
                      {purposeOf(tx)}
                      {tx.sample && <span className="mk-badge dm-table__sample">{t('demo.industry.sampleBadge')}</span>}
                    </div>
                    <div className="dash-tx__sub">
                      {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {style.label}
                    </div>
                  </div>
                  <span className="dash-tx__amt" style={{ color: style.color }}>{style.sign}{money(amount)}</span>
                </div>
              );
            })
          )}
        </section>

        <div className="dm-col">
          <section className="mk-card">
            <div className="dash-panel-head">
              <span className="mk-chip mk-chip--sm" style={{ backgroundColor: 'rgba(168,85,247,0.14)', color: COLORS.expenses }}>
                <PieIcon aria-hidden />
              </span>
              <span className="mk-eyebrow">{t('demo.dashboard.topExpenses')}</span>
            </div>
            {topExpenses.length === 0 ? (
              <div className="dash-empty">{t('demo.dashboard.noExpenses')}</div>
            ) : (
              <div className="dash-donut">
                <div className="dash-donut__chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topExpenses.map(([name, value]) => ({ name, value }))}
                        dataKey="value"
                        innerRadius="72%"
                        outerRadius="100%"
                        stroke="#0A0A0B"
                        strokeWidth={2}
                        isAnimationActive={false}
                      >
                        {topExpenses.map(([name], i) => (
                          <Cell key={name} fill={EXPENSE_COLORS[i % EXPENSE_COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="dash-donut__center">
                    <span className="hk">{t('demo.dashboard.total')}</span>
                    <span className="hv">{money(topExpenseTotal, 0)}</span>
                  </div>
                </div>
                <ul className="dash-donut__legend">
                  {topExpenses.map(([name, value], i) => (
                    <li key={name}>
                      <span className="dash-donut__dot" style={{ background: EXPENSE_COLORS[i % EXPENSE_COLORS.length] }} />
                      <span className="dash-donut__nm" title={name}>{name}</span>
                      <span className="dash-donut__val">{money(value, 0)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="mk-card">
            <div className="dash-panel-head">
              <span className="mk-chip mk-chip--sm" style={{ backgroundColor: 'rgba(0,217,126,0.14)', color: COLORS.positive }}>
                <CircleCheck aria-hidden />
              </span>
              <span className="mk-eyebrow">{t('demo.dashboard.status')}</span>
            </div>
            <div className="dash-status__row">
              <span className="dash-status__k">{t('demo.financialReport.payable')}</span>
              <span className="mk-badge mk-badge--warn">{money(summary.totalPayable, 0)}</span>
            </div>
            <div className="dash-status__row">
              <span className="dash-status__k">{t('demo.dashboard.taxSetAside')}</span>
              <span className="mk-badge mk-badge--info">{money(summary.estimatedTax, 0)}</span>
            </div>
            <div className="dash-status__row">
              <span className="dash-status__k">{t('demo.dashboard.recordedTransactions')}</span>
              <span className="mk-badge mk-badge--ok">{transactions.length}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
