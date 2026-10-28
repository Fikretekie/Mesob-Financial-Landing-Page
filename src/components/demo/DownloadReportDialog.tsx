'use client'

import { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@/components/demo/ui/dialog';
import type { Transaction } from '@/types';
import { periodStatements, runningSeries, type PeriodRange } from '@/utils/demoAccounting';

// Mirrors app.meksova.com's Download Report (src/components/DownloadReportModal.js):
// pick a period and report type, optionally add trend charts and the ledger,
// and get a PDF built from the same clean-corporate statement sheets.
// Sheets are rendered off-screen and captured with html2canvas into jsPDF.
// Statement text is English, as in the app.

type Period = 'current' | 'month' | 'last-month' | 'quarter' | 'ytd' | 'custom';
type ReportType = 'statements' | 'overview' | 'complete';

interface DownloadReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactions: Transaction[];
  companyName: string;
  onGenerated: () => void;
}

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// ── Clean-corporate palette (same as the app's statement sheets) ─────────────
const SANS = "'Segoe UI','Helvetica Neue',Helvetica,Arial,system-ui,sans-serif";
const INK = '#111418', BODY = '#3b424c', MUTE = '#6b7280', FAINT = '#9aa1ab';
const HAIR = '#ebedf0', HAIRS = '#d7dbe0', ACCENT = '#1f3a5f', SOFT = '#f4f7fb', POS = '#15803d';
const C = ['#1f3a5f', '#2f7d7b', '#c08a2d', '#a85d4a', '#7a8796'];

export function DownloadReportDialog({ open, onOpenChange, transactions, companyName, onGenerated }: DownloadReportDialogProps) {
  const { t } = useTranslation();
  const dt = (key: string) => t(`demo.downloadReport.${key}`);
  const [period, setPeriod] = useState<Period>('current');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reportType, setReportType] = useState<ReportType>('statements');
  const [includeCharts, setIncludeCharts] = useState(false);
  const [includeLedger, setIncludeLedger] = useState(false);
  const [generating, setGenerating] = useState(false);

  const range: PeriodRange | null = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    if (period === 'custom') return fromDate && toDate ? { from: fromDate, to: toDate } : null;
    if (period === 'month') return { from: iso(new Date(y, m, 1)), to: iso(new Date(y, m + 1, 0)) };
    if (period === 'last-month') return { from: iso(new Date(y, m - 1, 1)), to: iso(new Date(y, m, 0)) };
    if (period === 'quarter') {
      const qs = Math.floor(m / 3) * 3;
      return { from: iso(new Date(y, qs, 1)), to: iso(new Date(y, qs + 3, 0)) };
    }
    if (period === 'ytd') return { from: iso(new Date(y, 0, 1)), to: iso(now) };
    return null; // current view: everything recorded
  }, [period, fromDate, toDate]);

  const s = useMemo(() => periodStatements(transactions, range), [transactions, range]);
  const inRange = useMemo(
    () => (range ? transactions.filter((tx) => tx.date.slice(0, 10) >= range.from && tx.date.slice(0, 10) <= range.to) : transactions),
    [transactions, range],
  );
  const series = useMemo(() => runningSeries(inRange), [inRange]);

  const n2 = (v: number) => Math.abs(Number(v) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = (v: number) => `$${n2(v)}`;
  const neg = (v: number) => `(${n2(v)})`;
  const dLong = (d: string | Date) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const endDate = range ? dLong(`${range.to}T12:00:00`) : dLong(new Date());
  const startDate = range ? dLong(`${range.from}T12:00:00`) : null;
  const preparedOn = dLong(new Date());
  const entity = companyName.trim() || 'Your Business';
  const periodText = startDate ? `${startDate} – ${endDate}` : `Up to ${endDate}`;

  const wantStatements = reportType === 'statements' || reportType === 'complete';
  const wantOverview = reportType === 'overview' || reportType === 'complete';
  const lastSheet = includeLedger ? 'ledgerSheet' : includeCharts ? 'chartsSheet' : wantOverview ? 'glanceSheet' : 'bsSheet';

  // Top-expenses donut: top 5, the rest grouped as Other.
  const expEntries: [string, number][] = [...s.expLines.map(([p, a]) => [p, Math.abs(a)] as [string, number])];
  if (s.depreciation > 0.005) expEntries.push(['Depreciation', s.depreciation]);
  expEntries.sort((a, b) => b[1] - a[1]);
  const slices: [string, number][] = expEntries.length > 5
    ? [...expEntries.slice(0, 4), ['Other', expEntries.slice(4).reduce((sum, [, a]) => sum + a, 0)]]
    : expEntries;
  const expTotal = slices.reduce((sum, [, a]) => sum + a, 0);

  const cashPoints = series.cash.map((p) => p.amount);
  const cFirst = cashPoints.find((v) => Math.abs(v) > 0.005);
  const cLast = cashPoints.length ? cashPoints[cashPoints.length - 1] : 0;
  const cDelta = cFirst && Math.abs(cFirst) > 0.005 ? ((cLast - cFirst) / Math.abs(cFirst)) * 100 : null;

  // ── Style objects (from the app) ────────────────────────────────────────────
  const sheet: React.CSSProperties = { width: '720px', background: '#ffffff', color: INK, padding: '44px 50px 38px', fontFamily: SANS, boxSizing: 'border-box', marginBottom: '40px', fontVariantNumeric: 'tabular-nums' };
  const tdc: React.CSSProperties = { padding: '7px 0', fontSize: '13px', verticalAlign: 'baseline' };
  const numTd: React.CSSProperties = { ...tdc, textAlign: 'right', width: '28%', whiteSpace: 'nowrap' };
  const grp: React.CSSProperties = { ...tdc, fontWeight: 600, paddingTop: '14px', color: INK };
  const item: React.CSSProperties = { ...tdc, paddingLeft: '20px', color: BODY };
  const itemNum: React.CSSProperties = { ...numTd, color: BODY };
  const sub: React.CSSProperties = { ...tdc, fontWeight: 600, borderTop: `1px solid ${HAIR}`, paddingTop: '8px' };
  const subNum: React.CSSProperties = { ...numTd, fontWeight: 600, borderTop: `1px solid ${HAIR}`, paddingTop: '8px' };
  const tot: React.CSSProperties = { ...tdc, fontWeight: 700, fontSize: '14px', borderTop: `1.5px solid ${INK}`, paddingTop: '9px' };
  const totNum: React.CSSProperties = { ...numTd, fontWeight: 700, fontSize: '14px', borderTop: `1.5px solid ${INK}`, paddingTop: '9px' };
  const totBand: React.CSSProperties = { ...tot, background: SOFT, paddingLeft: '12px', borderTopLeftRadius: '4px' };
  const totBandNum: React.CSSProperties = { ...totNum, background: SOFT, paddingRight: '12px', borderTopRightRadius: '4px' };
  const cardStyle: React.CSSProperties = { border: `1px solid ${HAIR}`, borderRadius: '8px', padding: '14px 16px 10px', marginTop: '14px' };
  const cardHead: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', marginBottom: '8px' };
  const cardTitle: React.CSSProperties = { fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTE, fontWeight: 700 };
  const cardVal: React.CSSProperties = { fontSize: '19px', fontWeight: 600, letterSpacing: '-0.01em', color: INK, whiteSpace: 'nowrap' };

  const Head = ({ statement, metaLabel, metaValue }: { statement: string; metaLabel: string; metaValue: string }) => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '17px', borderBottom: `1px solid ${HAIRS}` }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.15 }}>{entity}</div>
          <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTE, marginTop: '7px', fontWeight: 600 }}>Financial Statements</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '13px', letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 700, color: ACCENT }}>Meksova</div>
          <div style={{ fontSize: '9.5px', letterSpacing: '0.1em', textTransform: 'uppercase', color: FAINT, marginTop: '5px', fontWeight: 600 }}>Prepared {preparedOn}</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 32px', margin: '17px 0 2px' }}>
        {[['Statement', statement], [metaLabel, metaValue], ['Currency', 'USD'], ['Basis', 'Accrual']].map(([k, v]) => (
          <div key={k}>
            <div style={{ fontSize: '9px', letterSpacing: '0.09em', textTransform: 'uppercase', color: FAINT, fontWeight: 700 }}>{k}</div>
            <div style={{ fontSize: '12px', color: INK, fontWeight: 500, marginTop: '2px' }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
  const Kpis = ({ items }: { items: [string, string][] }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: HAIRS, border: `1px solid ${HAIRS}`, borderRadius: '6px', overflow: 'hidden', margin: '24px 0 6px' }}>
      {items.map(([l, v]) => (
        <div key={l} style={{ background: SOFT, padding: '14px 18px' }}>
          <div style={{ fontSize: '9.5px', letterSpacing: '0.09em', textTransform: 'uppercase', color: ACCENT, fontWeight: 700 }}>{l}</div>
          <div style={{ fontSize: '21px', fontWeight: 600, letterSpacing: '-0.01em', marginTop: '6px', color: INK }}>{v}</div>
        </div>
      ))}
    </div>
  );
  const Sec = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: '15px', fontWeight: 600, margin: '28px 0 6px', paddingLeft: '11px', borderLeft: `3px solid ${ACCENT}`, letterSpacing: '-0.005em' }}>{children}</div>
  );
  const Foot = ({ id }: { id: string }) => (
    <>
      {id === lastSheet && (
        <div style={{ marginTop: '24px', padding: '14px 16px', border: `1px solid ${HAIRS}`, borderLeft: `3px solid ${ACCENT}`, borderRadius: '6px', background: SOFT }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, fontWeight: 700, marginBottom: '7px' }}>Notes &amp; responsibility</div>
          <div style={{ fontSize: '11px', lineHeight: 1.65, color: BODY }}>These statements are prepared on an accrual basis from records entered by the business in Meksova, and are unaudited. The user is solely responsible for the accuracy and completeness of the information entered. Meksova is not responsible for inaccuracies in user-provided data. These statements are not a substitute for a tax return or an independent audit. Demo: built from sample and visitor-entered data.</div>
        </div>
      )}
      <div style={{ marginTop: '24px', paddingTop: '12px', borderTop: `1px solid ${HAIR}`, fontSize: '10px', color: MUTE, display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        <span>Unaudited · {entity} · Confidential</span>
        <span style={{ color: FAINT }}>Prepared with Meksova</span>
      </div>
    </>
  );

  // Simple SVG charts (the app uses ApexCharts; the shapes and colours match).
  const AreaChart = ({ data, color, width, height }: { data: number[]; color: string; width: number; height: number }) => {
    if (data.length < 2) return <div style={{ height }} />;
    const min = Math.min(0, ...data);
    const max = Math.max(...data, 1);
    const x = (i: number) => (i / (data.length - 1)) * width;
    const y = (v: number) => height - 8 - ((v - min) / (max - min || 1)) * (height - 16);
    const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path d={`${line} L${width} ${height} L0 ${height} Z`} fill={color} fillOpacity={0.1} />
        <path d={line} fill="none" stroke={color} strokeWidth={2} />
        <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r={4} fill={color} stroke="#fff" strokeWidth={2} />
      </svg>
    );
  };
  const Donut = ({ size }: { size: number }) => {
    const r = size / 2 - 12;
    const c = 2 * Math.PI * r;
    let acc = 0;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map(([name, amt], i) => {
          const frac = expTotal ? amt / expTotal : 0;
          const el = (
            <circle key={name} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C[i % C.length]} strokeWidth={22}
              strokeDasharray={`${frac * c} ${c}`} strokeDashoffset={-acc * c} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
          );
          acc += frac;
          return el;
        })}
        <text x="50%" y="47%" textAnchor="middle" fontSize="10" fill={MUTE} fontFamily={SANS}>TOTAL</text>
        <text x="50%" y="58%" textAnchor="middle" fontSize="16" fontWeight={700} fill={INK} fontFamily={SANS}>{money(expTotal)}</text>
      </svg>
    );
  };

  const generate = async () => {
    setGenerating(true);
    try {
      const [{ jsPDF }, { default: html2canvas }] = await Promise.all([import('jspdf'), import('html2canvas')]);
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter', compress: true });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let first = true;
      // One-page sheets scale down to fit; only the ledger slices across pages.
      const addSheet = async (id: string, paginate = false) => {
        const el = document.getElementById(id);
        if (!el) return;
        const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', logging: false, useCORS: true });
        const pxPerMm = canvas.width / pageWidth;
        const imgHeightMm = canvas.height / pxPerMm;
        if (!paginate || imgHeightMm <= pageHeight) {
          if (!first) doc.addPage();
          let drawW = pageWidth;
          let drawH = imgHeightMm;
          if (drawH > pageHeight) {
            drawW = pageWidth * (pageHeight / drawH);
            drawH = pageHeight;
          }
          doc.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', (pageWidth - drawW) / 2, 0, drawW, drawH);
          first = false;
          return;
        }
        const pageHpx = Math.floor(pageHeight * pxPerMm);
        for (let rendered = 0; rendered < canvas.height; rendered += pageHpx) {
          const sliceH = Math.min(pageHpx, canvas.height - rendered);
          const slice = document.createElement('canvas');
          slice.width = canvas.width;
          slice.height = sliceH;
          const ctx = slice.getContext('2d');
          if (!ctx) continue;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, slice.width, slice.height);
          ctx.drawImage(canvas, 0, rendered, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
          if (!first) doc.addPage();
          first = false;
          doc.addImage(slice.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pageWidth, sliceH / pxPerMm);
        }
      };
      if (wantStatements) {
        await addSheet('pnlSheet');
        await addSheet('bsSheet');
      }
      if (wantOverview) await addSheet('glanceSheet');
      if (includeCharts) await addSheet('chartsSheet');
      if (includeLedger) await addSheet('ledgerSheet', true);
      doc.save(`${(companyName || 'Financial').replace(/\s+/g, '_')}_Report_${iso(new Date())}.pdf`);
      onGenerated();
      onOpenChange(false);
    } catch (error) {
      console.error('PDF generation error:', error);
    } finally {
      setGenerating(false);
    }
  };

  const PERIODS: [Period, string][] = [
    ['current', dt('periodCurrent')], ['month', dt('periodThisMonth')], ['last-month', dt('periodLastMonth')],
    ['quarter', dt('periodQuarter')], ['ytd', dt('periodYtd')], ['custom', dt('periodCustom')],
  ];
  const TYPES: [ReportType, string, string][] = [
    ['statements', dt('typeStatements'), dt('typeStatementsDesc')],
    ['overview', dt('typeOverview'), dt('typeOverviewDesc')],
    ['complete', dt('typeComplete'), dt('typeCompleteDesc')],
  ];
  const ledger = [...inRange].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} style={{ maxWidth: 520 }}>
        <div className="dm-modal__head">
          <DialogTitle className="dm-modal__title">{dt('title')}</DialogTitle>
        </div>

        {/* Off-screen statement sheets, captured into the PDF. */}
        {open && (
          <div style={{ position: 'fixed', left: '-10000px', top: 0 }} aria-hidden="true">
            <div id="pnlSheet" style={sheet}>
              <Head statement="Profit & Loss" metaLabel="Period" metaValue={periodText} />
              <Kpis items={[
                ['Total revenue', money(s.totalRevenue)],
                ['Net income', s.netIncome < 0 ? `(${money(s.netIncome)})` : money(s.netIncome)],
                ['Net margin', s.totalRevenue > 0.005 ? `${((100 * s.netIncome) / s.totalRevenue).toFixed(1)}%` : '—'],
              ]} />
              <Sec>Statement of Profit &amp; Loss</Sec>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr><td style={grp}>Revenue</td><td style={numTd}></td></tr>
                  {s.revLines.length ? s.revLines.map(([p, a]) => (
                    <tr key={'r' + p}><td style={item}>{p}</td><td style={itemNum}>{n2(a)}</td></tr>
                  )) : <tr><td style={item}>Sales &amp; services</td><td style={itemNum}>{n2(s.totalRevenue)}</td></tr>}
                  <tr><td style={sub}>Total revenue</td><td style={subNum}>{n2(s.totalRevenue)}</td></tr>
                  {s.cogs > 0.005 && <tr><td style={item}>Cost of goods sold</td><td style={itemNum}>{neg(s.cogs)}</td></tr>}
                  <tr><td style={sub}>Gross profit</td><td style={subNum}>{n2(s.grossProfit)}</td></tr>
                  <tr><td style={grp}>Operating expenses</td><td style={numTd}></td></tr>
                  {s.expLines.map(([p, a]) => (
                    <tr key={'e' + p}><td style={item}>{p}</td><td style={itemNum}>{neg(a)}</td></tr>
                  ))}
                  {s.depreciation > 0.005 && <tr><td style={item}>Depreciation</td><td style={itemNum}>{neg(s.depreciation)}</td></tr>}
                  {s.otherExpense > 0.005 && <tr><td style={item}>Other expense</td><td style={itemNum}>{neg(s.otherExpense)}</td></tr>}
                  <tr><td style={sub}>Total operating expenses</td><td style={subNum}>{neg(s.operatingExpenses + s.depreciation + s.otherExpense)}</td></tr>
                  <tr><td style={totBand}>Net income</td><td style={{ ...totBandNum, color: s.netIncome < 0 ? BODY : POS }}>{s.netIncome < 0 ? `(${money(s.netIncome)})` : money(s.netIncome)}</td></tr>
                </tbody>
              </table>
              <Foot id="pnlSheet" />
            </div>

            <div id="bsSheet" style={sheet}>
              <Head statement="Balance Sheet" metaLabel="As at" metaValue={endDate} />
              <Kpis items={[
                ['Total assets', money(s.totalAssets)],
                ['Liabilities', money(s.payable)],
                ["Owner's equity", money(s.totalEquity)],
              ]} />
              <Sec>Balance Sheet</Sec>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr><td style={grp}>Assets</td><td style={numTd}></td></tr>
                  <tr><td style={item}>Cash on hand</td><td style={itemNum}>{s.cash < 0 ? neg(s.cash) : n2(s.cash)}</td></tr>
                  <tr><td style={item}>Inventory</td><td style={itemNum}>{n2(s.inventory)}</td></tr>
                  <tr><td style={sub}>Total current assets</td><td style={subNum}>{s.totalCurrentAssets < 0 ? neg(s.totalCurrentAssets) : n2(s.totalCurrentAssets)}</td></tr>
                  {s.fixedAtCost > 0.005 && (
                    <>
                      <tr><td style={item}>Equipment &amp; vehicles, at cost</td><td style={itemNum}>{n2(s.fixedAtCost)}</td></tr>
                      <tr><td style={item}>Less: accumulated depreciation</td><td style={itemNum}>{neg(s.accumDep)}</td></tr>
                      <tr><td style={sub}>Net fixed assets</td><td style={subNum}>{n2(s.netFixed)}</td></tr>
                    </>
                  )}
                  <tr><td style={tot}>Total assets</td><td style={totNum}>{s.totalAssets < 0 ? `(${money(s.totalAssets)})` : money(s.totalAssets)}</td></tr>
                  <tr><td style={{ height: '10px' }}></td><td></td></tr>
                  <tr><td style={grp}>Liabilities</td><td style={numTd}></td></tr>
                  <tr><td style={item}>Accounts payable</td><td style={itemNum}>{n2(s.payable)}</td></tr>
                  <tr><td style={sub}>Total liabilities</td><td style={subNum}>{n2(s.payable)}</td></tr>
                  <tr><td style={grp}>Equity</td><td style={numTd}></td></tr>
                  <tr><td style={item}>Owner&apos;s capital — opening</td><td style={itemNum}>{n2(s.openingEquity)}</td></tr>
                  <tr><td style={item}>Retained earnings (net income)</td><td style={itemNum}>{s.retained < 0 ? neg(s.retained) : n2(s.retained)}</td></tr>
                  <tr><td style={sub}>Total equity</td><td style={subNum}>{s.totalEquity < 0 ? neg(s.totalEquity) : n2(s.totalEquity)}</td></tr>
                  <tr><td style={totBand}>Total liabilities &amp; equity</td><td style={totBandNum}>{s.totalLE < 0 ? `(${money(s.totalLE)})` : money(s.totalLE)}</td></tr>
                </tbody>
              </table>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', marginTop: '14px', fontSize: '11px', fontWeight: 600, color: s.balanced ? ACCENT : '#8f3a3a', background: s.balanced ? SOFT : '#fbeeee', border: `1px solid ${s.balanced ? '#dbe4f0' : '#f0d4d4'}`, padding: '7px 12px', borderRadius: '6px' }}>
                <span style={{ color: s.balanced ? POS : '#8f3a3a', fontSize: '10px' }}>●</span>
                {s.balanced
                  ? `Balanced — assets equal liabilities plus equity: ${money(s.totalAssets)} = ${money(s.totalLE)}`
                  : `Assets ${money(s.totalAssets)} vs liabilities + equity ${money(s.totalLE)} (period-scoped balance sheet).`}
              </div>
              <Foot id="bsSheet" />
            </div>

            <div id="glanceSheet" style={sheet}>
              <Head statement="Performance Overview" metaLabel="Period" metaValue={periodText} />
              <Sec>At a glance</Sec>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {([
                    ['Total revenue', money(s.totalRevenue), false],
                    ['Cost of goods sold', s.cogs > 0.005 ? neg(s.cogs) : n2(0), false],
                    ['Gross profit', n2(s.grossProfit), false],
                    ['Operating expenses', neg(s.operatingExpenses + s.depreciation + s.otherExpense), false],
                    ['Net income', s.netIncome < 0 ? `(${money(s.netIncome)})` : money(s.netIncome), true],
                    ['Net margin', s.totalRevenue > 0.005 ? `${((100 * s.netIncome) / s.totalRevenue).toFixed(1)}%` : '—', false],
                    ['Cash on hand', s.cash < 0 ? `(${money(s.cash)})` : money(s.cash), false],
                    ['Total payable (unpaid)', money(s.payable), false],
                  ] as [string, string, boolean][]).map(([k, v, key]) => (
                    <tr key={k} style={{ borderBottom: `1px solid ${HAIR}` }}>
                      <td style={{ padding: '9px 0', fontSize: '13px', color: BODY, fontWeight: key ? 700 : 400 }}>{k}</td>
                      <td style={{ padding: '9px 0', fontSize: '13px', textAlign: 'right', fontWeight: key ? 700 : 500, color: key && s.netIncome >= 0 ? POS : INK }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Foot id="glanceSheet" />
            </div>

            <div id="chartsSheet" style={sheet}>
              <Head statement="Trends" metaLabel="Period" metaValue={periodText} />
              <Sec>Trends</Sec>
              <div style={cardStyle}>
                <div style={cardHead}>
                  <div style={cardTitle}>Cash on hand</div>
                  <div style={cardVal}>
                    {s.cash < 0 ? `(${money(s.cash)})` : money(s.cash)}
                    {cDelta != null && <span style={{ fontSize: '11px', fontWeight: 600, marginLeft: '7px', color: cDelta >= 0 ? POS : '#a85d4a' }}>{cDelta >= 0 ? '▲' : '▼'} {Math.abs(cDelta).toFixed(0)}%</span>}
                  </div>
                </div>
                <AreaChart data={cashPoints} color={ACCENT} width={584} height={170} />
              </div>
              {slices.length >= 2 && (
                <div style={cardStyle}>
                  <div style={cardTitle}>Top expenses</div>
                  <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap', marginTop: '6px' }}>
                    <Donut size={200} />
                    <div style={{ flex: 1, minWidth: '230px' }}>
                      {slices.map(([name, amt], i) => (
                        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '5px 0', fontSize: '12px', borderBottom: `1px solid ${HAIR}` }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '2px', flex: 'none', background: C[i % C.length] }}></span>
                          <span style={{ flex: 1, color: BODY }}>{name}</span>
                          <span style={{ fontWeight: 600, color: INK }}>{money(amt)}</span>
                          <span style={{ color: FAINT, width: '46px', textAlign: 'right' }}>{expTotal > 0 ? Math.round((100 * amt) / expTotal) : 0}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
                <div style={{ ...cardStyle, marginTop: 0 }}>
                  <div style={cardHead}><div style={cardTitle}>Revenue</div><div style={{ ...cardVal, fontSize: '15px' }}>{money(s.totalRevenue)}</div></div>
                  <AreaChart data={series.revenue.map((p) => p.amount)} color="#2f7d7b" width={267} height={110} />
                </div>
                <div style={{ ...cardStyle, marginTop: 0 }}>
                  <div style={cardHead}><div style={cardTitle}>Total payable</div><div style={{ ...cardVal, fontSize: '15px' }}>{money(s.payable)}</div></div>
                  <AreaChart data={series.payable.map((p) => p.amount)} color="#a85d4a" width={267} height={110} />
                </div>
              </div>
              <Foot id="chartsSheet" />
            </div>

            <div id="ledgerSheet" style={sheet}>
              <Head statement="Transaction Ledger" metaLabel="Period" metaValue={periodText} />
              <Sec>Transaction Ledger</Sec>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Date', 'Description', 'Debit', 'Credit'].map((h, i) => (
                      <th key={h} style={{ fontSize: '9px', letterSpacing: '0.07em', textTransform: 'uppercase', color: FAINT, fontWeight: 700, textAlign: i >= 2 ? 'right' : 'left', padding: '0 0 8px', borderBottom: `1px solid ${HAIRS}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ledger.map((tx) => {
                    const amt = n2(tx.type === 'income' ? tx.credit : tx.debit);
                    const isRec = tx.type === 'income';
                    return (
                      <tr key={tx.id} style={{ borderBottom: `1px solid ${HAIR}` }}>
                        <td style={{ padding: '6px 0', fontSize: '11px', color: MUTE, whiteSpace: 'nowrap', verticalAlign: 'top' }}>{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                        <td style={{ padding: '6px 10px 6px 0', fontSize: '12px', color: BODY }}>{tx.description.split('\n')[0]}</td>
                        <td style={{ padding: '6px 0', fontSize: '12px', textAlign: 'right', color: INK }}>{isRec ? amt : '–'}</td>
                        <td style={{ padding: '6px 0', fontSize: '12px', textAlign: 'right', color: INK }}>{!isRec ? amt : '–'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Foot id="ledgerSheet" />
            </div>
          </div>
        )}

        <div className="dm-modal__body dm-report">
          <div>
            <p className="dm-report__label">{dt('reportPeriod')}</p>
            <div className="dm-report__chips">
              {PERIODS.map(([k, label]) => (
                <button key={k} type="button" className={`dm-report__chip${period === k ? ' is-active' : ''}`} aria-pressed={period === k} onClick={() => setPeriod(k)}>{label}</button>
              ))}
            </div>
            {period === 'custom' && (
              <div className="dm-report__dates">
                <label>
                  {dt('from')}
                  <input type="date" className="dm-input" value={fromDate} max={toDate || undefined} onChange={(e) => setFromDate(e.target.value)} />
                </label>
                <label>
                  {dt('to')}
                  <input type="date" className="dm-input" value={toDate} min={fromDate || undefined} onChange={(e) => setToDate(e.target.value)} />
                </label>
              </div>
            )}
          </div>

          <div>
            <p className="dm-report__label">{dt('reportTypeLabel')}</p>
            <div className="dm-report__types">
              {TYPES.map(([k, title, desc]) => (
                <button key={k} type="button" className={`dm-report__type${reportType === k ? ' is-active' : ''}`} aria-pressed={reportType === k} onClick={() => setReportType(k)}>
                  <span className="dm-report__type-title">{title}</span>
                  <span className="dm-report__type-desc">{desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="dm-report__label">{dt('includeLabel')}</p>
            <label className="dm-report__check">
              <input type="checkbox" checked={includeCharts} onChange={(e) => setIncludeCharts(e.target.checked)} />
              {dt('includeCharts')}
            </label>
            <label className="dm-report__check">
              <input type="checkbox" checked={includeLedger} onChange={(e) => setIncludeLedger(e.target.checked)} />
              {dt('includeLedger')}
            </label>
          </div>

          <button
            type="button"
            className="mk-btn mk-btn--primary mk-btn--block dm-save"
            onClick={generate}
            disabled={generating || (period === 'custom' && (!fromDate || !toDate))}
          >
            {generating ? <Loader2 className="dm-spin" width={16} height={16} /> : dt('generateReport')}
          </button>
          <p className="dm-report__note">{dt('pdfNote')}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
