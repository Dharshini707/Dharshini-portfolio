import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { projects } from '../data/projects';

const filters = ['All', 'Full Stack', 'Frontend', 'Backend'];

function ProjectCard({ project, index, isVisible }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative h-72 cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      role="article"
      aria-label={project.title}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute inset-0 glass rounded-2xl p-6 flex flex-col justify-between border border-white/5"
          style={{ backfaceVisibility: 'hidden' }}>
          <div>
            <div className="w-12 h-1 rounded-full mb-4" style={{ background: project.color }} />
            <h3 className="font-syne font-bold text-white text-xl mb-2">{project.title}</h3>
            <p className="font-dm text-slate-400 text-sm leading-relaxed">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="font-mono-custom text-xs px-2.5 py-1 rounded-full"
                style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 border"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${project.color}15, rgba(123,47,255,0.15))`,
            borderColor: `${project.color}40`,
          }}>
          <h3 className="font-syne font-bold text-white text-lg">{project.title}</h3>
          <div className="flex gap-4">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="glass px-5 py-2.5 rounded-full font-syne font-semibold text-sm text-white hover:text-[#00D4FF] transition-colors border border-white/10"
              aria-label={`View ${project.title} on GitHub`}>
              GitHub ↗
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full font-syne font-semibold text-sm text-[#0A0A0F] transition-colors"
              style={{ background: project.color }}
              aria-label={`View ${project.title} live demo`}>
              Live Demo →
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active.toLowerCase().replace(' ', ''));

  return (
    <section id="projects" className="section-padding relative z-10" aria-label="Projects section">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="font-mono-custom text-[#00D4FF] text-sm">03. projects</span>
          <h2 className="font-syne font-black text-4xl md:text-5xl text-white mt-2">
            Featured Work
          </h2>
          <p className="font-dm text-slate-400 mt-3">Hover a card to reveal links.</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-10" role="tablist">
          {filters.map(f => (
            <button key={f} role="tab" aria-selected={active === f} onClick={() => setActive(f)}
              className={`font-mono-custom text-sm px-5 py-2 rounded-full border transition-all duration-300 ${
                active === f ? 'bg-[#7B2FFF] text-white border-[#7B2FFF]' : 'glass border-white/10 text-slate-400 hover:border-[#7B2FFF]/40'
              }`}>
              {f}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} isVisible={isVisible} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <a href="https://github.com/Dharshini707" target="_blank" rel="noopener noreferrer"
            className="glass border border-white/10 hover:border-[#00D4FF]/40 font-syne font-semibold text-sm px-8 py-3 rounded-full text-slate-300 hover:text-[#00D4FF] transition-all duration-300 inline-block"
            aria-label="View all projects on GitHub">
            View All on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
