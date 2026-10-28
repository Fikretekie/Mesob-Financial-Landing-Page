import { businessTypes } from '../../src/utils/businessTypes';
import { DEMO_INDUSTRIES } from '../../src/data/demoIndustries';
import { getConnectionFeeds } from '../../src/data/demoConnections';
for (const ind of DEMO_INDUSTRIES) {
  const bt: any = (businessTypes as any)[ind.businessType] || {};
  const f = getConnectionFeeds(ind.slug);
  for (const r of [...f.bank, ...f.square, ...f.squareMore]) {
    const list = r.amount < 0 ? bt.income || [] : bt.expenses || [];
    if (!list.includes(r.purpose)) console.log('MISSING', ind.slug, r.amount < 0 ? 'income' : 'expense', JSON.stringify(r.purpose), '-> options:', list.slice(0, 12).join(' | '));
  }
}
console.log('checked');
