'use client';

import { motion } from 'framer-motion';
import { Palette, Play, Package, Globe } from 'lucide-react';

const services = [
  {
    icon: <Palette size={32} />,
    title: 'Poster Design',
    description: 'Eye-catching event posters and social media graphics that demand attention and drive engagement for your brand.',
    price: 'Starting ₹199',
    accent: '#7c3aed',
  },
  {
    icon: <Play size={32} />,
    title: 'Reel Editing',
    description: 'Dynamic Instagram reels and short-form video edits that hook viewers in the first second.',
    price: 'Starting ₹199',
    accent: '#06b6d4',
  },
  {
    icon: <Package size={32} />,
    title: 'Event Branding',
    description: 'Complete event identity — poster + reel combo packages designed to make your event unforgettable.',
    price: 'Starting ₹499',
    accent: '#7c3aed',
  },
  {
    icon: <Globe size={32} />,
    title: 'Website Design',
    description: 'Sleek portfolios, landing pages, and business sites built to convert visitors into customers.',
    price: 'Starting ₹999',
    accent: '#06b6d4',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Services() {
  return (
    <section id="services" className="section bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-violet mb-4 block"
            style={{ color: '#7c3aed' }}
          >
            Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            What I <span className="text-gradient">Do</span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass p-10 md:p-14 group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
            >
              {/* Background Glow */}
              <div 
                className="absolute top-0 right-0 w-48 h-48 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{ background: service.accent }}
              />

              <div className="flex flex-col h-full relative z-10">
                {/* Icon Container */}
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `${service.accent}20`, border: `1px solid ${service.accent}40` }}
                >
                  <div style={{ color: service.accent }}>
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-6 tracking-tight flex items-center gap-4">
                  {service.title}
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: service.accent }} />
                </h3>
                
                <p className="text-lg leading-relaxed mb-12" style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'DM Sans, sans-serif' }}>
                  {service.description}
                </p>

                <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Investment</span>
                  <span className="text-2xl font-black" style={{ color: '#f8fafc' }}>
                    {service.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
