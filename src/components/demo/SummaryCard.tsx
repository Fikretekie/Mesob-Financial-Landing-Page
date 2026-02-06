'use client'

import { TrendingDown, DollarSign, CreditCard, Wallet, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  amount: number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: 'cash' | 'expense' | 'payable' | 'revenue';
  chartColor: string;
}

const iconMap: Record<string, LucideIcon> = {
  cash: Wallet,
  expense: TrendingDown,
  payable: CreditCard,
  revenue: DollarSign,
};

export function SummaryCard({ title, amount, change, changeType = 'neutral', icon, chartColor }: SummaryCardProps) {
  const Icon = iconMap[icon];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-[#1e293b] rounded-xl p-5 border border-slate-700/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-2">{formatCurrency(amount)}</h3>
          {change && (
            <p className={cn(
              'text-xs mt-1',
              changeType === 'positive' && 'text-emerald-400',
              changeType === 'negative' && 'text-rose-400',
              changeType === 'neutral' && 'text-slate-400'
            )}>
              {change}
            </p>
          )}
        </div>
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${chartColor}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: chartColor }} />
        </div>
      </div>
    </div>
  );
}
