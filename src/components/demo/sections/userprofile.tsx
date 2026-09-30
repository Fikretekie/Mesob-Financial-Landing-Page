'use client'

import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIndustryCopy } from '@/components/demo/IndustryIntro';

interface UserProfileProps {
  companyName: string;
  onCompanyNameChange: (name: string) => void;
  industryLocaleId: string;
}

// Read-only account page, except the business name, which feeds the navbar
// and the PDF report.
export function UserProfile({ companyName, onCompanyNameChange, industryLocaleId }: UserProfileProps) {
  const { t } = useTranslation();
  const { title: industryTitle } = useIndustryCopy(industryLocaleId);
  const [draft, setDraft] = useState(companyName);

  useEffect(() => setDraft(companyName), [companyName]);

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed) onCompanyNameChange(trimmed);
    else setDraft(companyName);
  };

  const locked = (id: string, label: string, value: string) => (
    <div className="dm-field">
      <label className="dm-label" htmlFor={id}>{label}</label>
      <input id={id} className="dm-input" value={value} disabled readOnly />
    </div>
  );

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.userProfile.title')}</h1>
        </div>
      </header>

      <section className="mk-card">
        <div className="dm-stack" style={{ gap: 16 }}>
          <div className="dm-form-grid">
            <div className="dm-field">
              <label className="dm-label" htmlFor="dm-company">{t('demo.userProfile.companyName')}</label>
              <input
                id="dm-company"
                className="dm-input"
                value={draft}
                placeholder={t('demo.header.businessNamePlaceholder')}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
              />
            </div>
            {locked('dm-type', t('demo.userProfile.businessType'), industryTitle)}
            {locked('dm-name', t('demo.userProfile.name'), 'Demo User')}
            {locked('dm-email', t('demo.userProfile.email'), 'demo@meksova.com')}
          </div>

          <div className="dm-form-grid dm-form-grid--3">
            {locked('dm-cash', t('demo.userProfile.cashBalance'), '$0.00')}
            {locked('dm-debt', t('demo.userProfile.outstandingDebt'), '$0.00')}
            {locked('dm-items', t('demo.userProfile.valuableItems'), '$0.00')}
          </div>

          <div className="dm-locked">
            <Lock aria-hidden />
            <span style={{ flex: '1 1 240px' }}>{t('demo.industry.profileLocked')}</span>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" className="mk-btn mk-btn--primary" disabled>{t('demo.userProfile.editProfile')}</button>
            <button type="button" className="mk-btn mk-btn--danger" disabled>{t('demo.userProfile.deleteAccount')}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
