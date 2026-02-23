'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/demo/ui/dialog';
import { Button } from '@/components/demo/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/demo/ui/select';
import { Label } from '@/components/demo/ui/label';

interface BusinessTypeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (businessType: string) => void;
  currentBusinessType?: string;
}

const businessTypes = [
  'Trucking',
  'RideShare Drivers/Partners',
  'Individual/Households',
  'Groceries',
  'Cafe/Resturant',
  'Cleaning Services',
  'Beauty & Grooming',
  'E-commerce Sellers',
  'Construction Trades',
  'Content Creator',
  'Other',
];

export function BusinessTypeSelector({ 
  open, 
  onOpenChange, 
  onSelect,
  currentBusinessType = 'Trucking'
}: BusinessTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState(currentBusinessType);

  const handleSubmit = () => {
    if (selectedType) {
      onSelect(selectedType);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1e293b] border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Select Your Business Type</DialogTitle>
          <DialogDescription className="text-slate-400">
            Choose the category that best describes your business. This will customize the transaction purposes for your needs.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Business Type</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600 max-h-[300px]">
                {businessTypes.map((type) => (
                  <SelectItem 
                    key={type} 
                    value={type} 
                    className="text-white hover:bg-slate-700"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              onClick={handleSubmit}
              disabled={!selectedType}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-slate-600"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}