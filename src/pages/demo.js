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
import { BusinessTypeSelector } from '@/components/demo/BusinessTypeSelector'

export default function DemoPage() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false)
  const [selectedBusinessType, setSelectedBusinessType] = useState('Trucking')
  const [showBusinessTypeSelector, setShowBusinessTypeSelector] = useState(false)
  const [businessName, setBusinessName] = useState('Enter your business name')
  
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

  // Load business name from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem('mesob_demo_business_name')
    if (storedName) {
      setBusinessName(storedName)
    }
  }, [])

  // Save business name to localStorage when it changes
  useEffect(() => {
    if (businessName) {
      localStorage.setItem('mesob_demo_business_name', businessName)
    }
  }, [businessName])

  // Load business type from localStorage on mount
  useEffect(() => {
    const storedBusinessType = localStorage.getItem('mesob_demo_business_type')
    if (storedBusinessType) {
      setSelectedBusinessType(storedBusinessType)
    } else {
      setShowBusinessTypeSelector(true)
    }
  }, [])

  // Save business type to localStorage when it changes
  useEffect(() => {
    if (selectedBusinessType) {
      localStorage.setItem('mesob_demo_business_type', selectedBusinessType)
    }
  }, [selectedBusinessType])

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
    
    const success = addTransaction(transaction)
    
    if (success) {
      toast.success('Transaction added successfully!')
      
      if (transactionCount === maxTransactions - 2) {
        toast.warning('You have 2 transactions remaining in the demo.')
      } else if (transactionCount === maxTransactions - 1) {
        toast.warning('You have 1 transaction remaining in the demo.')
      }
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

    const dates = transactions.map(t => new Date(t.date))
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))
    
    const dateRange = `${minDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()} – ${maxDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}`

    const reportData = {
      companyName: businessName,
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
   toast.success('Your report is ready! Save it as PDF from the print dialog.')
  }

  const handleContinueDemo = () => {
    setIsSignupDialogOpen(false)
    toast.info('You can continue viewing your data, but cannot add more transactions.')
  }

  const handleBusinessTypeSelected = (businessType) => {
    setSelectedBusinessType(businessType)
    setShowBusinessTypeSelector(false)
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
        <title>meksova - Demo</title>
        <meta name="description" content="meksova Management Dashboard Demo" />
      </Head>
      
      <div className="demo-app flex flex-col sm:flex-row h-screen bg-[#101926]">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            companyName={businessName}
            onCompanyNameChange={setBusinessName}
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

        <BusinessTypeSelector
          open={showBusinessTypeSelector}
          onOpenChange={setShowBusinessTypeSelector}
          onSelect={handleBusinessTypeSelected}
          currentBusinessType={selectedBusinessType}
        />

        <AddTransactionDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={handleAddTransaction}
          selectedBusinessType={selectedBusinessType}
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