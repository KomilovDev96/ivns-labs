'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft, slideRight } from '@/lib/animations';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-md)',
  padding: '0.75rem 1rem',
  color: 'var(--text-primary)',
  fontFamily: 'inherit',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.15s',
};

export default function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--accent-blue)';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--border-subtle)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', background: 'var(--bg-section-process)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
            {t('title')}
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '1rem' }}>{t('subtitle')}</p>

        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start' }} className="contact-grid">
          {/* Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(12px)', padding: '2rem' }}>
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '3rem', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(52,211,153,0.12)', border: '2px solid #34d399', color: '#34d399', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <p style={{ color: 'var(--text-secondary)' }}>{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  {(['name', 'email'] as const).map(k => (
                    <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{t(k)}</label>
                      <input style={inputStyle} value={form[k]} required type={k === 'email' ? 'email' : 'text'}
                        onChange={set(k)} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{t('phone')}</label>
                  <input style={inputStyle} value={form.phone} onChange={set('phone')} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{t('message')}</label>
                  <textarea style={{ ...inputStyle, resize: 'none' }} rows={5} value={form.message} required
                    placeholder={t('messagePlaceholder')} onChange={set('message')} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <motion.button type="submit" disabled={status === 'loading'}
                  style={{ background: 'var(--gradient-btn)', color: '#fff', border: 'none', padding: '0.9rem 1.5rem', borderRadius: 'var(--radius-md)', fontSize: '1rem', fontWeight: 600, cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1, width: '100%', boxShadow: 'var(--shadow-btn)' }}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }} whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}>
                  {status === 'loading' ? t('sending') : t('submit')}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '✉️', label: 'Email', value: t('infoEmail') },
              { icon: '📞', label: 'Phone', value: t('infoPhone') },
              { icon: '📍', label: 'Address', value: t('infoAddress') },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(12px)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{item.label}</p>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.92rem' }}>{item.value}</p>
                </div>
              </div>
            ))}

          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
