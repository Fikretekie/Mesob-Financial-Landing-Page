'use client'

import { useState } from 'react';
import { FileText, Image as ImageIcon, Upload, Download, Eye, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { DemoDocument } from '@/data/demoIndustryExtras';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup } from '@/utils/demoTracking';

const formatSize = (kb: number) => (kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`);
const dateOf = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Read-only document vault with industry-typical files; upload, preview and
// download are Pro features in the demo.
export function Documents({ documents }: { documents: DemoDocument[] }) {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();
  const [showLocked, setShowLocked] = useState(false);
  const lock = () => setShowLocked(true);

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{t('demo.app.documents.title')}</h1>
          <p className="dash-overview__sub">{t('demo.app.documents.subtitle')} 5 MB</p>
        </div>
        <div className="dash-overview__side">
          <button type="button" className="mk-btn mk-btn--primary mk-btn--sm" onClick={lock}>
            <Upload aria-hidden />{t('demo.app.documents.upload')}
          </button>
        </div>
      </header>

      {showLocked && (
        <div className="dm-locked">
          <Lock aria-hidden />
          <span style={{ flex: '1 1 240px' }}>{t('demo.logs.documentsLocked')}</span>
          <button type="button" className="mk-btn mk-btn--primary mk-btn--sm" onClick={() => goToSignup(industrySlug, 'documents')}>
            {t('demo.addTransaction.upgradeToPro')}
          </button>
        </div>
      )}

      <section className="mk-card">
        <div className="dm-table-wrap">
          <table className="dm-table" style={{ minWidth: 560 }}>
            <thead>
              <tr>
                <th>{t('demo.app.documents.name')}</th>
                <th className="is-num">{t('demo.app.documents.size')}</th>
                <th>{t('demo.app.documents.date')}</th>
                <th className="is-center">{t('demo.app.documents.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => {
                const isImage = /\.(jpe?g|png)$/i.test(doc.name);
                const Icon = isImage ? ImageIcon : FileText;
                return (
                  <tr key={doc.name}>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                        <span className="mk-chip mk-chip--sm" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}><Icon aria-hidden /></span>
                        {doc.name}
                        <span className="mk-badge">{t('demo.industry.sampleBadge')}</span>
                      </span>
                    </td>
                    <td className="is-num">{formatSize(doc.sizeKb)}</td>
                    <td className="dm-table__date">{dateOf(doc.daysAgo)}</td>
                    <td className="is-center" style={{ whiteSpace: 'nowrap' }}>
                      <button type="button" className="dm-icon-btn dm-icon-btn--neutral" onClick={lock} aria-label={t('demo.app.documents.preview')}><Eye aria-hidden /></button>{' '}
                      <button type="button" className="dm-icon-btn dm-icon-btn--neutral" onClick={lock} aria-label={t('demo.app.documents.download')}><Download aria-hidden /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
