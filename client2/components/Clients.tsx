'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

const CL = 'https://logo.clearbit.com/';

const CLIENTS = [
  { id: 'eman',    name: 'EMAN',           logo: `${CL}eman.uz`,  color: '#0ea5e9', color2: '#7c3aed', href: '' },
  { id: 'emanmat', name: 'EMAN Materials', logo: `${CL}eman.uz`,  color: '#10b981', color2: '#0ea5e9', href: '' },
  { id: 'dafna',   name: 'Dafna',          logo: `${CL}dafna.uz`, color: '#a855f7', color2: '#ec4899', href: '' },
];

// 8 copies per half → seamless 50% loop, plenty of cards to fill any screen
const HALF  = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS,
               ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];
const TRACK = [...HALF, ...HALF];

function LogoCard({ name, logo, color, color2, href }: {
  name: string; logo?: string; color: string; color2: string; href: string;
}) {
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href || '#'}
      onClick={e => { if (!href) e.preventDefault(); }}
      target={href ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'block', flexShrink: 0 }}
    >
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: hovered ? -5 : 0,
        boxShadow: hovered ? `0 12px 36px ${color}28` : '0 0 0 transparent',
      }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.7rem',
        minWidth: 220,
        height: 130,
        background: hovered
          ? `linear-gradient(145deg, ${color}10, ${color2}08)`
          : 'var(--bg-card)',
        border: `1px solid ${hovered ? color + '50' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '1.2rem 2rem',
        flexShrink: 0,
        backdropFilter: 'blur(12px)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.25s, border-color 0.25s',
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${color}, ${color2})`,
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.2s',
      }} />

      {/* Logo / fallback avatar */}
      {logo && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={name}
          onError={() => setFailed(true)}
          style={{
            maxHeight: 54,
            maxWidth: 150,
            objectFit: 'contain',
            filter: 'var(--logo-filter, none)',
          }}
        />
      ) : (
        <div style={{
          width: 52, height: 52,
          borderRadius: 'var(--radius-md)',
          background: `linear-gradient(135deg, ${color}28, ${color2}18)`,
          border: `1px solid ${color}35`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.2rem', fontWeight: 900, color,
        }}>
          {name.charAt(0)}
        </div>
      )}

      {/* Name */}
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.85rem', fontWeight: 700,
        color: hovered ? 'var(--text-primary)' : 'var(--text-muted)',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        transition: 'color 0.2s',
      }}>
        {name}
      </span>
    </motion.div>
    </a>
  );
}

export default function Clients() {
  const t = useTranslations('clients');

  return (
    <section
      id="clients"
      style={{ padding: '6rem 0', background: 'var(--bg-section-primary)', overflow: 'hidden', position: 'relative' }}
    >
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 300, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.75rem' }}>
            <span style={{ display:'block', width:30, height:1.5, borderRadius:2, background:'var(--accent-blue)', opacity:0.5 }} />
            <span style={{ fontSize:'0.7rem', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-muted)' }}>
              {t('label')}
            </span>
            <span style={{ display:'block', width:30, height:1.5, borderRadius:2, background:'var(--accent-blue)', opacity:0.5 }} />
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
            fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}>
            {t('title')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            {t('subtitle')}
          </p>
        </motion.div>
      </div>

      {/* ── Infinite marquee (pure CSS — no pause/jump) ── */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 150, zIndex: 2,
          background: 'linear-gradient(to right, var(--bg-primary), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 150, zIndex: 2,
          background: 'linear-gradient(to left, var(--bg-primary), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track">
            {TRACK.map((c, i) => (
              <LogoCard key={`${c.id}-${i}`} name={c.name} logo={c.logo} color={c.color} color2={c.color2} href={c.href} />
            ))}
          </div>
        </div>
      </div>

      {/* Counter row */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        style={{
          maxWidth: 'var(--container)', margin: '3.5rem auto 0',
          padding: '0 1.5rem',
          display: 'flex', justifyContent: 'center',
          gap: 'clamp(2rem, 6vw, 5rem)',
          flexWrap: 'wrap',
        }}
      >
        {[
          { val: '20+', label: t('c1') },
          { val: '5',   label: t('c2') },
          { val: '3',   label: t('c3') },
        ].map(({ val, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2.2rem', fontWeight: 900,
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{val}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{label}</div>
          </div>
        ))}
      </motion.div>

      <style>{`
        .marquee-track {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          padding: 0.75rem 0;
          animation: marquee-scroll 60s linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
