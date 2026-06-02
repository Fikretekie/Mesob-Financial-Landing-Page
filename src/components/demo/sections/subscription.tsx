'use client'

import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type SubscriptionFeature = {
  title: string;
  description: string;
};

export function SubscriptionPlan() {
  const { t } = useTranslation();
  const features = t('demo.subscription.features', { returnObjects: true }) as SubscriptionFeature[];

  return (
    <div className="p-3 sm:p-6 flex items-start justify-center min-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="w-full max-w-lg mt-2 sm:mt-8 pb-4">
        <div className="relative rounded-2xl p-[1px] from-blue-500 via-purple-500 to-blue-500">
          <div className="bg-[#1e293b] rounded-2xl p-4 sm:p-8">
            <div className="text-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                {t('demo.subscription.title')}{' '}
                <span className="text-blue-400">{t('demo.subscription.proPlan')}</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                {t('demo.subscription.introBefore')}{' '}
                <span className="font-semibold text-white">{t('demo.subscription.introHighlight')}</span>{' '}
                {t('demo.subscription.introAfter')}
                <br />
                {t('demo.subscription.afterTrialBefore')}{' '}
                <span className="font-semibold text-white">{t('demo.subscription.afterTrialPrice')}</span>
                {t('demo.subscription.afterTrialEnd')}
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-3 sm:p-5 mb-4 sm:mb-6">
              <div className="space-y-2 sm:space-y-4">
                {Array.isArray(features) && features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold text-white">{feature.title}</span>{' '}
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-slate-400 text-xs sm:text-sm text-center mt-3 sm:mt-5 leading-relaxed">
                {t('demo.subscription.pitch')}
              </p>
            </div>

            <div className="text-center mb-3 sm:mb-5">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {t('demo.subscription.price')}{' '}
                <span className="text-base sm:text-lg font-medium text-slate-400">{t('demo.subscription.perMonth')}</span>
              </p>
            </div>

            <button
              onClick={() => window.location.href = 'https://app.meksova.com/signup'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-3.5 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
            >
              {t('demo.subscription.cta')}
            </button>

            <p className="text-slate-500 text-[11px] sm:text-xs text-center mt-3 sm:mt-4">
              {t('demo.subscription.footer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
