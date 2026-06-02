'use client'

import { useTranslation } from 'react-i18next';

export function UserProfile() {
  const { t } = useTranslation();

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl">
        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6 sm:mb-8">{t('demo.userProfile.title')}</h1>

        <div className="bg-[#1e293b] rounded-xl p-4 sm:p-8 border border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div>
              <label className="block text-slate-300 text-sm mb-2">{t('demo.userProfile.name')}</label>
              <input
                type="text"
                value="xyz"
                disabled
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">{t('demo.userProfile.email')}</label>
              <input
                type="email"
                value="abc@domain.com"
                disabled
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">{t('demo.userProfile.phone')}</label>
              <input
                type="tel"
                value="+14525252535"
                disabled
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">{t('demo.userProfile.companyName')}</label>
              <input
                type="text"
                value="xyz"
                disabled
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-slate-300 text-sm mb-2">{t('demo.userProfile.businessType')}</label>
            <input
              type="text"
              value="Trucking"
              disabled
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <label className="block text-slate-300 text-sm mb-2">{t('demo.userProfile.cashBalance')}</label>
              <input
                type="text"
                value="900"
                disabled
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">{t('demo.userProfile.outstandingDebt')}</label>
              <input
                type="text"
                value="500"
                disabled
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">{t('demo.userProfile.valuableItems')}</label>
              <input
                type="text"
                value="1000"
                disabled
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              disabled
              className="bg-blue-600/50 text-white/50 font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg cursor-not-allowed text-sm sm:text-base"
            >
              {t('demo.userProfile.editProfile')}
            </button>
            <button
              disabled
              className="bg-red-600/50 text-white/50 font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg cursor-not-allowed text-sm sm:text-base"
            >
              {t('demo.userProfile.deleteAccount')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
