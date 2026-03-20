'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/storage';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = adminLogin(email, password);
    if (ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password.');
    }
    setLoading(false);
  };

  const inputClass = `w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none transition-all duration-200`;
  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f8fafc',
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background blobs */}
      <div
        className="blob w-96 h-96 top-1/4 left-1/4"
        style={{ background: '#7c3aed' }}
      />
      <div
        className="blob w-64 h-64 bottom-1/4 right-1/4"
        style={{ background: '#06b6d4', animationDelay: '-3s' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass w-full max-w-md p-8 relative z-10"
        style={{ borderRadius: '24px' }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-extrabold mb-4"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              fontFamily: 'Syne, sans-serif',
              boxShadow: '0 0 30px rgba(124,58,237,0.4)',
            }}
          >
            PM
          </div>
          <h1
            className="text-3xl font-extrabold mb-1"
            style={{ fontFamily: 'Syne, sans-serif', color: '#f8fafc' }}
          >
            Admin Login
          </h1>
          <p className="text-sm" style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            Portfolio Content Management
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(248,250,252,0.4)' }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className={inputClass}
              style={inputStyle}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(248,250,252,0.4)' }}
            />
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`${inputClass} pr-10`}
              style={inputStyle}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(248,250,252,0.4)' }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 rounded-xl text-sm"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#f87171',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-semibold text-sm mt-2"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              color: 'white',
              fontFamily: 'DM Sans, sans-serif',
              opacity: loading ? 0.7 : 1,
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <p
          className="text-center text-xs mt-6"
          style={{ color: 'rgba(248,250,252,0.25)', fontFamily: 'DM Sans, sans-serif' }}
        >
          Restricted access only
        </p>
      </motion.div>
    </div>
  );
}
