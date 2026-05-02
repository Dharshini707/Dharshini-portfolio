import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { experience } from '../data/experience';

export default function Timeline() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="experience" className="section-padding relative z-10" aria-label="Experience section">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono-custom text-[#00D4FF] text-sm">04. experience</span>
          <h2 className="font-syne font-black text-4xl md:text-5xl text-white mt-2">
            Journey So Far
          </h2>
        </motion.div>

        <div className="relative">
          {/* Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, #00D4FF, #7B2FFF, transparent)' }} />

          <div className="flex flex-col gap-10">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-6 md:gap-0`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-1.5 z-10"
                  style={{ background: item.isEducation ? '#7B2FFF' : '#00D4FF', boxShadow: `0 0 10px ${item.isEducation ? '#7B2FFF' : '#00D4FF'}` }} />

                {/* Card */}
                <div className={`ml-14 md:ml-0 ${i % 2 === 0 ? 'md:mr-[52%] md:pr-8' : 'md:ml-[52%] md:pl-8'} flex-1`}>
                  <motion.div
                    whileHover={{ y: -3, borderColor: 'rgba(0,212,255,0.25)' }}
                    className="glass rounded-xl p-5 border border-white/5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <div>
                        <h3 className="font-syne font-bold text-white">{item.role}</h3>
                        <p className="font-dm text-sm text-[#00D4FF]">{item.company}</p>
                      </div>
                      <span className="font-mono-custom text-xs text-slate-500 glass px-3 py-1 rounded-full">{item.period}</span>
                    </div>
                    <p className="font-dm text-slate-400 text-sm leading-relaxed mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(t => (
                        <span key={t} className="font-mono-custom text-xs px-2 py-0.5 rounded glass text-slate-400">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
