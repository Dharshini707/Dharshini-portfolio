import { useEffect, useRef } from 'react';

export default function AnimatedCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot.current) {
        dot.current.style.left = mouseX + 'px';
        dot.current.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring.current) {
        ring.current.style.left = ringX + 'px';
        ring.current.style.top = ringY + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const grow = () => { if (ring.current) ring.current.style.transform = 'translate(-50%,-50%) scale(1.8)'; };
    const shrink = () => { if (ring.current) ring.current.style.transform = 'translate(-50%,-50%) scale(1)'; };

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
        style={{ background: '#00D4FF', transition: 'opacity 0.3s' }}
        aria-hidden="true"
      />
      <div
        ref={ring}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          border: '1.5px solid rgba(0,212,255,0.6)',
          transition: 'transform 0.3s ease',
        }}
        aria-hidden="true"
      />
    </>
  );
}
