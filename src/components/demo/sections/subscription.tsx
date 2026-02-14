'use client'

import { Check } from 'lucide-react';

export function SubscriptionPlan() {
  const features = [
    {
      title: 'Unlimited Transactions:',
      description: 'Track every transaction without limits — always know your real profit.'
    },
    {
      title: 'Tax-Ready Financial Reports:',
      description: 'Instantly generate clear reports to stay prepared for tax season and make smarter decisions.'
    },
    {
      title: 'Export & Download Receipts:',
      description: 'Keep all your receipts organized and audit-ready.'
    },
    {
      title: 'User Profile Management:',
      description: 'Manage your business info easily, no confusion or lost data.'
    }
  ];

  return (
    <div className="p-4 sm:p-6 flex items-start justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-lg mt-8">
        {/* Card with gradient border */}
        <div className="relative rounded-2xl p-[1px] from-blue-500 via-purple-500 to-blue-500">
          <div className="bg-[#1e293b] rounded-2xl p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Full Access with <span className="text-blue-400">Pro Plan</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Enjoy <span className="font-semibold text-white">unlimited access free for 30 days</span> — no credit card required.
                <br />
                After your trial, your subscription continues automatically at{' '}
                <span className="font-semibold text-white">$29.99/month</span>.
              </p>
            </div>

            {/* Features */}
            <div className="bg-slate-800/50 rounded-xl p-4 sm:p-5 mb-6 ">
              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold text-white">{feature.title}</span>{' '}
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Closing pitch */}
              <p className="text-slate-400 text-xs sm:text-sm text-center mt-5 leading-relaxed">
                Save hours every week on bookkeeping. Stop guessing where your money goes — focus on growing your business.
              </p>
            </div>

            {/* Price */}
            <div className="text-center mb-5">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                $29.99 <span className="text-base sm:text-lg font-medium text-slate-400">/ month</span>
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => window.location.href = 'https://app.mesobfinancial.com/signup'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-3.5 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
            >
              Start My Free Trial
            </button>

            {/* Footer note */}
            <p className="text-slate-500 text-[11px] sm:text-xs text-center mt-4">
              No credit card required. Cancel anytime before your 30-day trial ends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}