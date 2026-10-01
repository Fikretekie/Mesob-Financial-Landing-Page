'use client'

import { useCallback, useEffect, useState } from 'react';

// Multi-business, like the app's BusinessSwitcher: the page's own business
// ("main") plus extra businesses the visitor adds. Each business keeps its own
// transactions / trips / fuel, stored under its own key. The demo allows one
// extra business; more is a paid-plan feature.
export const MAX_EXTRA_BUSINESSES = 1;

export interface DemoBusiness {
  id: string;
  name: string;
  slug: string; // industry of the business (drives categories + screens)
}

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked — businesses still work for this visit.
  }
};

export function useDemoBusinesses(pageSlug: string) {
  const listKey = `mesob_demo_businesses_${pageSlug}`;
  const activeKey = `mesob_demo_active_business_${pageSlug}`;
  const [extras, setExtras] = useState<DemoBusiness[]>([]);
  const [activeId, setActiveId] = useState('main');

  useEffect(() => {
    const list = read<DemoBusiness[]>(listKey, []);
    const active = read<string>(activeKey, 'main');
    setExtras(list);
    setActiveId(list.some((b) => b.id === active) ? active : 'main');
  }, [listKey, activeKey]);

  const switchTo = useCallback((id: string) => {
    setActiveId(id);
    write(activeKey, id);
  }, [activeKey]);

  const addBusiness = useCallback((name: string, slug: string) => {
    if (extras.length >= MAX_EXTRA_BUSINESSES) return false;
    const business = { id: `b${Date.now()}`, name: name.trim(), slug };
    const next = [...extras, business];
    setExtras(next);
    write(listKey, next);
    switchTo(business.id);
    return true;
  }, [extras, listKey, switchTo]);

  const removeBusiness = useCallback((id: string) => {
    const next = extras.filter((b) => b.id !== id);
    setExtras(next);
    write(listKey, next);
    // Drop that business's data too.
    try {
      ['transactions', 'trips', 'fuel', 'business_name'].forEach((kind) => {
        localStorage.removeItem(`mesob_demo_${kind}_${pageSlug}__${id}`);
      });
    } catch {
      // ignore
    }
    if (activeId === id) switchTo('main');
  }, [extras, listKey, pageSlug, activeId, switchTo]);

  const renameBusiness = useCallback((id: string, name: string) => {
    const next = extras.map((b) => (b.id === id ? { ...b, name } : b));
    setExtras(next);
    write(listKey, next);
  }, [extras, listKey]);

  const active = extras.find((b) => b.id === activeId);
  return {
    extras,
    activeId,
    activeExtra: active ?? null,
    // Storage key suffix for the active business's data; "main" keeps the
    // original keys so existing visitors' data is untouched.
    dataKey: active ? `${pageSlug}__${active.id}` : pageSlug,
    canAddMore: extras.length < MAX_EXTRA_BUSINESSES,
    switchTo,
    addBusiness,
    removeBusiness,
    renameBusiness,
  };
}
