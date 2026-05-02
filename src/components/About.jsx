import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

const stats = [
  { label: 'Years Exp', value: 1 },
  { label: 'Projects', value: 9 },
];

const highlights = [
  { icon: '⚡', title: 'Performance First', desc: 'Obsessed with Core Web Vitals and sub-second load times.' },
  { icon: '🎨', title: 'Design Precision', desc: 'Pixel-perfect implementations of complex UI/UX designs.' },
  { icon: '🏗️', title: 'Scalable Systems', desc: 'Architecture that grows with your business needs.' },
  { icon: '🔒', title: 'Security Minded', desc: 'Best practices baked in from day one, not bolted on.' },
];

function Counter({ value, isVisible }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    const target = value === 999 ? 999 : value;
    const step = target / 50;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, value]);
  return <span>{count}{value === 999 ? '+' : '+'}</span>;
}

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding relative z-10" aria-label="About section">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono-custom text-[#00D4FF] text-sm">01. about me</span>
          <h2 className="font-syne font-black text-4xl md:text-5xl text-white mt-2">
            The Human Behind the Code
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full animate-spin-slow"
                style={{ background: 'conic-gradient(from 0deg, #00D4FF, #7B2FFF, #00D4FF)', padding: '3px', borderRadius: '50%' }}>
                <div className="w-full h-full rounded-full" style={{ background: '#0A0A0F' }} />
              </div>
              {/* Avatar placeholder */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full glass flex items-center justify-center m-1"
                style={{ border: '3px solid rgba(0,212,255,0.3)' }}>
                <img src="https://res.cloudinary.com/dcuh7osei/image/upload/f_auto,q_auto/my_image_jyoivj" alt="Dharshini" className="rounded-full w-60 h-60 md:w-72 md:h-72 object-cover" />
              </div>
              {/* Floating badges */}
              {[
                { label: 'React', top: '5%', right: '-10%' },
                { label: 'Node.js', bottom: '15%', left: '-12%' },
                { label: 'AWS', top: '50%', right: '-15%' },
              ].map(({ label, ...pos }) => (
                <motion.div
                  key={label}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute glass rounded-full px-3 py-1.5 font-mono-custom text-xs text-[#00D4FF] border border-[#00D4FF]/20"
                  style={{ ...pos }}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="font-dm text-slate-400 text-lg leading-relaxed mb-8">
              I’m Dharshini, a developer focused on building modern, scalable 
              web applications. I enjoy turning ideas into real-world solutions 
              using <em className="text-[#00D4FF] not-italic">clean code and intuitive design.</em>.
            </p>
            <p className="font-dm text-slate-400 leading-relaxed mb-10">
              With a strong foundation in 
              React and an interest in full-stack development, 
              I continuously learn, adapt, and work on improving my 
              skills while contributing to meaningful projects.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {stats.map(({ label, value }) => (
                <div key={label} className="glass rounded-xl p-4 text-center">
                  <div className="font-syne font-black text-2xl gradient-text">
                    <Counter value={value} isVisible={isVisible} />
                  </div>
                  <div className="font-mono-custom text-xs text-slate-500 mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -3, borderColor: 'rgba(0,212,255,0.3)' }}
                  className="glass rounded-xl p-4 border border-white/5 transition-all duration-300 cursor-default"
                >
                  <div className="text-xl mb-2">{icon}</div>
                  <div className="font-syne font-semibold text-white text-sm mb-1">{title}</div>
                  <div className="font-dm text-xs text-slate-500">{desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
