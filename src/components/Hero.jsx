import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';

const socials = [
  { label: 'GitHub', href: 'https://github.com/Dharshini707', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/r-dharshini-960621298', icon: 'in' },
  // { label: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
];

export default function Hero() {
  const typed = useTypewriter([
    'Full Stack Developer',
    'React.js Developer',
    'Problem Solver',
    'UI/UX Enthusiast',
    'API & Backend Learner',
  ]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(123,47,255,0.12) 0%, rgba(0,212,255,0.06) 50%, transparent 70%)' }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono-custom text-xs text-slate-400">Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-syne font-black mb-4"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 1.05 }}
        >
          <span className="text-white">Dharshini </span>
          <span
            className="gradient-text"
            style={{ WebkitTextStroke: '1px transparent' }}
            onMouseEnter={e => e.target.style.animation = 'glitch 0.3s steps(2) infinite'}
            onMouseLeave={e => e.target.style.animation = ''}
          >
            R
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono-custom text-[#00D4FF] text-lg md:text-2xl mb-6 h-8"
          aria-live="polite"
        >
          {typed}
          <span className="animate-pulse">|</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-dm text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Building scalable  web applications that turn ideas into real-world impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="shimmer-btn font-syne font-bold text-[#0A0A0F] px-8 py-3.5 rounded-full text-sm"
            aria-label="View my work"
          >
            View Work →
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="/resume.pdf"
            download
            className="glass font-syne font-semibold text-white px-8 py-3.5 rounded-full text-sm border border-white/10 hover:border-[#00D4FF]/40 transition-colors"
            aria-label="Download CV"
          >
            Download CV ↓
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="flex justify-center gap-4"
          role="list"
          aria-label="Social links"
        >
          {socials.map(({ label, href, icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="glass w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-colors border border-white/5 font-mono-custom text-xs font-bold"
              aria-label={label}
              role="listitem"
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-mono-custom text-xs text-slate-600">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-[#00D4FF] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
