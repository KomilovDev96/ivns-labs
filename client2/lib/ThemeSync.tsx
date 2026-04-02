'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Restores the saved theme from localStorage after every client-side navigation.
 * Without this, switching locale via router.push can reset data-theme.
 */
export function ThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ivnlabs-theme');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch { /* ignore */ }
  }, [pathname]);

  return null;
}
