'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, slideLeft, slideRight } from '@/lib/animations';

function FeatureLine({ text, color }: { text: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
      {text}
    </div>
  );
}

interface ProductCardProps {
  label: string;
  title: string;
  desc: string;
  features: string[];
  cta: string;
  accentColor: string;
  accentColor2: string;
  image?: string;
  reverse?: boolean;
  animVariant: typeof slideLeft | typeof slideRight;
  href: string;
}

function ImageZone({ accentColor, accentColor2, image, title }: {
  accentColor: string; accentColor2: string; image?: string; title: string;
}) {
  return (
    <div style={{
      direction: 'ltr',
      width: '100%',
      aspectRatio: '4/3',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      position: 'relative',
      border: `1px solid ${accentColor}25`,
      background: `linear-gradient(145deg, ${accentColor}18 0%, ${accentColor2}12 60%, ${accentColor}08 100%)`,
      boxShadow: `0 24px 60px ${accentColor}18`,
      flexShrink: 0,
    }}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        /* Placeholder */
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '1rem',
        }}>
          {/* Decorative rings */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse at 30% 30%, ${accentColor}12 0%, transparent 55%)`,
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse at 70% 70%, ${accentColor2}0e 0%, transparent 50%)`,
          }} />

          {/* Center icon box */}
          <div style={{
            width: 80, height: 80, borderRadius: 22,
            background: `linear-gradient(135deg, ${accentColor}22, ${accentColor2}16)`,
            border: `1.5px dashed ${accentColor}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 1,
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity={0.75}>
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', position: 'relative', zIndex: 1 }}>
            <span style={{
              fontSize: '0.8rem', fontWeight: 700,
              color: accentColor, opacity: 0.8,
              letterSpacing: '0.04em',
            }}>
              Изображение продукта
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Скоро здесь появится скриншот
            </span>
          </div>

          {/* Corner accents */}
          <div style={{ position:'absolute', top:16, left:16, width:24, height:24, borderTop:`2px solid ${accentColor}45`, borderLeft:`2px solid ${accentColor}45`, borderRadius:'4px 0 0 0' }} />
          <div style={{ position:'absolute', top:16, right:16, width:24, height:24, borderTop:`2px solid ${accentColor}45`, borderRight:`2px solid ${accentColor}45`, borderRadius:'0 4px 0 0' }} />
          <div style={{ position:'absolute', bottom:16, left:16, width:24, height:24, borderBottom:`2px solid ${accentColor}45`, borderLeft:`2px solid ${accentColor}45`, borderRadius:'0 0 0 4px' }} />
          <div style={{ position:'absolute', bottom:16, right:16, width:24, height:24, borderBottom:`2px solid ${accentColor}45`, borderRight:`2px solid ${accentColor}45`, borderRadius:'0 0 4px 0' }} />
        </div>
      )}
    </div>
  );
}

function ProductCard({ label, title, desc, features, cta, accentColor, accentColor2, image, reverse, animVariant, href }: ProductCardProps) {
  return (
    <motion.div className="product-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={animVariant}
      style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center',
        padding: '3rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)',
        background: `linear-gradient(135deg, ${accentColor}08 0%, var(--bg-card) 100%)`,
        backdropFilter: 'blur(12px)',
        direction: reverse ? 'rtl' : 'ltr',
      }}>
      <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', border: `1px solid ${accentColor}50`, color: accentColor, background: `${accentColor}15`, width: 'fit-content' }}>
          {label}
        </span>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, background: `linear-gradient(135deg, ${accentColor}, ${accentColor2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>{desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {features.map((f, i) => <FeatureLine key={i} text={f} color={accentColor} />)}
        </div>
        <Link href={href} style={{ textDecoration: 'none' }}>
          <motion.span
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', width: 'fit-content', background: `linear-gradient(135deg, ${accentColor}, ${accentColor2})`, color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', fontWeight: 600, boxShadow: `0 4px 20px ${accentColor}40` }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            {cta} →
          </motion.span>
        </Link>
      </div>
      <div style={{ direction: 'ltr' }}>
        <ImageZone accentColor={accentColor} accentColor2={accentColor2} image={image} title={title} />
      </div>
    </motion.div>
  );
}

export default function Products() {
  const t = useTranslations('products');
  const locale = useLocale();

  return (
    <section id="products" style={{ padding: '6rem 0', background: 'var(--bg-section-alt)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
            {t('title')}
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '1rem' }}>{t('subtitle')}</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <ProductCard
            label={t('aivan.label')} title={t('aivan.title')} desc={t('aivan.desc')}
            features={[t('aivan.feature1'), t('aivan.feature2'), t('aivan.feature3')]}
            cta={t('aivan.cta')} accentColor="#0ea5e9" accentColor2="#7c3aed"
            animVariant={slideLeft} href={`/${locale}/products/aivan`}
            // image="/images/products/aivan.jpg"  ← раскомментируй когда добавишь фото
          />
          <ProductCard
            label={t('rost.label')} title={t('rost.title')} desc={t('rost.desc')}
            features={[t('rost.feature1'), t('rost.feature2'), t('rost.feature3')]}
            cta={t('rost.cta')} accentColor="#8b5cf6" accentColor2="#0ea5e9"
            reverse animVariant={slideRight} href={`/${locale}/products/rost`}
            // image="/images/products/rost.jpg"   ← раскомментируй когда добавишь фото
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-card {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
            gap: 2rem !important;
            padding: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
