'use client'

import { Download, FileText, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const backupFiles = [
  { id: 1, filename: '1769534094150-transactions_2026-01-27T17_14_53.936Z.csv' },
  { id: 2, filename: '1769534156982-transactions_2026-01-27T17_16_04.582Z.csv' },
  { id: 3, filename: '1769534232032-transactions_2026-01-27T17_17_32.013Z.csv' },
];

export function BackupFile() {
  const { t } = useTranslation();

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.backup.pageTitle')}</h1>
        </div>
      </header>

      <section className="mk-card">
        <div className="dash-panel-head">
          <span className="mk-chip mk-chip--sm" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
            <FileText aria-hidden />
          </span>
          <span className="mk-eyebrow">{t('demo.backup.sectionTitle')}</span>
          <span className="mk-badge mk-badge--info" style={{ marginLeft: 'auto' }}>
            <Lock aria-hidden style={{ width: 11, height: 11 }} />Pro
          </span>
        </div>
        {backupFiles.map((file) => (
          <div className="dm-file" key={file.id}>
            <FileText aria-hidden style={{ width: 16, height: 16, color: 'var(--text-3)', flex: 'none' }} />
            <span className="dm-file__name" title={file.filename}>{file.filename}</span>
            <button type="button" className="mk-btn mk-btn--ghost mk-btn--sm" disabled>
              <Download aria-hidden />{t('demo.backup.download')}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
