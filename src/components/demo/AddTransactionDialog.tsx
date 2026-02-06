'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/demo/ui/dialog';
import { Button } from '@/components/demo/ui/button';
import { Input } from '@/components/demo/ui/input';
import { Label } from '@/components/demo/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/demo/ui/select';
import type { Transaction } from '@/types';

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (transaction: Omit<Transaction, 'id' | 'srNo'>) => void;
}

export function AddTransactionDialog({ open, onOpenChange, onAdd }: AddTransactionDialogProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('Freight Income');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (!description || !amount || isNaN(numAmount)) return;

    const transaction: Omit<Transaction, 'id' | 'srNo'> = {
      date: new Date().toISOString(),
      description: type === 'income' ? `Receive [Cash] ${description}` : `${category} Pay [Cash]`,
      debit: type === 'expense' ? numAmount : 0,
      credit: type === 'income' ? numAmount : 0,
      type,
      category: type === 'expense' ? category : 'Freight Income',
    };

    onAdd(transaction);
    
    // Reset form
    setDescription('');
    setAmount('');
    setType('income');
    setCategory('Freight Income');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1e293b] border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Transaction</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-slate-300">Transaction Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as 'income' | 'expense')}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="income" className="text-white hover:bg-slate-700">Income</SelectItem>
                <SelectItem value="expense" className="text-white hover:bg-slate-700">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-300">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {type === 'income' ? (
                  <SelectItem value="Freight Income" className="text-white hover:bg-slate-700">Freight Income</SelectItem>
                ) : (
                  <>
                    <SelectItem value="Fuel Expense" className="text-white hover:bg-slate-700">Fuel Expense</SelectItem>
                    <SelectItem value="Wages (Expense)" className="text-white hover:bg-slate-700">Wages (Expense)</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={type === 'income' ? 'e.g., Freight Income' : 'e.g., Fuel payment'}
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-slate-300">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Add Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
