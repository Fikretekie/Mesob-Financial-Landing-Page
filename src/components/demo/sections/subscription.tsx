'use client'

import { Check, CreditCard } from 'lucide-react';

export function SubscriptionPlan() {
  const features = [
    'View Transaction History',
    'See Financial Reports (Basic Summary)',
    'Check Balance Sheet',
    'View Income Statement',
    'User Profile Management',
    'Download & View Receipts'
  ];
return (
  <div className="p-4 sm:p-6">
    <div className="max-w-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6 sm:mb-8">Subscription Plans</h1>
      
      <div className="bg-[#1e293b] rounded-xl p-6 sm:p-8 border border-slate-700/50">
        <div className="text-center mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Pricing Plan</h2>
        </div>

        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-3">
              <div className="flex-shrink-0">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
              <span className="text-slate-300 text-xs sm:text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-2xl sm:text-3xl font-bold text-blue-400">
            $29.99<span className="text-base sm:text-lg text-slate-400">/month</span>
          </p>
        </div>

        <button
          onClick={() => window.location.href = 'https://app.mesobfinancial.com/signup'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
        >
          Subscribe
        </button>
      </div>
    </div>
  </div>
);
}