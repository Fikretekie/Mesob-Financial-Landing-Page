'use client'

import { useEffect, useRef, useState } from 'react';
import { Briefcase, Check, Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@/components/demo/ui/dialog';
import { DEMO_INDUSTRIES } from '@/data/demoIndustries';
import { useIndustryCopy } from '@/components/demo/IndustryIntro';
import type { DemoBusiness } from '@/hooks/demo/useDemoBusinesses';

interface BusinessSwitcherProps {
  mainName: string;
  mainSlug: string;
  extras: DemoBusiness[];
  activeId: string;
  canAddMore: boolean;
  onSwitch: (id: string) => void;
  onAdd: (name: string, slug: string) => void;
  onRemove: (id: string) => void;
  onLimit: () => void;
}

function IndustryOption({ slug, localeId }: { slug: string; localeId: string }) {
  const { title } = useIndustryCopy(localeId);
  return <option value={slug}>{title}</option>;
}

// Mirrors the app's BusinessSwitcher: briefcase button in the navbar, a menu
// of businesses (extras removable), and "+ Add another business".
export function BusinessSwitcher({
  mainName,
  mainSlug,
  extras,
  activeId,
  canAddMore,
  onSwitch,
  onAdd,
  onRemove,
  onLimit,
}: BusinessSwitcherProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState(mainSlug);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const all = [{ id: 'main', name: mainName }, ...extras];
  const current = all.find((b) => b.id === activeId) ?? all[0];

  const startAdd = () => {
    setOpen(false);
    if (!canAddMore) {
      onLimit();
      return;
    }
    setName('');
    setSlug(mainSlug);
    setAdding(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, slug);
    setAdding(false);
  };

  return (
    <div className="dm-biz" ref={ref}>
      <button
        type="button"
        className={`dm-biz__toggle${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t('demo.business.switchLabel', { name: current.name })}
        title={t('demo.business.switchLabel', { name: current.name })}
      >
        <Briefcase aria-hidden />
      </button>

      {open && (
        <div className="dm-lang__menu dm-biz__menu" role="menu">
          {all.map((b) => (
            <div key={b.id} className={`dm-biz__row${b.id === activeId ? ' is-active' : ''}`}>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={b.id === activeId}
                className="dm-lang__item"
                onClick={() => { onSwitch(b.id); setOpen(false); }}
              >
                <span className="dm-biz__check">{b.id === activeId && <Check aria-hidden />}</span>
                <span className="dm-biz__name">{b.name}</span>
              </button>
              {b.id !== 'main' && (
                <button
                  type="button"
                  className="dm-biz__remove"
                  aria-label={t('demo.business.remove', { name: b.name })}
                  onClick={() => {
                    if (window.confirm(t('demo.business.removeConfirm', { name: b.name }))) onRemove(b.id);
                  }}
                >
                  <X aria-hidden />
                </button>
              )}
            </div>
          ))}
          <div className="dm-biz__divider" />
          <button type="button" role="menuitem" className="dm-lang__item dm-biz__add" onClick={startAdd}>
            <Plus aria-hidden /> {t('demo.business.addAnother')}
          </button>
        </div>
      )}

      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent aria-describedby="dm-biz-note" style={{ maxWidth: 460 }}>
          <div className="dm-modal__head">
            <DialogTitle className="dm-modal__title">{t('demo.business.addTitle')}</DialogTitle>
            <span id="dm-biz-note" className="dm-modal__sub">{t('demo.business.billingNote')}</span>
          </div>
          <form className="dm-modal__body" onSubmit={submit}>
            <div className="dm-field">
              <label className="dm-label" htmlFor="dm-biz-name">{t('demo.business.name')}</label>
              <input
                id="dm-biz-name"
                className="dm-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('demo.business.namePlaceholder')}
                autoFocus
              />
            </div>
            <div className="dm-field">
              <label className="dm-label" htmlFor="dm-biz-type">{t('demo.business.type')}</label>
              <select id="dm-biz-type" className="dm-input dm-select" value={slug} onChange={(e) => setSlug(e.target.value)}>
                {DEMO_INDUSTRIES.map((industry) => (
                  <IndustryOption key={industry.slug} slug={industry.slug} localeId={industry.localeId} />
                ))}
              </select>
            </div>
            <p className="dm-modal__sub" style={{ marginTop: -4 }}>{t('demo.business.demoNote', { count: 1 })}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="mk-btn mk-btn--ghost" onClick={() => setAdding(false)}>{t('demo.addTransaction.cancel')}</button>
              <button type="submit" className="mk-btn mk-btn--primary dm-save" disabled={!name.trim()}>{t('demo.business.add')}</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
