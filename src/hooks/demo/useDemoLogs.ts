'use client'

import { useCallback, useEffect, useState } from 'react';
import {
  buildSampleFuel,
  buildSampleTrips,
  type DemoFuelPurchase,
  type DemoTrip,
} from '@/data/demoIndustryExtras';

// Trips and fuel purchases for the industry screens (Mileage, Trip History,
// Fuel, IFTA). Stored per industry in the visitor's browser, seeded with
// samples on first visit. Entries the visitor adds count toward the same
// demo cap as transactions — the caller combines the counts.
function usePersistentList<T extends { sample?: boolean }>(key: string, samples: () => T[]) {
  const [items, setItems] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let next: T[] | null = null;
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) next = JSON.parse(stored);
    } catch {
      next = null;
    }
    setItems(next ?? samples());
    setLoaded(true);
    // samples is a stable builder for this key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch {
      // Storage blocked — the demo still works for this visit.
    }
  }, [items, loaded, key]);

  return [items, setItems] as const;
}

export function useDemoLogs(industrySlug: string) {
  const [trips, setTrips] = usePersistentList<DemoTrip>(
    `mesob_demo_trips_${industrySlug}`,
    () => buildSampleTrips(industrySlug),
  );
  const [fuel, setFuel] = usePersistentList<DemoFuelPurchase>(
    `mesob_demo_fuel_${industrySlug}`,
    () => buildSampleFuel(industrySlug),
  );

  const addTrip = useCallback((trip: Omit<DemoTrip, 'id'>) => {
    setTrips((prev) => [...prev, { ...trip, id: `trip-${Date.now()}` }]);
  }, [setTrips]);

  const addFuel = useCallback((purchase: Omit<DemoFuelPurchase, 'id'>) => {
    setFuel((prev) => [...prev, { ...purchase, id: `fuel-${Date.now()}` }]);
  }, [setFuel]);

  const clearSampleLogs = useCallback(() => {
    setTrips((prev) => prev.filter((t) => !t.sample));
    setFuel((prev) => prev.filter((f) => !f.sample));
  }, [setTrips, setFuel]);

  return {
    trips,
    fuel,
    addTrip,
    addFuel,
    clearSampleLogs,
    ownLogCount: trips.filter((t) => !t.sample).length + fuel.filter((f) => !f.sample).length,
    hasSampleLogs: trips.some((t) => t.sample) || fuel.some((f) => f.sample),
  };
}
