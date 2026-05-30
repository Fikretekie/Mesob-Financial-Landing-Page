'use client'

import { LayoutDashboard, FileText, Receipt, X, Menu, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ViewType } from '@/types';
import headerData from '@/data/headerData';
import { Image } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SidebarItem {
  id: ViewType;
  labelKey: string;
  icon: LucideIcon;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', labelKey: 'demo.sidebar.dashboard', icon: LayoutDashboard },
  { id: 'financial-report', labelKey: 'demo.sidebar.financialReport', icon: FileText },
  { id: 'receipts', labelKey: 'demo.sidebar.receipts', icon: Receipt },
  { id: 'user-profile', labelKey: 'demo.sidebar.userProfile', icon: Receipt },
  { id: 'backup-csv', labelKey: 'demo.sidebar.backupCsv', icon: Receipt },
  { id: 'subscribe', labelKey: 'demo.sidebar.subscribe', icon: Receipt },
];

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const { logo } = headerData;

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when view changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleViewChange = (view: ViewType) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-800 text-white p-2 rounded-lg shadow-lg border border-slate-700"
        aria-label={t('demo.sidebar.toggleMenu')}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile by default, always visible on desktop */}
      <div
        className={cn(
          "w-64 bg-[#101926] border-r border-slate-800 flex flex-col h-full transition-transform duration-300 ease-in-out md:translate-x-0",
          // Mobile: fixed and slides in/out
          "fixed md:static inset-y-0 left-0 z-40",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo - Centered */}
        <div className="p-2 flex items-center justify-center">
          <Image src={logo.src} alt="" width={120} height={120} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleViewChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-full',
                  isActive
                    ? 'bg-white/95 text-cyan-500 shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                )}
              >
                <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-cyan-500' : 'text-slate-400')} />
                <span className="text-left">{t(item.labelKey)}</span>
              </button>
            );
          })}
        </nav>

        {/* Demo Badge */}
        <div className="p-4">
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg p-3">
            <p className="text-amber-400 text-xs font-medium mb-2">{t('demo.sidebar.demoMode')}</p>
            <p className="text-slate-400 text-xs">{t('demo.sidebar.limitedTransactions', { count: 7 })}</p>
          </div>
        </div>
      </div>
    </>
  );
}
