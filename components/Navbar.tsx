'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? 'navbar-blur' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="w-10"></div>


            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                onClick={() => handleNav('#contact')}
                className="px-6 py-2.5 rounded-2xl text-sm font-bold text-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 0 25px rgba(124, 58, 237, 0.4)' 
                }}
                whileTap={{ scale: 0.96 }}
              >
                Let's Talk
              </motion.button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden navbar-blur border-t border-white/5"
              >
                <div className="px-6 py-4 flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => handleNav(link.href)}
                      className="text-left text-white/70 hover:text-white py-2 text-base font-medium transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                  <button
                    onClick={() => handleNav('#contact')}
                    className="mt-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white w-full"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                  >
                    Let's Talk
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
