import type { Transaction } from '@/types';

interface ReportData {
  companyName: string;
  dateRange: string;
  totalCashOnHand: number;
  totalRevenue: number;
  totalExpenses: number;
  totalPayable: number;
  transactions: Transaction[];
  fuelExpense: number;
  wagesExpense: number;
}
import headerData from '@/data/headerData';

const { logo } = headerData;
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
  });
};

export function generateReportHTML(data: ReportData, logoBase64?: string): string {
  const netIncome = data.totalRevenue - data.totalExpenses;
  const companyName = data.companyName === 'Enter your business name' 
    ? 'Company Name' 
    : data.companyName;
  const totalAssets = data.totalCashOnHand;
  const totalLiabilities = data.totalPayable;
  const ownerEquity = totalAssets - totalLiabilities;

  const sortedTransactions = [...data.transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName} - Financial Executive Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
     font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 11pt;
  line-height: 1.5;
  color: #333;
  background: white;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
    }
    
    @page {
      size: A4;
      margin: 1.5cm;
    }
    
    @page :first {
      margin: 0;
    }
    
    .cover {
   width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%) !important;
  position: relative;
  overflow: hidden;
  page-break-after: always;
  padding: 1cm 2cm;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}


    
    .cover::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -30%;
      width: 80%;
      height: 100%;
      background: radial-gradient(ellipse, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
    }
    
    .cover::after {
      content: '';
      position: absolute;
      bottom: -30%;
      left: -20%;
      width: 60%;
      height: 80%;
      background: radial-gradient(ellipse, rgba(16, 185, 129, 0.1) 0%, transparent 60%);
    }
    
    .cover-content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .cover-header {
  text-align: center;
  padding-top: 1.5cm;
}
    
    .cover-logo {
  display: inline-block;
  margin-bottom: 1.0cm;
}

.cover-logo img {
  border-radius: 12px;
  object-fit: contain;
}
    
    .cover-logo span {
      color: white;
      font-size: 28pt;
      font-weight: bold;
    }
    
    .cover-title {
      font-size: 28pt;
      font-weight: 700;
      color: white;
      margin-bottom: 0.5cm;
      letter-spacing: 1px;
    }
    
    .cover-subtitle {
      font-size: 12pt;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 1cm;
    }
    
    .cover-date {
      font-size: 11pt;
      color: #64748b;
    }
    
    .summary-cards {
  display: flex;
  justify-content: center;
  gap: 0.6cm;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
  flex-wrap: wrap;
}
    
    .summary-card {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 8px;
      padding: 0.8cm;
      min-width: 4cm;
      text-align: center;
    }
    
    .summary-card-label {
      font-size: 8pt;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.3cm;
    }
    
    .summary-card-value {
      font-size: 16pt;
      font-weight: 700;
      color: white;
    }
    
    .summary-card.value-positive {
      color: #10b981;
    }
    
    .summary-card.value-negative {
      color: #f43f5e;
    }
    
    .cover-footer {
      text-align: center;
      padding-bottom: 1cm;
    }
    
    .cover-footer p {
      font-size: 9pt;
      color: #475569;
    }
    
    .page {
       padding: 1cm 1.5cm;
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 0.5cm;
      margin-bottom: 1cm;
    }
    
    .page-header h2 {
      font-size: 16pt;
      font-weight: 700;
      color: #0f172a;
    }
    
    .page-header .badge {
      background: #10b981;
      color: white;
      padding: 0.2cm 0.5cm;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .section {
      margin-bottom: 0.6cm;
    }
    
    .section-title {
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.3cm;
      padding-bottom: 0.2cm;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5cm;
      margin-bottom: 1cm;
    }
    
    .metric-item {
      display: flex;
      justify-content: space-between;
      padding: 0.4cm;
      background: #f8fafc;
      border-radius: 4px;
    }
    
    .metric-label {
      font-size: 10pt;
      color: #64748b;
    }
    
    .metric-value {
      font-size: 11pt;
      font-weight: 600;
      color: #0f172a;
    }
    
    .metric-value.positive {
      color: #10b981;
    }
    
    .metric-value.negative {
      color: #f43f5e;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1cm;
      font-size: 9pt;
    }
    
    thead {
      display: table-header-group;
    }
    
    th {
       background: #0f172a !important;
      color: white;
      padding: 0.3cm;
      text-align: left;
      font-weight: 600;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    th.text-right {
      text-align: right;
    }
    
    td {
      padding: 0.3cm;
      border-bottom: 1px solid #e2e8f0;
    }
    
    td.text-right {
      text-align: right;
    }
    
    tr:nth-child(even) {
      background: #f8fafc;
    }
    
    tr {
      page-break-inside: avoid;
    }
    
    .amount-positive {
      color: #10b981;
      font-weight: 600;
    }
    
    .amount-negative {
      color: #f43f5e;
      font-weight: 600;
    }
    
    .footer {
      margin-top: 1cm;
      padding-top: 0.5cm;
      border-top: 1px solid #e2e8f0;
      font-size: 8pt;
      color: #64748b;
      text-align: center;
    }
    
    .disclaimer {
      background: #fef3c7;
      border-left: 3px solid #f59e0b;
      padding: 0.4cm;
      margin-top: 1cm;
      font-size: 8pt;
      color: #92400e;
    }
    
    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5cm;
    }
    
    
      .highlight-box {
          background: linear-gradient(135deg, #0f172a, #1e293b) !important;
        color: white;
        padding: 0.4cm;
        margin-top: 0.2cm;
        border-radius: 6px;
      }

      .highlight-box h4 {
        font-size: 7pt;
        color: #94a3b8;
        margin-bottom: 0.15cm;
        text-transform: uppercase;
      }

      .highlight-box .value {
        font-size: 12pt;
        font-weight: 700;
      }
  </style>
</head>
<body>
  <!-- Cover Page -->
  <div class="cover">
    <div class="cover-content">
      <div class="cover-header">
      <div class="cover-logo">
        <img src="${logoBase64 || logo.src}" alt="${companyName} Logo" width="120" height="120" />
      </div>
        <h1 class="cover-title">${companyName}</h1>
        <p class="cover-subtitle">Financial Executive Report</p>
        <p class="cover-date">${data.dateRange}</p>
      </div>
      
      <div class="summary-cards">
        <div class="summary-card">
          <div class="summary-card-label">Cash on Hand</div>
          <div class="summary-card-value" style="color: #10b981;">${formatCurrency(data.totalCashOnHand)}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-label">Total Revenue</div>
          <div class="summary-card-value" style="color: #3b82f6;">${formatCurrency(data.totalRevenue)}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-label">Total Expenses</div>
          <div class="summary-card-value" style="color: #f43f5e;">${formatCurrency(data.totalExpenses)}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-label">Total Payable</div>
          <div class="summary-card-value" style="color: #f59e0b;">${formatCurrency(data.totalPayable)}</div>
        </div>
      </div>
      
      <div class="cover-footer">
        <p>Financial Reporting Systems | ${data.companyName} | Confidential</p>
      </div>
    </div>
  </div>
  
  <!-- Page 2: Financial Details -->
  <div class="page">
    <div class="page-header">
      <h2>Financial Audit Detail</h2>
      <span class="badge">Internal Ledger | Verified</span>
    </div>
    
    <div class="two-column">
      <div>
        <div class="section">
         <h3 class="section-title">Statement Summary</h3>
          <div class="highlight-grid">
            <div class="highlight-box">
              <h4>Total Cash on Hand</h4>
              <div class="value" style="color: #10b981;">${formatCurrency(data.totalCashOnHand)}</div>
            </div>
            <div class="highlight-box">
              <h4>Gross Revenue</h4>
              <div class="value" style="color: #3b82f6;">${formatCurrency(data.totalRevenue)}</div>
            </div>
            <div class="highlight-box">
              <h4>Total Payable (Unpaid)</h4>
              <div class="value" style="color: #f59e0b;">${formatCurrency(data.totalPayable)}</div>
            </div>
            <div class="highlight-box">
              <h4>Total Expense</h4>
              <div class="value" style="color: #f43f5e;">${formatCurrency(data.totalExpenses)}</div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h3 class="section-title">Balance Sheet Details</h3>
          <table>
            <thead>
              <tr>
                <th>Account Detail</th>
                <th class="text-right">Current Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Assets (Cash & Cash Equivalents)</td>
                <td class="text-right amount-positive">${formatCurrency(totalAssets)}</td>
              </tr>
              <tr>
                <td>Current Liabilities (Short-Term Payables)</td>
                <td class="text-right amount-negative">(${formatCurrency(totalLiabilities)})</td>
              </tr>
              <tr>
                <td><strong>Total Owner Equity</strong></td>
                <td class="text-right"><strong class="amount-positive">${formatCurrency(ownerEquity)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <div class="section">
          <h3 class="section-title">Income Statement Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2"><strong>Revenue</strong></td>
              </tr>
              <tr>
                <td style="padding-left: 0.5cm;">Freight Revenue / Manual Sales</td>
                <td class="text-right amount-positive">${formatCurrency(data.totalRevenue)}</td>
              </tr>
              <tr>
                <td><strong>Total Revenue</strong></td>
                <td class="text-right"><strong class="amount-positive">${formatCurrency(data.totalRevenue)}</strong></td>
              </tr>
              <tr>
                <td colspan="2"><strong>Expenses</strong></td>
              </tr>
              <tr>
                <td style="padding-left: 0.5cm;">Fuel Expenses</td>
                <td class="text-right amount-negative">(${formatCurrency(data.fuelExpense)})</td>
              </tr>
              <tr>
                <td style="padding-left: 0.5cm;">Wages & Fees</td>
                <td class="text-right amount-negative">(${formatCurrency(data.wagesExpense)})</td>
              </tr>
              <tr>
                <td><strong>Net Income</strong></td>
                <td class="text-right"><strong class="amount-positive">${formatCurrency(netIncome)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h3 class="section-title">Verified Journal Entries</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th class="text-right">Debit</th>
            <th class="text-right">Credit</th>
          </tr>
        </thead>
        <tbody>
          ${sortedTransactions.map(t => `
            <tr>
              <td>${formatDate(t.date)}</td>
              <td>${t.description} #${t.srNo}</td>
              <td class="text-right">${t.debit > 0 ? `<span class="amount-negative">${formatCurrency(t.debit)}</span>` : '-'}</td>
              <td class="text-right">${t.credit > 0 ? `<span class="amount-positive">${formatCurrency(t.credit)}</span>` : '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="disclaimer">
      <strong>Terms & Responsibility:</strong> The user is fully responsible for the accuracy and completeness of information entered into the system. Mesob Financial is not responsible for inaccuracies in user-input data.
    </div>
    
    <div class="footer">
      <p>Verification ID: ${data.companyName.substring(0, 2).toUpperCase()}-${new Date().getFullYear()}-${new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase()} | ${data.companyName} | Confidential | Page 2 of 2</p>
    </div>
  </div>
</body>
</html>`;
}

export async function downloadPDFReport(data: ReportData): Promise<void> {
  // Convert logo to base64 so it works in the new window
  const response = await fetch(logo.src);
  const blob = await response.blob();
  const logoBase64: string = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });

  const html = generateReportHTML(data, logoBase64);
  
  const htmlBlob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(htmlBlob);
  
  const printWindow = window.open(url, '_blank');
  
  if (printWindow) {
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  }
  
  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 60000);
}
