'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/demo/ui/dialog';
import { Button } from '@/components/demo/ui/button';
import { Check, Sparkles } from 'lucide-react';

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinueDemo: () => void;
}

export function SignupDialog({ open, onOpenChange, onContinueDemo }: SignupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1e293b] border-slate-700 text-white max-w-md w-[92vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <div className="flex items-center justify-center mb-1">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
            Unlock Full Access
          </DialogTitle>
        </DialogHeader>

        <div className="text-center mb-1">
          <p className="text-slate-300 text-xs sm:text-sm">
            Your demo allows up to <span className="text-white font-bold">7 transactions.</span> Upgrade to continue tracking unlimited transactions and enjoy <span className="text-white font-bold">tax-ready reports.</span>
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-xl p-3 sm:p-4 border-2 border-cyan-500">
          <div className="text-center mb-2">
            <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
              FREE TRIAL
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              FREE <span className="text-base sm:text-lg font-normal text-slate-400">for 30 days</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">Then just</p>
            <p className="text-xl sm:text-2xl font-bold text-cyan-400">$29.99<span className="text-xs sm:text-sm text-slate-400">/month</span></p>
          </div>

          <ul className="space-y-2 sm:space-y-3">
            {[
              'Unlimited transactions',
              'Tax-Ready Financial Reports',
              'Receipt scanning & storage',
              'CSV backup & export',
              'Priority email support',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs sm:text-sm text-center text-slate-400">
          Take control of your finances without limits and save hours every week.
        </p>

        <Button
          onClick={() => {
            window.location.href = 'https://app.mesobfinancial.com/signup';
          }}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold text-sm sm:text-base py-2.5 sm:py-3"
        >
          Start Free 30-Day Trial
        </Button>

        <p className="text-center text-xs text-slate-500">
          No credit card required. Cancel anytime.
        </p>

        <button
          onClick={onContinueDemo}
          className="w-full text-slate-400 text-xs sm:text-sm hover:text-slate-300 transition-colors pb-1"
        >
          Continue with limited demo
        </button>
      </DialogContent>
    </Dialog>
  );
}