'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 20, suffix: '+', label: 'Designs Created' },
  { value: 10, suffix: '+', label: 'Reels Edited' },
  { value: 5, suffix: '+', label: 'Websites Built' },
];

const skills = [
  'Photoshop', 'Premiere Pro', 'Figma', 'Next.js', 'Tailwind CSS',
  'After Effects', 'Illustrator', 'React',
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span
            className="inline-block text-sm font-medium mb-3 px-3 py-1 rounded-full"
            style={{
              color: '#7c3aed',
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.2)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            About
          </span>
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: big stylized text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-6xl md:text-8xl font-extrabold leading-none mb-4"
              style={{
                fontFamily: 'Syne, sans-serif',
                letterSpacing: '-0.04em',
                color: 'rgba(255,255,255,0.06)',
                WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              }}
            >
              DESIGN
            </h2>
            <h2
              className="text-6xl md:text-8xl font-extrabold leading-none mb-4"
              style={{
                fontFamily: 'Syne, sans-serif',
                letterSpacing: '-0.04em',
              }}
            >
              <span className="text-gradient">CREATE</span>
            </h2>
            <h2
              className="text-6xl md:text-8xl font-extrabold leading-none"
              style={{
                fontFamily: 'Syne, sans-serif',
                letterSpacing: '-0.04em',
                color: 'rgba(255,255,255,0.06)',
                WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              }}
            >
              INSPIRE
            </h2>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'DM Sans, sans-serif' }}
            >
              I&apos;m Praveen — a student and creative designer who specializes in poster design,
              reel editing, and building web experiences. I help college events, clubs, and small
              brands create visually engaging content that actually gets attention.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="glass p-4 text-center"
                  style={{ borderRadius: '16px' }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="text-3xl md:text-4xl font-extrabold mb-1 text-gradient"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'rgba(248,250,252,0.5)', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(248,250,252,0.8)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  whileHover={{
                    background: 'rgba(124,58,237,0.15)',
                    borderColor: 'rgba(124,58,237,0.3)',
                    color: '#f8fafc',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
