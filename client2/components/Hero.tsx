'use client';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';
import { useTheme } from '@/lib/useTheme';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

export default function Hero() {
  const t = useTranslations('hero');
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        // Light mode: airy brand sky — pale sky-blue → white → soft lavender
        background: isLight
          ? 'linear-gradient(150deg, #e8f4ff 0%, #f4f8ff 35%, #fafbff 60%, #f0eaff 100%)'
          : 'transparent',
        transition: 'background 0.4s ease',
      }}
    >
      {/* 3D canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Scene3D theme={theme} />
      </div>

      {/* Overlay: dark mode — deep space vignette; light mode — hidden */}
      {!isLight && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(5,8,22,0.20) 0%, rgba(5,8,22,0.56) 100%)',
        }} />
      )}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 'var(--container)',
        margin: '0 auto', padding: '8rem 1.5rem 4rem',
      }}>
        <motion.div
          variants={stagger} initial="hidden" animate="visible"
          style={{ maxWidth: 780, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: isLight ? 'rgba(14,165,233,0.1)' : 'rgba(14,165,233,0.1)',
              border: `1px solid ${isLight ? 'rgba(2,132,199,0.35)' : 'rgba(14,165,233,0.3)'}`,
              borderRadius: 100, padding: '0.35rem 1rem',
              fontSize: '0.82rem',
              color: isLight ? '#0284c7' : '#7dd3fc',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: isLight ? '#0284c7' : '#0ea5e9',
                animation: 'pulse 2s infinite', display: 'inline-block',
              }} />
              {t('badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 6vw, 5rem)',
            fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}>
            {t('title')}{' '}
            <span style={{
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {t('titleAccent')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeUp} style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 620,
          }}>
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--gradient-btn)', color: '#fff',
              padding: '0.85rem 2rem', borderRadius: 'var(--radius-md)',
              fontSize: '1rem', fontWeight: 600,
              boxShadow: 'var(--shadow-btn)', textDecoration: 'none',
            }}
              whileHover={{ scale: 1.04, boxShadow: '0 6px 32px rgba(14,165,233,0.5)' }}
              whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}>
              {t('ctaPrimary')} →
            </motion.a>
            <motion.a href="#projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: isLight ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.06)',
              color: 'var(--text-primary)',
              padding: '0.85rem 2rem', borderRadius: 'var(--radius-md)',
              fontSize: '1rem', fontWeight: 600,
              border: '1px solid var(--border-glow)',
              backdropFilter: 'blur(10px)', textDecoration: 'none',
            }}
              whileHover={{ scale: 1.04, background: 'rgba(14,165,233,0.12)' }}
              whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}>
              {t('ctaSecondary')}
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} style={{
            display: 'flex', gap: '3rem', paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap',
          }}>
            {[
              [t('stat1Value'), t('stat1Label')],
              [t('stat2Value'), t('stat2Label')],
              [t('stat3Value'), t('stat3Label')],
            ].map(([val, label]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 700,
                  background: 'var(--gradient-accent)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{val}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          color: 'var(--text-muted)', fontSize: '1.2rem',
        }}>
        ↓
      </motion.div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </section>
  );
}
