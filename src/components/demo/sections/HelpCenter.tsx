'use client'

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CONTACT, SOCIALS } from '@/data/site';

// Mirrors app.meksova.com's Help & Support (src/views/HelpCenter.js): searchable
// how-to guides, a plain-language glossary, and real contact details.
// Strings are the app's own help.* keys, copied to demo.help.* in every locale.
const GUIDES = ['addTransaction', 'scanReceipt', 'bill', 'goods', 'equipment', 'mileage', 'connect', 'readReport', 'downloadReport', 'currency', 'team', 'subscription'];
const GLOSSARY = ['revenue', 'expense', 'cashOnHand', 'moneyInOut', 'payable', 'netIncome', 'estimatedTax', 'depreciation', 'fixedAsset', 'inventory', 'cogs', 'grossProfit', 'accrualVsCash', 'assetsLiabEquity', 'balanceSheet', 'incomeStatement'];

const SOCIAL_PATHS: Record<string, string> = {
  facebook: 'M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9H17l.5-4h-4V8.8c0-.5.3-.8.5-.8Z',
  instagram: 'M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm4.5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.2-1.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  tiktok: 'M15.5 3c.3 2.3 1.7 3.8 4 4v3.2c-1.5 0-2.8-.4-4-1.2v6.2A5.8 5.8 0 1 1 9.7 9.4v3.3a2.6 2.6 0 1 0 2.6 2.6V3h3.2Z',
};

const Chevron = ({ open }: { open: boolean }) => (
  <svg className={`hc-chevron${open ? ' is-open' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface Item { id: string; title: string; body: string }

export function HelpCenter() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const q = query.trim().toLowerCase();

  const matches = (it: Item) => !q || it.title.toLowerCase().includes(q) || it.body.toLowerCase().includes(q);
  const guides = useMemo(
    () => GUIDES.map((id) => ({ id, title: t(`demo.help.guides.${id}.q`), body: t(`demo.help.guides.${id}.a`) })).filter(matches),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, q],
  );
  const glossary = useMemo(
    () => GLOSSARY.map((id) => ({ id, title: t(`demo.help.glossary.${id}.term`), body: t(`demo.help.glossary.${id}.def`) })).filter(matches),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, q],
  );

  const renderAccordion = (items: Item[], prefix: string) =>
    items.map((it) => {
      const key = `${prefix}-${it.id}`;
      const open = openId === key;
      return (
        <div className={`hc-item${open ? ' is-open' : ''}`} key={key}>
          <button type="button" className="hc-q" aria-expanded={open} aria-controls={`${key}-a`} onClick={() => setOpenId(open ? null : key)}>
            <span>{it.title}</span>
            <Chevron open={open} />
          </button>
          {open && <div className="hc-a" id={`${key}-a`}>{it.body}</div>}
        </div>
      );
    });

  const noResults = q && guides.length === 0 && glossary.length === 0;

  return (
    <div className="hc-wrap">
      <div className="hc-hero">
        <h1 className="hc-title">{t('demo.help.title')}</h1>
        <p className="hc-subtitle">{t('demo.help.subtitle')}</p>
        <div className="hc-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('demo.help.searchPlaceholder')} aria-label={t('demo.help.searchPlaceholder')} />
        </div>
      </div>

      {noResults && <div className="hc-empty" role="status">{t('demo.help.noResults')}</div>}

      {guides.length > 0 && (
        <section className="hc-section">
          <h2 className="hc-section-title">{t('demo.help.guidesTitle')}</h2>
          <div className="hc-list">{renderAccordion(guides, 'g')}</div>
        </section>
      )}

      {glossary.length > 0 && (
        <section className="hc-section">
          <h2 className="hc-section-title">{t('demo.help.glossaryTitle')}</h2>
          <div className="hc-list">{renderAccordion(glossary, 't')}</div>
        </section>
      )}

      <section className="hc-section">
        <h2 className="hc-section-title">{t('demo.help.contactTitle')}</h2>
        <p className="hc-contact-intro">{t('demo.help.contactIntro')}</p>
        <div className="hc-contact-grid">
          <a className="hc-contact-card" href={CONTACT.phoneHref}>
            <span className="hc-contact-ico hc-contact-ico--phone">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </span>
            <span className="hc-contact-main">
              <span className="hc-contact-label">{t('demo.help.phone')}</span>
              <span className="hc-contact-value" dir="ltr">{CONTACT.phone}</span>
            </span>
          </a>
          <a className="hc-contact-card" href={`mailto:${CONTACT.email}`}>
            <span className="hc-contact-ico hc-contact-ico--email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
            </span>
            <span className="hc-contact-main">
              <span className="hc-contact-label">{t('demo.help.email')}</span>
              <span className="hc-contact-value">{CONTACT.email}</span>
            </span>
          </a>
        </div>
        <p className="hc-follow-label">{t('demo.help.followUs')}</p>
        <div className="hc-socials">
          {SOCIALS.map((s) => (
            <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={SOCIAL_PATHS[s.id]} /></svg>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
