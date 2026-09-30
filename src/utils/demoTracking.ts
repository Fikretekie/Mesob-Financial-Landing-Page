// Ad attribution + analytics for the industry demos. Visitors arrive from an
// ad with utm_* / gclid on the URL; we keep those for the session and pass
// them (plus the industry) on to app sign-up so the ad gets credit.

const SIGNUP_URL = 'https://app.meksova.com/signup';
const ATTRIBUTION_KEY = 'mesob_demo_attribution';
const ATTRIBUTION_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
];

type Attribution = Record<string, string>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readStoredAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || '{}');
  } catch {
    return {};
  }
}

export function captureAttribution() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const incoming: Attribution = {};
  ATTRIBUTION_PARAMS.forEach((key) => {
    const value = params.get(key);
    if (value) incoming[key] = value;
  });
  if (Object.keys(incoming).length === 0) return;
  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(incoming));
  } catch {
    // Storage blocked (private mode) — attribution is best-effort.
  }
}

export function signupUrl(industrySlug?: string) {
  const url = new URL(SIGNUP_URL);
  if (industrySlug) url.searchParams.set('industry', industrySlug);
  if (typeof window !== 'undefined') {
    Object.entries(readStoredAttribution()).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url.toString();
}

export function trackDemoEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

export function goToSignup(industrySlug: string | undefined, source: string, newTab = false) {
  trackDemoEvent('demo_signup_click', { industry: industrySlug, source });
  const href = signupUrl(industrySlug);
  if (newTab) {
    window.open(href, '_blank', 'noopener');
  } else {
    window.location.href = href;
  }
}
