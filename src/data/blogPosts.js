// Guides for the /blog/ section. Written for owners, not accountants: plain
// language, the rules that matter, and what to actually do. English only for
// now. Each body is a list of blocks rendered by pages/blog/[slug].js.
//
// Keep facts sourced from the IRS / IFTA, Inc. and phrased as general
// information — every page also shows the "not tax advice" note.

export const POSTS = [
  {
    slug: "ifta-guide-owner-operators",
    title: "IFTA for owner-operators: what to track and when to file",
    description:
      "Who needs IFTA, the four quarterly deadlines, and exactly which mileage and fuel records to keep so filing takes minutes instead of a weekend.",
    date: "2026-10-01",
    minutes: 6,
    industry: "trucking",
    demo: "truck",
    body: [
      { p: "If you drive a big truck across state lines, you almost certainly file IFTA every quarter. The return itself isn't hard. What makes it painful is rebuilding three months of miles and fuel from memory and a visor full of receipts. This guide covers who has to file, when, and what to record as you go." },
      { h2: "What IFTA is" },
      { p: "IFTA — the International Fuel Tax Agreement — lets interstate carriers report fuel tax to one base jurisdiction instead of every state they drive through. You report the miles you drove and the fuel you bought in each state or province. Your base state then works out what you owe or are owed for each one and settles it with the others." },
      { p: "It covers the 48 contiguous US states and the 10 Canadian provinces. Alaska, Hawaii and the Canadian territories are not members." },
      { h2: "Who needs an IFTA license" },
      { p: "You generally need IFTA if you operate a qualified motor vehicle in two or more member jurisdictions. A qualified motor vehicle is one used to carry people or property that:" },
      { ul: [
        "has two axles and a gross vehicle weight (or registered weight) over 26,000 lbs / 11,797 kg, or",
        "has three or more axles, whatever its weight, or",
        "is used in a combination whose total weight is over 26,000 lbs / 11,797 kg.",
      ] },
      { p: "Recreational vehicles are excluded. If you only ever drive in one state, you don't file IFTA — but you may still owe that state's own fuel or highway taxes." },
      { h2: "The four deadlines" },
      { p: "Returns are due on the last day of the month after each quarter ends:" },
      { table: { head: ["Quarter", "Months", "Return due"], rows: [
        ["Q1", "January – March", "April 30"],
        ["Q2", "April – June", "July 31"],
        ["Q3", "July – September", "October 31"],
        ["Q4", "October – December", "January 31"],
      ] } },
      { p: "If a due date falls on a weekend or holiday, many jurisdictions accept the next business day — check with your base state. You must file every quarter you hold a license, even if you didn't drive (a \"zero\" return). Late returns bring a penalty and interest." },
      { h2: "What to record on every trip" },
      { p: "Auditors want to see how you got your numbers, not just the totals. For each trip, keep:" },
      { ul: [
        "the date of the trip, start and end,",
        "where you started and finished, and the route,",
        "beginning and ending odometer or hub readings,",
        "total miles, and miles in each state or province,",
        "the truck's unit number.",
      ] },
      { h2: "What to keep for every fuel purchase" },
      { p: "Every fuel receipt should show:" },
      { ul: [
        "the date of purchase,",
        "the seller's name and address,",
        "the number of gallons (or litres) and the type of fuel,",
        "the price per gallon or the total amount,",
        "the unit number of the truck it went into,",
        "who bought it — your name or your company's.",
      ] },
      { p: "Fuel you can't back up with a receipt usually can't be claimed as tax-paid, so you end up paying the tax twice." },
      { callout: "Keep IFTA records for at least four years from the return's due date or the date you filed it, whichever is later." },
      { h2: "A routine that takes two minutes a day" },
      { ol: [
        "Log each trip when you finish it: miles by state, odometer, route.",
        "Photograph every fuel receipt at the pump, before it fades or gets lost.",
        "Once a week, check that every fill-up has a matching receipt and state.",
        "At quarter end, total the miles and gallons by state and file — or hand the totals to your preparer.",
      ] },
      { h2: "How Meksova helps" },
      { p: "In Meksova you log trips with miles by state, and scanning a fuel receipt files the gallons and state for IFTA as well as the expense in your books. At quarter end, the IFTA report shows miles and gallons by state, ready to export. Meksova gives you the totals — it doesn't file the return or calculate the tax for you." },
    ],
  },
  {
    slug: "how-long-to-keep-business-receipts",
    title: "How long should you keep business receipts? The IRS rules, simply",
    description:
      "Three years, six, seven or forever? What the IRS actually says about keeping business records, which papers matter, and whether scanned receipts count.",
    date: "2026-10-01",
    minutes: 5,
    industry: "small-business",
    demo: "other",
    body: [
      { p: "Most owners keep everything forever because nobody ever told them what they can throw away. The IRS rules are simpler than you'd think. How long you keep a record depends on how long the IRS has to look at the return it supports." },
      { h2: "The short answer" },
      { table: { head: ["Situation", "Keep records for"], rows: [
        ["Most returns", "3 years from when you filed"],
        ["You left out income worth more than 25% of the gross income you reported", "6 years"],
        ["You claimed a loss on worthless securities or a bad-debt deduction", "7 years"],
        ["Employment tax records", "At least 4 years after the tax is due or paid, whichever is later"],
        ["You didn't file, or filed a fraudulent return", "Indefinitely"],
      ] } },
      { p: "The count usually starts from the date you filed, or the due date if you filed early. A return filed before the due date is treated as filed on the due date." },
      { h2: "Records for things you own" },
      { p: "Keep the records for equipment, vehicles and property for as long as you own them, plus the period above for the year you sell or dispose of them. You need them to work out depreciation and the gain or loss when you sell." },
      { h2: "Which records matter" },
      { p: "Keep anything that shows where income came from or backs up a deduction:" },
      { ul: [
        "Income: deposit records, invoices, receipt books, cash register tapes, and 1099 forms.",
        "Purchases and expenses: receipts, invoices, credit card statements, canceled checks.",
        "Travel and vehicle: mileage logs, fuel receipts, and the business reason for each trip.",
        "Assets: when and how you bought them, what you paid, and improvements you made.",
        "Employees: payroll records, tax deposits and filed employment returns.",
      ] },
      { p: "A bank statement on its own shows you paid someone. It doesn't show what you bought, so keep the receipt or invoice too." },
      { h2: "Do scanned receipts count?" },
      { p: "Yes, if they are complete, accurate and readable. The IRS accepts electronic records, including scans and photos of paper receipts, as long as you can produce a legible copy when asked. Many thermal receipts fade within months, so a clear scan is often more reliable than the paper." },
      { callout: "Scan receipts the day you get them, and keep the scans backed up somewhere other than one phone." },
      { h2: "A simple system" },
      { ol: [
        "Scan or photograph each receipt as soon as you get it.",
        "Record it in your books with a category the same day.",
        "Keep a yearly folder of the documents you can't scan, like titles and contracts.",
        "Each spring, after you file, delete or shred anything older than your keep-until date.",
      ] },
      { h2: "How Meksova helps" },
      { p: "Meksova's receipt scan reads the amount, suggests a category and keeps the image with the transaction. Licenses, contracts and tax forms can live in Documents, and you can export all your records to CSV at any time." },
    ],
  },
  {
    slug: "cost-of-goods-sold-explained",
    title: "Cost of goods sold, explained for store and restaurant owners",
    description:
      "Why sales minus bills isn't your profit, how to work out cost of goods sold and gross margin, and the inventory habits that make the numbers right.",
    date: "2026-10-01",
    minutes: 6,
    industry: "grocery-stores",
    demo: "groceries",
    body: [
      { p: "Ask a busy store owner how the month went and you'll often hear the sales number. Sales are easy to see — they're in the register. Profit is harder, because the stock you paid for last month and the stock still on your shelves both get in the way. Cost of goods sold is how you sort that out." },
      { h2: "What cost of goods sold means" },
      { p: "Cost of goods sold (COGS) is what you paid for the products you actually sold during a period. For a grocery store, that's the wholesale cost of the items that went out the door. For a café or restaurant, it's the food and drink ingredients behind the meals you served." },
      { p: "It doesn't include rent, wages, utilities or advertising. Those are operating expenses, and they come after." },
      { h2: "The formula" },
      { callout: "Cost of goods sold = stock at the start + stock you bought − stock left at the end" },
      { p: "Say you start the month with $4,000 of stock on your shelves. You buy $3,500 more from suppliers, and at month end you count $4,400 still on hand:" },
      { table: { head: ["", "Amount"], rows: [
        ["Stock at the start", "$4,000"],
        ["+ Stock bought this month", "$3,500"],
        ["− Stock left at the end", "$4,400"],
        ["= Cost of goods sold", "$3,100"],
      ] } },
      { p: "If sales that month were $6,200, your gross profit is $6,200 − $3,100 = $3,100, a gross margin of 50%. Wages, rent and utilities then come out of that $3,100." },
      { h2: "Why \"sales minus bills\" gets it wrong" },
      { p: "If you treat every supplier invoice as an expense the day it arrives, a month where you stock up looks terrible. The month after, when you sell that stock without buying much, looks amazing. Neither is true. Counting purchases as inventory first, and moving them to cost of goods only when they sell, gives you a profit you can compare month to month." },
      { h2: "Gross margin: the number to watch" },
      { p: "Gross margin is gross profit divided by sales. It tells you how much of each dollar of sales is left to pay for everything else. Watch it every month. If it slips, look at supplier prices, waste and spoilage, theft, or prices on your shelf that haven't kept up." },
      { p: "Restaurants often track the same idea as food cost percentage — food cost divided by food sales. Many operators aim for roughly 28–35%, but the right number depends on your menu and prices. Your own trend matters more than an industry rule of thumb." },
      { h2: "Habits that keep the numbers honest" },
      { ol: [
        "Record every supplier invoice as stock, not as a general expense.",
        "Count what's on your shelves at least once a quarter — monthly if you can.",
        "Write off spoiled or damaged stock when it happens, so it doesn't hide in your margin.",
        "Keep stock you resell separate from supplies you use up, like bags and cleaning products.",
      ] },
      { h2: "How Meksova helps" },
      { p: "Connect your POS and bank card and sales and supplier payments sync into Meksova automatically. Goods you buy for resale are recorded as inventory. When you record a sale, the cost moves into cost of goods sold, so your income statement shows gross profit and margin, not just sales minus bills. Supplier invoices you haven't paid yet sit under Payable until you pay them, in full or in parts." },
    ],
  },
];

export const getPost = (slug) => POSTS.find((post) => post.slug === slug);

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
