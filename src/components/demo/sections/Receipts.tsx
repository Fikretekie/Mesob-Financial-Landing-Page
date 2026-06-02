'use client'

import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Receipts() {
  const { t } = useTranslation();

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-[#1e293b] rounded-xl p-6 sm:p-8 border border-slate-700/50 text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">{t('demo.receipts.title')}</h2>
        <p className="text-sm sm:text-base text-slate-400">{t('demo.receipts.description')}</p>
      </div>
    </div>
  );
}
