'use client'

import { useState } from 'react';
import { Fuel } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { US_STATES } from '@/data/usStates';
import { dateKeyOf, type DemoFuelPurchase } from '@/data/demoIndustryExtras';

interface FuelPurchaseProps {
  purchases: DemoFuelPurchase[];
  canAdd: () => boolean;
  onSave: (purchase: Omit<DemoFuelPurchase, 'id'>) => void;
}

export function FuelPurchase({ purchases, canAdd, onSave }: FuelPurchaseProps) {
  const { t } = useTranslation();
  const [date, setDate] = useState(dateKeyOf(new Date()));
  const [state, setState] = useState('');
  const [gallons, setGallons] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gallonsNum = Number(gallons);
    if (!date || !state || !(gallonsNum > 0)) {
      setError(t('demo.app.fuelPurchase.validationRequired'));
      return;
    }
    if (!canAdd()) return;
    setError('');
    const priceNum = price ? Number(price) : null;
    onSave({
      dateKey: date,
      state,
      gallons: gallonsNum,
      pricePerGallon: priceNum,
      totalCost: total ? Number(total) : priceNum ? Number((priceNum * gallonsNum).toFixed(2)) : null,
    });
    setGallons('');
    setPrice('');
    setTotal('');
  };

  const sorted = [...purchases].sort((a, b) => (a.dateKey < b.dateKey ? 1 : -1));

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.app.fuelPurchase.title')}</h1>
          <p className="dash-overview__sub">{t('demo.app.fuelPurchase.subtitle')}</p>
        </div>
      </header>

      <div className="dm-grid dm-grid--half">
        <section className="mk-card">
          <form className="dm-stack" style={{ gap: 14 }} onSubmit={handleSubmit} noValidate>
            {error && <div className="dm-locked" role="alert" style={{ borderColor: 'rgba(255,77,77,0.45)', background: 'var(--danger-soft)' }}>{error}</div>}
            <div className="dm-form-grid">
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-fuel-date">{t('demo.app.fuelPurchase.date')}</label>
                <input id="dm-fuel-date" type="date" className="dm-input" value={date} max={dateKeyOf(new Date())} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-fuel-state">{t('demo.app.fuelPurchase.state')}</label>
                <select id="dm-fuel-state" className="dm-input dm-select" value={state} onChange={(e) => setState(e.target.value)}>
                  <option value="">{t('demo.app.fuelPurchase.selectState')}</option>
                  {US_STATES.map((s) => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div className="dm-form-grid dm-form-grid--3">
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-fuel-gal">{t('demo.app.fuelPurchase.gallons')}</label>
                <input id="dm-fuel-gal" type="number" inputMode="decimal" min="0" step="0.01" className="dm-input dm-input--num" value={gallons} onChange={(e) => setGallons(e.target.value)} />
              </div>
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-fuel-price">{t('demo.app.fuelPurchase.pricePerGallon')}</label>
                <input id="dm-fuel-price" type="number" inputMode="decimal" min="0" step="0.01" className="dm-input dm-input--num" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-fuel-total">{t('demo.app.fuelPurchase.totalCost')}</label>
                <input id="dm-fuel-total" type="number" inputMode="decimal" min="0" step="0.01" className="dm-input dm-input--num" value={total} onChange={(e) => setTotal(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="mk-btn mk-btn--primary dm-save">{t('demo.app.fuelPurchase.save')}</button>
          </form>
        </section>

        <section className="mk-card">
          <div className="dash-panel-head">
            <span className="mk-chip mk-chip--sm" style={{ background: 'rgba(255,165,59,0.14)', color: 'var(--amber)' }}><Fuel aria-hidden /></span>
            <span className="mk-eyebrow">{t('demo.app.fuelPurchase.recent')}</span>
          </div>
          {sorted.length === 0 ? (
            <div className="dash-empty">{t('demo.app.fuelPurchase.noPurchases')}</div>
          ) : (
            sorted.map((p) => (
              <div className="dash-tx" key={p.id}>
                <div className="dash-tx__main">
                  <div className="dash-tx__nm">
                    {p.state} · {new Date(`${p.dateKey}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {p.sample && <span className="mk-badge dm-table__sample">{t('demo.industry.sampleBadge')}</span>}
                  </div>
                  {p.totalCost ? <div className="dash-tx__sub">${p.totalCost.toFixed(2)}</div> : null}
                </div>
                <span className="dash-tx__amt" style={{ color: 'var(--text-1)' }}>
                  {p.gallons.toFixed(2)} {t('demo.app.fuelPurchase.gallonsShort')}
                </span>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
