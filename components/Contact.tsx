'use client';

import { motion } from 'framer-motion';
import { Mail, MessageCircle, Instagram } from 'lucide-react';

const contacts = [
  {
    label: 'WhatsApp',
    icon: MessageCircle,
    href: 'https://wa.me/919999999999',
    bg: 'linear-gradient(135deg, #22c55e, #16a34a)',
    shadow: 'rgba(34,197,94,0.3)',
    description: 'Ping me for a quick chat',
  },
  {
    label: 'Email',
    icon: Mail,
    href: 'mailto:praveenmanthiramoorthi@gmail.com',
    bg: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
    shadow: 'rgba(124,58,237,0.3)',
    description: 'praveenmanthiramoorthi@gmail.com',
  },
  {
    label: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/',
    bg: 'linear-gradient(135deg, #f97316, #ec4899, #7c3aed)',
    shadow: 'rgba(236,72,153,0.3)',
    description: 'See my creative journey',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Gradient blob background */}
      <div
        className="blob w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <h2
            className="text-4xl md:text-6xl font-extrabold mb-4"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Let&apos;s Work{' '}
            <span className="text-gradient">Together</span>{' '}
            🚀
          </h2>
          <p
            className="text-lg max-w-lg mx-auto"
            style={{ color: 'rgba(248,250,252,0.55)', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.8 }}
          >
            DM me on Instagram or WhatsApp for a quick response. 
            I&apos;m open for freelance work, collaborations, and fun projects.
          </p>
        </motion.div>

        {/* Contact buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
          {contacts.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl group"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                  minWidth: '200px',
                  textDecoration: 'none',
                }}
                whileHover={{
                  y: -4,
                  boxShadow: `0 20px 40px ${contact.shadow}`,
                  borderColor: `${contact.shadow.replace('0.3', '0.4')}`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: contact.bg }}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-center">
                  <div
                    className="font-bold text-lg mb-1"
                    style={{ fontFamily: 'Syne, sans-serif', color: '#f8fafc' }}
                  >
                    {contact.label}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'rgba(248,250,252,0.5)', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {contact.description}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
