'use client'

import { useCallback, useEffect, useState } from 'react';
import { getConnectionFeeds, type FeedRow } from '@/data/demoConnections';

// Per-business connection state for the demo, shaped like the app's
// fetchConnections() result: plaid = bank, square = POS. Nothing here talks
// to a real bank — connecting loads the industry's sample feed instead.
export interface ProviderState {
  connected: boolean;
  institution?: string;
  lastSync?: string;
  autoImportAll?: boolean;
  /** Bank rows waiting in the Review screen (plaid only). */
  pending: FeedRow[];
  /** Last few rows brought in, for the card's Recent preview. */
  recent: FeedRow[];
  /** Square: whether the follow-up batch has been synced already. */
  moreSynced?: boolean;
}

export type ConnectionsState = Record<'plaid' | 'square', ProviderState>;

const empty = (): ConnectionsState => ({
  plaid: { connected: false, pending: [], recent: [] },
  square: { connected: false, pending: [], recent: [] },
});

export function useDemoConnections(dataKey: string, industrySlug: string) {
  const storageKey = `mesob_demo_conn_${dataKey}`;
  const [state, setState] = useState<ConnectionsState>(empty);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setState(stored ? { ...empty(), ...JSON.parse(stored) } : empty());
    } catch {
      setState(empty());
    }
  }, [storageKey]);

  const save = useCallback(
    (next: ConnectionsState) => {
      setState(next);
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Storage blocked — the state still applies for this visit.
      }
    },
    [storageKey],
  );

  const feeds = getConnectionFeeds(industrySlug);

  /** Bank connected: its rows wait for review (or come straight in with auto-sync). */
  const connectBank = useCallback(() => {
    const autoImportAll = !!state.plaid.autoImportAll;
    save({
      ...state,
      plaid: {
        connected: true,
        institution: 'Demo Community Bank ••4821',
        lastSync: new Date().toISOString(),
        autoImportAll,
        pending: autoImportAll ? [] : feeds.bank,
        recent: feeds.bank.slice(0, 3),
      },
    });
    return autoImportAll ? feeds.bank : [];
  }, [state, save, feeds.bank]);

  /** Square connected: its card sales import straight in, as in the app. */
  const connectSquare = useCallback(() => {
    save({
      ...state,
      square: { connected: true, institution: 'Square', lastSync: new Date().toISOString(), pending: [], recent: feeds.square.slice(0, 3) },
    });
    return feeds.square;
  }, [state, save, feeds.square]);

  /** "Sync now": one more batch the first time, then nothing new. */
  const syncSquare = useCallback(() => {
    const rows = state.square.moreSynced ? [] : feeds.squareMore;
    save({
      ...state,
      square: {
        ...state.square,
        lastSync: new Date().toISOString(),
        moreSynced: true,
        recent: [...rows, ...state.square.recent].slice(0, 3),
      },
    });
    return rows;
  }, [state, save, feeds.squareMore]);

  const disconnect = useCallback(
    (id: 'plaid' | 'square') => {
      save({ ...state, [id]: { ...state[id], connected: false, pending: [], recent: [] } });
    },
    [state, save],
  );

  const setAutoSync = useCallback(
    (on: boolean) => {
      save({ ...state, plaid: { ...state.plaid, autoImportAll: on } });
    },
    [state, save],
  );

  /** Review done: every listed row is cleared, whether added or skipped. */
  const finishReview = useCallback(
    (autoImportAll: boolean) => {
      save({ ...state, plaid: { ...state.plaid, pending: [], autoImportAll, lastSync: new Date().toISOString() } });
    },
    [state, save],
  );

  return { state, connectBank, connectSquare, syncSquare, disconnect, setAutoSync, finishReview };
}
