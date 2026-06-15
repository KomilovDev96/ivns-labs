'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useSectionT } from '@/lib/useT';

export default function Footer() {
  const tBase = useTranslations('footer');
  const locale = useLocale();
  const t = useSectionT('footer', tBase, locale);

  const linkStyle: React.CSSProperties = {
    color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.15s', cursor: 'pointer', display: 'block',
  };

  return (
    <footer style={{ background: 'var(--bg-section-footer)', borderTop: '1px solid var(--border-subtle)', padding: '4rem 0 2rem' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr', gap: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-subtle)' }} className="footer-grid">
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem', background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>⬡</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                IVN<span style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Labs</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t('tagline')}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>🇺🇿 {t('itpark')}</p>
          </div>

          {/* Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="footer-links">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{t('colServices')}</h4>
              {(['s1','s2','s3','s4','s5'] as const).map(k => (
                <a key={k} href="#services" style={linkStyle}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}>
                  {t(k)}
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{t('colCompany')}</h4>
              {(['c1','c2','c3','c4'] as const).map(k => (
                <a key={k} href="#" style={linkStyle}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}>
                  {t(k)}
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{t('colContact')}</h4>
              <a href="mailto:info@ivnlabs.uz" style={linkStyle}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}>
                info@ivnlabs.uz
              </a>
              <a href="tel:+998900000000" style={linkStyle}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}>
                +998 90 000 00 00
              </a>
              <span style={linkStyle}>Tashkent, IT Park</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{t('rights')}</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Telegram', 'LinkedIn', 'GitHub'].map(s => (
              <a key={s} href="#" style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 500 }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .footer-links { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </footer>
  );
}
