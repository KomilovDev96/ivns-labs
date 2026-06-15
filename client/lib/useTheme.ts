'use client';
import { useEffect, useState, useCallback } from 'react';

export type Theme = 'dark' | 'light';

const EVENT = 'ivn-theme-change';

// Read the value already set by the inline anti-flash script
function readTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark';
}

function applyTheme(t: Theme) {
  try {
    localStorage.setItem('ivnlabs-theme', t);
  } catch { /* ignore */ }
  document.documentElement.setAttribute('data-theme', t);
  // Notify every useTheme() instance across the page
  window.dispatchEvent(new CustomEvent(EVENT, { detail: t }));
}

export function useTheme() {
  // Initialize directly from the DOM attr (already set by the inline script → no flash)
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    // Re-sync if the attribute changed before this component mounted
    setTheme(readTheme());

    const handler = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
  }, []);

  return { theme, toggle };
}
