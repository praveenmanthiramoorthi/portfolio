'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, PlusCircle, Briefcase, Settings, LogOut } from 'lucide-react';
import { adminLogout } from '@/lib/storage';
import { useRouter } from 'next/navigation';

const navItems = [
  { icon: PlusCircle, label: 'Add Work', value: 'add' },
  { icon: Briefcase, label: 'Manage Work', value: 'manage' },
  { icon: Settings, label: 'Settings', value: 'settings' },
];

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    adminLogout();
    router.push('/admin/login');
  };

  return (
    <aside
      className="w-64 min-h-screen flex flex-col py-8 px-4 border-r"
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9"></div>

        <div>
          <div className="text-sm font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
            Admin Panel
          </div>
          <div className="text-xs" style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            Portfolio CMS
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.value;
          return (
            <motion.button
              key={item.value}
              onClick={() => onTabChange(item.value)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-medium transition-all duration-200"
              style={
                active
                  ? {
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))',
                      color: '#f8fafc',
                      border: '1px solid rgba(124,58,237,0.3)',
                      fontFamily: 'DM Sans, sans-serif',
                    }
                  : {
                      color: 'rgba(248,250,252,0.5)',
                      fontFamily: 'DM Sans, sans-serif',
                    }
              }
              whileHover={{ x: 4 }}
            >
              <Icon size={18} style={{ color: active ? '#7c3aed' : 'rgba(248,250,252,0.4)' }} />
              {item.label}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout */}
      <motion.button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-medium mt-4"
        style={{
          color: 'rgba(239,68,68,0.7)',
          fontFamily: 'DM Sans, sans-serif',
        }}
        whileHover={{ color: '#ef4444', x: 4 }}
      >
        <LogOut size={18} />
        Logout
      </motion.button>
    </aside>
  );
}
