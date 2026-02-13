'use client'

import { TrendingDown, DollarSign, CreditCard, TrendingUp, type LucideIcon } from 'lucide-react';
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
  cash: DollarSign,
  expense: TrendingDown,
  payable: CreditCard,
  revenue: TrendingUp,
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
    <div 
    className="bg-[#1e293b] rounded-lg p-4"
    style={{ borderBottom: `3px solid ${chartColor}` }}
  >
      <div className="flex items-start justify-between">
        <div>
         <p className="text-white text-[12px] font-medium uppercase tracking-wider">{title}</p>
          <h3 style={{fontSize:"24px"}} className="font-bold text-white mt-2 mb-1">{formatCurrency(amount)}</h3>
          {change && (
            <p className={cn(
              'text-xs',
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
     
        >
          <Icon className="w-8 h-8" style={{ color: chartColor}} />
        </div>
      </div>
    </div>
  );
}
