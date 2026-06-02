'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/demo/ui/dialog';
import { Button } from '@/components/demo/ui/button';
import { Check, Sparkles } from 'lucide-react';
import Image from "next/image";
import headerData from '@/data/headerData';
import { useTranslation } from 'react-i18next';

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinueDemo: () => void;
}

const { logo } = headerData;

const signupFeatureKeys = ['unlimited', 'reports', 'scanning', 'export', 'support'] as const;

export function SignupDialog({ open, onOpenChange, onContinueDemo }: SignupDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="
        bg-[#1e293b] border-slate-700 text-white 
        w-[95vw] max-w-md 
        max-h-[85vh] 
        overflow-y-auto 
        p-3 sm:p-6
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-2xl
      ">
        <DialogHeader>
          <div className="flex items-center justify-center mb-1">
            <Image src={logo.src} alt="" width={70} height={70} />
          </div>
          <DialogTitle className="text-lg sm:text-2xl font-bold text-center">
            {t('demo.signup.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center mb-1">
          <p className="text-slate-300 text-xs">
            {t('demo.signup.descriptionBefore')}{' '}
            <span className="text-white font-bold">{t('demo.signup.descriptionTransactions')}</span>{' '}
            {t('demo.signup.descriptionAfter')}{' '}
            <span className="text-white font-bold">{t('demo.signup.descriptionReports')}</span>
          </p>
        </div>

        <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-xl p-2.5 sm:p-4 border-2 border-cyan-500">
          <div className="text-center mb-2">
            <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1">
              {t('demo.signup.freeTrial')}
            </span>
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-0.5">
              {t('demo.signup.free')}{' '}
              <span className="text-sm sm:text-lg font-normal text-slate-400">{t('demo.signup.for30Days')}</span>
            </h3>
            <p className="text-slate-400 text-xs">{t('demo.signup.thenJust')}</p>
            <p className="text-lg sm:text-2xl font-bold text-cyan-400">
              $29.99<span className="text-xs text-slate-400">{t('demo.signup.perMonth')}</span>
            </p>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 sm:gap-3">
            {signupFeatureKeys.map((key) => (
              <li key={key} className="flex items-center gap-1.5 text-xs text-slate-300">
                <div className="w-4 h-4 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                </div>
                {t(`demo.signup.features.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-center text-slate-400 hidden sm:block">
          {t('demo.signup.tagline')}
        </p>

        <Button
          onClick={() => {
            window.location.href = 'https://app.meksova.com/signup';
          }}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold text-sm py-2.5"
        >
          {t('demo.signup.startTrial')}
        </Button>

        <p className="text-center text-xs text-slate-500">
          {t('demo.signup.noCard')}
        </p>

        <button
          onClick={onContinueDemo}
          className="w-full text-slate-400 text-xs hover:text-slate-300 transition-colors pb-1"
        >
          {t('demo.signup.continueDemo')}
        </button>

      </DialogContent>
    </Dialog>
  );
}
