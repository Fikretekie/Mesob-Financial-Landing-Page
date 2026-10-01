'use client'

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { IndustryIcon } from '@/components/demo/IndustryIcon';

interface IndustryIntroProps {
  localeId: string;
  slug: string;
  hasSamples: boolean;
  transactionCount: number;
  maxTransactions: number;
  onClearSamples: () => void;
  scanButton?: ReactNode;
}

type BusinessTypeCopy = { id: string; title: string; text: string };

export function useIndustryCopy(localeId: string) {
  const { t } = useTranslation();
  const types = t('businessTypes', { returnObjects: true });
  const match = Array.isArray(types)
    ? (types as BusinessTypeCopy[]).find((type) => type.id === localeId)
    : undefined;
  return { title: match?.title ?? localeId, text: match?.text ?? '' };
}

// The dashboard's page header, in the app's .dash-overview layout.
export function IndustryIntro({ localeId, slug, hasSamples, transactionCount, maxTransactions, onClearSamples, scanButton }: IndustryIntroProps) {
  const { t } = useTranslation();
  const { title, text } = useIndustryCopy(localeId);

  return (
    <header className="dash-overview">
      <div className="dash-overview__main">
        <div className="dash-panel-head" style={{ marginBottom: 10 }}>
          <span className="mk-chip mk-chip--sm" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
            <IndustryIcon slug={slug} />
          </span>
          <span className="mk-eyebrow">{t('demo.industry.eyebrow')}</span>
        </div>
        <h1 className="dash-overview__title">{t('demo.industry.title', { industry: title })}</h1>
        {text && <p className="dash-overview__sub">{text}</p>}
        <p className="dash-overview__note">
          {hasSamples
            ? t('demo.industry.samplesNote', { count: maxTransactions })
            : t('demo.industry.ownNote', { count: maxTransactions })}
        </p>
        <div className="dash-overview__links">
          {scanButton}
          <Link href="/demo/" className="mk-btn mk-btn--link">{t('demo.industry.change')} →</Link>
          {hasSamples && (
            <button type="button" className="mk-btn mk-btn--muted-link" onClick={onClearSamples}>
              {t('demo.industry.clearSamples')}
            </button>
          )}
        </div>
      </div>
      <div className="dash-overview__side">
        <span className={`dash-overview__meta${hasSamples ? ' dash-overview__meta--sample' : ''}`}>
          {hasSamples ? t('demo.industry.sampleMeta') : t('demo.industry.demoMeta')}
          {' · '}
          {transactionCount}/{maxTransactions}
        </span>
      </div>
    </header>
  );
}
