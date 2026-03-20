'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, MessageCircle } from 'lucide-react';

const socials = [
  { icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:praveenmanthiramoorthi@gmail.com', label: 'Email' },
  { icon: MessageCircle, href: 'https://wa.me/919999999999', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t py-10 px-6"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            PM
          </div>
          <span
            className="text-sm"
            style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'DM Sans, sans-serif' }}
          >
            © 2025 Praveen Manthiramoorthi · Built with passion
          </span>
        </motion.div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(248,250,252,0.5)',
                }}
                whileHover={{
                  scale: 1.1,
                  color: '#f8fafc',
                  background: 'rgba(124,58,237,0.2)',
                  borderColor: 'rgba(124,58,237,0.3)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
