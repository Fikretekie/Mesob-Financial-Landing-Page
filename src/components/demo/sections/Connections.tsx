'use client'

import { useEffect, useRef, useState } from 'react';
import { Landmark, Store, RefreshCw, Check, Zap, ShieldCheck, Tags } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { DemoIndustry } from '@/data/demoIndustries';
import { getIndustryExtras } from '@/data/demoIndustryExtras';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup, trackDemoEvent } from '@/utils/demoTracking';

type FeedItem = { source: 'bank' | 'pos'; purpose: string; amount: number; incoming: boolean };

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Planned feature: bank-card and POS auto-sync. The "simulate" feed plays the
// industry's own sample entries arriving as if synced — a preview only; it
// never touches the visitor's demo data or the transaction cap.
export function Connections({ industry }: { industry: DemoIndustry }) {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();
  const { pos } = getIndustryExtras(industry.slug);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const items: FeedItem[] = industry.samples.slice(0, 5).map((s) => ({
    source: s.kind === 'income' && pos ? 'pos' : 'bank',
    purpose: s.purpose,
    amount: s.amount,
    incoming: s.kind === 'income',
  }));

  const simulate = () => {
    timers.current.forEach(window.clearTimeout);
    setFeed([]);
    setRunning(true);
    trackDemoEvent('demo_sync_preview', { industry: industrySlug });
    items.forEach((item, i) => {
      timers.current.push(window.setTimeout(() => {
        setFeed((prev) => [...prev, item]);
        if (i === items.length - 1) setRunning(false);
      }, 550 * (i + 1)));
    });
  };

  const sources = [
    {
      key: 'bank',
      icon: Landmark,
      title: t('demo.connections.bankTitle'),
      body: t('demo.connections.bankBody'),
      highlight: !pos,
    },
    {
      key: 'pos',
      icon: Store,
      title: t('demo.connections.posTitle'),
      body: t('demo.connections.posBody'),
      highlight: pos,
    },
  ];

  const perks = [
    { icon: Zap, text: t('demo.connections.perkAuto') },
    { icon: Tags, text: t('demo.connections.perkCategories') },
    { icon: ShieldCheck, text: t('demo.connections.perkReadOnly') },
  ];

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <span className="mk-badge mk-badge--info">{t('demo.connections.soon')}</span>
          <h1 className="dash-overview__title" style={{ marginTop: 10 }}>{t('demo.connections.title')}</h1>
          <p className="dash-overview__sub">{t('demo.connections.subtitle')}</p>
        </div>
        <div className="dash-overview__side">
          <button type="button" className="mk-btn mk-btn--primary" onClick={() => goToSignup(industrySlug, 'connections_early_access')}>
            {t('demo.connections.earlyAccess')}
          </button>
        </div>
      </header>

      <div className="dm-grid dm-grid--half">
        {sources.map(({ key, icon: Icon, title, body, highlight }) => (
          <section key={key} className={`mk-card dm-connect${highlight ? ' is-recommended' : ''}`}>
            <div className="dash-panel-head">
              <span className="mk-chip" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}><Icon aria-hidden /></span>
              <div className="dash-panel-head__text">
                <p className="report-card__title" style={{ fontSize: '1rem' }}>{title}</p>
                {highlight && <span className="mk-eyebrow" style={{ color: 'var(--accent)' }}>{t('demo.connections.recommended')}</span>}
              </div>
              <span className="mk-badge" style={{ marginInlineStart: 'auto' }}>{t('demo.connections.soon')}</span>
            </div>
            <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.55 }}>{body}</p>
            <button type="button" className="mk-btn mk-btn--ghost mk-btn--sm" style={{ marginTop: 16 }} disabled>
              {t('demo.connections.connect')}
            </button>
          </section>
        ))}
      </div>

      <section className="mk-card">
        <div className="dash-panel-head">
          <span className="mk-chip mk-chip--sm" style={{ background: 'rgba(0,217,126,0.14)', color: 'var(--green)' }}><RefreshCw aria-hidden /></span>
          <div className="dash-panel-head__text">
            <span className="mk-eyebrow">{t('demo.connections.previewTitle')}</span>
            <p className="chart-card__sub" style={{ marginTop: 2 }}>{t('demo.connections.previewSub')}</p>
          </div>
          <button type="button" className="mk-btn mk-btn--soft mk-btn--sm" style={{ marginInlineStart: 'auto' }} onClick={simulate} disabled={running}>
            <RefreshCw aria-hidden className={running ? 'dm-spin' : undefined} />
            {running ? t('demo.connections.syncing') : t('demo.connections.simulate')}
          </button>
        </div>

        <div aria-live="polite">
          {feed.length === 0 && !running ? (
            <div className="dash-empty">{t('demo.connections.previewEmpty')}</div>
          ) : (
            feed.map((item, i) => (
              <div className="dash-tx dm-feed-row" key={`${item.purpose}-${i}`}>
                <span className="mk-chip mk-chip--sm" style={{ background: 'var(--surface-3)', color: 'var(--text-2)' }}>
                  {item.source === 'pos' ? <Store aria-hidden /> : <Landmark aria-hidden />}
                </span>
                <div className="dash-tx__main">
                  <div className="dash-tx__nm">{item.purpose}</div>
                  <div className="dash-tx__sub">
                    {item.source === 'pos' ? t('demo.connections.fromPos') : t('demo.connections.fromBank')} · <Check aria-hidden style={{ width: 11, height: 11, verticalAlign: '-1px' }} /> {t('demo.connections.categorized')}
                  </div>
                </div>
                <span className="dash-tx__amt" style={{ color: item.incoming ? 'var(--green)' : 'var(--red)' }}>
                  {item.incoming ? '+' : '−'}{money(item.amount)}
                </span>
              </div>
            ))
          )}
          {!running && feed.length > 0 && (
            <p className="dm-feed-done">{t('demo.connections.previewDone', { count: feed.length })}</p>
          )}
        </div>
      </section>

      <div className="dm-grid dm-grid--perks">
        {perks.map(({ icon: Icon, text }) => (
          <div key={text} className="dm-perk">
            <Icon aria-hidden />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
