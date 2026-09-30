'use client'

import { Trash2, Wallet, FileText, ArrowUp, ArrowDown, FileDown, Plus, CreditCard, type LucideIcon } from 'lucide-react';
import type { Transaction } from '@/types';
import { useTranslation } from 'react-i18next';
import { purposeOf } from '@/components/demo/sections/Dashboard';

interface FinancialReportProps {
  transactions: Transaction[];
  summary: {
    totalCashOnHand: number;
    totalPayable: number;
    totalExpenses: number;
    revenue: number;
  };
  expenseBreakdown: Record<string, number> & { totalExpenses: number };
  onDeleteTransaction: (id: number) => void;
  onAddTransaction: () => void;
  onDownloadReport: () => void;
  onSubscribe: () => void;
}

const COLORS = { cash: '#00B4D8', payable: '#FFA53B', revenue: '#00D97E', expense: '#A855F7', positive: '#00D97E', negative: '#FF4D4D' };

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value || 0);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
};

function Pill({ value, color }: { value: number; color: string }) {
  return <span className="mk-pill mk-pill--compact" style={{ '--pill': color } as React.CSSProperties}>{formatCurrency(value)}</span>;
}

export function FinancialReport({
  transactions,
  summary,
  expenseBreakdown,
  onDeleteTransaction,
  onAddTransaction,
  onDownloadReport,
  onSubscribe,
}: FinancialReportProps) {
  const { t: translate } = useTranslation();
  // Several report labels end in ":" in the locale files; the card layout supplies its own separation.
  const t = (key: string, options?: Record<string, unknown>) => String(translate(key, options)).replace(/\s*[:：]\s*$/, '');
  const netIncome = summary.revenue - summary.totalExpenses;

  const revenueByCategory: Record<string, number> = {};
  transactions.filter((tx) => tx.type === 'income').forEach((tx) => {
    const key = purposeOf(tx) || t('demo.financialReport.other');
    revenueByCategory[key] = (revenueByCategory[key] || 0) + tx.credit;
  });
  const expenseRows = Object.entries(expenseBreakdown).filter(([key, amount]) => key !== 'totalExpenses' && amount > 0);

  const handleDeleteClick = (id: number, description: string) => {
    if (window.confirm(t('demo.financialReport.deleteConfirm', { name: description.split('\n')[0] }))) {
      onDeleteTransaction(id);
    }
  };

  const summaryTiles: { label: string; value: number; color: string; icon: LucideIcon }[] = [
    { label: t('demo.financialReport.totalCashOnHand'), value: summary.totalCashOnHand, color: COLORS.cash, icon: Wallet },
    { label: t('demo.financialReport.totalPayableUnpaid'), value: summary.totalPayable, color: COLORS.payable, icon: FileText },
    { label: t('demo.financialReport.revenue'), value: summary.revenue, color: COLORS.revenue, icon: ArrowUp },
    { label: t('demo.financialReport.totalExpense'), value: summary.totalExpenses, color: COLORS.expense, icon: ArrowDown },
  ];

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.sidebar.financialReport')}</h1>
          <p className="dash-overview__sub">{t('demo.financialReport.subtitle')}</p>
        </div>
      </header>

      <section className="mk-card mk-card--flush">
        <div className="dm-toolbar">
          <button type="button" className="mk-btn mk-btn--ghost mk-btn--sm" onClick={onDownloadReport}>
            <FileDown aria-hidden />{t('demo.header.downloadReport')}
          </button>
          <button type="button" className="mk-btn mk-btn--primary mk-btn--sm" onClick={onAddTransaction}>
            <Plus aria-hidden />{t('demo.header.addTransaction')}
          </button>
          <button type="button" className="mk-btn mk-btn--soft mk-btn--sm" onClick={onSubscribe}>
            <CreditCard aria-hidden />{t('demo.sidebar.subscribe')}
          </button>
        </div>
      </section>

      <div className="dm-grid dm-grid--report">
        <section className="mk-card report-card">
          <div className="report-card__head">
            <h2 className="report-card__title">{t('demo.financialReport.summary')}</h2>
          </div>
          {summaryTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div className="summary-tile" key={tile.label}>
                <span className="mk-chip mk-chip--sm" style={{ backgroundColor: `${tile.color}26`, color: tile.color }}>
                  <Icon aria-hidden />
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className="summary-tile__lbl">{tile.label}</div>
                  <div className="summary-tile__val" style={{ color: tile.color }}>{formatCurrency(tile.value)}</div>
                </div>
              </div>
            );
          })}

          {expenseRows.length > 0 && (
            <>
              <p className="mk-eyebrow" style={{ margin: '18px 0 4px' }}>{t('demo.financialReport.breakdown')}</p>
              {expenseRows.map(([category, amount]) => (
                <div className="dm-kv" key={category}>
                  <span className="dm-kv__k">{category.replace(/\s*\(Expense\)\s*/i, '')}</span>
                  <span className="dm-kv__v" style={{ color: COLORS.negative }}>{formatCurrency(amount)}</span>
                </div>
              ))}
            </>
          )}
        </section>

        <section className="mk-card report-card">
          <div className="report-card__head">
            <h2 className="report-card__title">{t('demo.financialReport.journalEntry')}</h2>
          </div>
          {transactions.length === 0 ? (
            <div className="dash-empty">{t('demo.dashboard.noActivity')}</div>
          ) : (
            <div className="dm-table-wrap">
              <table className="dm-table" style={{ minWidth: 720 }}>
                <thead>
                  <tr>
                    <th>{t('demo.financialReport.date')}</th>
                    <th>{t('demo.financialReport.srNo')}</th>
                    <th>{t('demo.financialReport.transaction')}</th>
                    <th className="is-num">{t('demo.financialReport.debit')}</th>
                    <th className="is-num">{t('demo.financialReport.credit')}</th>
                    <th className="is-center">{t('demo.financialReport.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => {
                    const isIncome = tx.type === 'income';
                    const isPayable = tx.category === 'Payable';
                    const amount = isIncome ? tx.credit : tx.debit;
                    const debitColor = isIncome ? COLORS.positive : COLORS.negative;
                    const creditColor = isIncome ? COLORS.positive : isPayable ? COLORS.payable : COLORS.positive;
                    return (
                      <tr key={tx.id}>
                        <td className="dm-table__date">{formatDate(tx.date)}</td>
                        <td className="num">{tx.srNo}</td>
                        <td className="dm-table__desc">
                          {tx.description.split('\n')[0]}
                          {tx.sample && <span className="mk-badge dm-table__sample">{t('demo.industry.sampleBadge')}</span>}
                        </td>
                        <td className="is-num"><Pill value={amount} color={debitColor} /></td>
                        <td className="is-num"><Pill value={amount} color={creditColor} /></td>
                        <td className="is-center">
                          <button
                            type="button"
                            className="dm-icon-btn"
                            onClick={() => handleDeleteClick(tx.id, tx.description)}
                            aria-label={t('demo.financialReport.deleteConfirm', { name: tx.description.split('\n')[0] })}
                          >
                            <Trash2 aria-hidden />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <div className="dm-grid dm-grid--half">
        <section className="mk-card report-card">
          <div className="report-card__head">
            <h2 className="report-card__title">{t('demo.financialReport.incomeStatement')}</h2>
          </div>
          <div className="dm-table-wrap">
            <table className="dm-table dm-table--statement">
              <tbody>
                <tr className="is-section"><td colSpan={2}>{t('demo.financialReport.revenue')}</td></tr>
                {Object.entries(revenueByCategory).map(([category, amount]) => (
                  <tr key={category}>
                    <td className="dm-kv__k">{category}</td>
                    <td className="is-num">{formatCurrency(amount)}</td>
                  </tr>
                ))}
                <tr className="is-strong">
                  <td>{t('demo.financialReport.totalRevenue')}</td>
                  <td className="is-num" style={{ color: COLORS.positive }}>{formatCurrency(summary.revenue)}</td>
                </tr>
                <tr className="is-section"><td colSpan={2}>{t('demo.financialReport.expenses')}</td></tr>
                {expenseRows.map(([category, amount]) => (
                  <tr key={category}>
                    <td className="dm-kv__k">{category.replace(/\s*\(Expense\)\s*/i, '')}</td>
                    <td className="is-num">{formatCurrency(amount)}</td>
                  </tr>
                ))}
                <tr className="is-strong">
                  <td>{t('demo.financialReport.totalExpenses')}</td>
                  <td className="is-num" style={{ color: COLORS.negative }}>{formatCurrency(summary.totalExpenses)}</td>
                </tr>
                <tr className="is-strong">
                  <td>{t('demo.financialReport.netIncome')}</td>
                  <td className="is-num" style={{ color: netIncome >= 0 ? COLORS.positive : COLORS.negative }}>{formatCurrency(netIncome)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mk-card report-card">
          <div className="report-card__head">
            <h2 className="report-card__title">{t('demo.financialReport.balanceSheet')}</h2>
          </div>
          <div className="dm-table-wrap">
            <table className="dm-table dm-table--statement">
              <tbody>
                <tr className="is-section"><td colSpan={2}>{t('demo.financialReport.assets')}</td></tr>
                <tr>
                  <td className="dm-kv__k">{t('demo.financialReport.cash')}</td>
                  <td className="is-num">{formatCurrency(summary.totalCashOnHand)}</td>
                </tr>
                <tr>
                  <td className="dm-kv__k">{t('demo.financialReport.inventory')}</td>
                  <td className="is-num">{formatCurrency(0)}</td>
                </tr>
                <tr className="is-strong">
                  <td>{t('demo.financialReport.totalAssets')}</td>
                  <td className="is-num" style={{ color: COLORS.cash }}>{formatCurrency(summary.totalCashOnHand)}</td>
                </tr>
                <tr className="is-section"><td colSpan={2}>{t('demo.financialReport.liabilitiesEquity')}</td></tr>
                <tr>
                  <td className="dm-kv__k">{t('demo.financialReport.payable')}</td>
                  <td className="is-num" style={{ color: COLORS.payable }}>{formatCurrency(summary.totalPayable)}</td>
                </tr>
                <tr>
                  <td className="dm-kv__k">{t('demo.financialReport.beginningEquity')}</td>
                  <td className="is-num">{formatCurrency(0)}</td>
                </tr>
                <tr>
                  <td className="dm-kv__k">{t('demo.financialReport.retainedEarnings')}</td>
                  <td className="is-num">{formatCurrency(netIncome)}</td>
                </tr>
                <tr className="is-strong">
                  <td>{t('demo.financialReport.totalLiabilitiesEquity')}</td>
                  <td className="is-num">{formatCurrency(summary.totalPayable + netIncome)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
