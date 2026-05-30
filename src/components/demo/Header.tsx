'use client'

import { useState } from 'react'
import { Plus, User, FileText, Pencil, Check } from 'lucide-react';
import { Button } from '@/components/demo/ui/button';
import { DemoLanguageSwitcher } from '@/components/demo/DemoLanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  companyName: string;
  onCompanyNameChange: (name: string) => void;
  onAddTransaction: () => void;
  onDownloadReport: () => void;
  transactionCount: number;
  maxTransactions: number;
}

export function Header({
  companyName,
  onCompanyNameChange,
  onAddTransaction,
  onDownloadReport,
  transactionCount,
  maxTransactions
}: HeaderProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(companyName)

  const isNearLimit = transactionCount >= maxTransactions - 2 && transactionCount < maxTransactions;
  const isAtLimit = transactionCount >= maxTransactions;

  const handleSubmit = () => {
    const trimmed = editValue.trim()
    if (trimmed) {
      onCompanyNameChange(trimmed)
    } else {
      setEditValue(companyName) // revert if empty
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') {
      setEditValue(companyName)
      setIsEditing(false)
    }
  }

  return (
    <header className="min-h-16 bg-[#101926] flex flex-wrap items-center justify-between px-4 md:px-6 py-3 md:py-0 pb-6 gap-3 md:gap-0">
      {/* Editable Business Name */}
      <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto pl-12 md:pl-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSubmit}
              autoFocus
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
              placeholder={t('demo.header.businessNamePlaceholder')}
            />
            <button
              onMouseDown={(e) => e.preventDefault()} // prevent blur before click
              onClick={handleSubmit}
              className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setEditValue(companyName)
              setIsEditing(true)
            }}
            className="flex items-center gap-2 group"
          >
            <h1 className="text-base md:text-xl font-semibold text-white truncate">
              {companyName}
            </h1>
            <Pencil className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
        <DemoLanguageSwitcher />

        <Button
          variant="outline"
          onClick={onDownloadReport}
          className="text-slate-300 hover:bg-slate-700 hover:text-white gap-1 md:gap-2 flex-1 md:flex-initial text-xs md:text-sm px-2 md:px-4 h-9"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">{t('demo.header.downloadReport')}</span>
          <span className="sm:hidden">{t('demo.header.reportShort')}</span>
        </Button>

        {/* Add Transaction + Counter grouped */}
        <div className="relative flex-1 md:flex-initial">
          <Button
            onClick={onAddTransaction}
            disabled={isAtLimit}
            className={`w-full gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4 h-9 ${isAtLimit
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
              } text-white`}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t('demo.header.addTransaction')}</span>
            <span className="sm:hidden">{t('demo.header.addShort')}</span>
          </Button>

          <span className={`absolute -bottom-5 left-0 right-0 text-center text-[10px] md:text-xs font-medium whitespace-nowrap ${isAtLimit
              ? 'text-rose-400'
              : isNearLimit
                ? 'text-amber-400'
                : 'text-slate-500'
            }`}>
            {t('demo.header.transactions', { current: transactionCount, max: maxTransactions })}
            {isNearLimit && <span className="hidden lg:inline animate-pulse">{t('demo.header.limitApproaching')}</span>}
            {isAtLimit && <span className="hidden lg:inline">{t('demo.header.demoLimitReached')}</span>}
          </span>
        </div>

        <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors flex-shrink-0">
          <User className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
        </button>
      </div>

    </header>
  );
}
