'use client'

import { useEffect, useRef, useState } from 'react';
import { Camera, Lock, Upload, Fuel } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@/components/demo/ui/dialog';
import { businessTypes } from '@/utils/businessTypes';
import { US_STATES } from '@/data/usStates';
import { dateKeyOf, type DemoFuelPurchase } from '@/data/demoIndustryExtras';
import { getDemoReceipts, receiptTotal, type DemoReceipt, type ScanDestination } from '@/data/demoReceipts';
import type { Transaction } from '@/types';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup, trackDemoEvent } from '@/utils/demoTracking';

type Step = 'choose' | 'scanning' | 'review';

interface ReceiptScanProps {
  industrySlug: string;
  businessType: string;
  hasFuelLog: boolean;
  canAdd: () => boolean;
  onSave: (transaction: Omit<Transaction, 'id' | 'srNo'>, fuel?: Omit<DemoFuelPurchase, 'id'>) => void;
}

const money = (n: number) => `$${n.toFixed(2)}`;

function ReceiptPaper({ receipt, scanning = false }: { receipt: DemoReceipt; scanning?: boolean }) {
  const { t } = useTranslation();
  return (
    <div className={`dm-receipt${scanning ? ' is-scanning' : ''}`} aria-hidden={scanning || undefined}>
      <div className="dm-receipt__vendor">{receipt.vendor}</div>
      <div className="dm-receipt__addr">{receipt.address}</div>
      <div className="dm-receipt__addr">{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</div>
      <div className="dm-receipt__rule" />
      {receipt.lines.map((line) => (
        <div className="dm-receipt__line" key={line.desc}><span>{line.desc}</span><span>{money(line.amount)}</span></div>
      ))}
      {receipt.tax ? <div className="dm-receipt__line"><span>Tax</span><span>{money(receipt.tax)}</span></div> : null}
      <div className="dm-receipt__rule" />
      <div className="dm-receipt__line dm-receipt__total"><span>TOTAL</span><span>{money(receiptTotal(receipt))}</span></div>
      <div className="dm-receipt__thanks">{t('demo.scan.sampleReceipt')}</div>
      {scanning && <span className="dm-receipt__beam" />}
    </div>
  );
}

// The demo version of the app's QuickScanReceipt: pick a sample receipt (the
// app reads a photo), "scan" it, then review the same fields the app shows
// and save. Fuel receipts for driving businesses also log a fuel purchase so
// the IFTA report picks them up — exactly like the app's fuel path.
export function ReceiptScan({ industrySlug, businessType, hasFuelLog, canAdd, onSave }: ReceiptScanProps) {
  const { t } = useTranslation();
  const pageSlug = useDemoIndustrySlug();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('choose');
  const [receipt, setReceipt] = useState<DemoReceipt | null>(null);
  const [ownLocked, setOwnLocked] = useState(false);
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState<ScanDestination>('expense');
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [state, setState] = useState('');
  const [gallons, setGallons] = useState('');
  const [error, setError] = useState('');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const receipts = getDemoReceipts(industrySlug);
  const expenseOptions: string[] = businessTypes[businessType]?.expenses || [];
  const categoryOptions = category && !expenseOptions.includes(category) ? [category, ...expenseOptions] : expenseOptions;
  const isAsset = destination === 'inventory' || destination === 'fixed';
  const isFuel = hasFuelLog && destination === 'expense' && /fuel/i.test(category);

  const reset = () => {
    window.clearTimeout(timer.current);
    setStep('choose');
    setReceipt(null);
    setOwnLocked(false);
    setError('');
  };

  const openScanner = () => {
    if (!canAdd()) return;
    reset();
    setOpen(true);
    trackDemoEvent('demo_scan_open', { industry: pageSlug });
  };

  const scan = (r: DemoReceipt) => {
    setReceipt(r);
    setStep('scanning');
    timer.current = window.setTimeout(() => {
      // What the OCR "read", pre-filled like the app's review step.
      setAmount(String(receiptTotal(r)));
      setDestination(r.destination);
      setCategory(r.category);
      setItemName(r.itemName ?? r.vendor);
      setState(r.state ?? '');
      setGallons(r.gallons != null ? String(r.gallons) : '');
      setStep('review');
    }, 1700);
  };

  const save = () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) return setError(t('demo.scan.errAmount'));
    if (isAsset && !itemName.trim()) return setError(t('demo.scan.errItem'));
    if (!isAsset && !category.trim()) return setError(t('demo.scan.errCategory'));
    if (isFuel && (!state || !(Number(gallons) > 0))) return setError(t('demo.scan.errFuel'));
    if (!canAdd()) return;

    const date = new Date().toISOString();
    const transaction: Omit<Transaction, 'id' | 'srNo'> = isAsset
      ? {
          date,
          description: `New Item [Cash] ${itemName.trim()}`,
          debit: amountNum,
          credit: 0,
          type: 'expense',
          category: 'New Item',
          assetType: destination === 'fixed' ? 'fixed' : 'current',
          scanned: true,
        }
      : {
          date,
          description: `Paid [Cash] ${category.trim()}`,
          debit: amountNum,
          credit: 0,
          type: 'expense',
          category: category.trim(),
          ...(destination === 'cogs' ? { subType: 'COGS' as const } : {}),
          scanned: true,
        };
    const fuel = isFuel
      ? { dateKey: dateKeyOf(new Date()), state, gallons: Number(gallons), pricePerGallon: null, totalCost: amountNum, linked: true }
      : undefined;
    onSave(transaction, fuel);
    trackDemoEvent('demo_scan_save', { industry: pageSlug, destination, fuel: Boolean(fuel) });
    setOpen(false);
  };

  return (
    <>
      <button type="button" className="dm-scan-btn" onClick={openScanner}>
        <Camera aria-hidden />
        {t('demo.app.quickScan.scanReceipt')}
        <span className="dm-scan-btn__new">{t('demo.app.quickScan.badgeNew')}</span>
      </button>

      <Dialog open={open} onOpenChange={(next) => { if (step !== 'scanning') setOpen(next); }}>
        <DialogContent aria-describedby={undefined} style={{ maxWidth: 520 }}>
          <div className="dm-modal__head">
            <DialogTitle className="dm-modal__title">
              {step === 'review' ? t('demo.app.quickScan.scannedReceipt') : t('demo.app.quickScan.scanReceipt')}
            </DialogTitle>
            {step === 'choose' && <span className="dm-modal__sub">{t('demo.scan.chooseSub')}</span>}
          </div>

          <div className="dm-modal__body">
            {step === 'choose' && (
              <>
                <div className="dm-receipt-picks">
                  {receipts.map((r) => (
                    <button key={r.id} type="button" className="dm-receipt-pick" onClick={() => scan(r)}>
                      <span className="dm-receipt-pick__vendor">{r.vendor}</span>
                      <span className="dm-receipt-pick__meta">{money(receiptTotal(r))} · {r.lines.length} {t('demo.scan.items')}</span>
                      <span className="dm-receipt-pick__cta"><Camera aria-hidden /> {t('demo.scan.scanThis')}</span>
                    </button>
                  ))}
                </div>
                {ownLocked ? (
                  <div className="dm-locked">
                    <Lock aria-hidden />
                    <span style={{ flex: '1 1 220px' }}>{t('demo.scan.ownLocked')}</span>
                    <button type="button" className="mk-btn mk-btn--primary mk-btn--sm" onClick={() => goToSignup(pageSlug, 'receipt_scan')}>
                      {t('demo.addTransaction.upgradeToPro')}
                    </button>
                  </div>
                ) : (
                  <button type="button" className="dm-upload" onClick={() => setOwnLocked(true)}>
                    <Upload aria-hidden />
                    <span>{t('demo.scan.uploadOwn')}</span>
                  </button>
                )}
              </>
            )}

            {step === 'scanning' && receipt && (
              <div className="dm-scan-stage" role="status">
                <ReceiptPaper receipt={receipt} scanning />
                <p className="chart-card__sub">{t('demo.app.quickScan.readingReceipt')}</p>
              </div>
            )}

            {step === 'review' && receipt && (
              <>
                <div className="dm-scan-review">
                  <ReceiptPaper receipt={receipt} />
                  <p className="dm-scan-detected">✓ {t('demo.scan.detected', { vendor: receipt.vendor })}</p>
                </div>
                {error && <div className="dm-locked" role="alert" style={{ borderColor: 'rgba(255,77,77,0.45)', background: 'var(--danger-soft)' }}>{error}</div>}
                <div className="dm-form-grid">
                  <div className="dm-field">
                    <label className="dm-label" htmlFor="dm-scan-amount">{t('demo.app.quickScan.amount')}</label>
                    <input id="dm-scan-amount" type="number" step="0.01" min="0" className="dm-input dm-input--num" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </div>
                  <div className="dm-field">
                    <label className="dm-label" htmlFor="dm-scan-dest">{t('demo.app.quickScan.recordAs')}</label>
                    <select id="dm-scan-dest" className="dm-input dm-select" value={destination} onChange={(e) => setDestination(e.target.value as ScanDestination)}>
                      <option value="expense">{t('demo.app.quickScan.destExpense')}</option>
                      <option value="cogs">{t('demo.app.quickScan.destCogs')}</option>
                      <option value="inventory">{t('demo.app.quickScan.destInventory')}</option>
                      <option value="fixed">{t('demo.app.quickScan.destFixed')}</option>
                    </select>
                  </div>
                </div>
                {destination === 'cogs' && <p className="dm-modal__sub" style={{ marginTop: -8 }}>{t('demo.app.quickScan.cogsHint')}</p>}
                {isAsset && (
                  <p className="dm-modal__sub" style={{ marginTop: -8 }}>
                    {t('demo.app.quickScan.assetHint', { kind: destination === 'fixed' ? t('demo.app.quickScan.kindFixed') : t('demo.app.quickScan.kindInventory') })}
                  </p>
                )}

                {isAsset ? (
                  <div className="dm-field">
                    <label className="dm-label" htmlFor="dm-scan-item">{t('demo.app.quickScan.itemName')}</label>
                    <input id="dm-scan-item" className="dm-input" value={itemName} placeholder={t('demo.app.quickScan.itemNamePlaceholder')} onChange={(e) => setItemName(e.target.value)} />
                  </div>
                ) : categoryOptions.length > 0 ? (
                  <div className="dm-field">
                    <label className="dm-label" htmlFor="dm-scan-cat">{t('demo.app.quickScan.category')}</label>
                    <select id="dm-scan-cat" className="dm-input dm-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="">{t('demo.app.quickScan.selectCategory')}</option>
                      {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                ) : (
                  <div className="dm-field">
                    <label className="dm-label" htmlFor="dm-scan-cat">{t('demo.app.quickScan.category')}</label>
                    <input id="dm-scan-cat" className="dm-input" value={category} onChange={(e) => setCategory(e.target.value)} />
                  </div>
                )}

                {isFuel && (
                  <>
                    <div className="dm-form-grid">
                      <div className="dm-field">
                        <label className="dm-label" htmlFor="dm-scan-state">{t('demo.app.quickScan.state')}</label>
                        <select id="dm-scan-state" className="dm-input dm-select" value={state} onChange={(e) => setState(e.target.value)}>
                          <option value="">{t('demo.app.quickScan.selectState')}</option>
                          {US_STATES.map((s) => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
                        </select>
                      </div>
                      <div className="dm-field">
                        <label className="dm-label" htmlFor="dm-scan-gal">{t('demo.app.quickScan.gallons')}</label>
                        <input id="dm-scan-gal" type="number" step="0.01" min="0" className="dm-input dm-input--num" value={gallons} onChange={(e) => setGallons(e.target.value)} />
                      </div>
                    </div>
                    <p className="dm-scan-detected" style={{ marginTop: -6 }}><Fuel aria-hidden style={{ width: 13, height: 13, verticalAlign: '-2px' }} /> {t('demo.scan.fuelLinked')}</p>
                  </>
                )}

                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" className="mk-btn mk-btn--ghost" onClick={() => setOpen(false)}>{t('demo.app.quickScan.cancel')}</button>
                  <button type="button" className="mk-btn mk-btn--primary dm-save" onClick={save}>{t('demo.app.quickScan.save')}</button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
