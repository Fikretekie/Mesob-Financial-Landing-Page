'use client'

import { Plus, FileDown, Menu } from 'lucide-react';
import { DemoLanguageSwitcher } from '@/components/demo/DemoLanguageSwitcher';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

interface HeaderProps {
  pageLabel: string;
  companyName: string;
  onMenuClick: () => void;
  onAddTransaction: () => void;
  onDownloadReport: () => void;
  onAccountClick: () => void;
  businessSwitcher?: ReactNode;
  transactionCount: number;
  maxTransactions: number;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'M';

// Mirrors the app's glass navbar: language pill, page label, report + add
// actions, account chip. The demo adds the transaction counter under "Add".
export function Header({
  pageLabel,
  companyName,
  onMenuClick,
  onAddTransaction,
  onDownloadReport,
  onAccountClick,
  businessSwitcher,
  transactionCount,
  maxTransactions,
}: HeaderProps) {
  const { t } = useTranslation();

  const isAtLimit = transactionCount >= maxTransactions;
  const isNearLimit = !isAtLimit && transactionCount >= maxTransactions - 2;

  return (
    <header className="dm-navbar">
      <button type="button" className="dm-navbar__menu" onClick={onMenuClick} aria-label={t('demo.sidebar.toggleMenu')}>
        <Menu aria-hidden />
      </button>
      <DemoLanguageSwitcher />
      <span className="dm-navbar__page">{pageLabel}</span>
      <span className="dm-navbar__spacer" />
      {companyName && <span className="dm-navbar__company" title={companyName}>{companyName}</span>}

      <div className="dm-navbar__actions">
        <button type="button" className="mk-btn mk-btn--ghost mk-btn--sm" onClick={onDownloadReport}>
          <FileDown aria-hidden />
          <span>{t('demo.header.downloadReport')}</span>
        </button>

        <div className="dm-navbar__add">
          <button
            type="button"
            className="mk-btn mk-btn--primary mk-btn--sm"
            onClick={onAddTransaction}
            disabled={isAtLimit}
          >
            <Plus aria-hidden />
            <span>{t('demo.header.addTransaction')}</span>
          </button>
          <span className={`dm-navbar__count${isAtLimit ? ' is-full' : isNearLimit ? ' is-near' : ''}`}>
            {t('demo.header.transactions', { current: transactionCount, max: maxTransactions })}
          </span>
        </div>
      </div>

      {businessSwitcher}
      <button type="button" className="dm-account" onClick={onAccountClick} title={companyName || undefined}>
        <span className="dm-account__avatar" aria-hidden>{initials(companyName)}</span>
        <span className="dm-account__name">{t('demo.header.account')}</span>
      </button>
    </header>
  );
}
