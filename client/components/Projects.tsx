'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/animations';

const MotionLink = motion(Link);
import { projects as staticProjects, CATEGORIES } from '@/data/projects';
import { useContent } from '@/lib/ContentContext';
import { useSectionT } from '@/lib/useT';
import { TbArrowUpRight, TbClock, TbCode } from 'react-icons/tb';

const cardVariant = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.45, ease: [0.22,1,0.36,1] } },
  exit:    { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.25 } },
};

export default function Projects() {
  const tBase = useTranslations('projects');
  const locale = useLocale();
  const t = useSectionT('projects', tBase, locale);
  const [active, setActive] = useState<string>('all');
  const { projects: apiProjects } = useContent();

  const allProjects = apiProjects.length > 0 ? apiProjects : staticProjects;
  const filtered = active === 'all'
    ? allProjects
    : allProjects.filter((p: any) => p.category === active);

  return (
    <section id="projects" style={{ padding: '7rem 0', background: 'var(--bg-section-secondary)', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth:'var(--container)', margin:'0 auto', padding:'0 1.5rem' }}>

        {/* ── Header ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}
          style={{ textAlign:'center', marginBottom:'3rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem' }}>
            <span style={{ display:'block', width:36, height:1.5, borderRadius:2, background:'var(--accent-blue)', opacity:0.6 }} />
            <span style={{ fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent-blue)' }}>
              Portfolio
            </span>
            <span style={{ display:'block', width:36, height:1.5, borderRadius:2, background:'var(--accent-blue)', opacity:0.6 }} />
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:800, color:'var(--text-primary)', lineHeight:1.15, marginBottom:'0.75rem' }}>
            {t('title')}
          </h2>
          <p style={{ color:'var(--text-secondary)', fontSize:'1.05rem', maxWidth:480, margin:'0 auto' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Category filter tabs ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}
          style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', justifyContent:'center', marginBottom:'3rem' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              style={{
                padding:'0.45rem 1.1rem',
                borderRadius:100,
                fontSize:'0.82rem', fontWeight:600,
                cursor:'pointer',
                border:'1px solid',
                transition:'all 0.2s ease',
                borderColor: active === cat.id ? 'var(--accent-blue)' : 'var(--border-subtle)',
                background: active === cat.id ? 'var(--accent-blue-dim)' : 'transparent',
                color: active === cat.id ? 'var(--accent-blue)' : 'var(--text-muted)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible"
          viewport={{ once:true, margin:'-40px' }}
          style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(380px, 1fr))',
            gap:'1.5rem',
            marginBottom:'4rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p: any) => (
              <MotionLink
                key={p._id ?? p.id ?? p.slug}
                href={`/${locale}/projects/${p.slug}`}
                variants={cardVariant}
                layout
                whileHover={{ y:-8, boxShadow:`0 28px 70px ${p.color}25` }}
                transition={{ duration:0.22 }}
                style={{
                  background:'var(--bg-card)',
                  border:'1px solid var(--border-subtle)',
                  borderRadius:'var(--radius-xl)',
                  overflow:'hidden',
                  display:'flex',
                  flexDirection:'column',
                  backdropFilter:'blur(16px)',
                  WebkitBackdropFilter:'blur(16px)',
                  textDecoration:'none',
                  cursor:'pointer',
                  position:'relative',
                }}
              >
                {/* ── Image zone ── */}
                <div style={{
                  height: 220,
                  position:'relative',
                  overflow:'hidden',
                  flexShrink:0,
                  background:`linear-gradient(145deg, ${p.color}20 0%, ${p.color2}18 60%, ${p.color}0a 100%)`,
                }}>
                  {/* Placeholder when no image */}
                  {!p.image && (
                    <div style={{
                      position:'absolute', inset:0,
                      display:'flex', flexDirection:'column',
                      alignItems:'center', justifyContent:'center', gap:'0.6rem',
                    }}>
                      {/* Big gradient letter */}
                      <div style={{
                        width:72, height:72, borderRadius:20,
                        background:`linear-gradient(135deg, ${p.color}30, ${p.color2}20)`,
                        border:`1.5px dashed ${p.color}45`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.7}>
                          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                        </svg>
                      </div>
                      <span style={{ fontSize:'0.72rem', color:`${p.color}80`, fontWeight:600, letterSpacing:'0.05em' }}>
                        Изображение проекта
                      </span>
                    </div>
                  )}

                  {/* Real image when provided */}
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.tag ?? p.id ?? ''}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                    />
                  )}

                  {/* Featured badge */}
                  {p.featured && (
                    <span style={{
                      position:'absolute', top:14, left:14,
                      background:`linear-gradient(135deg, ${p.color}, ${p.color2})`,
                      color:'#fff', fontSize:'0.62rem', fontWeight:800,
                      letterSpacing:'0.1em', textTransform:'uppercase',
                      padding:'0.25rem 0.65rem', borderRadius:100,
                      boxShadow:`0 4px 12px ${p.color}45`,
                    }}>
                      ★ Featured
                    </span>
                  )}

                  {/* Stat overlay — bottom-left */}
                  <div style={{
                    position:'absolute', bottom:14, left:14,
                    background:'rgba(0,0,0,0.45)',
                    backdropFilter:'blur(8px)',
                    border:`1px solid ${p.color}40`,
                    borderRadius:10,
                    padding:'0.45rem 0.85rem',
                  }}>
                    <div style={{
                      fontFamily:"'Space Grotesk', sans-serif",
                      fontSize:'1.35rem', fontWeight:900, lineHeight:1,
                      color: p.color,
                    }}>
                      {p.statValue}
                    </div>
                    <div style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.65)', marginTop:'0.1rem' }}>
                      {p.statLabel}
                    </div>
                  </div>

                  {/* Arrow — bottom-right */}
                  <div style={{
                    position:'absolute', bottom:14, right:14,
                    width:38, height:38, borderRadius:'50%',
                    background:`${p.color}22`,
                    border:`1px solid ${p.color}45`,
                    backdropFilter:'blur(8px)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <TbArrowUpRight size={18} color={p.color} />
                  </div>
                </div>

                {/* ── Card body ── */}
                <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'0.85rem', flex:1 }}>
                  {/* Tag + year */}
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:'0.3rem',
                      fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.06em',
                      color:p.color, background:`${p.color}14`,
                      border:`1px solid ${p.color}28`, borderRadius:100,
                      padding:'0.25rem 0.7rem',
                    }}>
                      <span style={{ width:5, height:5, borderRadius:'50%', background:p.color, display:'inline-block' }} />
                      {p.tag}
                    </span>
                    <span style={{ fontSize:'0.75rem', color:'var(--text-muted)', fontWeight:600 }}>
                      {p.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily:"'Space Grotesk', sans-serif",
                    fontSize:'1.15rem', fontWeight:700,
                    color:'var(--text-primary)', lineHeight:1.3,
                  }}>
                    {p.translations?.[locale]?.title || p.translations?.ru?.title || (p.id ? tBase(`items.${p.id}.title`) : p.tag)}
                  </h3>

                  {/* Desc */}
                  <p style={{ fontSize:'0.9rem', color:'var(--text-secondary)', lineHeight:1.7, flex:1 }}>
                    {p.translations?.[locale]?.desc || p.translations?.ru?.desc || (p.id ? tBase(`items.${p.id}.desc`) : '')}
                  </p>

                  {/* Footer row */}
                  <div style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    paddingTop:'0.85rem', borderTop:'1px solid var(--border-subtle)',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.35rem', color:'var(--text-muted)', fontSize:'0.8rem' }}>
                      <TbClock size={13} />
                      {p.duration}
                    </div>
                    <div style={{ display:'flex', gap:'0.3rem', flexWrap:'wrap', justifyContent:'flex-end' }}>
                      {p.stack.slice(0,3).map(s => (
                        <span key={s} style={{ fontSize:'0.64rem', fontWeight:600, background:'var(--bg-secondary)', border:'1px solid var(--border-subtle)', borderRadius:6, padding:'0.18rem 0.5rem', color:'var(--text-muted)' }}>
                          {s}
                        </span>
                      ))}
                      {p.stack.length > 3 && (
                        <span style={{ fontSize:'0.64rem', fontWeight:600, color:'var(--text-muted)' }}>+{p.stack.length-3}</span>
                      )}
                    </div>
                  </div>
                </div>
              </MotionLink>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}
          style={{
            background:'linear-gradient(135deg, var(--accent-blue-dim), var(--accent-purple-dim))',
            border:'1px solid var(--border-glow)',
            borderRadius:'var(--radius-xl)',
            padding:'clamp(2rem,4vw,3rem) clamp(1.5rem,5vw,3.5rem)',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            flexWrap:'wrap', gap:'1.5rem',
            backdropFilter:'blur(16px)',
            WebkitBackdropFilter:'blur(16px)',
          }}
        >
          <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
              <TbCode size={20} color="var(--accent-blue)" />
              <span style={{ fontSize:'0.78rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-blue)' }}>
                Следующий проект
              </span>
            </div>
            <h3 style={{
              fontFamily:"'Space Grotesk', sans-serif",
              fontSize:'clamp(1.3rem,2.5vw,1.7rem)',
              fontWeight:800, color:'var(--text-primary)', lineHeight:1.25,
            }}>
              {t('ctaTitle')}
            </h3>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.95rem' }}>
              {t('ctaDesc')}
            </p>
          </div>

          <Link href="#contact" style={{ textDecoration: 'none' }}>
            <motion.span
              style={{
                display:'inline-flex', alignItems:'center', gap:'0.5rem',
                background:'var(--gradient-btn)', color:'#fff',
                padding:'0.95rem 2.4rem',
                borderRadius:'var(--radius-md)',
                fontSize:'1rem', fontWeight:700,
                boxShadow:'var(--shadow-btn)',
                whiteSpace:'nowrap',
              }}
              whileHover={{ scale:1.04, boxShadow:'0 8px 36px rgba(14,165,233,0.45)' }}
              whileTap={{ scale:0.96 }}
              transition={{ duration:0.15 }}
            >
              {t('ctaBtn')} →
            </motion.span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
