'use client';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/lib/useTheme';

const LOCALES = ['ru', 'uz', 'en'] as const;
// Full names shown in the dropdown for clarity
const LOCALE_LABELS: Record<string, string>      = { ru: 'RU', uz: "O'Z", en: 'EN' };
const LOCALE_FULL: Record<string, string>        = { ru: 'Русский', uz: "O'zbek", en: 'English' };

// Sun / Moon icons as SVG strings
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (l: string) => {
    const parts = pathname.split('/');
    parts[1] = l;
    router.push(parts.join('/'));
    setLangOpen(false);
  };

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const home = `/${locale}`;
  const anchor = (hash: string) => isHome ? hash : `${home}${hash}`;

  const links = [
    { href: anchor('#about'),    label: t('about') },
    { href: anchor('#services'), label: t('services') },
    { href: anchor('#products'), label: t('products') },
    { href: anchor('#projects'), label: t('projects') },
    { href: anchor('#process'),  label: t('process') },
    { href: anchor('#contact'),  label: t('contact') },
  ];

  const isDark = theme === 'dark';

  return (
    <motion.nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '0.6rem 0' : '1rem 0',
        background: scrolled ? 'var(--bg-nav)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
        transition: 'all 0.3s ease',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        {/* Logo */}
        <Link href={home} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.5rem', background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>⬡</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            IVN<span style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Labs</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem', margin: 0 }} className="nav-links">
          {links.map(link => (
            <li key={link.href}>
              <Link href={link.href}
                style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.15s', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>

          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            title={isDark ? 'Switch to light' : 'Switch to dark'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 34, height: 34, borderRadius: '50%',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
              border: '1px solid var(--border-subtle)',
              color: isDark ? '#fbbf24' : '#4a6080',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            whileHover={{ scale: 1.08, rotate: isDark ? 20 : -20 }}
            whileTap={{ scale: 0.93 }}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </motion.button>

          {/* Lang switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{ background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'all 0.15s' }}>
              {LOCALE_LABELS[locale]} <span style={{ fontSize: '0.6rem' }}>▾</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', listStyle: 'none', overflow: 'hidden', minWidth: 60, backdropFilter: 'blur(12px)' }}>
                  {LOCALES.filter(l => l !== locale).map(l => (
                    <li key={l}>
                      <button onClick={() => switchLocale(l)}
                        style={{ width: '100%', padding: '0.5rem 1rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500, textAlign: 'left', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-blue-dim)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}>
                        <span style={{ fontWeight: 700, marginRight: '0.4rem' }}>{LOCALE_LABELS[l]}</span>
                        <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>{LOCALE_FULL[l]}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* CTA button — new gradient */}
          <Link href={anchor('#contact')} className="nav-cta" style={{ textDecoration: 'none' }}>
            <motion.span
              style={{ display: 'inline-block', background: 'var(--gradient-btn)', color: '#fff', padding: '0.45rem 1.2rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 600, boxShadow: 'var(--shadow-btn)', transition: 'opacity 0.15s', whiteSpace: 'nowrap' }}
              whileHover={{ scale: 1.04, opacity: 0.9 }}
              whileTap={{ scale: 0.96 }}>
              {t('contact')}
            </motion.span>
          </Link>

          {/* Burger */}
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2, background: 'var(--text-secondary)', borderRadius: 2, transition: 'all 0.3s',
                transform: menuOpen ? (i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none') : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', background: 'var(--bg-nav)', backdropFilter: 'blur(18px)', borderTop: '1px solid var(--border-subtle)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {links.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500, padding: '0.65rem 0', borderBottom: '1px solid var(--border-subtle)', display: 'block', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', alignItems: 'center' }}>
              {LOCALES.map(l => (
                <button key={l} onClick={() => { switchLocale(l); setMenuOpen(false); }}
                  style={{ background: l === locale ? 'var(--accent-blue-dim)' : 'transparent', border: `1px solid ${l === locale ? 'var(--accent-blue)' : 'var(--border-subtle)'}`, color: l === locale ? 'var(--accent-blue)' : 'var(--text-secondary)', padding: '0.35rem 0.8rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}>
                  {LOCALE_LABELS[l]} <span style={{ fontWeight: 400, opacity: 0.7, fontSize: '0.7rem' }}>{LOCALE_FULL[l]}</span>
                </button>
              ))}
              {/* Theme toggle in mobile */}
              <button onClick={toggle}
                style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>
                {isDark ? <><SunIcon /> Light</> : <><MoonIcon /> Dark</>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
