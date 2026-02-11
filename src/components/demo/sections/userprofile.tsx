'use client'

import { User } from 'lucide-react';

export function UserProfile() {
  
return (
  <div className="p-4 sm:p-6">
    <div className="max-w-4xl">
      <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6 sm:mb-8">User Profile</h1>
      
      <div className="bg-[#1e293b] rounded-xl p-4 sm:p-8 border border-slate-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Name */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Name</label>
            <input
              type="text"
              value="xyz"
              disabled
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
            />
          </div>

          {/* Email address */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Email address</label>
            <input
              type="email"
              value="abc@domain.com"
              disabled
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Phone</label>
            <input
              type="tel"
              value="+14525252535"
              disabled
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Company Name</label>
            <input
              type="text"
              value="xyz"
              disabled
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Business Type - Full Width */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-slate-300 text-sm mb-2">Business Type</label>
          <input
            type="text"
            value="Trucking"
            disabled
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
          />
        </div>

        {/* Financial Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Cash Balance */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Cash Balance</label>
            <input
              type="text"
              value="900"
              disabled
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
            />
          </div>

          {/* Outstanding Debt */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Outstanding Debt</label>
            <input
              type="text"
              value="500"
              disabled
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
            />
          </div>

          {/* Valuable Items */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Valuable Items</label>
            <input
              type="text"
              value="1000"
              disabled
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-slate-400 cursor-not-allowed text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            disabled
            className="bg-blue-600/50 text-white/50 font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg cursor-not-allowed text-sm sm:text-base"
          >
            Edit Profile
          </button>
          <button
            disabled
            className="bg-red-600/50 text-white/50 font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg cursor-not-allowed text-sm sm:text-base"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
);

}