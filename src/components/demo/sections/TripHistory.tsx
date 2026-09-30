'use client'

import { useMemo, useState } from 'react';
import { Route, DollarSign, CalendarDays, TrendingUp, Briefcase, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { dateKeyOf, type DemoTrip } from '@/data/demoIndustryExtras';

// Same IRS standard rate the app's Trip History uses.
const IRS_RATE_PER_MILE = 0.67;

const lastSevenDays = () =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

export function TripHistory({ trips }: { trips: DemoTrip[] }) {
  const { t } = useTranslation();
  const days = useMemo(lastSevenDays, []);
  const [selectedKey, setSelectedKey] = useState(dateKeyOf(new Date()));

  const now = new Date();
  const monthPrefix = dateKeyOf(now).slice(0, 7);
  const yearPrefix = String(now.getFullYear());
  const businessMilesYear = trips
    .filter((trip) => trip.type === 'business' && trip.dateKey.startsWith(yearPrefix))
    .reduce((sum, trip) => sum + trip.miles, 0);
  const monthMiles = trips.filter((trip) => trip.dateKey.startsWith(monthPrefix)).reduce((sum, trip) => sum + trip.miles, 0);
  const milesOn = (key: string) => trips.filter((trip) => trip.dateKey === key).reduce((sum, trip) => sum + trip.miles, 0);
  const dayTrips = trips.filter((trip) => trip.dateKey === selectedKey);

  const tiles = [
    { label: t('demo.app.tripHistory.businessMiles'), value: `${businessMilesYear.toFixed(1)} mi`, sub: t('demo.app.tripHistory.thisYear'), color: '#3B82F6', icon: Route },
    { label: t('demo.app.tripHistory.estDeduction'), value: `$${(businessMilesYear * IRS_RATE_PER_MILE).toFixed(2)}`, sub: t('demo.app.tripHistory.perMile', { rate: `$${IRS_RATE_PER_MILE.toFixed(2)}` }), color: '#00D97E', icon: DollarSign },
    { label: t('demo.app.tripHistory.thisMonth'), value: `${monthMiles.toFixed(1)} mi`, sub: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), color: '#A855F7', icon: CalendarDays },
    { label: t('demo.app.tripHistory.trips'), value: String(trips.length), sub: t('demo.app.tripHistory.allTime'), color: '#FFA53B', icon: TrendingUp },
  ];

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.app.nav.tripHistory')}</h1>
        </div>
      </header>

      <div className="dm-grid dm-grid--tiles">
        {tiles.map(({ label, value, sub, color, icon: Icon }) => (
          <section key={label} className="card-stats">
            <div className="card-stats__body">
              <div className="tile-head">
                <span className="mk-chip" style={{ backgroundColor: `${color}26`, color }}><Icon aria-hidden /></span>
                <span className="card-stats__cat">{label}</span>
              </div>
              <div className="card-stats__title">{value}</div>
              <span className="tile-delta" style={{ color: 'var(--text-3)' }}>{sub}</span>
            </div>
          </section>
        ))}
      </div>

      <section className="mk-card" style={{ padding: 12 }}>
        <div className="dm-days" role="tablist" aria-label={t('demo.app.nav.tripHistory')}>
          {days.map((d) => {
            const key = dateKeyOf(d);
            const selected = key === selectedKey;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`dm-day${selected ? ' is-selected' : ''}`}
                onClick={() => setSelectedKey(key)}
              >
                <span className="dm-day__wd">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                <span className="dm-day__num">{d.getDate()}</span>
                <span className="dm-day__mi">{milesOn(key).toFixed(1)} mi</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="report-card__head" style={{ margin: '4px 4px 0' }}>
        <h2 className="report-card__title" style={{ fontSize: '1rem' }}>
          {new Date(`${selectedKey}T00:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </h2>
        <span className="chart-card__sub">{milesOn(selectedKey).toFixed(1)} {t('demo.app.tripHistory.miTotal')}</span>
      </div>

      <section className="mk-card" style={{ paddingBlock: 6 }}>
        {dayTrips.length === 0 ? (
          <div className="dash-empty">{t('demo.app.tripHistory.noTrips')}</div>
        ) : (
          dayTrips.map((trip) => {
            const business = trip.type === 'business';
            return (
              <div className="dash-tx" key={trip.id}>
                <span className="mk-chip mk-chip--sm" style={business ? { background: 'var(--accent-soft)', color: 'var(--accent)' } : { background: 'var(--surface-3)', color: 'var(--text-3)' }}>
                  {business ? <Briefcase aria-hidden /> : <Home aria-hidden />}
                </span>
                <div className="dash-tx__main">
                  <div className="dash-tx__nm">
                    {trip.purpose}
                    {trip.sample && <span className="mk-badge dm-table__sample">{t('demo.industry.sampleBadge')}</span>}
                  </div>
                  <div className="dash-tx__sub">
                    {trip.time}
                    {trip.durationSeconds > 0 && ` · ${Math.round(trip.durationSeconds / 60)} ${t('demo.app.tripHistory.min')}`}
                    {trip.stateBreakdown.length > 0 && ` · ${trip.stateBreakdown.map((s) => s.state).join(' → ')}`}
                  </div>
                  {trip.note && <div className="dash-tx__sub" style={{ color: 'var(--accent)', textTransform: 'none' }}>{trip.note}</div>}
                </div>
                <div style={{ marginInlineStart: 'auto', textAlign: 'end' }}>
                  <div className="dash-tx__amt" style={{ color: 'var(--text-1)' }}>{trip.miles.toFixed(2)} mi</div>
                  <div className="dash-tx__sub" style={{ color: business ? 'var(--accent)' : 'var(--text-3)' }}>
                    {t(`demo.app.mileageTracker.${trip.type}`)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
