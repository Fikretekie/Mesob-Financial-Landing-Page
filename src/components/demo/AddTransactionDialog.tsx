'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/demo/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/demo/ui/select';
import type { Transaction } from '@/types';
import { businessTypes } from '@/utils/businessTypes';
import { Upload, Lock, ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import { useDemoIndustrySlug } from '@/components/demo/DemoIndustryContext';
import { goToSignup } from '@/utils/demoTracking';

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (transaction: Omit<Transaction, 'id' | 'srNo'>) => void;
  selectedBusinessType?: string;
}

const LABEL_COLON = /\s*[:：]\s*$/;

type TransactionType = 'receive' | 'pay' | 'payable' | null;
type PaymentMode = 'recorded' | 'new' | 'boughtItem' | null;

export function AddTransactionDialog({
  open,
  onOpenChange,
  onAdd,
  selectedBusinessType = 'Trucking'
}: AddTransactionDialogProps) {
  const { t } = useTranslation();
  const industrySlug = useDemoIndustrySlug();
  const [transactionType, setTransactionType] = useState<TransactionType>(null);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>(null);
  const [transactionPurpose, setTransactionPurpose] = useState('');
  const [manualPurpose, setManualPurpose] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [purposes, setPurposes] = useState<string[]>([]);
  const [showUpgradeMessage, setShowUpgradeMessage] = useState(false);

  const getBusinessPurposes = (type: string) => {
    if (businessTypes[type]) {
      return businessTypes[type];
    }
    return {
      income: [],
      expenses: [],
      payables: [],
    };
  };

  useEffect(() => {
    const businessPurposes = getBusinessPurposes(selectedBusinessType);

    if (transactionType === 'receive') {
      setPurposes(businessPurposes.income || []);
    } else if (transactionType === 'pay' && paymentMode === 'new') {
      setPurposes(businessPurposes.expenses || []);
    } else if (transactionType === 'payable') {
      setPurposes(businessPurposes.payables || []);
    } else {
      setPurposes([]);
    }

    setTransactionPurpose('');
    setManualPurpose('');
  }, [transactionType, paymentMode, selectedBusinessType]);

  const resetForm = () => {
    setTransactionType(null);
    setPaymentMode(null);
    setTransactionPurpose('');
    setManualPurpose('');
    setTransactionAmount('');
    setShowUpgradeMessage(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(transactionAmount);
    if (!transactionAmount || isNaN(numAmount)) {
      return;
    }

    if (transactionPurpose === 'manual' && !manualPurpose.trim()) {
      return;
    }

    if (transactionType === 'pay' && paymentMode === 'recorded') {
      const finalPurpose = transactionPurpose === 'manual'
        ? manualPurpose
        : `Payment for ${transactionPurpose}`;

      const transaction: Omit<Transaction, 'id' | 'srNo'> = {
        date: new Date().toISOString(),
        description: `Paid [Cash] ${finalPurpose}`,
        debit: numAmount,
        credit: 0,
        type: 'expense',
        category: 'Payment',
      };

      onAdd(transaction);
    }
    else if (transactionType === 'pay' && paymentMode === 'boughtItem') {
      const finalPurpose = transactionPurpose === 'manual'
        ? manualPurpose
        : transactionPurpose;

      const transaction: Omit<Transaction, 'id' | 'srNo'> = {
        date: new Date().toISOString(),
        description: `New Item [Cash] ${finalPurpose}`,
        debit: numAmount,
        credit: 0,
        type: 'expense',
        category: 'New Item',
      };

      onAdd(transaction);
    }
    else if (transactionType === 'receive') {
      const finalPurpose = transactionPurpose === 'manual'
        ? manualPurpose
        : transactionPurpose;

      const transaction: Omit<Transaction, 'id' | 'srNo'> = {
        date: new Date().toISOString(),
        description: `Receive [Cash] ${finalPurpose}`,
        debit: 0,
        credit: numAmount,
        type: 'income',
        category: finalPurpose,
      };

      onAdd(transaction);
    }
    else if (transactionType === 'payable') {
      const finalPurpose = transactionPurpose === 'manual'
        ? manualPurpose
        : transactionPurpose;

      const transaction: Omit<Transaction, 'id' | 'srNo'> = {
        date: new Date().toISOString(),
        description: `Payable ${finalPurpose}`,
        debit: numAmount,
        credit: 0,
        type: 'expense',
        category: 'Payable',
      };

      onAdd(transaction);
    }
    else if (transactionType === 'pay' && paymentMode === 'new') {
      const finalPurpose = transactionPurpose === 'manual'
        ? manualPurpose
        : transactionPurpose;

      const transaction: Omit<Transaction, 'id' | 'srNo'> = {
        date: new Date().toISOString(),
        description: `Paid [Cash] ${finalPurpose}`,
        debit: numAmount,
        credit: 0,
        type: 'expense',
        category: finalPurpose,
      };

      onAdd(transaction);
    }

    resetForm();
    onOpenChange(false);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  // Field labels end in ":" in the locale files; the eyebrow style does not want it.
  const label = (key: string) => t(key).replace(LABEL_COLON, '');

  const showDetails =
    transactionType === 'receive' ||
    transactionType === 'payable' ||
    (transactionType === 'pay' && paymentMode !== null);
  const showPurpose =
    transactionType === 'receive' ||
    transactionType === 'payable' ||
    (transactionType === 'pay' && (paymentMode === 'new' || paymentMode === 'boughtItem'));
  const flowColor =
    transactionType === 'receive' ? 'var(--green)' : transactionType === 'payable' ? 'var(--amber)' : 'var(--red)';

  const types: { id: Exclude<TransactionType, null>; label: string; icon: typeof ArrowDownLeft; tone: string }[] = [
    { id: 'receive', label: t('demo.addTransaction.receivedCash'), icon: ArrowDownLeft, tone: 'dm-type--in' },
    { id: 'pay', label: t('demo.addTransaction.paidCash'), icon: ArrowUpRight, tone: 'dm-type--out' },
    { id: 'payable', label: t('demo.addTransaction.haventPaid'), icon: Clock, tone: 'dm-type--owed' },
  ];
  const payModes: { id: Exclude<PaymentMode, null>; label: string }[] = [
    { id: 'recorded', label: t('demo.addTransaction.recordedPayable') },
    { id: 'new', label: t('demo.addTransaction.newExpense') },
    { id: 'boughtItem', label: t('demo.addTransaction.boughtNewItem') },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent aria-describedby={undefined}>
        <div className="dm-modal__head">
          <DialogTitle className="dm-modal__title">{t('demo.addTransaction.title')}</DialogTitle>
        </div>

        <form onSubmit={handleSubmit} className="dm-modal__body">
          <div className="dm-modal__group">
            <span className="dm-label">{label('demo.addTransaction.type')}</span>
            <div className="dm-types">
              {types.map(({ id, label, icon: Icon, tone }) => (
                <button
                  key={id}
                  type="button"
                  className={`dm-type ${tone}${transactionType === id ? ' is-selected' : ''}`}
                  aria-pressed={transactionType === id}
                  onClick={() => {
                    setTransactionType(id);
                    setPaymentMode(null);
                    setShowUpgradeMessage(false);
                  }}
                >
                  <Icon aria-hidden />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {transactionType === 'pay' && (
            <div className="dm-modal__group">
              <span className="dm-label">{label('demo.addTransaction.selectAction')}</span>
              <div className="dm-actions" style={{ '--flow-color': flowColor } as React.CSSProperties}>
                {payModes.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    className={`dm-action${paymentMode === id ? ' is-selected' : ''}`}
                    aria-pressed={paymentMode === id}
                    onClick={() => { setPaymentMode(id); setShowUpgradeMessage(false); }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showPurpose && (
            <div className="dm-modal__group">
              <span className="dm-label">
                {transactionType === 'pay' && paymentMode === 'boughtItem'
                  ? label('demo.addTransaction.itemDescription')
                  : label('demo.addTransaction.purpose')}
              </span>
              <Select value={transactionPurpose} onValueChange={setTransactionPurpose}>
                <SelectTrigger>
                  <SelectValue placeholder={t('demo.addTransaction.selectPurpose')} />
                </SelectTrigger>
                <SelectContent sideOffset={6}>
                  {purposes.map((purpose, index) => (
                    <SelectItem key={index} value={purpose}>{purpose}</SelectItem>
                  ))}
                  <SelectItem value="manual">{t('demo.addTransaction.enterManually')}</SelectItem>
                </SelectContent>
              </Select>

              {transactionPurpose === 'manual' && (
                <input
                  type="text"
                  className="dm-input"
                  placeholder={transactionType === 'pay' && paymentMode === 'boughtItem'
                    ? t('demo.addTransaction.enterItemDescription')
                    : t('demo.addTransaction.enterPurposeManually')}
                  value={manualPurpose}
                  onChange={(e) => setManualPurpose(e.target.value)}
                />
              )}
            </div>
          )}

          {showDetails && (
            <div className="dm-modal__group">
              <label className="dm-label" htmlFor="dm-amount">{label('demo.addTransaction.amount')}</label>
              <input
                id="dm-amount"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                className="dm-input dm-input--num"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          )}

          {showDetails && (
            <div className="dm-modal__group">
              <span className="dm-label">{label('demo.addTransaction.uploadReceipt')}</span>
              {!showUpgradeMessage ? (
                <button type="button" className="dm-upload" onClick={() => setShowUpgradeMessage(true)}>
                  <Upload aria-hidden />
                  <span>{t('demo.addTransaction.clickUpload')}</span>
                  <small>{t('demo.addTransaction.fileTypes')}</small>
                </button>
              ) : (
                <div className="dm-locked">
                  <Lock aria-hidden />
                  <span style={{ flex: '1 1 220px' }}>
                    <Trans
                      i18nKey="demo.addTransaction.proFeature"
                      components={{ highlight: <strong style={{ color: 'var(--accent)' }} /> }}
                    />
                  </span>
                  <button type="button" className="mk-btn mk-btn--primary mk-btn--sm" onClick={() => goToSignup(industrySlug, 'receipt_upload')}>
                    {t('demo.addTransaction.upgradeToPro')}
                  </button>
                </div>
              )}
            </div>
          )}

          {showDetails && (
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="mk-btn mk-btn--ghost" onClick={handleClose} style={{ flex: '0 0 auto' }}>
                {t('demo.addTransaction.cancel')}
              </button>
              <button
                type="submit"
                className="mk-btn mk-btn--primary dm-save"
                disabled={
                  !transactionAmount ||
                  (transactionPurpose === 'manual' && !manualPurpose.trim()) ||
                  (showPurpose && !transactionPurpose)
                }
              >
                {t('demo.addTransaction.save')}
              </button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
