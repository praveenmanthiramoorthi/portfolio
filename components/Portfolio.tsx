'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';
import { getWorks, type WorkItem } from '@/lib/storage';

const defaultWorks = [
  {
    id: 'default-1',
    title: 'Tech Event Poster',
    description: 'High-impact poster for a college tech symposium',
    category: 'Poster' as const,
    imageUrl: '',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
  },
  {
    id: 'default-2',
    title: 'College Fest Design',
    description: 'Vibrant festival branding for annual college cultural',
    category: 'Poster' as const,
    imageUrl: '',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)',
  },
  {
    id: 'default-3',
    title: 'Brand Social Post',
    description: 'Clean social media graphics for product launch',
    category: 'Poster' as const,
    imageUrl: '',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
  },
  {
    id: 'default-4',
    title: 'Event Promo Reel',
    description: 'Dynamic 30-second Instagram reel for an event promotion',
    category: 'Reel' as const,
    imageUrl: '',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
  },
  {
    id: 'default-5',
    title: 'Portfolio Website',
    description: 'Dark-themed portfolio for a freelance photographer',
    category: 'Website' as const,
    imageUrl: '',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  },
  {
    id: 'default-6',
    title: 'Club Brand Identity',
    description: 'Branding poster series for a student tech club',
    category: 'Poster' as const,
    imageUrl: '',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
  },
];

const filters = ['All', 'Poster', 'Reel', 'Website'];

type FilterType = 'All' | 'Poster' | 'Reel' | 'Website';

interface Work {
  id: string;
  title: string;
  description: string;
  category: 'Poster' | 'Reel' | 'Website';
  imageUrl: string;
  url?: string;
  gradient: string;
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [works, setWorks] = useState<Work[]>(
    defaultWorks.map((w) => ({
      ...w,
      category: w.category as 'Poster' | 'Reel' | 'Website',
      url: undefined,
    }))
  );

  useEffect(() => {
    const saved = getWorks();
    if (saved.length > 0) {

      const mapped: Work[] = saved.map((w: WorkItem) => ({
        id: w.id,
        title: w.title,
        description: w.description,
        category: w.category,
        imageUrl: w.imageUrl,
        url: w.url,
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
      }));
      setWorks([...mapped, ...defaultWorks.map(w => ({ ...w, category: w.category as any, url: undefined }))]);
    }
  }, []);

  const filtered = activeFilter === 'All'
    ? works
    : works.filter((w) => w.category === activeFilter);

  return (
    <section id="work" className="section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
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
            Portfolio
          </span>
          <h2
            className="text-4xl md:text-6xl font-extrabold"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Selected{' '}
            <span className="text-gradient">Work</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter as FilterType)}
              className="px-5 py-2 rounded-2xl text-sm font-semibold transition-all duration-300"

              style={
                activeFilter === filter
                  ? {
                      background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                      color: 'white',
                      fontFamily: 'DM Sans, sans-serif',
                    }
                  : {
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(248,250,252,0.6)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'DM Sans, sans-serif',
                    }
              }
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ aspectRatio: '4/3' }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
              >
                {/* Card background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: work.imageUrl
                      ? `url(${work.imageUrl}) center/cover`
                      : work.gradient,
                  }}
                />

                {/* Grid overlay for gradient cards */}
                {!work.imageUrl && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                )}

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-semibold"
                    style={{
                      background: 'rgba(10,10,10,0.5)',
                      backdropFilter: 'blur(8px)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.15)',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {work.category}
                  </span>
                </div>

                {/* Reel play icon */}
                {work.category === 'Reel' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
                    >
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-6"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)',
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="text-xl font-bold mb-1 text-white"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {work.title}
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {work.description}
                  </p>
                  {work.url && (
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium"
                      style={{ color: '#06b6d4', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Live Preview <ExternalLink size={14} />
                    </a>
                  )}
                </motion.div>

                {/* Glow border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(124,58,237,0.5)' }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
