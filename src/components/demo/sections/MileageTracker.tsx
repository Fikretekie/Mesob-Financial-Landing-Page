'use client'

import { useState } from 'react';
import { Play, Lock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { US_STATES } from '@/data/usStates';
import { dateKeyOf, type DemoTrip } from '@/data/demoIndustryExtras';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup } from '@/utils/demoTracking';

// Same purpose options the app's Mileage Tracker saves.
const PURPOSES = [
  { value: 'Client Visit', key: 'purposeClientVisit' },
  { value: 'Delivery', key: 'purposeDelivery' },
  { value: 'Commute', key: 'purposeCommute' },
  { value: 'Other', key: 'purposeOther' },
];

interface MileageTrackerProps {
  requireState: boolean;
  canAdd: () => boolean;
  onSave: (trip: Omit<DemoTrip, 'id'>) => void;
}

export function MileageTracker({ requireState, canAdd, onSave }: MileageTrackerProps) {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();
  const [showLocked, setShowLocked] = useState(false);
  const [date, setDate] = useState(dateKeyOf(new Date()));
  const [miles, setMiles] = useState('');
  const [state, setState] = useState('');
  const [type, setType] = useState<DemoTrip['type']>('business');
  const [purpose, setPurpose] = useState(PURPOSES[0].value);
  const [note, setNote] = useState('');

  const milesNum = Number(miles);
  const valid = Boolean(date) && milesNum > 0 && (!requireState || Boolean(state));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || !canAdd()) return;
    onSave({
      dateKey: date,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      miles: Number(milesNum.toFixed(2)),
      durationSeconds: 0,
      type,
      purpose,
      note: note.trim(),
      stateBreakdown: state ? [{ state, miles: Number(milesNum.toFixed(2)) }] : [],
    });
    setMiles('');
    setNote('');
  };

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.app.nav.mileageTracker')}</h1>
          <p className="dash-overview__sub">{t('demo.logs.mileageSub')}</p>
        </div>
      </header>

      <div className="dm-grid dm-grid--half">
        <section className="mk-card dm-tracker">
          <span className="mk-eyebrow">{t('demo.logs.liveTitle')}</span>
          <button type="button" className="dm-tracker__start" onClick={() => setShowLocked(true)}>
            <Play aria-hidden />
            <span>{t('demo.app.mileageTracker.startTrip')}</span>
          </button>
          <div className="dm-tracker__stats">
            <div><span className="hk">{t('demo.app.mileageTracker.miles')}</span><span className="hv">0.00</span></div>
            <div><span className="hk">{t('demo.app.mileageTracker.elapsed')}</span><span className="hv">00:00:00</span></div>
          </div>
          {showLocked ? (
            <div className="dm-locked">
              <Lock aria-hidden />
              <span style={{ flex: '1 1 200px' }}>{t('demo.logs.liveLocked')}</span>
              <button type="button" className="mk-btn mk-btn--primary mk-btn--sm" onClick={() => goToSignup(industrySlug, 'gps_tracking')}>
                {t('demo.addTransaction.upgradeToPro')}
              </button>
            </div>
          ) : (
            <p className="dm-tracker__hint">{t('demo.logs.liveSub')}</p>
          )}
        </section>

        <section className="mk-card">
          <div className="dash-panel-head">
            <span className="mk-chip mk-chip--sm" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
              <MapPin aria-hidden />
            </span>
            <span className="mk-eyebrow">{t('demo.logs.manualTitle')}</span>
          </div>
          <form className="dm-stack" style={{ gap: 14 }} onSubmit={handleSubmit}>
            <div className="dm-form-grid">
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-trip-date">{t('demo.app.fuelPurchase.date')}</label>
                <input id="dm-trip-date" type="date" className="dm-input" value={date} max={dateKeyOf(new Date())} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-trip-miles">{t('demo.app.mileageTracker.miles')}</label>
                <input id="dm-trip-miles" type="number" inputMode="decimal" min="0" step="0.1" className="dm-input dm-input--num" placeholder="0.0" value={miles} onChange={(e) => setMiles(e.target.value)} />
              </div>
            </div>
            <div className="dm-form-grid">
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-trip-state">
                  {t('demo.app.fuelPurchase.state')}{requireState ? '' : ` (${t('demo.logs.optional')})`}
                </label>
                <select id="dm-trip-state" className="dm-input dm-select" value={state} onChange={(e) => setState(e.target.value)}>
                  <option value="">{t('demo.app.fuelPurchase.selectState')}</option>
                  {US_STATES.map((s) => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
                </select>
              </div>
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-trip-purpose">{t('demo.addTransaction.purpose').replace(/\s*[:：]\s*$/, '')}</label>
                <select id="dm-trip-purpose" className="dm-input dm-select" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                  {PURPOSES.map((p) => <option key={p.value} value={p.value}>{t(`demo.app.mileageTracker.${p.key}`)}</option>)}
                </select>
              </div>
            </div>
            <div className="dm-actions" role="group" aria-label={t('demo.logs.tripType')}>
              {(['business', 'personal'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`dm-action${type === option ? ' is-selected' : ''}`}
                  aria-pressed={type === option}
                  onClick={() => setType(option)}
                >
                  {t(`demo.app.mileageTracker.${option}`)}
                </button>
              ))}
            </div>
            <div className="dm-field">
              <label className="dm-label" htmlFor="dm-trip-note">{t('demo.app.mileageTracker.addNote')}</label>
              <input id="dm-trip-note" className="dm-input" placeholder={t('demo.app.mileageTracker.notePlaceholder')} value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <button type="submit" className="mk-btn mk-btn--primary dm-save" disabled={!valid}>
              {t('demo.app.mileageTracker.saveTrip')}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
