'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/demo/ui/dialog';
import { Check } from 'lucide-react';
import headerData from '@/data/headerData';
import { useTranslation } from 'react-i18next';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup } from '@/utils/demoTracking';

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinueDemo: () => void;
  maxTransactions: number;
}

const { logo } = headerData;

const signupFeatureKeys = ['unlimited', 'reports', 'scanning', 'export', 'support'] as const;

export function SignupDialog({ open, onOpenChange, onContinueDemo, maxTransactions }: SignupDialogProps) {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="dm-signup-desc" style={{ maxWidth: 460 }}>
        <div className="dm-modal__head" style={{ textAlign: 'center', paddingRight: 24 }}>
          <div className="dm-signup__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt="" width={120} />
          </div>
          <DialogTitle className="dm-modal__title">{t('demo.signup.title')}</DialogTitle>
          <p id="dm-signup-desc" className="dm-modal__sub">
            {t('demo.signup.descriptionBefore')}{' '}
            <strong style={{ color: 'var(--text-1)' }}>{t('demo.industry.transactionsLimit', { count: maxTransactions })}</strong>{' '}
            {t('demo.signup.descriptionAfter')}{' '}
            <strong style={{ color: 'var(--text-1)' }}>{t('demo.signup.descriptionReports')}</strong>
          </p>
        </div>

        <div className="dm-modal__body">
          <div className="dm-signup__offer">
            <span className="mk-badge mk-badge--ok">{t('demo.signup.freeTrial')}</span>
            <p style={{ marginTop: 10, fontSize: '1.9rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              {t('demo.signup.free')}{' '}
              <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-3)' }}>{t('demo.signup.for30Days')}</span>
            </p>
            <p style={{ color: 'var(--text-3)', fontSize: '0.8rem', marginTop: 4 }}>
              {t('demo.signup.thenJust')}{' '}
              <span className="num" style={{ color: 'var(--accent)', fontWeight: 700 }}>$29.99</span>
              {t('demo.signup.perMonth')}
            </p>
            <ul className="dm-signup__features">
              {signupFeatureKeys.map((key) => (
                <li key={key}><Check aria-hidden />{t(`demo.signup.features.${key}`)}</li>
              ))}
            </ul>
          </div>

          <button type="button" className="mk-btn mk-btn--primary dm-save" onClick={() => goToSignup(industrySlug, 'limit_dialog')}>
            {t('demo.signup.startTrial')}
          </button>
          <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: '0.75rem', marginTop: -8 }}>{t('demo.signup.noCard')}</p>
          <button type="button" className="mk-btn mk-btn--muted-link" style={{ alignSelf: 'center' }} onClick={onContinueDemo}>
            {t('demo.signup.continueDemo')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
