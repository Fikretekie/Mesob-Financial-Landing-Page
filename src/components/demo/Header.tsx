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
    <header className="h-16 bg-[#0f172a] flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white">{companyName}</h1>
        
        {/* Transaction Counter */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
          isAtLimit 
            ? 'bg-rose-500/20 text-rose-400' 
            : isNearLimit 
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-slate-800 text-slate-400'
        }`}>
          <span>Transactions: {transactionCount}/{maxTransactions}</span>
          {isNearLimit && <span className="animate-pulse">(Limit approaching)</span>}
          {isAtLimit && <span>(Demo limit reached)</span>}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onDownloadReport}
          className="text-slate-300 hover:bg-slate-700 hover:text-white gap-2"
        >
          <FileText className="w-4 h-4" />
          Download Report
        </Button>
        
        <Button
          onClick={onAddTransaction}
          disabled={isAtLimit}
          className={`gap-2 ${
            isAtLimit 
              ? 'bg-slate-600 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700'
          } text-white`}
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
        
        <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
          <User className="w-5 h-5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
