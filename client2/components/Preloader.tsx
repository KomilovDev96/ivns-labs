'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Wait for page load + 300ms artificial delay for smooth feel
    const hide = () => setTimeout(() => setShow(false), 300);

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide);
      return () => window.removeEventListener('load', hide);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            background: 'var(--bg-primary)',
          }}
        >
          {/* Background orbs */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 40% 40%, rgba(14,165,233,0.06) 0%, transparent 55%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 65% 65%, rgba(124,58,237,0.05) 0%, transparent 55%)',
          }} />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.65rem',
              position: 'relative', zIndex: 1,
            }}
          >
            {/* Hex icon */}
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              style={{
                fontSize: '2.2rem',
                background: 'var(--gradient-accent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ⬡
            </motion.span>

            {/* Text */}
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.8rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}>
              IVN
              <span style={{
                background: 'var(--gradient-accent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Labs
              </span>
            </span>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              width: 120,
              height: 3,
              borderRadius: 3,
              background: 'var(--border-subtle)',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '50%',
                height: '100%',
                borderRadius: 3,
                background: 'var(--gradient-accent)',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
