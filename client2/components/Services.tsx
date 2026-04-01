'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';
import { services } from '@/data/services';

import {
  TbTransfer, TbWorldWww, TbLayoutKanban,
  TbRobot, TbChartAreaLine, TbBrain, TbApps,
} from 'react-icons/tb';
import { FaTelegram } from 'react-icons/fa';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, React.ElementType> = {
  integration: TbTransfer,
  web:         TbWorldWww,
  crm:         TbLayoutKanban,
  bots:        FaTelegram,
  automation:  TbRobot,
  bi:          TbChartAreaLine,
  ai:          TbBrain,
  bitrix:      TbApps,
};

const cardVariant = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  const t = useTranslations('services');

  return (
    <section
      id="services"
      style={{ padding: '7rem 0', background: 'var(--bg-section-primary)', position: 'relative', overflow: 'hidden' }}
    >

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── Header ── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          {/* Decorative label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            marginBottom: '1rem',
          }}>
            <span style={{ display: 'block', width: 36, height: 1.5, borderRadius: 2, background: 'var(--accent-blue)', opacity: 0.6 }} />
            <span style={{
              fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--accent-blue)',
            }}>
              What we do
            </span>
            <span style={{ display: 'block', width: 36, height: 1.5, borderRadius: 2, background: 'var(--accent-blue)', opacity: 0.6 }} />
          </div>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15,
            marginBottom: '0.75rem',
          }}>
            {t('title')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {services.map((s, i) => {
            const Icon = ICONS[s.id];
            return (
              <motion.div
                key={s.id}
                variants={cardVariant}
                whileHover={{ y: -8, boxShadow: `0 24px 60px ${s.color1}28` }}
                transition={{ duration: 0.22 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  cursor: 'default',
                }}
              >
                {/* Gradient top accent bar */}
                <div style={{
                  height: 3,
                  background: `linear-gradient(90deg, ${s.color1}, ${s.color2})`,
                  flexShrink: 0,
                }} />

                {/* Card body */}
                <div style={{
                  padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1,
                }}>

                  {/* Icon + number row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: `linear-gradient(135deg, ${s.color1}1c, ${s.color2}12)`,
                      border: `1px solid ${s.color1}2e`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {Icon && <Icon size={24} color={s.color1} />}
                    </div>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 800,
                      letterSpacing: '0.06em', fontFamily: 'monospace',
                      color: 'var(--text-muted)',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.05rem', fontWeight: 700,
                      color: 'var(--text-primary)', lineHeight: 1.3,
                    }}>
                      {t(`items.${s.id}.title`)}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                    }}>
                      {t(`items.${s.id}.desc`)}
                    </p>
                  </div>

                  {/* Tag badge */}
                  <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em',
                      color: s.color1,
                      background: `${s.color1}16`,
                      border: `1px solid ${s.color1}2c`,
                      borderRadius: 100,
                      padding: '0.25rem 0.7rem',
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: s.color1, display: 'inline-block', flexShrink: 0,
                      }} />
                      {s.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom CTA banner ── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{
            marginTop: '4rem',
            background: 'linear-gradient(135deg, var(--accent-blue-dim), var(--accent-purple-dim))',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.75rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
            }}>
              {t('ctaTitle')}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {t('ctaDesc')}
            </p>
          </div>

          <motion.a
            href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--gradient-btn)', color: '#fff',
              padding: '0.9rem 2.2rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem', fontWeight: 600,
              boxShadow: 'var(--shadow-btn)',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 36px rgba(14,165,233,0.45)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {t('ctaBtn')} →
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
