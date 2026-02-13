'use client'

import { Plus, User, FileText } from 'lucide-react';
import { Button } from '@/components/demo/ui/button';

interface HeaderProps {
  companyName: string;
  onAddTransaction: () => void;
  onDownloadReport: () => void;
  transactionCount: number;
  maxTransactions: number;
}

export function Header({ 
  companyName, 
  onAddTransaction, 
  onDownloadReport,
  transactionCount,
  maxTransactions 
}: HeaderProps) {
  const isNearLimit = transactionCount >= maxTransactions - 2 && transactionCount < maxTransactions;
  const isAtLimit = transactionCount >= maxTransactions;

  return (
    <header className="min-h-16 bg-[#101926] flex flex-wrap items-center justify-between px-4 md:px-6 py-3 md:py-0 gap-3 md:gap-0">
      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto pl-12 md:pl-0">
        <h1 className="text-base md:text-xl font-semibold text-white truncate">{companyName}</h1>
        
        {/* Transaction Counter */}
        <div className={`flex items-center gap-1 md:gap-2 px-2 pt-4  md:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
          isAtLimit 
            ? 'bg-rose-500/20 text-rose-400' 
            : isNearLimit 
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-slate-800 text-slate-400'
        }`}>
          <span>{transactionCount}/{maxTransactions}</span>
          {isNearLimit && <span className="hidden lg:inline animate-pulse">(Limit approaching)</span>}
          {isAtLimit && <span className="hidden lg:inline">(Demo limit reached)</span>}
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
        <Button
          variant="outline"
          onClick={onDownloadReport}
          className="text-slate-300 hover:bg-slate-700 hover:text-white gap-1 md:gap-2 flex-1 md:flex-initial text-xs md:text-sm px-2 md:px-4 h-9"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Download Report</span>
          <span className="sm:hidden">Report</span>
        </Button>
        
        <Button
          onClick={onAddTransaction}
          disabled={isAtLimit}
          className={`gap-1 md:gap-2 flex-1 md:flex-initial text-xs md:text-sm px-2 md:px-4 h-9 ${
            isAtLimit 
              ? 'bg-slate-600 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700'
          } text-white`}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </Button>
        
        <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors flex-shrink-0">
          <User className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}