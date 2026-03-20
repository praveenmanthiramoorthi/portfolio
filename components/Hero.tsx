'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ChevronDown } from 'lucide-react';

const ThreeBackground = dynamic(() => import('./ThreeBackground'), { ssr: false });

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js background */}
      <ThreeBackground />

      {/* Gradient blobs */}
      <div
        className="blob w-96 h-96 top-1/4 left-1/4"
        style={{ background: '#7c3aed' }}
      />
      <div
        className="blob w-80 h-80 bottom-1/4 right-1/4"
        style={{ background: '#06b6d4', animationDelay: '-3s' }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full pt-20"
      >
        {/* Availability tag */}
        <motion.div variants={itemVariants} className="mb-12">
          <span
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
            style={{
              background: 'rgba(6,182,212,0.05)',
              border: '1px solid rgba(6,182,212,0.2)',
              color: '#06b6d4',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: '#06b6d4',
                animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
              }}
            />
            Available for Freelance
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[1.1] mb-10"
          style={{ 
            fontFamily: 'Syne, sans-serif', 
            letterSpacing: '-0.04em',
            textAlign: 'center' 
          }}
        >
          Praveen{' '}
          <span className="text-gradient">Manthiramoorthi</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-3xl font-medium mb-10"
          style={{ 
            color: 'rgba(248,250,252,0.8)', 
            fontFamily: 'DM Sans, sans-serif', 
            letterSpacing: '0.1em',
            textAlign: 'center' 
          }}
        >
          Poster Designer · Reel Editor · Web Designer
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl mb-20 mx-auto"
          style={{ 
            color: 'rgba(248,250,252,0.5)', 
            fontFamily: 'DM Sans, sans-serif', 
            lineHeight: 2.0,
            textAlign: 'center',
            maxWidth: '700px'
          }}
        >
          I craft visuals that stop the scroll — posters, reels, and websites for events and brands.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-12 justify-center items-center mt-16"
        >
          <motion.button
            onClick={() => handleScroll('#work')}
            className="relative px-20 py-7 text-sm font-black text-white overflow-hidden group shadow-[0_20px_50px_rgba(124,58,237,0.2)] transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              borderRadius: '16px'
            }}
            whileHover={{
              scale: 1.02,
              y: -5,
              boxShadow: '0 30px 60px rgba(124, 58, 237, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
            <span className="relative z-10">View My Work</span>
          </motion.button>

          <motion.button
            onClick={() => handleScroll('#contact')}
            className="px-20 py-7 text-sm font-black text-white transition-all duration-300 relative group overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              borderRadius: '16px'
            }}
            whileHover={{
              scale: 1.02,
              y: -5,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'DM Sans, sans-serif' }}
        >
          Scroll
        </span>
        <ChevronDown size={20} style={{ color: 'rgba(248,250,252,0.4)' }} />
      </motion.div>
    </section>
  );
}
