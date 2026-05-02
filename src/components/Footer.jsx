import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-10 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-syne font-bold gradient-text text-lg">&lt;D /&gt;</div>
        <p className="font-dm text-sm text-slate-500">
          Made with React +{' '}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="inline-block text-red-500"
            aria-hidden="true"
          >
            ❤️
          </motion.span>
          {' '}by Dharshini
        </p>
        <p className="font-mono-custom text-xs text-slate-600">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
