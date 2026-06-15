'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fadeUp, stagger } from '@/lib/animations';
import { blogPosts as staticPosts, BLOG_CATEGORIES } from '@/data/blog';
import { useContent } from '@/lib/ContentContext';
import type { Locale } from '@/lib/api';
import { TbClock, TbCalendar, TbArrowRight, TbSearch } from 'react-icons/tb';

const CATEGORY_COLORS: Record<string, string> = {
  tech: '#22d3ee',
  business: '#f59e0b',
  ai: '#0ea5e9',
  design: '#8b5cf6',
  news: '#6366f1',
};

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale() as Locale;
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { blogPosts: apiPosts } = useContent();

  // Use API posts if loaded, otherwise static
  const posts = apiPosts.length > 0 ? apiPosts : staticPosts;

  const getTitle = (post: any) => {
    if (post.translations) return post.translations[locale]?.title || post.translations.ru?.title || post.slug;
    const sp = staticPosts.find(p => p.slug === post.slug);
    return sp ? t(`items.${sp.id}.title`) : post.slug;
  };

  const filtered = posts.filter((post: any) => {
    const matchCat = activeCategory === 'all' || post.category === activeCategory;
    const title = getTitle(post).toLowerCase();
    const matchSearch = !search || title.includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = posts[0];

  return (
    <main>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '50vh', display: 'flex', alignItems: 'center',
        background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden',
        paddingTop: '6rem',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 20%, rgba(14,165,233,0.08) 0%, transparent 55%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 80% 80%, rgba(124,58,237,0.06) 0%, transparent 55%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '4rem 1.5rem 3rem', width: '100%' }}>
          <motion.div variants={stagger} initial="hidden" animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', alignItems: 'center' }}>

            <motion.div variants={fadeUp}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(14,165,233,0.1)',
                border: '1px solid rgba(14,165,233,0.3)',
                borderRadius: 100, padding: '0.35rem 1rem',
                fontSize: '0.82rem', color: 'var(--accent-blue)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)', animation: 'pulse 2s infinite' }} />
                Blog
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900, lineHeight: 1.1,
              color: 'var(--text-primary)',
            }}>
              {t('title')}
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontSize: '1.1rem', color: 'var(--text-secondary)',
              lineHeight: 1.75, maxWidth: 560,
            }}>
              {t('subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section style={{ padding: '0 0 3rem', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Link href={`/${locale}/blog/${featured.slug}`} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ y: -4, boxShadow: `0 20px 60px ${featured.color}18` }}
                style={{
                  background: `linear-gradient(135deg, ${featured.color}0a, ${featured.color2}08)`,
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)', padding: '2.5rem',
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem',
                  alignItems: 'center', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                className="blog-featured"
              >
                {/* Left: text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: featured.color,
                      background: `${featured.color}15`, border: `1px solid ${featured.color}35`,
                      borderRadius: 100, padding: '0.25rem 0.75rem',
                    }}>
                      {t(featured.category)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <TbCalendar size={13} />{new Date(featured.date).toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'uz' ? 'uz-UZ' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800,
                    lineHeight: 1.2, color: 'var(--text-primary)',
                  }}>
                    {getTitle(featured)}
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {(featured as any).translations?.[locale]?.excerpt || (featured as any).translations?.ru?.excerpt || (staticPosts.find(p => p.slug === featured.slug) ? t(`items.${(staticPosts.find(p => p.slug === featured.slug) as any).id}.excerpt`) : '')}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: featured.color, fontSize: '0.9rem', fontWeight: 600 }}>
                    {t('readMore')} <TbArrowRight size={16} />
                  </div>
                </div>

                {/* Right: image */}
                <div style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  minHeight: 240,
                  position: 'relative',
                }}>
                  <img
                    src={featured.image}
                    alt={getTitle(featured)}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      minHeight: 240,
                    }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      if (target.nextElementSibling) (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }}
                  />
                  <div style={{
                    display: 'none', alignItems: 'center', justifyContent: 'center',
                    width: '100%', height: '100%', minHeight: 240,
                    background: `linear-gradient(135deg, ${featured.color}18, ${featured.color2}10)`,
                    position: 'absolute', top: 0, left: 0,
                  }}>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.5rem', fontWeight: 800, color: `${featured.color}60`,
                      textAlign: 'center', padding: '1rem',
                    }}>
                      {t(featured.category)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FILTERS + SEARCH ── */}
      <section style={{ padding: '2rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="blog-filters" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Categories */}
            <div className="blog-categories" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {BLOG_CATEGORIES.map(cat => {
                const isActive = activeCategory === cat.id;
                const catColor = cat.id === 'all' ? 'var(--accent-blue)' : CATEGORY_COLORS[cat.id] || 'var(--accent-blue)';
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      padding: '0.45rem 1rem', borderRadius: 100,
                      fontSize: '0.82rem', fontWeight: 600,
                      background: isActive ? `${catColor}18` : 'transparent',
                      border: `1px solid ${isActive ? catColor : 'var(--border-subtle)'}`,
                      color: isActive ? catColor : 'var(--text-secondary)',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    {cat.id === 'all' ? t('allCategories') : t(cat.id)}
                  </motion.button>
                );
              })}
            </div>

            {/* Search */}
            <div className="blog-search" style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)', padding: '0.45rem 0.75rem',
              minWidth: 220,
            }}>
              <TbSearch size={16} color="var(--text-muted)" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: 'var(--text-primary)', fontSize: '0.85rem',
                  width: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section style={{ padding: '3rem 0 5rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '1.5rem',
              }}
              className="blog-grid"
            >
              {filtered.map((post, i) => {
                const catColor = CATEGORY_COLORS[post.category] || '#0ea5e9';
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                      <motion.article
                        whileHover={{ y: -6, boxShadow: `0 16px 48px ${catColor}14` }}
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-lg)',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          backdropFilter: 'blur(12px)',
                          transition: 'all 0.3s ease',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {/* Image header */}
                        <div style={{
                          height: 180,
                          position: 'relative', overflow: 'hidden',
                          background: `linear-gradient(135deg, ${post.color}14, ${post.color2}0c)`,
                        }}>
                          <img
                            src={post.image}
                            alt={getTitle(post)}
                            style={{
                              width: '100%', height: '100%',
                              objectFit: 'cover', display: 'block',
                              transition: 'transform 0.4s ease',
                            }}
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              if (target.nextElementSibling) (target.nextElementSibling as HTMLElement).style.display = 'flex';
                            }}
                          />
                          <div style={{
                            display: 'none', alignItems: 'center', justifyContent: 'center',
                            position: 'absolute', top: 0, left: 0,
                            width: '100%', height: '100%',
                            background: `linear-gradient(135deg, ${post.color}18, ${post.color2}10)`,
                          }}>
                            <div style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: '1.2rem', fontWeight: 800, color: `${catColor}50`,
                            }}>
                              {t(post.category)}
                            </div>
                          </div>
                          {/* Gradient overlay at bottom */}
                          <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            height: 40,
                            background: 'linear-gradient(transparent, var(--bg-card))',
                            pointerEvents: 'none',
                          }} />
                        </div>

                        {/* Content */}
                        <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {/* Meta */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <span style={{
                              fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em',
                              textTransform: 'uppercase', color: catColor,
                              background: `${catColor}12`, border: `1px solid ${catColor}28`,
                              borderRadius: 100, padding: '0.2rem 0.6rem',
                            }}>
                              {t(post.category)}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <TbClock size={12} />{post.readTime}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1.1rem', fontWeight: 700,
                            lineHeight: 1.3, color: 'var(--text-primary)',
                          }}>
                            {getTitle(post)}
                          </h3>

                          {/* Excerpt */}
                          <p style={{
                            fontSize: '0.85rem', color: 'var(--text-secondary)',
                            lineHeight: 1.65, flex: 1,
                          }}>
                            {(post as any).translations?.[locale]?.excerpt || (post as any).translations?.ru?.excerpt || (staticPosts.find(p => p.slug === post.slug) ? t(`items.${(staticPosts.find(p => p.slug === post.slug) as any).id}.excerpt`) : '')}
                          </p>

                          {/* Read more */}
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            color: catColor, fontSize: '0.82rem', fontWeight: 600,
                            paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)',
                          }}>
                            {t('readMore')} <TbArrowRight size={14} />
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', fontSize: '1rem' }}>
              No articles found
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
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
              {t('ctaBtn')} →
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .blog-grid article:hover img {
          transform: scale(1.06);
        }
        @media (max-width: 768px) {
          .blog-featured {
            grid-template-columns: 1fr !important;
            padding: 1.25rem !important;
          }
          .blog-featured h2 {
            font-size: 1.3rem !important;
          }
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
          .blog-filters {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .blog-categories {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.25rem;
            flex-wrap: nowrap !important;
          }
          .blog-search {
            min-width: unset !important;
            width: 100% !important;
          }
          .blog-hero-title {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </main>
  );
}
