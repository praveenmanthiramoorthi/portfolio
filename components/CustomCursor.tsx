'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const dotX = useSpring(x, { stiffness: 500, damping: 30 });
  const dotY = useSpring(y, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  // Hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      {/* Outer ring with lag */}
      <motion.div
        className="cursor pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(124,58,237,0.6)',
          top: 0,
          left: 0,
        }}
      />
      {/* Inner dot — follows exactly */}
      <motion.div
        className="cursor pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#7c3aed',
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}
