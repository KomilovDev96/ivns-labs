'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import {
  TbStar, TbBrandTelegram, TbBrandLinkedin, TbBrandInstagram,
  TbCheck, TbX,
} from 'react-icons/tb';

const REVIEWS = [
  { id: 1, nameKey: 'r1', initials: 'АН', color: '#0ea5e9', color2: '#7c3aed', rating: 5, social: 'linkedin' },
  { id: 2, nameKey: 'r2', initials: 'БЮ', color: '#7c3aed', color2: '#a855f7', rating: 5, social: 'telegram' },
  { id: 3, nameKey: 'r3', initials: 'СМ', color: '#10b981', color2: '#0ea5e9', rating: 5, social: 'linkedin' },
  { id: 4, nameKey: 'r4', initials: 'НА', color: '#f59e0b', color2: '#f97316', rating: 4, social: 'instagram' },
  { id: 5, nameKey: 'r5', initials: 'ДК', color: '#ec4899', color2: '#a855f7', rating: 5, social: 'telegram' },
  { id: 6, nameKey: 'r6', initials: 'ЗТ', color: '#6366f1', color2: '#0ea5e9', rating: 5, social: 'linkedin' },
];

// Duplicate for seamless loop
const TRACK = [...REVIEWS, ...REVIEWS];

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  telegram: TbBrandTelegram,
  linkedin: TbBrandLinkedin,
  instagram: TbBrandInstagram,
};

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <TbStar key={i} size={15}
          fill={i <= count ? '#f59e0b' : 'none'}
          color={i <= count ? '#f59e0b' : 'var(--border-subtle)'}
        />
      ))}
    </div>
  );
}

type FormData = {
  name: string; position: string; company: string;
  social: string; socialLink: string; text: string; rating: number;
};

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', position: '', company: '', social: 'telegram', socialLink: '', text: '', rating: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setShowForm(false); setSubmitted(false); }, 3000);
  };

  return (
    <section
      id="testimonials"
      style={{ padding: '7rem 0', background: 'var(--bg-section-secondary)', position: 'relative', overflow: 'hidden' }}
    >
      {/* BG orbs */}
      <div style={{ position:'absolute', top:-200, right:-200, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-200, left:-200, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 65%)', pointerEvents:'none' }} />

      {/* ── Header ── */}
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem' }}>
            <span style={{ display:'block', width:36, height:1.5, borderRadius:2, background:'var(--accent-purple)', opacity:0.6 }} />
            <span style={{ fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent-purple)' }}>
              {t('label')}
            </span>
            <span style={{ display:'block', width:36, height:1.5, borderRadius:2, background:'var(--accent-purple)', opacity:0.6 }} />
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:800, color:'var(--text-primary)', lineHeight:1.15, marginBottom:'0.75rem' }}>
            {t('title')}
          </h2>
          <p style={{ color:'var(--text-secondary)', fontSize:'1.05rem', maxWidth:460, margin:'0 auto' }}>
            {t('subtitle')}
          </p>
        </motion.div>
      </div>

      {/* ── Infinite marquee (full width) ── */}
      <div style={{ position: 'relative', marginBottom: '4rem' }}>
        {/* Fade edges */}
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:140, zIndex:2, background:'linear-gradient(to right, var(--bg-secondary), transparent)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:140, zIndex:2, background:'linear-gradient(to left, var(--bg-secondary), transparent)', pointerEvents:'none' }} />

        <div style={{ overflow: 'hidden' }}>
          <div className="reviews-track">
            {TRACK.map((r, i) => {
              const SocialIcon = SOCIAL_ICONS[r.social];
              return (
                <div
                  key={`${r.id}-${i}`}
                  style={{
                    flexShrink: 0,
                    width: 380,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    backdropFilter: 'blur(16px)',
                    display: 'flex', flexDirection: 'column',
                  }}
                >
                  {/* Top accent */}
                  <div style={{ height: 3, background: `linear-gradient(90deg, ${r.color}, ${r.color2})`, flexShrink: 0 }} />

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                    {/* Stars + quote */}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                      <Stars count={r.rating} />
                      <svg width="26" height="18" viewBox="0 0 28 20" fill="none">
                        <path d="M0 20 C0 8 4 2 12 0 L12 4 C8 5.5 6 9 6 14H12V20H0Z" fill={`${r.color}22`}/>
                        <path d="M16 20 C16 8 20 2 28 0 L28 4 C24 5.5 22 9 22 14H28V20H16Z" fill={`${r.color}22`}/>
                      </svg>
                    </div>

                    {/* Text */}
                    <p style={{ fontSize:'0.9rem', color:'var(--text-secondary)', lineHeight:1.75, flex:1, fontStyle:'italic', margin:0 }}>
                      "{t(`reviews.${r.nameKey}.text`)}"
                    </p>

                    {/* Author */}
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'1rem', borderTop:'1px solid var(--border-subtle)' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.7rem' }}>
                        <div style={{
                          width:42, height:42, borderRadius:'50%',
                          background:`linear-gradient(135deg, ${r.color}, ${r.color2})`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontFamily:"'Space Grotesk', sans-serif",
                          fontSize:'0.78rem', fontWeight:800, color:'#fff', flexShrink:0,
                          boxShadow:`0 4px 12px ${r.color}35`,
                        }}>
                          {r.initials}
                        </div>
                        <div>
                          <div style={{ fontSize:'0.88rem', fontWeight:700, color:'var(--text-primary)', lineHeight:1.2 }}>
                            {t(`reviews.${r.nameKey}.name`)}
                          </div>
                          <div style={{ fontSize:'0.73rem', color:'var(--text-muted)' }}>
                            {t(`reviews.${r.nameKey}.position`)}
                          </div>
                        </div>
                      </div>
                      <div style={{
                        width:34, height:34, borderRadius:'50%',
                        background:`${r.color}15`,
                        border:`1px solid ${r.color}28`,
                        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                      }}>
                        {SocialIcon && <SocialIcon size={16} color={r.color} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Leave review CTA ── */}
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{
            background: 'linear-gradient(135deg, var(--accent-blue-dim), var(--accent-purple-dim))',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem,4vw,2.5rem) clamp(1.5rem,5vw,3rem)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
            <div style={{ display:'flex', gap:3, marginBottom:'0.25rem' }}>
              {[1,2,3,4,5].map(i => <TbStar key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <h3 style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'clamp(1.1rem,2.5vw,1.45rem)', fontWeight:800, color:'var(--text-primary)', lineHeight:1.3, margin:0 }}>
              {t('ctaTitle')}
            </h3>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.95rem', margin:0 }}>{t('ctaDesc')}</p>
          </div>
          <motion.button
            onClick={() => setShowForm(true)}
            style={{
              display:'inline-flex', alignItems:'center', gap:'0.5rem',
              background:'var(--gradient-btn)', color:'#fff',
              padding:'0.9rem 2.2rem', borderRadius:'var(--radius-md)',
              fontSize:'1rem', fontWeight:600, border:'none', cursor:'pointer',
              boxShadow:'var(--shadow-btn)', whiteSpace:'nowrap',
            }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            {t('ctaBtn')} →
          </motion.button>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
            onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}
          >
            <motion.div
              initial={{ opacity:0, y:32, scale:0.95 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:16, scale:0.97 }}
              transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
              style={{ background:'var(--bg-primary)', border:'1px solid var(--border-glow)', borderRadius:'var(--radius-xl)', padding:'clamp(1.5rem,4vw,2.5rem)', width:'100%', maxWidth:520, position:'relative', maxHeight:'90vh', overflowY:'auto' }}
            >
              <button onClick={() => setShowForm(false)} style={{ position:'absolute', top:16, right:16, width:32, height:32, borderRadius:'50%', background:'var(--bg-secondary)', border:'1px solid var(--border-subtle)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)' }}>
                <TbX size={16} />
              </button>

              {submitted ? (
                <div style={{ textAlign:'center', padding:'2rem 0', display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
                  <div style={{ width:60, height:60, borderRadius:'50%', background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <TbCheck size={28} color="#10b981" />
                  </div>
                  <h3 style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1.3rem', fontWeight:800, color:'var(--text-primary)', margin:0 }}>
                    {t('form.successTitle')}
                  </h3>
                  <p style={{ color:'var(--text-secondary)', fontSize:'0.95rem', margin:0 }}>{t('form.successDesc')}</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1.4rem', fontWeight:800, color:'var(--text-primary)', marginBottom:'0.4rem', marginTop:0 }}>
                    {t('form.title')}
                  </h3>
                  <p style={{ color:'var(--text-muted)', fontSize:'0.88rem', marginBottom:'1.75rem', marginTop:0 }}>
                    {t('form.desc')}
                  </p>
                  <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                    {/* Rating */}
                    <div>
                      <label style={labelStyle}>{t('form.rating')}</label>
                      <div style={{ display:'flex', gap:'0.35rem' }}>
                        {[1,2,3,4,5].map(i => (
                          <button key={i} type="button" onClick={() => setForm(f => ({ ...f, rating: i }))} style={{ background:'none', border:'none', cursor:'pointer', padding:2 }}>
                            <TbStar size={26} fill={i <= form.rating ? '#f59e0b' : 'none'} color={i <= form.rating ? '#f59e0b' : 'var(--border-subtle)'} style={{ transition:'color 0.15s' }} />
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Name + Position */}
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                      <div>
                        <label style={labelStyle}>{t('form.name')} *</label>
                        <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={t('form.namePlaceholder')} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>{t('form.position')}</label>
                        <input value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} placeholder={t('form.positionPlaceholder')} style={inputStyle} />
                      </div>
                    </div>
                    {/* Company */}
                    <div>
                      <label style={labelStyle}>{t('form.company')}</label>
                      <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder={t('form.companyPlaceholder')} style={inputStyle} />
                    </div>
                    {/* Social */}
                    <div>
                      <label style={labelStyle}>{t('form.social')}</label>
                      <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'0.75rem', alignItems:'center' }}>
                        <select value={form.social} onChange={e => setForm(f => ({ ...f, social: e.target.value }))} style={{ ...inputStyle, width:'auto', paddingRight:'2rem', cursor:'pointer' }}>
                          <option value="telegram">Telegram</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="instagram">Instagram</option>
                          <option value="other">Other</option>
                        </select>
                        <input value={form.socialLink} onChange={e => setForm(f => ({ ...f, socialLink: e.target.value }))} placeholder={t('form.socialLinkPlaceholder')} style={inputStyle} />
                      </div>
                    </div>
                    {/* Text */}
                    <div>
                      <label style={labelStyle}>{t('form.text')} *</label>
                      <textarea required value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder={t('form.textPlaceholder')} rows={4} style={{ ...inputStyle, resize:'vertical', minHeight:110 }} />
                    </div>
                    <motion.button type="submit" whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} style={{ background:'var(--gradient-btn)', color:'#fff', padding:'0.9rem', borderRadius:'var(--radius-md)', fontSize:'1rem', fontWeight:700, border:'none', cursor:'pointer', boxShadow:'var(--shadow-btn)', marginTop:'0.25rem' }}>
                      {t('form.submit')}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .reviews-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          padding: 1rem 0;
          animation: reviews-scroll 40s linear infinite;
        }
        .reviews-track:hover {
          animation-play-state: paused;
        }
        @keyframes reviews-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.78rem', fontWeight: 700,
  color: 'var(--text-muted)',
  textTransform: 'uppercase', letterSpacing: '0.08em',
  display: 'block', marginBottom: '0.4rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.7rem 0.9rem',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--text-primary)', fontSize: '0.9rem',
  outline: 'none', transition: 'border-color 0.15s',
  boxSizing: 'border-box', fontFamily: 'inherit',
};
