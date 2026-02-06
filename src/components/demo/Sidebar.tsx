'use client'

import { LayoutDashboard, FileText, Receipt, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ViewType } from '@/types';

interface SidebarItem {
  id: ViewType;
  label: string;
  icon: LucideIcon;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
  { id: 'financial-report', label: 'FINANCIAL REPORT', icon: FileText },
  // { id: 'receipts', label: 'RECEIPTS', icon: Receipt },
];

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm">MESOB</span>
          <span className="text-slate-400 text-xs">Financial</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl',
                isActive
                  ? 'bg-slate-800/80 text-cyan-400 border-l-[3px] border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-cyan-400' : 'text-slate-500')} />
              <span className="text-left">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Demo Badge */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg p-3">
          <p className="text-amber-400 text-xs font-medium mb-2">Demo Mode</p>
          <p className="text-slate-400 text-xs">Limited to 7 transactions</p>
        </div>
      </div>
    </div>
  );
}
