'use client'

import { Receipt, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup } from '@/utils/demoTracking';

export function Receipts() {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.receipts.title')}</h1>
        </div>
      </header>

      <section className="mk-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
        <span className="mk-chip" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', margin: '0 auto 16px' }}>
          <Receipt aria-hidden />
        </span>
        <p style={{ color: 'var(--text-2)', maxWidth: 520, margin: '0 auto 20px' }}>{t('demo.receipts.description')}</p>
        <button type="button" className="mk-btn mk-btn--primary" onClick={() => goToSignup(industrySlug, 'receipts')}>
          <Lock aria-hidden />{t('demo.addTransaction.upgradeToPro')}
        </button>
      </section>
    </div>
  );
}
