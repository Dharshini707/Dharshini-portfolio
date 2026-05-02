import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [focused, setFocused] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1800));
    setStatus('success');
    setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }, 3000);
  };

  const inputBase = "w-full bg-transparent text-white font-dm text-sm pt-6 pb-2 px-4 outline-none peer";
  const labelBase = "absolute left-4 text-slate-500 font-dm text-sm transition-all duration-200 pointer-events-none";

  return (
    <section id="contact" className="section-padding relative z-10" aria-label="Contact section">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono-custom text-[#00D4FF] text-sm">05. contact</span>
          <h2 className="font-syne font-black text-4xl md:text-5xl text-white mt-2">
            Let's Build Together
          </h2>
          <p className="font-dm text-slate-400 mt-3 max-w-md mx-auto">
            Have a project in mind? I'd love to hear about it. Drop me a message below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {[
              { icon: '📧', label: 'Email', value: 'dharsmoor.m2415@gmail.com' },
              { icon: '📍', label: 'Location', value: 'Chennai, India' },
              { icon: '💬', label: 'Response', value: 'Within 24 hours' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="glass rounded-xl p-5 border border-white/5 flex items-center gap-4">
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="font-mono-custom text-xs text-slate-500">{label}</div>
                  <div className="font-syne font-semibold text-white">{value}</div>
                </div>
              </div>
            ))}

            <div className="glass rounded-xl p-5 border border-white/5">
              <div className="font-mono-custom text-xs text-slate-500 mb-3">Open to</div>
              {['Full-time roles', 'Freelance projects', 'Open source collaboration'].map(item => (
                <div key={item} className="flex items-center gap-2 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                  <span className="font-dm text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/5 flex flex-col gap-5" noValidate>
              {/* Name */}
              <div className="relative border-b border-white/10 focus-within:border-[#00D4FF] transition-colors">
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                  className={inputBase}
                  required
                  aria-required="true"
                  aria-label="Your name"
                />
                <label htmlFor="name" className={`${labelBase} ${form.name || focused === 'name' ? 'top-1 text-xs text-[#00D4FF]' : 'top-4'}`}>
                  Your Name
                </label>
              </div>
              {/* Email */}
              <div className="relative border-b border-white/10 focus-within:border-[#00D4FF] transition-colors">
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  className={inputBase}
                  required
                  aria-required="true"
                  aria-label="Your email address"
                />
                <label htmlFor="email" className={`${labelBase} ${form.email || focused === 'email' ? 'top-1 text-xs text-[#00D4FF]' : 'top-4'}`}>
                  Email Address
                </label>
              </div>
              {/* Message */}
              <div className="relative border-b border-white/10 focus-within:border-[#00D4FF] transition-colors">
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  className={`${inputBase} resize-none`}
                  required
                  aria-required="true"
                  aria-label="Your message"
                />
                <label htmlFor="message" className={`${labelBase} ${form.message || focused === 'message' ? 'top-1 text-xs text-[#00D4FF]' : 'top-4'}`}>
                  Tell me about your project...
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden shimmer-btn font-syne font-bold text-[#0A0A0F] py-3.5 rounded-xl mt-2 disabled:opacity-70"
                aria-label="Send message"
              >
                {status === 'idle' && 'Send Message →'}
                {status === 'loading' && (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#0A0A0F] border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                )}
                {status === 'success' && '✓ Message Sent!'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
