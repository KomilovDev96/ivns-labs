'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { fadeUp, stagger, slideLeft, slideRight } from '@/lib/animations';
import { useSectionT } from '@/lib/useT';
import {
  TbUsers, TbRocket, TbShieldCheck, TbTrophy,
} from 'react-icons/tb';

const stats = [
  { icon: TbTrophy,      key: 'stat1' },
  { icon: TbUsers,       key: 'stat2' },
  { icon: TbRocket,      key: 'stat3' },
  { icon: TbShieldCheck, key: 'stat4' },
];

const values = ['val1', 'val2', 'val3', 'val4'] as const;

// IT Park Uzbekistan official colors
function ItParkBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.85rem',
        background: 'rgba(255,255,255,0.06)',
        border: '1.5px solid rgba(14,165,233,0.30)',
        borderRadius: 'var(--radius-lg)',
        padding: '0.85rem 1.4rem',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/itpark-logo.png"
        alt="IT Park Uzbekistan"
        width={48}
        height={48}
        style={{ objectFit: 'contain', flexShrink: 0 }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
        <span style={{
          fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#4caf50',
        }}>
          Official Resident
        </span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)',
          lineHeight: 1.2,
        }}>
          IT Park Uzbekistan
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Start Local · Go Global
        </span>
      </div>

      {/* Verified checkmark */}
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginLeft: '0.25rem',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  );
}

export default function About() {
  const tBase = useTranslations('about');
  const locale = useLocale();
  const t = useSectionT('about', tBase, locale);

  return (
    <section
      id="about"
      style={{
        padding: '7rem 0',
        background: 'var(--bg-section-secondary)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* BG decoration */}
      <div style={{
        position: 'absolute', top: '50%', right: -200, transform: 'translateY(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '20%', left: -150,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── Top label ── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ display: 'block', width: 36, height: 1.5, borderRadius: 2, background: 'var(--accent-purple)', opacity: 0.6 }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-purple)' }}>
              {t('label')}
            </span>
            <span style={{ display: 'block', width: 36, height: 1.5, borderRadius: 2, background: 'var(--accent-purple)', opacity: 0.6 }} />
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15,
          }}>
            {t('title')}
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '4rem',
        }}>

          {/* Left — text + IT Park badge */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <p style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
            }}>
              {t('desc1')}
            </p>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              lineHeight: 1.75,
            }}>
              {t('desc2')}
            </p>

            {/* Value pills */}
            <motion.div
              variants={stagger} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}
            >
              {values.map(v => (
                <motion.span
                  key={v} variants={fadeUp}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    background: 'var(--accent-blue-dim)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 100, padding: '0.35rem 0.9rem',
                    fontSize: '0.8rem', fontWeight: 600,
                    color: 'var(--accent-blue)',
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                  {t(v)}
                </motion.span>
              ))}
            </motion.div>

            {/* IT Park badge */}
            <div style={{ marginTop: '0.5rem' }}>
              <ItParkBadge />
            </div>
          </motion.div>

          {/* Right — stats grid */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
            }}
          >
            {stats.map(({ icon: Icon, key }) => (
              <div
                key={key}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', gap: '0.6rem',
                  backdropFilter: 'blur(12px)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-glow)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(14,165,233,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <Icon size={22} color="var(--accent-blue)" />
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '2rem', fontWeight: 800, lineHeight: 1,
                  background: 'var(--gradient-accent)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {t(`${key}Val`)}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {t(`${key}Label`)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
