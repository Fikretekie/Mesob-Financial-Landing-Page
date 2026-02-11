'use client'

import { Download, FileText } from 'lucide-react';

export function BackupFile() {
  const backupFiles = [
    {
      id: 1,
      filename: '1769534094150-transactions_2026-01-27T17_14_53.936Z.csv',
    },
    {
      id: 2,
      filename: '1769534156982-transactions_2026-01-27T17_16_04s.5A2Z.csv',
    },
    {
      id: 3,
      filename: '1769534232032-transactions_2026-01-27T17_17_32.013Z.csv',
    },
  ];

return (
  <div className="p-4 sm:p-6">
    <div className="max-w-5xl">
      <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6 sm:mb-8">CSV Report</h1>
      
      <div className="bg-[#1e293b] rounded-xl p-4 sm:p-8 border border-slate-700/50">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Backup File</h2>
        
        <div className="space-y-3 sm:space-y-4">
          {backupFiles.map((file) => (
            <div 
              key={file.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 sm:p-4 gap-3"
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 w-full sm:w-auto">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                <span className="text-slate-300 text-xs sm:text-sm font-mono truncate">
                  {file.filename}
                </span>
              </div>
              
              <div className="w-full sm:w-auto sm:ml-4">
                <button
                  disabled
                  className="w-full sm:w-auto bg-blue-600/50 text-white/50 font-medium py-2 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

}