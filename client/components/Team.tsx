'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';
import { team as staticTeam } from '@/data/team';
import { useContent } from '@/lib/ContentContext';
import { useSectionT } from '@/lib/useT';
import { TbBrandTelegram, TbBrandGithub, TbBrandLinkedin, TbStar } from 'react-icons/tb';

const cardVariant = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function SocialIcon({ type, href }: { type: 'telegram' | 'linkedin' | 'github'; href: string }) {
  const Icon = type === 'telegram' ? TbBrandTelegram : type === 'linkedin' ? TbBrandLinkedin : TbBrandGithub;
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
      style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-muted)',
        textDecoration: 'none',
        transition: 'color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
      }}
    >
      <Icon size={15} />
    </motion.a>
  );
}

export default function Team() {
  const tBase = useTranslations('team');
  const locale = useLocale();
  const t = useSectionT('team', tBase, locale);
  const { team: apiTeam } = useContent();
  const team = apiTeam.length > 0 ? apiTeam : staticTeam;

  return (
    <section
      id="team"
      style={{ padding: '7rem 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}
    >
      {/* BG orbs */}
      <div style={{ position:'absolute', top:-160, left:-160, width:520, height:520, borderRadius:'50%', background:'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-160, right:-160, width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)', pointerEvents:'none' }} />

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── Header ── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem' }}>
            <span style={{ display:'block', width:36, height:1.5, borderRadius:2, background:'var(--accent-purple)', opacity:0.6 }} />
            <span style={{ fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent-purple)' }}>
              {t('label')}
            </span>
            <span style={{ display:'block', width:36, height:1.5, borderRadius:2, background:'var(--accent-purple)', opacity:0.6 }} />
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15,
            marginBottom: '0.75rem',
          }}>
            {t('title')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {team.map((member: any) => {
            const mId = member.memberId ?? member.id;
            const apiTr = member.translations?.[locale] ?? member.translations?.ru ?? {};
            const staticMt = member.id ? (() => { try { return tBase.raw(`members.${member.id}`) as Record<string,string>; } catch { return {} as Record<string,string>; } })() : {} as Record<string,string>;
            const mt = { ...staticMt, ...apiTr };
            return (
              <motion.div
                key={member._id ?? mId}
                variants={cardVariant}
                whileHover={{ y: -8, boxShadow: `0 28px 64px ${member.color1}20` }}
                transition={{ duration: 0.22 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  position: 'relative',
                }}
              >
                {/* Top gradient stripe */}
                <div style={{
                  height: 4,
                  background: `linear-gradient(90deg, ${member.color1}, ${member.color2})`,
                  flexShrink: 0,
                }} />

                {/* Card inner */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                  {/* Avatar row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    {/* Avatar */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{
                        width: 68, height: 68, borderRadius: 18,
                        background: member.avatar
                          ? 'transparent'
                          : `linear-gradient(135deg, ${member.color1}, ${member.color2})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden',
                        boxShadow: `0 8px 24px ${member.color1}30`,
                        border: `2px solid ${member.color1}30`,
                      }}>
                        {member.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={member.avatar} alt={member.initials}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1.3rem', fontWeight: 800, color: '#fff',
                            letterSpacing: '-0.02em',
                          }}>
                            {member.initials}
                          </span>
                        )}
                      </div>
                      {/* Online dot */}
                      <div style={{
                        position: 'absolute', bottom: 2, right: 2,
                        width: 12, height: 12, borderRadius: '50%',
                        background: '#22c55e',
                        border: '2px solid var(--bg-card)',
                      }} />
                    </div>

                    {/* Name + role */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.05rem', fontWeight: 700,
                        color: 'var(--text-primary)', lineHeight: 1.2,
                        marginBottom: '0.3rem',
                      }}>
                        {mt.name || member.initials}
                      </div>
                      {/* Profession type badge */}
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em',
                        color: member.color1,
                        background: `${member.color1}14`,
                        border: `1px solid ${member.color1}28`,
                        borderRadius: 100,
                        padding: '0.2rem 0.6rem',
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: member.color1 }} />
                        {mt.type ?? mt.position ?? ''}
                      </span>
                    </div>
                  </div>

                  {/* Position */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                      {t('positionLabel')}
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                      {mt.position ?? ''}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {t('skillsLabel')}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {(Array.isArray(mt.skills) ? mt.skills : (mt.skills ?? '').split(',')).map((skill: string) => (
                        <span key={skill} style={{
                          fontSize: '0.7rem', fontWeight: 600,
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 6, padding: '0.2rem 0.5rem',
                          color: 'var(--text-secondary)',
                        }}>
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Exp + socials row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)',
                  }}>
                    {/* Experience */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <TbStar size={14} color={member.color1} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {mt.exp ?? ''}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {t('expLabel')}
                      </span>
                    </div>

                    {/* Social links */}
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {member.socials?.telegram && <SocialIcon type="telegram" href={member.socials.telegram} />}
                      {member.socials?.github    && <SocialIcon type="github"   href={member.socials.github} />}
                      {member.socials?.linkedin  && <SocialIcon type="linkedin" href={member.socials.linkedin} />}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Join us CTA ── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{
            marginTop: '4rem',
            background: 'linear-gradient(135deg, var(--accent-blue-dim), var(--accent-purple-dim))',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-purple)' }}>
              {t('joinLabel')}
            </span>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)',
              fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3,
            }}>
              {t('joinTitle')}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {t('joinDesc')}
            </p>
          </div>
          <motion.a
            href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--gradient-btn)', color: '#fff',
              padding: '0.9rem 2.2rem', borderRadius: 'var(--radius-md)',
              fontSize: '1rem', fontWeight: 600,
              boxShadow: 'var(--shadow-btn)', textDecoration: 'none', whiteSpace: 'nowrap',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 36px rgba(14,165,233,0.45)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {t('joinBtn')} →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
