'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/demo/ui/dialog';
import { Button } from '@/components/demo/ui/button';
import { Input } from '@/components/demo/ui/input';
import { Label } from '@/components/demo/ui/label';
import { Check, Sparkles } from 'lucide-react';

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinueDemo: () => void;
}

export function SignupDialog({ open, onOpenChange, onContinueDemo }: SignupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1e293b] border-slate-700 text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-1">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Unlock Full Access
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-1">
          <p className="text-slate-300" style={{color:'lightgrey', fontSize:14}}>
            Your demo allows up to <span className="text-white-400 font-bold">7 transaction.</span> Upgrade to continue tracking unlimited transactions and enjoy <span className="text-white-400 font-bold">tax-ready reports.</span>
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-xl p-4 border-2 border-cyan-500 ">
          <div className="text-center mb-2">
            <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
              FREE TRIAL
            </span>
            <h3 className="text-3xl font-bold text-white mb-1">
              FREE <span className="text-lg font-normal text-slate-400">for 30 days</span>
            </h3>
            <p className="text-slate-400 text-sm">Then just</p>
            <p className="text-2xl font-bold text-cyan-400">$29.99<span className="text-sm text-slate-400">/month</span></p>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              Unlimited transactions
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              Tax-Ready Financial Reports
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              Receipt scanning & storage
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              CSV backup & export
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              Priority email support
            </li>
          </ul>
        </div>

        <p  className="text-gray-100" style={{color:'gray',fontSize:14, textAlign:'center'}} >Take control of your finances without limits and save hours every week.</p>


        <Button
          onClick={() => {
            window.location.href = 'https://app.mesobfinancial.com/signup';
          }}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold"
        >
          Start Free 30-Day Trial
        </Button>

             <p className="text-center text-xs text-slate-500">
          No credit card required. Cancel anytime.
        </p>

        <button
          onClick={onContinueDemo}
          className="w-full text-slate-400 text-sm hover:text-slate-300  transition-colors"
        >
          Continue with limited demo
        </button>

   
      </DialogContent>
    </Dialog>
  );
}
