'use client'

import { useEffect, useMemo, useState } from 'react';
import { Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { FeedRow } from '@/data/demoConnections';
import { feedDateKey } from '@/data/demoConnections';
import { businessTypes } from '@/utils/businessTypes';

// Mirrors app.meksova.com's Review Transactions screen (src/views/
// TransactionReview.js): every bank row starts selected with a guessed
// category; the owner flips rows off, fixes categories, then adds them.

interface Row extends FeedRow {
  selected: boolean;
  category: string;
  manualPurpose: string;
}

interface TransactionReviewProps {
  pending: FeedRow[];
  businessType: string;
  autoImportAll: boolean;
  onConfirm: (rows: (FeedRow & { purpose: string })[], autoImportAll: boolean) => void;
  onReceiptUpsell: () => void;
}

export function TransactionReview({ pending, businessType, autoImportAll: initialAuto, onConfirm, onReceiptUpsell }: TransactionReviewProps) {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Row[]>([]);
  const [autoImportAll, setAutoImportAll] = useState(initialAuto);

  useEffect(() => {
    setRows(pending.map((row) => ({ ...row, selected: true, category: row.purpose, manualPurpose: '' })));
  }, [pending]);

  const lists = (businessTypes as Record<string, { income?: string[]; expenses?: string[] }>)[businessType] || {};
  const optionsFor = (row: Row) => {
    const base = (row.amount < 0 ? lists.income : lists.expenses) || [];
    return base.includes(row.purpose) ? base : [row.purpose, ...base];
  };

  const update = (key: string, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const selectedRows = useMemo(() => rows.filter((r) => r.selected), [rows]);
  // Plaid convention: negative = money in, so the net is the negated sum.
  const netTotal = useMemo(() => selectedRows.reduce((sum, r) => sum - r.amount, 0), [selectedRows]);

  const handleConfirm = () => {
    if (!selectedRows.length) return;
    onConfirm(
      selectedRows.map((r) => ({ ...r, purpose: r.category === 'manual' ? r.manualPurpose.trim() || 'Other' : r.category })),
      autoImportAll,
    );
  };

  return (
    <div className="dm-stack tr-review-page">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.review.title')}</h1>
          <p className="dash-overview__sub">
            {rows.length
              ? t('demo.review.subtitle', { selected: selectedRows.length, total: rows.length })
              : t('demo.review.noneFound')}
          </p>
        </div>
      </header>

      {rows.length === 0 ? (
        <div className="tr-review-caught-up">
          <div className="tr-review-caught-up-icon">✓</div>
          <div className="tr-review-caught-up-title">{t('demo.review.caughtUpTitle')}</div>
          <p className="tr-review-caught-up-text">{t('demo.review.caughtUpText')}</p>
        </div>
      ) : (
        <div className="tr-review-list">
          {rows.map((r) => {
            const isIncome = r.amount < 0;
            return (
              <div className={'tr-review-row' + (r.selected ? ' tr-review-row--on' : '')} key={r.key}>
                <button
                  type="button"
                  className="tr-review-toggle"
                  aria-pressed={r.selected}
                  aria-label={r.name}
                  onClick={() => update(r.key, { selected: !r.selected })}
                >
                  <span className="tr-review-toggle-knob" />
                </button>

                <div className="tr-review-info">
                  <div className="tr-review-name">{r.name}</div>
                  <div className="tr-review-date">{feedDateKey(r.daysAgo)}</div>
                </div>

                <div className="tr-review-category-wrap">
                  <select
                    className="tr-review-category"
                    value={r.category}
                    aria-label={t('demo.review.categoryPlaceholder')}
                    onChange={(e) => update(r.key, { category: e.target.value })}
                  >
                    {optionsFor(r).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="manual">{t('demo.review.enterManually')}</option>
                  </select>
                  {r.category === 'manual' && (
                    <input
                      type="text"
                      className="tr-review-manual"
                      placeholder={t('demo.review.categoryPlaceholder')}
                      value={r.manualPurpose}
                      onChange={(e) => update(r.key, { manualPurpose: e.target.value })}
                    />
                  )}
                </div>

                {/* Receipt uploads are a paid feature in the demo, as elsewhere. */}
                <button type="button" className="tr-review-receipt" title={t('demo.review.addReceipt')} aria-label={t('demo.review.addReceipt')} onClick={onReceiptUpsell}>
                  <Camera width={16} height={16} aria-hidden />
                </button>

                <div className={'tr-review-amount' + (isIncome ? ' tr-review-amount--pos' : '')}>
                  {isIncome ? '+' : '-'}${Math.abs(r.amount).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="tr-review-footer">
        <div className="tr-review-footer-left">
          {rows.length > 0 && (
            <>
              <button type="button" className="conn-btn" disabled={!selectedRows.length} onClick={handleConfirm}>
                {t('demo.review.addButton', { count: selectedRows.length })}
              </button>
              {!!selectedRows.length && (
                <span className={'tr-review-net' + (netTotal >= 0 ? ' tr-review-net--pos' : '')}>
                  {netTotal >= 0 ? '+' : '-'}${Math.abs(netTotal).toFixed(2)}
                </span>
              )}
            </>
          )}
        </div>
        <label className="tr-review-auto">
          <input type="checkbox" checked={autoImportAll} onChange={(e) => setAutoImportAll(e.target.checked)} />
          <span>{t('demo.review.autoImportLabel')}</span>
        </label>
      </div>
    </div>
  );
}
