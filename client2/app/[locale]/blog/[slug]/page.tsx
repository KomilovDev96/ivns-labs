'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const MotionLink = motion(Link);
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fadeUp, stagger } from '@/lib/animations';
import { blogPosts } from '@/data/blog';
import {
  TbArrowLeft, TbCalendar, TbClock,
  TbArrowUpRight, TbShare, TbBrandTelegram,
} from 'react-icons/tb';

const CATEGORY_COLORS: Record<string, string> = {
  tech: '#22d3ee',
  business: '#f59e0b',
  ai: '#0ea5e9',
  design: '#8b5cf6',
  news: '#6366f1',
};

export default function BlogPostPage() {
  const params = useParams();
  const locale = useLocale();
  const slug = params.slug as string;

  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  const t = useTranslations('blog');
  const catColor = CATEGORY_COLORS[post.category] || '#0ea5e9';

  // Parse markdown-like content into sections
  const contentText = t(`items.${post.id}.content`);
  const sections = contentText.split('\n\n').filter(Boolean);

  const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <main>
      <Navbar />

      {/* ── HERO ── */}
      <section className="blog-post-hero" style={{
        minHeight: '50vh', display: 'flex', alignItems: 'center',
        background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden',
        paddingTop: '6rem',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 60% 30%, ${post.color}0c 0%, transparent 55%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 20% 80%, ${post.color2}08 0%, transparent 55%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '4rem 1.5rem', width: '100%' }}>
          <motion.div variants={stagger} initial="hidden" animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 780 }}>

            {/* Back */}
            <motion.div variants={fadeUp}>
              <Link href={`/${locale}/blog`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = catColor)}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                <TbArrowLeft size={16} /> {t('backToBlog')}
              </Link>
            </motion.div>

            {/* Meta */}
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: catColor,
                background: `${catColor}15`, border: `1px solid ${catColor}35`,
                borderRadius: 100, padding: '0.3rem 0.9rem',
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: catColor }} />
                {t(post.category)}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <TbCalendar size={13} />
                {new Date(post.date).toLocaleDateString(
                  locale === 'ru' ? 'ru-RU' : locale === 'uz' ? 'uz-UZ' : 'en-US',
                  { day: 'numeric', month: 'long', year: 'numeric' }
                )}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <TbClock size={13} />{post.readTime}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900, lineHeight: 1.1,
              color: 'var(--text-primary)',
            }}>
              {t(`items.${post.id}.title`)}
            </motion.h1>

            {/* Excerpt */}
            <motion.p variants={fadeUp} style={{
              fontSize: '1.1rem', color: 'var(--text-secondary)',
              lineHeight: 1.75, maxWidth: 620,
            }}>
              {t(`items.${post.id}.excerpt`)}
            </motion.p>

            {/* Share */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.5rem' }}>
              <motion.button
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: t(`items.${post.id}.title`), url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem',
                  color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                <TbShare size={14} /> {t('shareArticle')}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ padding: '4rem 0 5rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="blog-post-content"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {sections.map((section, i) => {
              // Headings
              if (section.startsWith('### ')) {
                return (
                  <h4 key={i} style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)',
                    marginTop: '0.5rem',
                  }}>
                    {section.replace('### ', '')}
                  </h4>
                );
              }
              if (section.startsWith('## ')) {
                return (
                  <h2 key={i} style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginTop: '1rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}>
                    {section.replace('## ', '')}
                  </h2>
                );
              }

              // Lists
              if (section.startsWith('- ')) {
                const items = section.split('\n').filter(l => l.startsWith('- '));
                return (
                  <ul key={i} style={{
                    display: 'flex', flexDirection: 'column', gap: '0.5rem',
                    paddingLeft: '0.5rem', listStyle: 'none',
                  }}>
                    {items.map((item, j) => (
                      <li key={j} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                        fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7,
                      }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                          background: `linear-gradient(135deg, ${post.color}, ${post.color2})`,
                          marginTop: '0.55rem',
                        }} />
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Numbered lists
              if (/^\d+\.\s/.test(section)) {
                const items = section.split('\n').filter(l => /^\d+\.\s/.test(l));
                return (
                  <ol key={i} style={{
                    display: 'flex', flexDirection: 'column', gap: '0.65rem',
                    paddingLeft: '0.5rem', listStyle: 'none', counterReset: 'item',
                  }}>
                    {items.map((item, j) => (
                      <li key={j} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                        fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7,
                      }}>
                        <span style={{
                          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                          background: `${catColor}15`, border: `1px solid ${catColor}28`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.75rem', fontWeight: 800, color: catColor,
                        }}>
                          {j + 1}
                        </span>
                        <span style={{ paddingTop: '0.2rem' }}>
                          {item.replace(/^\d+\.\s/, '')}
                        </span>
                      </li>
                    ))}
                  </ol>
                );
              }

              // Bold text inline handling
              const renderBold = (text: string) => {
                const parts = text.split(/(\*\*[^*]+\*\*)/g);
                return parts.map((part, k) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={k} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
                  }
                  // Code inline
                  const codeParts = part.split(/(`[^`]+`)/g);
                  return codeParts.map((cp, l) => {
                    if (cp.startsWith('`') && cp.endsWith('`')) {
                      return (
                        <code key={`${k}-${l}`} style={{
                          background: `${catColor}12`, border: `1px solid ${catColor}20`,
                          borderRadius: 4, padding: '0.15rem 0.4rem',
                          fontSize: '0.85em', fontFamily: 'monospace', color: catColor,
                        }}>
                          {cp.slice(1, -1)}
                        </code>
                      );
                    }
                    return <span key={`${k}-${l}`}>{cp}</span>;
                  });
                });
              };

              // Regular paragraph
              return (
                <p key={i} style={{
                  fontSize: '0.95rem', color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                }}>
                  {renderBold(section)}
                </p>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── MORE ARTICLES ── */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800,
              color: 'var(--text-primary)',
            }}>
              {t('moreArticles')}
            </h2>
          </motion.div>
          <div className="blog-post-more" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {otherPosts.map(p => {
              const pColor = CATEGORY_COLORS[p.category] || '#0ea5e9';
              return (
                <MotionLink
                  key={p.id}
                  href={`/${locale}/blog/${p.slug}`}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, boxShadow: `0 12px 32px ${pColor}18` }}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: '0.6rem',
                    background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem',
                    textDecoration: 'none', flex: '1', minWidth: 260,
                    backdropFilter: 'blur(8px)', transition: 'all 0.2s',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${p.color}, ${p.color2})`,
                    }} />
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.08em', color: pColor,
                    }}>
                      {t(p.category)}
                    </span>
                    <span style={{ marginLeft: 'auto' }}>
                      <TbArrowUpRight size={14} color="var(--text-muted)" />
                    </span>
                  </div>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.95rem', fontWeight: 700,
                    color: 'var(--text-primary)', lineHeight: 1.3,
                  }}>
                    {t(`items.${p.id}.title`)}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <TbClock size={11} /> {p.readTime}
                  </span>
                </MotionLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('ctaTitle')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{t('ctaDesc')}</p>
            <motion.a
              href="https://t.me/ivnlabs"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--gradient-btn)', color: '#fff',
                padding: '0.9rem 2.2rem', borderRadius: 'var(--radius-md)',
                fontSize: '1rem', fontWeight: 700,
                boxShadow: 'var(--shadow-btn)', textDecoration: 'none',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 12px 48px rgba(14,165,233,0.5)' }}
              whileTap={{ scale: 0.96 }}
            >
              <TbBrandTelegram size={18} /> {t('ctaBtn')}
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .blog-post-hero {
            padding-top: 5rem !important;
            min-height: auto !important;
          }
          .blog-post-hero h1 {
            font-size: 1.6rem !important;
          }
          .blog-post-more {
            flex-direction: column !important;
          }
          .blog-post-more a {
            min-width: unset !important;
          }
          .blog-post-content h2 {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </main>
  );
}
