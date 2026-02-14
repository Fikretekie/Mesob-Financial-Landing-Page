'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/demo/ui/dialog';
import { Button } from '@/components/demo/ui/button';
import { Input } from '@/components/demo/ui/input';
import { Label } from '@/components/demo/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/demo/ui/select';
import type { Transaction } from '@/types';
import { businessTypes } from '@/utils/businessTypes';
import { Upload, Lock, X } from 'lucide-react';

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (transaction: Omit<Transaction, 'id' | 'srNo'>) => void;
  selectedBusinessType?: string;
}

type TransactionType = 'receive' | 'pay' | 'payable' | null;
type PaymentMode = 'recorded' | 'new' | 'boughtItem' | null;

export function AddTransactionDialog({ 
  open, 
  onOpenChange, 
  onAdd,
  selectedBusinessType = 'Trucking' 
}: AddTransactionDialogProps) {
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
        description: `Pay [Cash] ${finalPurpose}`,
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
        description: `Pay [Cash] ${finalPurpose}`,
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#2d3748] border-slate-600 text-white max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Add Transaction</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Transaction Type Selection */}
          <div className="space-y-3">
            <Label className="text-slate-200 text-sm font-medium block">Type:</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                type="button"
                onClick={() => {
                  setTransactionType('receive');
                  setPaymentMode(null);
                  setShowUpgradeMessage(false);
                }}
                className={`w-full h-11 text-sm font-medium rounded-md transition-all duration-200 ${
                  transactionType === 'receive'
                    ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-md'
                    : 'bg-[#374151] hover:bg-[#4b5563] text-slate-200'
                }`}
              >
                Received Cash
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setTransactionType('pay');
                  setPaymentMode(null);
                  setShowUpgradeMessage(false);
                }}
                className={`w-full h-11 text-sm font-medium rounded-md transition-all duration-200 ${
                  transactionType === 'pay'
                    ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-md'
                    : 'bg-[#374151] hover:bg-[#4b5563] text-slate-200'
                }`}
              >
                Paid Cash
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setTransactionType('payable');
                  setPaymentMode(null);
                  setShowUpgradeMessage(false);
                }}
                className={`w-full h-11 text-sm font-medium rounded-md transition-all duration-200 ${
                  transactionType === 'payable'
                    ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-md'
                    : 'bg-[#374151] hover:bg-[#4b5563] text-slate-200'
                }`}
              >
                Haven&apos;t Yet Paid
              </Button>
            </div>
          </div>

          {/* Payment Mode Selection (only for "Pay Cash") */}
          {transactionType === 'pay' && (
            <div className="space-y-3">
              <Label className="text-slate-200 text-sm font-medium block">Select Action:</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  type="button"
                  onClick={() => { setPaymentMode('recorded'); setShowUpgradeMessage(false); }}
                  className={`w-full min-h-[44px] h-auto py-2.5 px-3 text-sm font-medium rounded-md transition-all duration-200 whitespace-normal leading-tight ${
                    paymentMode === 'recorded'
                      ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-md'
                      : 'bg-[#374151] hover:bg-[#4b5563] text-slate-200'
                  }`}
                >
                  Recorded Earlier as Payable
                </Button>
                <Button
                  type="button"
                  onClick={() => { setPaymentMode('new'); setShowUpgradeMessage(false); }}
                  className={`w-full min-h-[44px] h-auto py-2.5 px-3 text-sm font-medium rounded-md transition-all duration-200 whitespace-normal leading-tight ${
                    paymentMode === 'new'
                      ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-md'
                      : 'bg-[#374151] hover:bg-[#4b5563] text-slate-200'
                  }`}
                >
                  New Expense
                </Button>
                <Button
                  type="button"
                  onClick={() => { setPaymentMode('boughtItem'); setShowUpgradeMessage(false); }}
                  className={`w-full min-h-[44px] h-auto py-2.5 px-3 text-sm font-medium rounded-md transition-all duration-200 whitespace-normal leading-tight ${
                    paymentMode === 'boughtItem'
                      ? 'bg-[#f59e0b] hover:bg-[#d97706] text-white shadow-md'
                      : 'bg-[#374151] hover:bg-[#4b5563] text-slate-200'
                  }`}
                >
                  Bought a New Item
                </Button>
              </div>
            </div>
          )}

          {/* Purpose Selection */}
          {((transactionType === 'receive') || 
            (transactionType === 'pay' && (paymentMode === 'new' || paymentMode === 'boughtItem')) ||
            (transactionType === 'payable')) && (
            <div className="space-y-2">
              <Label className="text-slate-200 text-sm font-medium">
                {transactionType === 'pay' && paymentMode === 'boughtItem' 
                  ? 'Item Description:' 
                  : 'Purpose:'}
              </Label>
              <Select value={transactionPurpose} onValueChange={setTransactionPurpose}>
                <SelectTrigger className="bg-[#374151] border-slate-600 text-white h-10 text-sm transition-all duration-200 hover:border-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent className="bg-[#374151] border-slate-600 max-h-[250px]">
                  {purposes.map((purpose, index) => (
                    <SelectItem 
                      key={index} 
                      value={purpose} 
                      className="text-white hover:bg-slate-600 text-sm py-2"
                    >
                      {purpose}
                    </SelectItem>
                  ))}
                  <SelectItem value="manual" className="text-white hover:bg-slate-600 font-semibold text-sm py-2">
                    Enter Manually
                  </SelectItem>
                </SelectContent>
              </Select>

              {transactionPurpose === 'manual' && (
                <Input
                  type="text"
                  placeholder={transactionType === 'pay' && paymentMode === 'boughtItem' 
                    ? 'Enter item description...' 
                    : 'Enter purpose manually...'}
                  value={manualPurpose}
                  onChange={(e) => setManualPurpose(e.target.value)}
                  className="bg-[#374151] border-slate-600 text-white placeholder:text-slate-400 mt-2 h-10 text-sm transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                />
              )}
            </div>
          )}

          {/* Amount Input */}
          {((transactionType === 'receive') || 
            (transactionType === 'pay' && paymentMode !== null) ||
            (transactionType === 'payable')) && (
            <div className="space-y-2">
              <Label className="text-slate-200 text-sm font-medium">Amount ($):</Label>
              <Input
                type="number"
                step="0.01"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                placeholder="0.00"
                className="bg-[#374151] border-slate-600 text-white placeholder:text-slate-400 h-10 text-sm transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
          )}

          {/* Upload Receipt Section */}
          {((transactionType === 'receive') || 
            (transactionType === 'pay' && paymentMode !== null) ||
            (transactionType === 'payable')) && (
            <div className="space-y-2">
              <Label className="text-slate-200 text-sm font-medium">Upload Receipt (optional):</Label>
              
              {!showUpgradeMessage ? (
                <button
                  type="button"
                  onClick={() => setShowUpgradeMessage(true)}
                  className="w-full border-2 border-dashed border-slate-600 rounded-lg p-4 flex flex-col items-center gap-2 hover:border-slate-500 hover:bg-slate-700/30 transition-all duration-200 cursor-pointer"
                >
                  <Upload className="w-6 h-6 text-slate-400" />
                  <span className="text-slate-400 text-sm">Click to upload receipt</span>
                  <span className="text-slate-500 text-xs">PNG, JPG, PDF up to 5MB</span>
                </button>
              ) : (
                <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
                  <button
                    type="button"
                    onClick={() => setShowUpgradeMessage(false)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      This feature is available in the <span className="font-semibold text-blue-400">Pro Plan</span>. 
                      Unlock unlimited receipt uploads and tax-ready organization by upgrading today!
                    </p>
                    <button
                      type="button"
                      onClick={() => window.location.href = 'https://app.mesobfinancial.com/signup'}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {((transactionType === 'receive') || 
            (transactionType === 'pay' && paymentMode !== null) ||
            (transactionType === 'payable')) && (
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="h-10 border-slate-600 bg-transparent text-slate-200 hover:bg-slate-700 hover:text-white text-sm font-medium transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  !transactionAmount || 
                  (transactionPurpose === 'manual' && !manualPurpose.trim()) ||
                  (!transactionPurpose && transactionType !== 'pay')
                }
                className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 text-sm font-medium transition-all duration-200"
              >
                Save
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}