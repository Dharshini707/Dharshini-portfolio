import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
      }`}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="font-syne font-bold text-xl gradient-text"
          aria-label="Go to top"
        >
          &lt;D /&gt;
        </motion.button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {links.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className="font-dm text-sm text-slate-400 hover:text-[#00D4FF] transition-colors duration-300 relative group"
                aria-label={`Navigate to ${l} section`}
              >
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00D4FF] transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* Hire Me */}
        <motion.button
          onClick={() => scrollTo('Contact')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block shimmer-btn text-[#0A0A0F] font-syne font-semibold text-sm px-5 py-2 rounded-full"
          aria-label="Contact for hiring"
        >
          Hire Me
        </motion.button>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="block w-6 h-0.5 bg-[#00D4FF] origin-center transition-all" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="block w-6 h-0.5 bg-[#00D4FF]" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="block w-6 h-0.5 bg-[#00D4FF] origin-center transition-all" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass overflow-hidden"
          >
            <ul className="flex flex-col py-4 px-6 gap-4">
              {links.map((l) => (
                <li key={l}>
                  <button onClick={() => scrollTo(l)} className="text-slate-300 hover:text-[#00D4FF] font-dm transition-colors w-full text-left py-2">
                    {l}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => scrollTo('Contact')} className="shimmer-btn text-[#0A0A0F] font-semibold px-5 py-2 rounded-full w-full">
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
