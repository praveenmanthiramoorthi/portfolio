'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    year: '2024–Present',
    title: 'Event Poster Design',
    description: 'Designed high-impact posters for college events and cultural fests, from tech symposiums to freshers&apos; nights.',
    accent: '#7c3aed',
    icon: '🎨',
  },
  {
    year: '2024–Present',
    title: 'Instagram Reel Editing',
    description: 'Created engaging short-form video edits for personal brands and event pages across Instagram.',
    accent: '#06b6d4',
    icon: '🎬',
  },
  {
    year: '2024–Present',
    title: 'Web Development',
    description: 'Built portfolio websites and responsive landing pages for students, clubs, and small businesses.',
    accent: '#7c3aed',
    icon: '🌐',
  },
  {
    year: '2023–2024',
    title: 'Student Club Branding',
    description: 'Delivered complete branding solutions including logos, social assets, and visual identity for student organisations.',
    accent: '#06b6d4',
    icon: '📦',
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-sm font-medium mb-3 px-3 py-1 rounded-full"
            style={{
              color: '#06b6d4',
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.2)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Experience
          </span>
          <h2
            className="text-4xl md:text-6xl font-extrabold"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            My{' '}
            <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, #7c3aed, #06b6d4)',
              transformOrigin: 'top',
              height: '100%',
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-6 md:left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                  style={{
                    background: exp.accent,
                    boxShadow: `0 0 10px ${exp.accent}80`,
                  }}
                />

                {/* Spacer for desktop */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div
                  className={`ml-14 md:ml-0 md:w-1/2 ${
                    i % 2 === 0 ? 'md:pl-10' : 'md:pr-10 md:text-right'
                  }`}
                >
                  <div
                    className="glass p-6"
                    style={{ borderRadius: '16px' }}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                      <span className="text-2xl">{exp.icon}</span>
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-lg"
                        style={{
                          background: `${exp.accent}15`,
                          color: exp.accent,
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        {exp.year}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: 'Syne, sans-serif', color: '#f8fafc' }}
                    >
                      {exp.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'rgba(248,250,252,0.55)', fontFamily: 'DM Sans, sans-serif' }}
                      dangerouslySetInnerHTML={{ __html: exp.description.replace(/&apos;/g, "'") }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
