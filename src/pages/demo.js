'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Sidebar } from '@/components/demo/Sidebar'
import { Header } from '@/components/demo/Header'
import { AddTransactionDialog } from '@/components/demo/AddTransactionDialog'
import { SignupDialog } from '@/components/demo/SignupDialog'
import { Dashboard } from '@/components/demo/sections/Dashboard'
import { FinancialReport } from '@/components/demo/sections/FinancialReport'
import { Receipts } from '@/components/demo/sections/Receipts'
import { useTransactions } from '@/hooks/demo/useTransactions'
import { downloadPDFReport } from '@/utils/pdfReport'
import { Toaster } from '@/components/demo/ui/sonner'
import { toast } from 'sonner'
import { SubscriptionPlan } from '@/components/demo/sections/subscription'
import { UserProfile } from '@/components/demo/sections/userprofile'
import { BackupFile } from '@/components/demo/sections/backup'

// Demo styles are imported in _app.js to comply with Next.js CSS rules

export default function DemoPage() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false)
  
  const {
    summary,
    cashOnHandData,
    revenueData,
    expenseData,
    payableData,
    transactions,
    expenseBreakdown,
    hasReachedLimit,
    transactionCount,
    maxTransactions,
    addTransaction,
    deleteTransaction,
  } = useTransactions()

  // Show signup dialog when limit is reached
  useEffect(() => {
    if (hasReachedLimit) {
      setIsSignupDialogOpen(true)
    }
  }, [hasReachedLimit])

  const handleAddTransaction = (transaction) => {
    if (transactionCount >= maxTransactions) {
      setIsSignupDialogOpen(true)
      return
    }
    
    addTransaction(transaction)
    toast.success('Transaction added successfully!')
    
    // Show warning when approaching limit
    if (transactionCount === maxTransactions - 2) {
      toast.warning('You have 2 transactions remaining in the demo.')
    }
  }

  const handleDeleteTransaction = (id) => {
    deleteTransaction(id)
    toast.success('Transaction deleted successfully!')
  }

  const handleDownloadReport = () => {
    if (transactions.length === 0) {
      toast.error('No transactions to include in the report. Add some transactions first!')
      return
    }

    // Get date range from transactions
    const dates = transactions.map(t => new Date(t.date))
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))
    
    const dateRange = `${minDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()} – ${maxDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}`

    const reportData = {
      companyName: 'HH LLC',
      dateRange,
      totalCashOnHand: summary.totalCashOnHand,
      totalRevenue: summary.revenue,
      totalExpenses: summary.totalExpenses,
      totalPayable: summary.totalPayable,
      transactions,
      fuelExpense: expenseBreakdown.fuelExpense,
      wagesExpense: expenseBreakdown.wagesExpense,
    }

    downloadPDFReport(reportData)
    toast.success('Report opened for download! Use Ctrl+P (or Cmd+P) to save as PDF.')
  }

  const handleContinueDemo = () => {
    setIsSignupDialogOpen(false)
    toast.info('You can continue viewing your data, but cannot add more transactions.')
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            summary={summary}
            cashOnHandData={cashOnHandData}
            revenueData={revenueData}
            expenseData={expenseData}
            payableData={payableData}
          />
        )
      case 'financial-report':
        return (
          <FinancialReport
            transactions={transactions}
            summary={summary}
            expenseBreakdown={expenseBreakdown}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )
      case 'receipts':
        return <Receipts />

      case 'user-profile':
        return <UserProfile />

      case 'backup-csv':
        return <BackupFile />

      case 'subscribe':
        return <SubscriptionPlan />
      default:
        return (
          <Dashboard
            summary={summary}
            cashOnHandData={cashOnHandData}
            revenueData={revenueData}
            expenseData={expenseData}
            payableData={payableData}
          />
        )
    }
  }

  return (
    <>
      <Head>
        <title>MESOB Financial - Demo</title>
        <meta name="description" content="MESOB Financial Management Dashboard Demo" />
      </Head>
      
      {/* Wrap everything in demo-app class to scope Tailwind styles */}
      <div className="demo-app flex h-screen bg-[#0b1120]">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            companyName="HH LLC" 
            onAddTransaction={() => {
              if (transactionCount >= maxTransactions) {
                setIsSignupDialogOpen(true)
              } else {
                setIsAddDialogOpen(true)
              }
            }}
            onDownloadReport={handleDownloadReport}
            transactionCount={transactionCount}
            maxTransactions={maxTransactions}
          />
          
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>

        <AddTransactionDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={handleAddTransaction}
        />

        <SignupDialog
          open={isSignupDialogOpen}
          onOpenChange={setIsSignupDialogOpen}
          onContinueDemo={handleContinueDemo}
        />
        
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
            },
          }}
        />
      </div>
    </>
  )
}
