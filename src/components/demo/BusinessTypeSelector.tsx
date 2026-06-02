'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/demo/ui/dialog';
import { Button } from '@/components/demo/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/demo/ui/select';
import { Label } from '@/components/demo/ui/label';
import { useTranslation } from 'react-i18next';

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
  'Cafe / Restaurants',
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
  const { t } = useTranslation();
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
          <DialogTitle className="text-xl font-semibold">{t('demo.businessTypeSelector.title')}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {t('demo.businessTypeSelector.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-slate-200">{t('demo.businessTypeSelector.label')}</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder={t('demo.businessTypeSelector.placeholder')} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {businessTypes.map((type) => (
                  <SelectItem key={type} value={type} className="text-white hover:bg-slate-700">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            {t('demo.businessTypeSelector.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t('demo.businessTypeSelector.confirm')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
