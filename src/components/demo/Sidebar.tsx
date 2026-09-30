'use client'

import {
  LayoutDashboard,
  FileText,
  Receipt,
  User,
  Database,
  CreditCard,
  FolderClosed,
  MapPin,
  Map as MapIcon,
  Fuel,
  BarChart3,
  Link2,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import type { ViewType } from '@/types';
import type { DemoFeature } from '@/data/demoIndustryExtras';
import headerData from '@/data/headerData';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SidebarItem {
  id: ViewType;
  labelKey: string;
  icon: LucideIcon;
  feature?: DemoFeature;
  locked?: boolean;
  soon?: boolean;
}

// Same order as the app's customer sidebar. Industry-specific entries only
// show when the industry has that feature; Connections is the planned
// bank/POS sync, shown to every industry as "coming soon".
const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', labelKey: 'demo.sidebar.dashboard', icon: LayoutDashboard },
  { id: 'financial-report', labelKey: 'demo.sidebar.financialReport', icon: FileText },
  { id: 'receipts', labelKey: 'demo.sidebar.receipts', icon: Receipt, locked: true },
  { id: 'documents', labelKey: 'demo.app.nav.documents', icon: FolderClosed, feature: 'documents' },
  { id: 'mileage-tracker', labelKey: 'demo.app.nav.mileageTracker', icon: MapPin, feature: 'mileage' },
  { id: 'trip-history', labelKey: 'demo.app.nav.tripHistory', icon: MapIcon, feature: 'trips' },
  { id: 'fuel-purchase', labelKey: 'demo.app.nav.fuelPurchase', icon: Fuel, feature: 'fuel' },
  { id: 'ifta-report', labelKey: 'demo.app.nav.iftaReport', icon: BarChart3, feature: 'ifta' },
  { id: 'connections', labelKey: 'demo.connections.nav', icon: Link2, soon: true },
  { id: 'user-profile', labelKey: 'demo.sidebar.userProfile', icon: User },
  { id: 'backup-csv', labelKey: 'demo.sidebar.backupCsv', icon: Database, locked: true },
  { id: 'subscribe', labelKey: 'demo.sidebar.subscribe', icon: CreditCard },
];

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isOpen: boolean;
  onClose: () => void;
  maxTransactions: number;
  features: DemoFeature[];
}

const { logo } = headerData;

export function Sidebar({ currentView, onViewChange, isOpen, onClose, maxTransactions, features }: SidebarProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const items = sidebarItems.filter((item) => !item.feature || features.includes(item.feature));

  return (
    <>
      {isOpen && <button type="button" className="dm-scrim" aria-label={t('demo.sidebar.toggleMenu')} onClick={onClose} />}

      <aside className={`dm-sidebar${isOpen ? ' is-open' : ''}`} aria-label="Demo navigation">
        <div className="dm-sidebar__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.src} alt="Meksova" />
        </div>

        <nav className="dm-nav">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => { onViewChange(item.id); onClose(); }}
                className={`dm-nav__link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon aria-hidden />
                <span>{t(item.labelKey)}</span>
                {item.locked && <Lock className="dm-nav__lock" aria-hidden />}
                {item.soon && <span className="mk-badge mk-badge--info dm-nav__soon">{t('demo.connections.soon')}</span>}
              </button>
            );
          })}
        </nav>

        <div className="dm-demo-note">
          <span className="mk-eyebrow">{t('demo.sidebar.demoMode')}</span>
          <p>{t('demo.sidebar.limitedTransactions', { count: maxTransactions })}</p>
        </div>
      </aside>
    </>
  );
}
