'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fadeUp, stagger } from '@/lib/animations';
import {
  TbLayoutDashboard, TbChartAreaLine, TbTransfer,
  TbReportAnalytics, TbBell, TbBuilding,
  TbArrowLeft, TbCheck, TbTrendingUp,
} from 'react-icons/tb';

const accent = '#8b5cf6';
const accent2 = '#0ea5e9';

const FEATURES = [
  { icon: TbLayoutDashboard, key: 'f1' },
  { icon: TbChartAreaLine,   key: 'f2' },
  { icon: TbTransfer,        key: 'f3' },
  { icon: TbReportAnalytics, key: 'f4' },
  { icon: TbBell,            key: 'f5' },
  { icon: TbBuilding,        key: 'f6' },
];

const STEPS = ['h1', 'h2', 'h3'];

/* ── Analytics Dashboard Mockup ──────────────────────────── */
function RostMockup() {
  const bars = [42, 67, 53, 81, 61, 95, 74];
  const kpis = [
    { label: 'Выручка', val: '₽ 4.2M', change: '+18%', up: true },
    { label: 'Конверсия', val: '8.4%', change: '+2.1%', up: true },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 480, position: 'relative' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 320, height: 320, borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}1e 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        style={{
          background: 'var(--bg-card)', border: `1px solid ${accent}30`,
          borderRadius: 20, padding: '1.5rem',
          backdropFilter: 'blur(16px)',
          boxShadow: `0 24px 80px ${accent}18, 0 0 0 1px ${accent}12`,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${accent}, ${accent2})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TbTrendingUp size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>Rost Dashboard</div>
            <div style={{ fontSize: '0.72rem', color: accent }}>Q4 2024 · Live</div>
          </div>
          <div style={{ marginLeft: 'auto', background: `${accent}18`, border: `1px solid ${accent}30`, borderRadius: 8, padding: '0.25rem 0.6rem', fontSize: '0.72rem', fontWeight: 700, color: '#34d399' }}>
            ↑ +34%
          </div>
        </div>

        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
          {kpis.map(({ label, val, change, up }) => (
            <div key={label} style={{ background: `${accent}10`, border: `1px solid ${accent}20`, borderRadius: 12, padding: '0.75rem' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>{val}</div>
              <div style={{ fontSize: '0.72rem', color: up ? '#34d399' : '#f87171', fontWeight: 600 }}>{change}</div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div style={{ background: `${accent}08`, borderRadius: 12, padding: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Продажи по неделям</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 64 }}>
            {bars.map((h, i) => (
              <motion.div key={i}
                initial={{ height: 0 }} animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: 'easeOut' }}
                style={{
                  flex: 1, borderRadius: '3px 3px 0 0',
                  background: i === 5
                    ? `linear-gradient(to top, ${accent}, ${accent2})`
                    : `${accent}45`,
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <span>Нд 1</span><span>Нд 2</span><span>Нд 3</span><span>Нд 4</span><span>Нд 5</span><span style={{ color: accent, fontWeight: 700 }}>Нд 6</span><span>Нд 7</span>
        </div>
      </motion.div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          position: 'absolute', top: -20, right: -24,
          background: 'var(--bg-card)', border: `1px solid ${accent}28`,
          borderRadius: 12, padding: '0.65rem 1rem',
          backdropFilter: 'blur(16px)',
          boxShadow: `0 8px 24px ${accent}15`,
        }}
      >
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: accent, fontFamily: "'Space Grotesk', sans-serif" }}>50+</div>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Metrics</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{
          position: 'absolute', bottom: -16, left: -24,
          background: 'var(--bg-card)', border: `1px solid ${accent2}28`,
          borderRadius: 12, padding: '0.65rem 1rem',
          backdropFilter: 'blur(16px)',
          boxShadow: `0 8px 24px ${accent2}15`,
        }}
      >
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399', fontFamily: "'Space Grotesk', sans-serif" }}>+34%</div>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Growth</div>
      </motion.div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function RostPage() {
  const t = useTranslations('products.rost');
  const locale = useLocale();

  return (
    <main>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden',
        paddingTop: '6rem',
      }}>
        <div style={{ position: 'absolute', top: -200, right: -200, width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle, ${accent}0c 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -200, left: -200, width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${accent2}0a 0%, transparent 65%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '4rem 1.5rem', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

            {/* Left */}
            <motion.div variants={stagger} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <motion.div variants={fadeUp}>
                <Link href={`/${locale}#products`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  <TbArrowLeft size={16} /> Назад к продуктам
                </Link>
              </motion.div>

              <motion.div variants={fadeUp}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: `${accent}15`, border: `1px solid ${accent}35`, borderRadius: 100, padding: '0.3rem 0.9rem', fontSize: '0.75rem', fontWeight: 700, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, animation: 'pulse 2s infinite' }} />
                  {t('label')}
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: 'var(--text-primary)' }}>
                {t('title')}{' '}
                <span style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {t('tagline')}
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 520 }}>
                {t('heroDesc')}
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href={`/${locale}#contact`} style={{ textDecoration: 'none' }}>
                  <motion.span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `linear-gradient(135deg, ${accent}, ${accent2})`, color: '#fff', padding: '0.9rem 2rem', borderRadius: 'var(--radius-md)', fontSize: '1rem', fontWeight: 600, boxShadow: `0 4px 24px ${accent}40` }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    {t('ctaBtn')}
                  </motion.span>
                </Link>
                <Link href="#features" style={{ textDecoration: 'none' }}>
                  <motion.span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `${accent}10`, border: `1px solid ${accent}30`, color: 'var(--text-primary)', padding: '0.9rem 2rem', borderRadius: 'var(--radius-md)', fontSize: '1rem', fontWeight: 600 }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    Узнать больше
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingRight: '2rem' }}>
              <RostMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '2.5rem 0' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 8vw, 6rem)', flexWrap: 'wrap' }}>
          {(['s1', 's2', 's3'] as const).map(k => (
            <motion.div key={k} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.4rem', fontWeight: 800, background: `linear-gradient(135deg, ${accent}, ${accent2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {t(`${k}Val`)}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{t(`${k}Label`)}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '7rem 0', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              Возможности платформы
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>Всё для управления ростом вашего бизнеса</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {FEATURES.map(({ icon: Icon, key }) => (
              <motion.div key={key} variants={fadeUp}
                whileHover={{ y: -6, boxShadow: `0 20px 50px ${accent}18` }}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', backdropFilter: 'blur(12px)', transition: 'all 0.25s' }}>
                <div style={{ width: 50, height: 50, borderRadius: 13, background: `linear-gradient(135deg, ${accent}1c, ${accent2}12)`, border: `1px solid ${accent}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={24} color={accent} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t(`${key}Title`)}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {t(`${key}Desc`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '7rem 0', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('howTitle')}
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {STEPS.map((key, i) => (
              <motion.div key={key} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${accent}, ${accent2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, color: '#fff', fontFamily: "'Space Grotesk', sans-serif", boxShadow: `0 8px 24px ${accent}35` }}>
                  {i + 1}
                </div>
                <div style={{ width: '100%', height: 2, background: `linear-gradient(90deg, ${accent}40, transparent)`, borderRadius: 1 }} />
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t(`${key}Title`)}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {t(`${key}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '7rem 0', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('ctaTitle')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>{t('ctaDesc')}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {['14 дней бесплатно', 'Без карты', 'Поддержка при настройке'].map(item => (
                <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <TbCheck size={14} color={accent} />{item}
                </span>
              ))}
            </div>
            <Link href={`/${locale}#contact`} style={{ textDecoration: 'none' }}>
              <motion.span
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `linear-gradient(135deg, ${accent}, ${accent2})`, color: '#fff', padding: '1rem 2.5rem', borderRadius: 'var(--radius-md)', fontSize: '1.05rem', fontWeight: 700, boxShadow: `0 8px 36px ${accent}45` }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                {t('ctaBtn')} →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </main>
  );
}
