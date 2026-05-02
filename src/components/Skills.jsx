import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { skills } from '../data/skills';

const categories = Object.keys(skills);

function SkillCard({ skill, index, isVisible }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="glass rounded-xl p-5 border border-white/5 hover:border-[#00D4FF]/20 transition-all duration-300 group cursor-default"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className="font-syne font-semibold text-white text-sm">{skill.name}</span>
        </div>
        <span className="font-mono-custom text-xs text-[#00D4FF]">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.06 + 0.3, duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #00D4FF, #7B2FFF)' }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState('Frontend');

  return (
    <section id="skills" className="section-padding relative z-10" aria-label="Skills section">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="font-mono-custom text-[#00D4FF] text-sm">02. skills</span>
          <h2 className="font-syne font-black text-4xl md:text-5xl text-white mt-2">
            Tech Stack
          </h2>
          <p className="font-dm text-slate-400 mt-3 max-w-lg mx-auto">
            A blend of technologies I use to build efficient and scalable solutions.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`font-mono-custom text-sm px-5 py-2 rounded-full border transition-all duration-300 ${
                active === cat
                  ? 'bg-[#00D4FF] text-[#0A0A0F] border-[#00D4FF] font-semibold'
                  : 'glass border-white/10 text-slate-400 hover:border-[#00D4FF]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="tabpanel">
          {skills[active].map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
