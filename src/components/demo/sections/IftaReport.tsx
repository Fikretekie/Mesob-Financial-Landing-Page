'use client'

import { useMemo, useState } from 'react';
import { FileDown, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { DemoFuelPurchase, DemoTrip } from '@/data/demoIndustryExtras';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup } from '@/utils/demoTracking';

const quarterOf = (dateKey: string) => Math.floor((Number(dateKey.slice(5, 7)) - 1) / 3) + 1;
const inQuarter = (dateKey: string, year: number, quarter: number) =>
  Number(dateKey.slice(0, 4)) === year && quarterOf(dateKey) === quarter;

// Miles per state from trip state breakdowns, gallons per state from fuel
// purchases — the same totals the app's IFTA report produces.
export function IftaReport({ trips, fuel }: { trips: DemoTrip[]; fuel: DemoFuelPurchase[] }) {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();
  const [showLocked, setShowLocked] = useState(false);

  // Default to the quarter of the latest entry so the sample data is visible
  // even in the first days of a new quarter.
  const latest = [...trips.map((tr) => tr.dateKey), ...fuel.map((f) => f.dateKey)].sort().pop();
  const now = new Date();
  const [year, setYear] = useState(latest ? Number(latest.slice(0, 4)) : now.getFullYear());
  const [quarter, setQuarter] = useState(latest ? quarterOf(latest) : Math.floor(now.getMonth() / 3) + 1);

  const rows = useMemo(() => {
    const miles: Record<string, number> = {};
    const gallons: Record<string, number> = {};
    trips.filter((tr) => inQuarter(tr.dateKey, year, quarter)).forEach((tr) => {
      tr.stateBreakdown.forEach(({ state, miles: m }) => { miles[state] = (miles[state] || 0) + m; });
    });
    fuel.filter((f) => inQuarter(f.dateKey, year, quarter)).forEach((f) => {
      gallons[f.state] = (gallons[f.state] || 0) + f.gallons;
    });
    return Array.from(new Set([...Object.keys(miles), ...Object.keys(gallons)]))
      .map((state) => ({ state, miles: miles[state] || 0, gallons: gallons[state] || 0 }))
      .sort((a, b) => b.miles - a.miles);
  }, [trips, fuel, year, quarter]);

  const totalMiles = rows.reduce((sum, r) => sum + r.miles, 0);
  const totalGallons = rows.reduce((sum, r) => sum + r.gallons, 0);

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.app.iftaReport.title')}</h1>
          <p className="dash-overview__sub">{t('demo.app.iftaReport.subtitle')}</p>
        </div>
      </header>

      <section className="mk-card">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <div className="dm-field">
            <label className="dm-label" htmlFor="dm-ifta-q">{t('demo.app.iftaReport.quarter')}</label>
            <select id="dm-ifta-q" className="dm-input dm-select" value={quarter} onChange={(e) => setQuarter(Number(e.target.value))}>
              <option value={1}>Q1 (Jan–Mar)</option>
              <option value={2}>Q2 (Apr–Jun)</option>
              <option value={3}>Q3 (Jul–Sep)</option>
              <option value={4}>Q4 (Oct–Dec)</option>
            </select>
          </div>
          <div className="dm-field" style={{ width: 110 }}>
            <label className="dm-label" htmlFor="dm-ifta-y">{t('demo.app.iftaReport.year')}</label>
            <input id="dm-ifta-y" type="number" className="dm-input dm-input--num" value={year} onChange={(e) => setYear(Number(e.target.value))} />
          </div>
          <button
            type="button"
            className="mk-btn mk-btn--ghost mk-btn--sm"
            style={{ marginInlineStart: 'auto', minHeight: 44 }}
            onClick={() => setShowLocked(true)}
            disabled={rows.length === 0}
          >
            <FileDown aria-hidden />{t('demo.app.iftaReport.exportCsv')}
          </button>
        </div>

        {showLocked && (
          <div className="dm-locked" style={{ marginBottom: 16 }}>
            <Lock aria-hidden />
            <span style={{ flex: '1 1 220px' }}>{t('demo.logs.exportLocked')}</span>
            <button type="button" className="mk-btn mk-btn--primary mk-btn--sm" onClick={() => goToSignup(industrySlug, 'ifta_export')}>
              {t('demo.addTransaction.upgradeToPro')}
            </button>
          </div>
        )}

        {rows.length === 0 ? (
          <div className="dash-empty">{t('demo.app.iftaReport.noData')}</div>
        ) : (
          <div className="dm-table-wrap">
            <table className="dm-table">
              <thead>
                <tr>
                  <th>{t('demo.app.iftaReport.jurisdiction')}</th>
                  <th className="is-num">{t('demo.app.iftaReport.miles')}</th>
                  <th className="is-num">{t('demo.app.iftaReport.gallonsPurchased')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.state}>
                    <td style={{ fontWeight: 600 }}>{r.state}</td>
                    <td className="is-num">{r.miles.toFixed(2)}</td>
                    <td className="is-num">{r.gallons > 0 ? r.gallons.toFixed(2) : '—'}</td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 700 }}>
                  <td>{t('demo.app.iftaReport.totalMiles')}</td>
                  <td className="is-num">{totalMiles.toFixed(2)}</td>
                  <td className="is-num">{totalGallons > 0 ? totalGallons.toFixed(2) : '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', marginTop: 16 }}>{t('demo.app.iftaReport.note')}</p>
      </section>
    </div>
  );
}
