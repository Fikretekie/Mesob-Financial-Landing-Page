'use client'

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { FeedRow } from '@/data/demoConnections';
import { feedDateKey } from '@/data/demoConnections';
import type { ConnectionsState } from '@/hooks/demo/useDemoConnections';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { trackDemoEvent } from '@/utils/demoTracking';

// Mirrors app.meksova.com's Connections page (src/views/Connections.js):
// the same cards, chips, auto-sync switch, Recent preview and actions. The
// demo connects to sample feeds instead of Plaid / Square.

type ProviderId = 'plaid' | 'square';

const PROVIDERS: { id: ProviderId; kind: 'bank' | 'pos'; via: string }[] = [
  { id: 'plaid', kind: 'bank', via: 'Plaid' },
  { id: 'square', kind: 'pos', via: 'Square' },
];

const ProviderIcon = ({ kind }: { kind: 'bank' | 'pos' }) =>
  kind === 'bank' ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10l9-6 9 6" />
      <path d="M4 10v9" /><path d="M20 10v9" /><path d="M8 10v9" /><path d="M12 10v9" /><path d="M16 10v9" />
      <line x1="2" y1="21" x2="22" y2="21" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <circle cx="12" cy="16" r="1.6" />
    </svg>
  );

const CheckGlyph = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginInlineEnd: 4, verticalAlign: '-1px' }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ChevronGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="dm-flip">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);
const RefreshGlyph = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a9 9 0 1 1-2.64-6.36" /><polyline points="21 3 21 9 15 9" />
  </svg>
);
const UnlinkGlyph = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18.84 12.25l1.72-1.71a4 4 0 0 0-5.66-5.66l-1.71 1.72" /><path d="M5.17 11.75l-1.72 1.71a4 4 0 0 0 5.66 5.66l1.71-1.72" />
    <line x1="8" y1="2" x2="8" y2="5" /><line x1="2" y1="8" x2="5" y2="8" /><line x1="16" y1="19" x2="16" y2="22" /><line x1="19" y1="16" x2="22" y2="16" />
  </svg>
);

interface ConnectionsProps {
  state: ConnectionsState;
  onConnectBank: () => FeedRow[];
  onConnectSquare: () => FeedRow[];
  onSyncSquare: () => FeedRow[];
  onDisconnect: (id: ProviderId) => void;
  onToggleAutoSync: (on: boolean) => void;
  /** Rows to book into the demo's transactions (Square sales, or auto-synced bank rows). */
  onImport: (rows: FeedRow[], source: 'bank' | 'pos') => void;
  onOpenReview: () => void;
  onOpenReport: () => void;
}

export function Connections({
  state,
  onConnectBank,
  onConnectSquare,
  onSyncSquare,
  onDisconnect,
  onToggleAutoSync,
  onImport,
  onOpenReview,
  onOpenReport,
}: ConnectionsProps) {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();
  const [busyId, setBusyId] = useState<ProviderId | null>(null);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  const timeAgo = (value?: string) => {
    if (!value) return null;
    const sec = Math.floor((Date.now() - new Date(value).getTime()) / 1000);
    if (sec < 45) return t('demo.conn.justNow');
    const min = Math.floor(sec / 60);
    if (min < 60) return t('demo.conn.minsAgo', { n: min });
    const hr = Math.floor(min / 60);
    if (hr < 24) return t('demo.conn.hrsAgo', { n: hr });
    return t('demo.conn.daysAgo', { n: Math.floor(hr / 24) });
  };

  // A short "connecting…" beat so it feels like the app's flow.
  const withBusy = (id: ProviderId, fn: () => void) => {
    setBusyId(id);
    setSyncMsg(null);
    window.setTimeout(() => {
      fn();
      setBusyId(null);
    }, 900);
  };

  const handleConnect = (id: ProviderId) =>
    withBusy(id, () => {
      trackDemoEvent('demo_connect', { industry: industrySlug, provider: id });
      if (id === 'square') {
        const rows = onConnectSquare();
        onImport(rows, 'pos');
        setSyncMsg(t('demo.conn.squareImported', { count: rows.length }));
        return;
      }
      const autoRows = onConnectBank();
      if (autoRows.length) onImport(autoRows, 'bank');
      else onOpenReview(); // like the app: Plaid success opens the review inbox
    });

  const handleSquareSync = () =>
    withBusy('square', () => {
      const rows = onSyncSquare();
      if (rows.length) onImport(rows, 'pos');
      setSyncMsg(rows.length ? t('demo.conn.squareSynced', { count: rows.length }) : t('demo.conn.squareSyncedNone'));
    });

  const openAccount = (id: ProviderId) => (id === 'square' ? onOpenReport() : onOpenReview());

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.conn.title')}</h1>
          <p className="dash-overview__sub">{t('demo.conn.subtitle')}</p>
        </div>
      </header>

      {syncMsg && (
        <div className="conn-sync-msg" role="status" onClick={() => setSyncMsg(null)}>
          {syncMsg}
        </div>
      )}

      <div className="conn-grid">
        {PROVIDERS.map((p) => {
          const st = state[p.id];
          const connected = st.connected;
          const syncAgo = connected ? timeAgo(st.lastSync) : null;
          const toReview = p.id === 'plaid' && connected ? st.pending.length : 0;
          const name = t(`demo.conn.${p.id}Name`);
          const recent = st.recent.slice(0, 3);
          const clickProps = connected
            ? {
                role: 'button',
                tabIndex: 0,
                onClick: () => openAccount(p.id),
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openAccount(p.id);
                  }
                },
                'aria-label': t('demo.conn.openAccount', { name }),
              }
            : {};
          return (
            <div className={'conn-card' + (connected ? ' conn-card--on' : '')} key={p.id}>
              <div className={'conn-card-main' + (connected ? ' conn-card-main--click' : '')} {...clickProps}>
                <div className={'conn-ico conn-ico--' + p.kind}>
                  <ProviderIcon kind={p.kind} />
                </div>
                <div className="conn-body">
                  <div className="conn-name-row">
                    <span className="conn-name">{name}</span>
                    {connected ? (
                      <span className="conn-chip conn-chip--on"><CheckGlyph />{t('demo.conn.connected')}</span>
                    ) : (
                      <span className="conn-chip">{t('demo.conn.notConnected')}</span>
                    )}
                    {toReview > 0 && <span className="conn-badge">{t('demo.conn.toReview', { n: toReview })}</span>}
                  </div>
                  <span className="conn-via">{t('demo.conn.via')} {p.via}</span>
                  <p className="conn-desc">{t(`demo.conn.${p.id}Desc`)}</p>
                  {connected && (st.institution || syncAgo) && (
                    <div className="conn-meta-row">
                      {st.institution && <span className="conn-meta">{st.institution}</span>}
                      {syncAgo && <span className="conn-meta conn-meta--sync">{t('demo.conn.lastSynced', { ago: syncAgo })}</span>}
                    </div>
                  )}
                </div>

                {connected ? (
                  <div className="conn-trail">
                    {p.id === 'square' && (
                      <button
                        type="button"
                        className="conn-icon-btn"
                        title={t('demo.conn.syncNow')}
                        aria-label={t('demo.conn.syncNow')}
                        onClick={(e) => { e.stopPropagation(); handleSquareSync(); }}
                        disabled={busyId === p.id}
                      >
                        {busyId === p.id ? <Loader2 className="dm-spin" width={16} height={16} /> : <RefreshGlyph />}
                      </button>
                    )}
                    <button
                      type="button"
                      className="conn-icon-btn conn-icon-btn--danger"
                      title={t('demo.conn.disconnect')}
                      aria-label={t('demo.conn.disconnect')}
                      onClick={(e) => { e.stopPropagation(); onDisconnect(p.id); }}
                      disabled={busyId === p.id}
                    >
                      <UnlinkGlyph />
                    </button>
                    <span className="conn-chevron" aria-hidden="true"><ChevronGlyph /></span>
                  </div>
                ) : (
                  <div className="conn-action">
                    <button type="button" className="conn-btn" onClick={() => handleConnect(p.id)} disabled={busyId === p.id}>
                      {busyId === p.id ? <Loader2 className="dm-spin" width={16} height={16} /> : t('demo.conn.connect')}
                    </button>
                  </div>
                )}
              </div>

              {connected && (p.id === 'plaid' || recent.length > 0) && (
                <div className="conn-extra">
                  {p.id === 'plaid' && (
                    <div className="conn-autosync">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={!!st.autoImportAll}
                        aria-label={t('demo.conn.autoSync')}
                        className={'conn-switch' + (st.autoImportAll ? ' conn-switch--on' : '')}
                        onClick={() => onToggleAutoSync(!st.autoImportAll)}
                      >
                        <span className="conn-switch-knob" />
                      </button>
                      <div className="conn-autosync-text">
                        <span className="conn-autosync-label">{t('demo.conn.autoSync')}</span>
                        <span className="conn-autosync-hint">{t('demo.conn.autoSyncHint')}</span>
                      </div>
                    </div>
                  )}
                  {recent.length > 0 && (
                    <div className="conn-preview">
                      <div className="conn-preview-head">{t('demo.conn.recentActivity')}</div>
                      {recent.map((tx) => {
                        const inc = p.id === 'square' ? true : tx.amount < 0;
                        return (
                          <div className="conn-preview-row" key={tx.key}>
                            <span className="conn-preview-name">{tx.name}</span>
                            <span className="conn-preview-date">{feedDateKey(tx.daysAgo)}</span>
                            <span className={'conn-preview-amt' + (inc ? ' conn-preview-amt--pos' : '')}>
                              {(inc ? '+$' : '-$') + Math.abs(tx.amount).toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                      <button type="button" className="conn-preview-all" onClick={() => openAccount(p.id)}>
                        {p.id === 'plaid'
                          ? st.pending.length
                            ? t('demo.conn.reviewAllN', { n: st.pending.length })
                            : t('demo.conn.reviewTransactions')
                          : t('demo.conn.viewAll')}
                        <ChevronGlyph />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="conn-note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        {t('demo.conn.securityNote')}
      </p>
    </div>
  );
}
