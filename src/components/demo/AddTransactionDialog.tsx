'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/demo/ui/dialog';
import { Button } from '@/components/demo/ui/button';
import { Input } from '@/components/demo/ui/input';
import { Label } from '@/components/demo/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/demo/ui/select';
import type { Transaction } from '@/types';
import { businessTypes } from '@/utils/businessTypes';

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

  // Get business purposes based on selected business type
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

  // Update purposes when transaction type or payment mode changes
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(transactionAmount);
    if (!transactionAmount || isNaN(numAmount)) {
      return;
    }

    // Validate purpose
    if (transactionPurpose === 'manual' && !manualPurpose.trim()) {
      return;
    }

    // For "Pay Cash" with "Recorded Earlier as Payable"
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
    // For "Pay Cash" with "Bought a New Item"
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
    // For "Received Cash"
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
    // For "Haven't Yet Paid" (Payable)
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
    // For "Pay Cash" with "New Expense"
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
                }}
                className={`w-full h-11 text-sm font-medium rounded-md transition-all duration-200 ${
                  transactionType === 'pay'
                    ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-md'
                    : 'bg-[#374151] hover:bg-[#4b5563] text-slate-200'
                }`}
              >
                Pay Cash
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setTransactionType('payable');
                  setPaymentMode(null);
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
                  onClick={() => setPaymentMode('recorded')}
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
                  onClick={() => setPaymentMode('new')}
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
                  onClick={() => setPaymentMode('boughtItem')}
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

          {/* Purpose Selection - Show for appropriate transaction types */}
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

              {/* Manual Purpose Input */}
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

          {/* Amount Input - Show when appropriate */}
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