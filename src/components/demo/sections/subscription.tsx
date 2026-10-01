'use client'

import { useState } from 'react';
import { Check, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup, trackDemoEvent } from '@/utils/demoTracking';

type SubscriptionFeature = {
  title: string;
  description: string;
};

// Same two plans as the app's Subscribe page: monthly, or yearly (which
// works out to $24.99 a month — the app shows it as "Save 17%").
export const PLAN_PRICES = {
  monthly: '$29.99',
  yearly: '$299.99',
  yearlyPerMonth: '$24.99',
};

type Cycle = 'monthly' | 'yearly';

export function SubscriptionPlan() {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();
  const [cycle, setCycle] = useState<Cycle>('monthly');
  const features = t('demo.subscription.features', { returnObjects: true }) as SubscriptionFeature[];
  const yearly = cycle === 'yearly';

  const choose = (next: Cycle) => {
    setCycle(next);
    trackDemoEvent('demo_plan_toggle', { industry: industrySlug, cycle: next });
  };

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
            <strong style={{ color: 'var(--text-1)' }}>
              {yearly ? t('demo.subscription.afterTrialPriceYearly') : t('demo.subscription.afterTrialPrice')}
            </strong>
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

        <div className="dm-cycle" role="radiogroup" aria-label={t('demo.subscription.proPlan')}>
          <button type="button" role="radio" aria-checked={!yearly} className={`dm-cycle__pill${!yearly ? ' is-active' : ''}`} onClick={() => choose('monthly')}>
            {t('demo.subscription.monthly')}
          </button>
          <button type="button" role="radio" aria-checked={yearly} className={`dm-cycle__pill${yearly ? ' is-active' : ''}`} onClick={() => choose('yearly')}>
            {t('demo.subscription.yearly')} <span className="mk-badge mk-badge--ok">{t('demo.subscription.save')}</span>
          </button>
        </div>

        {/* Yearly leads with the monthly equivalent; the actual yearly charge sits right under it. */}
        <p className="dm-plan__price">
          {yearly ? PLAN_PRICES.yearlyPerMonth : PLAN_PRICES.monthly}{' '}
          <span className="dm-plan__per">{t('demo.subscription.perMonth')}</span>
        </p>
        <p className="dm-plan__note">
          {yearly ? t('demo.subscription.billedYearly', { price: PLAN_PRICES.yearly }) : ' '}
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

        <button type="button" className="mk-btn mk-btn--primary mk-btn--block" onClick={() => goToSignup(industrySlug, `subscription_${cycle}`)}>
          {t('demo.subscription.cta')}
        </button>
        <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', textAlign: 'center', marginTop: 12 }}>
          {t('demo.subscription.footer')}
        </p>
      </section>
    </div>
  );
}
