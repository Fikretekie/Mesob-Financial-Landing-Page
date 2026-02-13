'use client'

import { Trash2 } from 'lucide-react';
import type { Transaction } from '@/types';
import { Button } from '@/components/demo/ui/button';

interface FinancialReportProps {
  transactions: Transaction[];
  summary: {
    totalCashOnHand: number;
    totalPayable: number;
    revenue: number;
  };
  expenseBreakdown: {
    fuelExpense: number;
    wagesExpense: number;
    totalExpenses: number;
  };
  onDeleteTransaction: (id: number) => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric' 
  }) + ', ' + date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export function FinancialReport({ transactions, summary, expenseBreakdown, onDeleteTransaction }: FinancialReportProps) {
  const netIncome = summary.revenue - expenseBreakdown.totalExpenses;

  // return (
  //   <div className="p-6 space-y-6">
  //     {/* Summary and Journal Entry Row */}
  //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  //       {/* Summary Section */}
  //       <div className="bg-[#1e293b] rounded-xl p-5 border border-slate-700/50">
  //         <h3 className="text-cyan-400 text-sm font-medium mb-4">Summary</h3>
          
  //         <div className="space-y-4">
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-slate-300 text-sm">Total Cash on Hand:</span>
  //             <span className="text-emerald-400 font-semibold">{formatCurrency(summary.totalCashOnHand)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-slate-300 text-sm">Total Payable (Unpaid):</span>
  //             <span className="text-rose-400 font-semibold">{formatCurrency(summary.totalPayable)}</span>
  //           </div>
  //         </div>

  //         <h4 className="text-white text-sm font-medium mt-6 mb-3">Breakdown:</h4>
          
  //         <div className="space-y-2">
  //           <div className="flex justify-between items-center py-1">
  //             <span className="text-slate-400 text-sm">Revenue:</span>
  //             <span className="text-emerald-400 text-sm">{formatCurrency(summary.revenue)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-1">
  //             <span className="text-slate-400 text-sm">Total Expense:</span>
  //             <span className="text-rose-400 text-sm">{formatCurrency(expenseBreakdown.totalExpenses)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-1">
  //             <span className="text-slate-400 text-sm">Fuel Expense:</span>
  //             <span className="text-rose-400 text-sm">{formatCurrency(expenseBreakdown.fuelExpense)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-1">
  //             <span className="text-slate-400 text-sm">Wages (Expense):</span>
  //             <span className="text-rose-400 text-sm">{formatCurrency(expenseBreakdown.wagesExpense)}</span>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Journal Entry Section */}
  //       <div className="bg-[#1e293b] rounded-xl p-5 border border-slate-700/50">
  //         <h3 className="text-cyan-400 text-sm font-medium mb-4">Journal Entry</h3>
          
  //         <div className="overflow-x-auto">
  //           <table className="w-full">
  //             <thead>
  //               <tr className="text-left border-b border-slate-700">
  //                 <th className="pb-3 text-slate-400 text-xs font-medium">Date</th>
  //                 <th className="pb-3 text-slate-400 text-xs font-medium">Sr. No</th>
  //                 <th className="pb-3 text-slate-400 text-xs font-medium">Transaction</th>
  //                 <th className="pb-3 text-slate-400 text-xs font-medium text-right">Debit</th>
  //                 <th className="pb-3 text-slate-400 text-xs font-medium text-right">Credit</th>
  //                 <th className="pb-3 text-slate-400 text-xs font-medium text-center">Actions</th>
  //               </tr>
  //             </thead>
  //             <tbody className="text-sm">
  //               {transactions.map((transaction) => (
  //                 <tr key={transaction.id} className="border-b border-slate-700/50 last:border-0">
  //                   <td className="py-3 text-slate-300">{formatDate(transaction.date)}</td>
  //                   <td className="py-3 text-slate-300">{transaction.srNo}</td>
  //                   <td className="py-3 text-slate-300">{transaction.description}</td>
  //                   <td className="py-3 text-right">
  //                     {transaction.debit > 0 ? (
  //                       <span className="bg-rose-500/20 text-rose-400 px-3 py-1 rounded text-xs">
  //                         {formatCurrency(transaction.debit)}
  //                       </span>
  //                     ) : (
  //                       <span className="text-slate-500">-</span>
  //                     )}
  //                   </td>
  //                   <td className="py-3 text-right">
  //                     {transaction.credit > 0 ? (
  //                       <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded text-xs">
  //                         {formatCurrency(transaction.credit)}
  //                       </span>
  //                     ) : (
  //                       <span className="text-slate-500">-</span>
  //                     )}
  //                   </td>
  //                   <td className="py-3 text-center">
  //                     <Button
  //                       variant="ghost"
  //                       size="sm"
  //                       onClick={() => onDeleteTransaction(transaction.id)}
  //                       className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
  //                     >
  //                       <Trash2 className="w-4 h-4" />
  //                     </Button>
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Income Statement and Balance Sheet Row */}
  //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  //       {/* Income Statement */}
  //       <div className="bg-[#1e293b] rounded-xl p-5 border border-slate-700/50">
  //         <h3 className="text-cyan-400 text-sm font-medium mb-4">Income Statement</h3>
          
  //         <div className="space-y-3">
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-slate-300 text-sm">Revenue (manual sales)</span>
  //             <span className="text-slate-300 text-sm">{formatCurrency(summary.revenue)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-emerald-400 text-sm font-medium">Total Revenue</span>
  //             <span className="text-emerald-400 text-sm font-medium">{formatCurrency(summary.revenue)}</span>
  //           </div>
            
  //           <div className="pt-2">
  //             <span className="text-white text-sm font-medium">Expenses</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-slate-300 text-sm">Expenses (Fuel Expense)</span>
  //             <span className="text-slate-300 text-sm">{formatCurrency(expenseBreakdown.fuelExpense)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-slate-300 text-sm">Expenses (Wages (Expense))</span>
  //             <span className="text-slate-300 text-sm">{formatCurrency(expenseBreakdown.wagesExpense)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-rose-400 text-sm font-medium">Total Expenses</span>
  //             <span className="text-rose-400 text-sm font-medium">{formatCurrency(expenseBreakdown.totalExpenses)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2">
  //             <span className="text-emerald-400 text-sm font-bold">Net Income</span>
  //             <span className="text-emerald-400 text-sm font-bold">{formatCurrency(netIncome)}</span>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Balance Sheet */}
  //       <div className="bg-[#1e293b] rounded-xl p-5 border border-slate-700/50">
  //         <h3 className="text-cyan-400 text-sm font-medium mb-4">Balance Sheet</h3>
          
  //         <div className="space-y-3">
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-white text-sm font-medium">Assets</span>
  //             <span></span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-slate-300 text-sm">Cash</span>
  //             <span className="text-emerald-400 text-sm">{formatCurrency(summary.totalCashOnHand)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-slate-300 text-sm">Inventory</span>
  //             <span className="text-slate-300 text-sm">$0.00</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-emerald-400 text-sm font-medium">Total Assets</span>
  //             <span className="text-emerald-400 text-sm font-medium">{formatCurrency(summary.totalCashOnHand)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-white text-sm font-medium">Liabilities & Equity</span>
  //             <span></span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-slate-300 text-sm">Payable</span>
  //             <span className="text-amber-400 text-sm">{formatCurrency(summary.totalPayable)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-slate-300 text-sm">Beginning Equity</span>
  //             <span className="text-slate-300 text-sm">$0.00</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-slate-300 text-sm">Retained Earnings / Net Income</span>
  //             <span className="text-emerald-400 text-sm">{formatCurrency(netIncome)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
  //             <span className="text-emerald-400 text-sm font-medium">Total Liabilities & Equity</span>
  //             <span className="text-emerald-400 text-sm font-medium">{formatCurrency(summary.totalPayable + netIncome)}</span>
  //           </div>
            
  //           <div className="flex justify-between items-center py-2">
  //             <span className="text-white text-sm font-bold">Total</span>
  //             <span className="text-white text-sm font-bold">{formatCurrency(summary.totalCashOnHand)}</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

return (
  <div className="p-3 space-y-3" style={{ backgroundColor: '#1a273a' }}>
    {/* Summary and Journal Entry Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {/* Summary Section */}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#1a273a', border: '1px solid #2a3444', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)' }}>
        <h3 className="text-cyan-400 text-sm font-medium mb-3">Summary</h3>
        
        <div className="space-y-3">
          <div className="rounded-lg p-3" style={{ backgroundColor: '#1a2332', border: '1px solid #2a3444' }}>
            <div className="flex justify-between items-center">
              <span className="text-white text-sm font-medium">Total Cash on Hand:</span>
                    <div className="text-emerald-400 font-bold text-">{formatCurrency(summary.totalCashOnHand)}</div>
            </div>
          </div>
          
          <div className="rounded-lg p-3" style={{ backgroundColor: '#1a2332', border: '1px solid #2a3444' }}>
            <div className="flex justify-between items-center">
              <span className="text-white text-sm font-medium">Total Payable (Unpaid):</span>
              <span className="text-rose-400 font-bold text-lg">{formatCurrency(summary.totalPayable)}</span>
            </div>
          </div>
        </div>

        <h4 className="text-white text-sm font-medium mt-4 mb-2">Breakdown:</h4>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Revenue:</span>
            <span className="text-emerald-400 text-sm">{formatCurrency(summary.revenue)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Total Expense:</span>
            <span className="text-rose-400 text-sm">{formatCurrency(expenseBreakdown.totalExpenses)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Fuel Expense:</span>
            <span className="text-rose-400 text-sm">{formatCurrency(expenseBreakdown.fuelExpense)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Wages (Expense):</span>
            <span className="text-rose-400 text-sm">{formatCurrency(expenseBreakdown.wagesExpense)}</span>
          </div>
        </div>
      </div>

     {/* Journal Entry Section */}
<div className="rounded-lg p-4" style={{ backgroundColor: '#1a273a', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)' }}>
  <h3 className="text-cyan-400 text-sm font-medium mb-3">Journal Entry</h3>
  
  <div className="overflow-x-auto" style={{backgroundColor:"#0f1a26"}}>
    <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '800px' }}>
      <thead>
        <tr className="text-left" style={{ borderBottom: '1px solid #2a3444' }}>
          <th className="p-2 text-white text-md font-medium" style={{  width: '180px' }}>Date</th>
          <th className="p-2 text-white text-md font-medium" style={{  width: '80px' }}>Sr. No</th>
          <th className="p-2 text-white text-md font-medium" style={{  width: '250px' }}>Transaction</th>
          <th className="p-2 text-white text-md font-medium text-right" style={{  width: '120px' }}>Debit</th>
          <th className="p-2 text-white text-md font-medium text-right" style={{  width: '120px' }}>Credit</th>
          <th className="p-2 text-white text-md font-medium text-center" style={{  width: '80px' }}>Actions</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className="p-2 text-white text-xs" >
              {formatDate(transaction.date)}
            </td>
            <td className="p-2 text-white text-center" >
              {transaction.srNo}
            </td>
            <td className="p-2 text-white text-sm" >
              <div className="font-medium">{transaction.description.split('\n')[0]}</div>
              {transaction.description.includes('\n') && (
                <div className="text-xs text-white">{transaction.description.split('\n')[1]}</div>
              )}
            </td>
            <td className="p-2 text-right" >
              {transaction.debit > 0 ? (
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs inline-block">
                  {formatCurrency(transaction.debit)}
                </span>
              ) : (
                <span className="text-slate-500">-</span>
              )}
            </td>
            <td className="p-2 text-right" >
              {transaction.credit > 0 ? (
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs inline-block">
                  {formatCurrency(transaction.credit)}
                </span>
              ) : (
                <span className="text-slate-500">-</span>
              )}
            </td>
            <td className="p-2 text-center" >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteTransaction(transaction.id)}
                className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>

    {/* Income Statement and Balance Sheet Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {/* Income Statement */}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#1a273a', border: '1px solid #2a3444', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)' }}>
        <h3 className="text-cyan-400 text-sm font-medium mb-3">Income Statement</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: 'collapse', border: '1px solid #2a3444' }}>
            <tbody>
              <tr>
                <td className="p-2 text-slate-300 text-sm" style={{ border: '1px solid #2a3444' }}>Revenue (manual sales)</td>
                <td className="p-2 text-slate-300 text-sm text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(summary.revenue)}</td>
              </tr>
              
              <tr>
                <td className="p-2 text-emerald-400 text-sm font-medium" style={{ border: '1px solid #2a3444' }}>Total Revenue</td>
                <td className="p-2 text-emerald-400 text-sm font-medium text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(summary.revenue)}</td>
              </tr>
              
              <tr>
                <td className="p-2 text-white text-sm font-medium" colSpan={2} style={{ border: '1px solid #2a3444' }}>Expenses</td>
              </tr>
              
              <tr>
                <td className="p-2 text-slate-300 text-sm" style={{ border: '1px solid #2a3444' }}>Expenses (Fuel Expense)</td>
                <td className="p-2 text-slate-300 text-sm text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(expenseBreakdown.fuelExpense)}</td>
              </tr>
              
              <tr>
                <td className="p-2 text-slate-300 text-sm" style={{ border: '1px solid #2a3444' }}>Expenses (Wages (Expense))</td>
                <td className="p-2 text-slate-300 text-sm text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(expenseBreakdown.wagesExpense)}</td>
              </tr>
              
              <tr>
                <td className="p-2 text-rose-400 text-sm font-medium" style={{ border: '1px solid #2a3444' }}>Total Expenses</td>
                <td className="p-2 text-rose-400 text-sm font-medium text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(expenseBreakdown.totalExpenses)}</td>
              </tr>
              
              <tr>
                <td className="p-2 text-emerald-400 text-sm font-bold" style={{ border: '1px solid #2a3444' }}>Net Income</td>
                <td className="p-2 text-emerald-400 text-sm font-bold text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(netIncome)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Balance Sheet */}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#1a273a', border: '1px solid #2a3444', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)' }}>
        <h3 className="text-cyan-400 text-sm font-medium mb-3">Balance Sheet</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: 'collapse', border: '1px solid #2a3444' }}>
            <tbody>
              <tr>
                <td className="p-2 text-white text-sm font-medium" style={{ border: '1px solid #2a3444' }}>Assets</td>
                <td className="p-2 text-right text-slate-400 text-xs" style={{ border: '1px solid #2a3444' }}>Amount</td>
                <td className="p-2 text-right text-slate-400 text-xs" style={{ border: '1px solid #2a3444' }}>Amount</td>
              </tr>
              
              <tr>
                <td className="p-2 text-slate-300 text-sm" style={{ border: '1px solid #2a3444' }}>Cash</td>
                <td className="p-2" style={{ border: '1px solid #2a3444' }}></td>
                <td className="p-2 text-emerald-400 text-sm text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(summary.totalCashOnHand)}</td>
              </tr>
              
              <tr>
                <td className="p-2 text-slate-300 text-sm" style={{ border: '1px solid #2a3444' }}>Inventory</td>
                <td className="p-2" style={{ border: '1px solid #2a3444' }}></td>
                <td className="p-2 text-slate-300 text-sm text-right" style={{ border: '1px solid #2a3444' }}>$0.00</td>
              </tr>
              
              <tr>
                <td className="p-2 text-emerald-400 text-sm font-medium" style={{ border: '1px solid #2a3444' }}>Total Assets</td>
                <td className="p-2" style={{ border: '1px solid #2a3444' }}></td>
                <td className="p-2 text-emerald-400 text-sm font-medium text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(summary.totalCashOnHand)}</td>
              </tr>
              
              <tr>
                <td className="p-2 text-white text-sm font-medium" style={{ border: '1px solid #2a3444' }}>Liabilities & Equity</td>
                <td className="p-2" style={{ border: '1px solid #2a3444' }}></td>
                <td className="p-2" style={{ border: '1px solid #2a3444' }}></td>
              </tr>
              
              <tr>
                <td className="p-2 text-slate-300 text-sm" style={{ border: '1px solid #2a3444' }}>Payable</td>
                <td className="p-2" style={{ border: '1px solid #2a3444' }}></td>
                <td className="p-2 text-amber-400 text-sm text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(summary.totalPayable)}</td>
              </tr>
              
              <tr>
                <td className="p-2 text-slate-300 text-sm" style={{ border: '1px solid #2a3444' }}>Beginning Equity</td>
                <td className="p-2" style={{ border: '1px solid #2a3444' }}></td>
                <td className="p-2 text-slate-300 text-sm text-right" style={{ border: '1px solid #2a3444' }}>$0.00</td>
              </tr>
              
              <tr>
                <td className="p-2 text-slate-300 text-sm" style={{ border: '1px solid #2a3444' }}>Retained Earnings / Net Income</td>
                <td className="p-2" style={{ border: '1px solid #2a3444' }}></td>
                <td className="p-2 text-emerald-400 text-sm text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(netIncome)}</td>
              </tr>
              
              <tr>
                <td className="p-2 text-emerald-400 text-sm font-medium" style={{ border: '1px solid #2a3444' }}>Total Liabilities & Equity</td>
                <td className="p-2" style={{ border: '1px solid #2a3444' }}></td>
                <td className="p-2 text-emerald-400 text-sm font-medium text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(summary.totalPayable + netIncome)}</td>
              </tr>
              
              <tr>
                <td className="p-2 text-white text-sm font-bold" style={{ border: '1px solid #2a3444' }}>Total</td>
                <td className="p-2" style={{ border: '1px solid #2a3444' }}></td>
                <td className="p-2 text-white text-sm font-bold text-right" style={{ border: '1px solid #2a3444' }}>{formatCurrency(summary.totalCashOnHand)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}
