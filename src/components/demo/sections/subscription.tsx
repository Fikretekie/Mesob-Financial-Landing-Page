'use client'

import { Check, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup } from '@/utils/demoTracking';

type SubscriptionFeature = {
  title: string;
  description: string;
};

export function SubscriptionPlan() {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();
  const features = t('demo.subscription.features', { returnObjects: true }) as SubscriptionFeature[];

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">
            {t('demo.subscription.title')} <span style={{ color: 'var(--accent)' }}>{t('demo.subscription.proPlan')}</span>
          </h1>
          <p className="dash-overview__sub">
            {t('demo.subscription.introBefore')}{' '}
            <strong style={{ color: 'var(--text-1)' }}>{t('demo.subscription.introHighlight')}</strong>{' '}
            {t('demo.subscription.introAfter')}{' '}
            {t('demo.subscription.afterTrialBefore')}{' '}
            <strong style={{ color: 'var(--text-1)' }}>{t('demo.subscription.afterTrialPrice')}</strong>
            {t('demo.subscription.afterTrialEnd')}
          </p>
        </div>
      </header>

      <section className="mk-card dm-plan">
        <div className="dash-panel-head">
          <span className="mk-chip mk-chip--sm" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
            <CreditCard aria-hidden />
          </span>
          <span className="mk-eyebrow">{t('demo.subscription.proPlan')}</span>
        </div>

        <p className="dm-plan__price">
          {t('demo.subscription.price')} <span className="dm-plan__per">{t('demo.subscription.perMonth')}</span>
        </p>

        <ul className="dm-checks" style={{ margin: '20px 0' }}>
          {Array.isArray(features) && features.map((feature, index) => (
            <li key={index}>
              <Check aria-hidden />
              <span><strong>{feature.title}</strong> {feature.description}</span>
            </li>
          ))}
        </ul>

        <p style={{ color: 'var(--text-3)', fontSize: '0.85rem', marginBottom: 18 }}>{t('demo.subscription.pitch')}</p>

        <button type="button" className="mk-btn mk-btn--primary mk-btn--block" onClick={() => goToSignup(industrySlug, 'subscription')}>
          {t('demo.subscription.cta')}
        </button>
        <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', textAlign: 'center', marginTop: 12 }}>
          {t('demo.subscription.footer')}
        </p>
      </section>
    </div>
  );
}
