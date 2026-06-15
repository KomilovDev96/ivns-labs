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
import { projects as staticProjects } from '@/data/projects';
import { useContent } from '@/lib/ContentContext';
import type { ApiProject, Locale } from '@/lib/api';
import {
  TbArrowLeft, TbCalendar, TbClock, TbCode,
  TbCheck, TbArrowUpRight, TbBulb, TbTarget, TbChartBar,
} from 'react-icons/tb';

export default function ProjectDetailPage() {
  const params = useParams();
  const locale = useLocale() as Locale;
  const slug = params.slug as string;
  const { projects: apiProjects, loaded } = useContent();

  const t = useTranslations('projects');

  const staticProject = staticProjects.find(p => p.slug === slug);
  const apiProject: ApiProject | undefined = apiProjects.find(p => p.slug === slug);
  const project = apiProject ?? staticProject;

  if (!project && loaded) notFound();
  if (!project) return null;

  // Translations: API first, then next-intl fallback
  const apiTr = apiProject?.translations?.[locale] ?? apiProject?.translations?.ru;
  const pid = staticProject?.id;

  const title     = apiTr?.title     || (pid ? t(`items.${pid}.title`)     : project.slug);
  const desc      = apiTr?.desc      || (pid ? t(`items.${pid}.desc`)      : '');
  const challenge = apiTr?.challenge || (pid ? t(`items.${pid}.challenge`) : '');
  const solution  = apiTr?.solution  || (pid ? t(`items.${pid}.solution`)  : '');
  const result    = apiTr?.result    || (pid ? t(`items.${pid}.result`)    : '');

  const otherProjects = apiProjects.length > 0
    ? apiProjects.filter(p => p.slug !== slug).slice(0, 3)
    : staticProjects.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <main>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', paddingTop: '6rem' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 70% 50%, ${project.color}0e 0%, transparent 60%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 20% 80%, ${project.color2}0a 0%, transparent 55%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '4rem 1.5rem', width: '100%' }}>
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <motion.div variants={fadeUp}>
              <Link href={`/${locale}#projects`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = project.color)}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                <TbArrowLeft size={16} /> {t('backToProjects')}
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}35`, borderRadius: 100, padding: '0.3rem 0.9rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: project.color }} />
                {project.tag}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <TbCalendar size={13} />{project.year}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <TbClock size={13} />{project.duration}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, color: 'var(--text-primary)', maxWidth: 760 }}>
              {title}
            </motion.h1>

            <motion.p variants={fadeUp} style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 620 }}>
              {desc}
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.25rem', background: `linear-gradient(135deg, ${project.color}12, ${project.color2}0a)`, border: `1px solid ${project.color}28`, borderRadius: 'var(--radius-lg)', padding: '1rem 1.5rem', width: 'fit-content' }}>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 900, lineHeight: 1, color: project.color, textShadow: `0 0 30px ${project.color}45` }}>
                  {project.statValue}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{project.statLabel}</div>
              </div>
              <div style={{ width: 1, height: 48, background: 'var(--border-subtle)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {project.stack.map(s => (
                  <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    <TbCode size={11} color={project.color} />{s}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION / RESULT ── */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: TbBulb,      key: 'challenge', text: challenge, color: '#f59e0b', label: t('challengeLabel') },
              { icon: TbTarget,    key: 'solution',  text: solution,  color: project.color, label: t('solutionLabel') },
              { icon: TbChartBar,  key: 'result',    text: result,    color: '#10b981', label: t('resultLabel') },
            ].map(({ icon: Icon, key, text, color, label }) => (
              <motion.div key={key}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', backdropFilter: 'blur(12px)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{label}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--text-primary)' }}>{t('stackTitle')}</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {project.stack.map(tech => (
              <motion.span key={tech} variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.1rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', backdropFilter: 'blur(8px)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: `linear-gradient(135deg, ${project.color}, ${project.color2})` }} />
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MORE PROJECTS ── */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--text-primary)' }}>{t('moreProjects')}</h2>
          </motion.div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {otherProjects.map((p: any) => {
              const sp = staticProjects.find(x => x.slug === p.slug);
              const pTitle = p.translations?.[locale]?.title || p.translations?.ru?.title || sp?.tag || p.tag;
              return (
                <MotionLink key={p._id ?? p.slug} href={`/${locale}/projects/${p.slug}`}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, boxShadow: `0 12px 32px ${p.color}18` }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.9rem 1.25rem', textDecoration: 'none', flex: '1', minWidth: 200, backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${p.color}, ${p.color2})` }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>{pTitle}</span>
                  <TbArrowUpRight size={16} color="var(--text-muted)" />
                </MotionLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 800, color: 'var(--text-primary)' }}>{t('ctaTitle')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>{t('ctaDesc')}</p>
            <Link href={`/${locale}#contact`} style={{ textDecoration: 'none' }}>
              <motion.span
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--gradient-btn)', color: '#fff', padding: '1rem 2.5rem', borderRadius: 'var(--radius-md)', fontSize: '1.05rem', fontWeight: 700, boxShadow: 'var(--shadow-btn)' }}
                whileHover={{ scale: 1.04, boxShadow: '0 12px 48px rgba(14,165,233,0.5)' }}
                whileTap={{ scale: 0.96 }}>
                {t('ctaBtn')} →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
