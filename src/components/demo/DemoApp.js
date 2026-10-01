'use client'

import '@/i18n'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Sidebar } from '@/components/demo/Sidebar'
import { Header } from '@/components/demo/Header'
import { AddTransactionDialog } from '@/components/demo/AddTransactionDialog'
import { SignupDialog } from '@/components/demo/SignupDialog'
import { Dashboard } from '@/components/demo/sections/Dashboard'
import { FinancialReport } from '@/components/demo/sections/FinancialReport'
import { Receipts } from '@/components/demo/sections/Receipts'
import { useTransactions } from '@/hooks/demo/useTransactions'
import { useDemoLogs } from '@/hooks/demo/useDemoLogs'
import { MileageTracker } from '@/components/demo/sections/MileageTracker'
import { TripHistory } from '@/components/demo/sections/TripHistory'
import { FuelPurchase } from '@/components/demo/sections/FuelPurchase'
import { IftaReport } from '@/components/demo/sections/IftaReport'
import { Documents } from '@/components/demo/sections/Documents'
import { Connections } from '@/components/demo/sections/Connections'
import { Team } from '@/components/demo/sections/Team'
import { ReceiptScan } from '@/components/demo/ReceiptScan'
import { getIndustryExtras } from '@/data/demoIndustryExtras'
import { downloadPDFReport } from '@/utils/pdfReport'
import { Toaster } from '@/components/demo/ui/sonner'
import { toast } from 'sonner'
import { SubscriptionPlan } from '@/components/demo/sections/subscription'
import { UserProfile } from '@/components/demo/sections/userprofile'
import { BackupFile } from '@/components/demo/sections/backup'
import { IndustryIntro } from '@/components/demo/IndustryIntro'
import { DemoIndustryContext } from '@/components/demo/DemoIndustryContext'
import { buildSampleTransactions, getDemoIndustry } from '@/data/demoIndustries'
import { useDemoBusinesses } from '@/hooks/demo/useDemoBusinesses'
import { BusinessSwitcher } from '@/components/demo/BusinessSwitcher'
import { captureAttribution, trackDemoEvent } from '@/utils/demoTracking'

export default function DemoApp({ industry }) {
  const { t } = useTranslation()
  const [currentView, setCurrentView] = useState('dashboard')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])
  // Multi-business: the page's business plus any the visitor adds. Each has
  // its own data and its own industry (categories, screens).
  const businesses = useDemoBusinesses(industry.slug)
  const { activeExtra, dataKey } = businesses
  const activeIndustry = (activeExtra && getDemoIndustry(activeExtra.slug)) || industry
  const selectedBusinessType = activeIndustry.businessType
  const businessNameKey = `mesob_demo_business_name_${dataKey}`
  // Only the page's own business opens with samples; added businesses start empty.
  const sampleTransactions = useMemo(() => (activeExtra ? [] : buildSampleTransactions(industry)), [industry, activeExtra])
  const extras = useMemo(() => getIndustryExtras(activeIndustry.slug), [activeIndustry.slug])

  const {
    summary,
    cashOnHandData,
    revenueData,
    expenseData,
    payableData,
    transactions,
    expenseRows,
    openPayables,
    payPayable,
    transactionCount,
    maxTransactions,
    hasSamples,
    addTransaction,
    deleteTransaction,
    clearSamples,
  } = useTransactions(dataKey, sampleTransactions)
  const { trips, fuel, addTrip, addFuel, clearSampleLogs, ownLogCount, hasSampleLogs } = useDemoLogs(dataKey)

  // One demo cap across everything the visitor adds: transactions, trips and
  // fuel purchases. Sample rows never count.
  const usedCount = transactionCount + ownLogCount
  const hasReachedLimit = usedCount >= maxTransactions

  useEffect(() => {
    captureAttribution()
    trackDemoEvent('demo_view', { industry: industry.slug })
  }, [industry.slug])

  // Load business name from localStorage on mount. Empty until the visitor
  // names their business on the Account page.
  useEffect(() => {
    try {
      setBusinessName(localStorage.getItem(businessNameKey) || (activeExtra ? activeExtra.name : ''))
    } catch {
      setBusinessName(activeExtra ? activeExtra.name : '')
    }
  }, [businessNameKey, activeExtra])

  // Saved only on an explicit edit: an effect keyed on the name would, while
  // switching businesses, write the previous business's name under the new key.
  const saveBusinessName = (name) => {
    setBusinessName(name)
    try {
      localStorage.setItem(businessNameKey, name)
    } catch {
      // Storage blocked — the name still applies for this visit.
    }
    if (activeExtra) businesses.renameBusiness(activeExtra.id, name)
  }

  // Show signup dialog when limit is reached (also on return visits at the cap)
  useEffect(() => {
    if (hasReachedLimit) {
      setIsSignupDialogOpen(true)
    }
  }, [hasReachedLimit])

  const handleAddTransaction = (transaction) => {
    if (usedCount >= maxTransactions) {
      setIsSignupDialogOpen(true)
      return
    }

    const success = addTransaction(transaction)

    if (success) {
      trackDemoEvent('demo_add_transaction', {
        industry: industry.slug,
        transaction_type: transaction.type,
        count: usedCount + 1,
      })
      if (usedCount + 1 >= maxTransactions) {
        trackDemoEvent('demo_limit_reached', { industry: industry.slug })
      }
      toast.success(t('demo.toast.transactionAdded'))

      warnIfNearLimit()
    }
  }

  const warnIfNearLimit = () => {
    if (usedCount === maxTransactions - 2) {
      toast.warning(t('demo.toast.transactionsRemaining2'))
    } else if (usedCount === maxTransactions - 1) {
      toast.warning(t('demo.toast.transactionsRemaining1'))
    }
  }

  const canAddEntry = () => {
    if (usedCount >= maxTransactions) {
      setIsSignupDialogOpen(true)
      return false
    }
    return true
  }

  const afterLogAdded = (event) => {
    trackDemoEvent(event, { industry: industry.slug, count: usedCount + 1 })
    if (usedCount + 1 >= maxTransactions) {
      trackDemoEvent('demo_limit_reached', { industry: industry.slug })
    }
    warnIfNearLimit()
  }

  const handleSaveTrip = (trip) => {
    addTrip(trip)
    afterLogAdded('demo_add_trip')
    toast.success(t('demo.logs.tripSaved'))
    setCurrentView('trip-history')
  }

  const handleSaveFuel = (purchase) => {
    addFuel(purchase)
    afterLogAdded('demo_add_fuel')
    toast.success(t('demo.logs.fuelSaved'))
  }

  const handlePayPayable = (payableId, amount) => {
    if (usedCount >= maxTransactions) {
      setIsSignupDialogOpen(true)
      return
    }
    if (payPayable(payableId, amount)) {
      trackDemoEvent('demo_add_transaction', {
        industry: industry.slug,
        transaction_type: 'payable_payment',
        count: usedCount + 1,
      })
      if (usedCount + 1 >= maxTransactions) {
        trackDemoEvent('demo_limit_reached', { industry: industry.slug })
      }
      toast.success(t('demo.toast.transactionAdded'))
      warnIfNearLimit()
    }
  }

  const handleDeleteTransaction = (id) => {
    deleteTransaction(id)
    toast.success(t('demo.toast.transactionDeleted'))
  }

  const handleDownloadReport = () => {
    if (transactions.length === 0) {
      toast.error(t('demo.toast.noTransactionsForReport'))
      return
    }

    const dates = transactions.map(t => new Date(t.date))
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))

    const dateRange = `${minDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()} – ${maxDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}`

    const reportData = {
      companyName: businessName || t('demo.defaultBusinessName'),
      dateRange,
      totalCashOnHand: summary.totalCashOnHand,
      totalRevenue: summary.revenue,
      totalExpenses: summary.totalExpenses,
      totalPayable: summary.totalPayable,
      transactions,
      expenseRows,
      netIncome: summary.netIncome,
      totalInventory: summary.totalInventory,
      totalFixedAssets: summary.totalFixedAssets,
    }

    downloadPDFReport(reportData)
    trackDemoEvent('demo_download_report', { industry: industry.slug })
    toast.success(t('demo.toast.reportReady'))
  }

  const handleContinueDemo = () => {
    setIsSignupDialogOpen(false)
    toast.info(t('demo.toast.continueViewing'))
  }

  const handleClearSamples = () => {
    clearSamples()
    clearSampleLogs()
    toast.success(t('demo.industry.samplesCleared'))
  }

  const openAddTransaction = () => {
    if (usedCount >= maxTransactions) {
      setIsSignupDialogOpen(true)
    } else {
      setIsAddDialogOpen(true)
    }
  }

  // Receipt scan: one transaction (counts toward the cap) plus, for fuel
  // receipts, a linked fuel purchase for IFTA (does not count again).
  const handleScanSave = (transaction, fuelPurchase) => {
    if (usedCount >= maxTransactions) {
      setIsSignupDialogOpen(true)
      return
    }
    if (!addTransaction(transaction)) return
    if (fuelPurchase) addFuel(fuelPurchase)
    trackDemoEvent('demo_add_transaction', { industry: industry.slug, transaction_type: 'receipt_scan', count: usedCount + 1 })
    if (usedCount + 1 >= maxTransactions) {
      trackDemoEvent('demo_limit_reached', { industry: industry.slug })
    }
    toast.success(fuelPurchase ? t('demo.scan.savedFuel') : t('demo.scan.saved'))
    warnIfNearLimit()
  }

  // The page business's name, also while an added business is active.
  let mainBusinessName = businessName
  if (activeExtra) {
    try {
      mainBusinessName = localStorage.getItem(`mesob_demo_business_name_${industry.slug}`) || ''
    } catch {
      mainBusinessName = ''
    }
  }

  const scanButton = (
    <ReceiptScan
      industrySlug={activeIndustry.slug}
      businessType={selectedBusinessType}
      hasFuelLog={extras.features.includes('fuel')}
      canAdd={canAddEntry}
      onSave={handleScanSave}
    />
  )

  const pageLabels = {
    'dashboard': t('demo.sidebar.dashboard'),
    'financial-report': t('demo.sidebar.financialReport'),
    'receipts': t('demo.sidebar.receipts'),
    'documents': t('demo.app.nav.documents'),
    'mileage-tracker': t('demo.app.nav.mileageTracker'),
    'trip-history': t('demo.app.nav.tripHistory'),
    'fuel-purchase': t('demo.app.nav.fuelPurchase'),
    'ifta-report': t('demo.app.nav.iftaReport'),
    'connections': t('demo.connections.nav'),
    'team': t('demo.team.nav'),
    'user-profile': t('demo.sidebar.userProfile'),
    'backup-csv': t('demo.sidebar.backupCsv'),
    'subscribe': t('demo.sidebar.subscribe'),
  }

  const intro = (
    <IndustryIntro
      localeId={activeIndustry.localeId}
      slug={activeIndustry.slug}
      hasSamples={hasSamples || hasSampleLogs}
      transactionCount={usedCount}
      maxTransactions={maxTransactions}
      onClearSamples={handleClearSamples}
      scanButton={scanButton}
    />
  )

  const renderContent = () => {
    switch (currentView) {
      case 'financial-report':
        return (
          <FinancialReport
            transactions={transactions}
            summary={summary}
            expenseRows={expenseRows}
            onDeleteTransaction={handleDeleteTransaction}
            onAddTransaction={openAddTransaction}
            onDownloadReport={handleDownloadReport}
            onSubscribe={() => setCurrentView('subscribe')}
            scanButton={scanButton}
          />
        )
      case 'receipts':
        return <Receipts />
      case 'documents':
        return <Documents documents={extras.documents} />
      case 'mileage-tracker':
        return <MileageTracker requireState={extras.features.includes('ifta')} canAdd={canAddEntry} onSave={handleSaveTrip} />
      case 'trip-history':
        return <TripHistory trips={trips} />
      case 'fuel-purchase':
        return <FuelPurchase purchases={fuel} canAdd={canAddEntry} onSave={handleSaveFuel} />
      case 'ifta-report':
        return <IftaReport trips={trips} fuel={fuel} />
      case 'connections':
        return <Connections industry={activeIndustry} />
      case 'team':
        return (
          <Team
            storageKey={`mesob_demo_team_${industry.slug}`}
            ownerName={businessName || t('demo.business.myBusiness')}
            onLimit={() => setIsSignupDialogOpen(true)}
            onInvited={(role) => {
              trackDemoEvent('demo_invite_user', { industry: industry.slug, role })
              toast.success(t('demo.team.invited'))
            }}
          />
        )
      case 'user-profile':
        return (
          <UserProfile
            companyName={businessName}
            onCompanyNameChange={saveBusinessName}
            industryLocaleId={activeIndustry.localeId}
          />
        )
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
            transactions={transactions}
            expenseRows={expenseRows}
            intro={intro}
            onViewAll={() => setCurrentView('financial-report')}
          />
        )
    }
  }

  return (
    <DemoIndustryContext.Provider value={industry.slug}>
      <div className="demo-app">
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          maxTransactions={maxTransactions}
          features={extras.features}
        />

        <div className="dm-main">
          <Header
            pageLabel={pageLabels[currentView]}
            companyName={businessName}
            onMenuClick={() => setIsSidebarOpen(true)}
            onAddTransaction={openAddTransaction}
            onDownloadReport={handleDownloadReport}
            onAccountClick={() => setCurrentView('user-profile')}
            businessSwitcher={
              <BusinessSwitcher
                mainName={mainBusinessName || t('demo.business.myBusiness')}
                mainSlug={industry.slug}
                extras={businesses.extras}
                activeId={businesses.activeId}
                canAddMore={businesses.canAddMore}
                onSwitch={(id) => {
                  businesses.switchTo(id)
                  setCurrentView('dashboard')
                }}
                onAdd={(name, slug) => {
                  if (businesses.addBusiness(name, slug)) {
                    setCurrentView('dashboard')
                    trackDemoEvent('demo_add_business', { industry: industry.slug, business_type: slug })
                    toast.success(t('demo.business.added', { name: name.trim() }))
                  }
                }}
                onRemove={businesses.removeBusiness}
                onLimit={() => {
                  trackDemoEvent('demo_business_limit', { industry: industry.slug })
                  setIsSignupDialogOpen(true)
                }}
              />
            }
            transactionCount={usedCount}
            maxTransactions={maxTransactions}
          />

          <main className="dm-content" key={currentView}>
            {renderContent()}
          </main>
        </div>

        <AddTransactionDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={handleAddTransaction}
          onPayPayable={handlePayPayable}
          openPayables={openPayables}
          selectedBusinessType={selectedBusinessType}
        />

        <SignupDialog
          open={isSignupDialogOpen}
          onOpenChange={setIsSignupDialogOpen}
          onContinueDemo={handleContinueDemo}
          maxTransactions={maxTransactions}
        />

        <Toaster position="top-right" className="toaster group demo-toaster" />
      </div>
    </DemoIndustryContext.Provider>
  )
}
