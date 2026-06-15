'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useSectionT } from '@/lib/useT';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { TbSearch, TbPalette, TbCode, TbRocket } from 'react-icons/tb';
import React from 'react';

const STEPS = ['discovery', 'design', 'dev', 'launch'] as const;

const STEP_META = [
  { icon: TbSearch,  color: '#0ea5e9', color2: '#7c3aed', duration: '1–2 нед' },
  { icon: TbPalette, color: '#a855f7', color2: '#ec4899', duration: '2–3 нед' },
  { icon: TbCode,    color: '#22d3ee', color2: '#0ea5e9', duration: '4–8 нед' },
  { icon: TbRocket,  color: '#10b981', color2: '#0ea5e9', duration: '1–2 нед' },
];

function ArrowH({ color }: { color: string }) {
  return (
    <motion.div
      className="arrow-h"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, width: 48, position: 'relative', zIndex: 1 }}
    >
      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dashed line */}
        <motion.line
          x1="0" y1="12" x2="38" y2="12"
          stroke={color} strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Arrowhead */}
        <motion.path
          d="M34 7 L42 12 L34 17"
          stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          fill="none" opacity={0.7}
          initial={{ opacity: 0, x: -4 }}
          whileInView={{ opacity: 0.7, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        {/* Animated dot */}
        <motion.circle
          cx="0" cy="12" r="3" fill={color}
          animate={{ cx: [0, 42] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
          opacity={0.6}
        />
      </svg>
    </motion.div>
  );
}

function ArrowV({ color }: { color: string }) {
  return (
    <motion.div
      className="arrow-v"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{ display: 'none', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, height: 48 }}
    >
      <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dashed line */}
        <motion.line
          x1="12" y1="0" x2="12" y2="38"
          stroke={color} strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        {/* Arrowhead */}
        <motion.path
          d="M7 34 L12 42 L17 34"
          stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          fill="none" opacity={0.7}
          initial={{ opacity: 0, y: -4 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
        {/* Animated dot */}
        <motion.circle
          cx="12" cy="0" r="3" fill={color}
          animate={{ cy: [0, 42] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
          opacity={0.6}
        />
      </svg>
    </motion.div>
  );
}

export default function Process() {
  const tBase = useTranslations('process');
  const locale = useLocale();
  const t = useSectionT('process', tBase, locale);

  return (
    <section
      id="process"
      style={{ padding: '7rem 0', background: 'var(--bg-section-process)', position: 'relative', overflow: 'hidden' }}
    >
      {/* BG orbs */}
      <div style={{ position:'absolute', top:-200, right:-200, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-150, left:-150, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 65%)', pointerEvents:'none' }} />

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── Header ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem' }}>
            <span style={{ display:'block', width:36, height:1.5, borderRadius:2, background:'var(--accent-blue)', opacity:0.6 }} />
            <span style={{ fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent-blue)' }}>
              {t('label')}
            </span>
            <span style={{ display:'block', width:36, height:1.5, borderRadius:2, background:'var(--accent-blue)', opacity:0.6 }} />
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

        {/* ── Flow ── */}
        <div
          className="process-flow"
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
        >
          {STEPS.map((step, i) => {
            const { icon: Icon, color, color2, duration } = STEP_META[i];
            return (
              <React.Fragment key={step}>
                {/* ── Card ── */}
                <motion.div
                  className="process-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, boxShadow: `0 22px 52px ${color}1e` }}
                  style={{
                    flex: 1,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    backdropFilter: 'blur(12px)',
                    position: 'relative',
                    transition: 'box-shadow 0.25s',
                    display: 'flex', flexDirection: 'column',
                  }}
                >
                  {/* Top gradient bar */}
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${color}, ${color2})`, flexShrink: 0 }} />

                  {/* Ghost number */}
                  <div style={{
                    position: 'absolute', top: -4, right: 10,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '6.5rem', fontWeight: 900, lineHeight: 1,
                    color: color, opacity: 0.05,
                    userSelect: 'none', pointerEvents: 'none',
                    letterSpacing: '-0.04em',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div style={{ padding: '1.6rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1, position: 'relative' }}>

                    {/* Icon + badge row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        width: 46, height: 46, borderRadius: 'var(--radius-md)',
                        background: `linear-gradient(135deg, ${color}22, ${color2}18)`,
                        border: `1px solid ${color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 4px 14px ${color}20`,
                        flexShrink: 0,
                      }}>
                        <Icon size={21} color={color} />
                      </div>
                      <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.68rem', fontWeight: 900,
                        color: color,
                        background: `${color}15`,
                        border: `1px solid ${color}28`,
                        borderRadius: 100,
                        padding: '0.18rem 0.6rem',
                        letterSpacing: '0.07em',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1rem', fontWeight: 700,
                      color: 'var(--text-primary)', lineHeight: 1.3, margin: 0,
                    }}>
                      {t(`steps.${step}.title`)}
                    </h3>

                    {/* Desc */}
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, flex: 1 }}>
                      {t(`steps.${step}.desc`)}
                    </p>

                    {/* Duration badge */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.38rem',
                      padding: '0.28rem 0.7rem',
                      background: `${color}12`,
                      border: `1px solid ${color}28`,
                      borderRadius: 100, width: 'fit-content',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <circle cx="5" cy="5" r="4" stroke={color} strokeWidth="1.2"/>
                        <path d="M5 3v2l1.5 1" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: color, letterSpacing: '0.04em' }}>
                        {duration}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* ── Arrow ── */}
                {i < STEPS.length - 1 && (
                  <>
                    <ArrowH color={color} />
                    <ArrowV color={color} />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <style>{`
        .process-flow {
          flex-direction: row;
          align-items: stretch;
        }
        .arrow-h { display: flex !important; }
        .arrow-v { display: none !important; }

        @media (max-width: 860px) {
          .process-flow {
            flex-direction: column !important;
            align-items: center !important;
          }
          .process-card {
            width: 100% !important;
            max-width: 480px;
          }
          .arrow-h { display: none !important; }
          .arrow-v { display: flex !important; }
        }

        @media (max-width: 480px) {
          .process-card {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
