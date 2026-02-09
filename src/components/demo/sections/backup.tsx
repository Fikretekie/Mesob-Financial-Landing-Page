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
    <div className="p-6">
      <div className="max-w-5xl">
        <h1 className="text-2xl font-semibold text-white mb-8">CSV Report</h1>
        
        <div className="bg-[#1e293b] rounded-xl p-8 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-white mb-6">Backup File</h2>
          
          <div className="space-y-4">
            {backupFiles.map((file) => (
              <div 
                key={file.id}
                className="flex items-center justify-between bg-slate-800/30 border border-slate-700/50 rounded-lg p-4"
              >
                <div className="flex items-center gap-3 flex-1">
                  <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm font-mono truncate">
                    {file.filename}
                  </span>
                </div>
                
                <div className="ml-4">
                  <button
                    disabled
                    className="bg-blue-600/50 text-white/50 font-medium py-2 px-4 rounded-lg cursor-not-allowed flex items-center gap-2"
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