'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, AlertTriangle } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import WorkForm from '@/components/WorkForm';
import { isAdminLoggedIn, getWorks, deleteWork, type WorkItem } from '@/lib/storage';

function DeleteModal({ item, onConfirm, onCancel }: { item: WorkItem; onConfirm: () => void; onCancel: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass p-8 rounded-2xl text-center max-w-sm w-full"
      >
        <AlertTriangle size={40} className="mx-auto mb-4" style={{ color: '#f97316' }} />
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
          Delete Work?
        </h3>
        <p className="text-sm mb-6" style={{ color: 'rgba(248,250,252,0.5)', fontFamily: 'DM Sans, sans-serif' }}>
          &quot;{item.title}&quot; will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl text-sm font-medium"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(248,250,252,0.7)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('add');
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [editingItem, setEditingItem] = useState<WorkItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<WorkItem | null>(null);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.push('/admin/login');
      return;
    }
    loadWorks();
  }, [router]);

  const loadWorks = () => setWorks(getWorks());

  const handleDelete = (id: string) => {
    deleteWork(id);
    loadWorks();
    setDeleteItem(null);
  };

  const handleEdit = (item: WorkItem) => {
    setEditingItem(item);
    setActiveTab('add');
  };

  const handleFormSuccess = () => {
    loadWorks();
    setEditingItem(null);
    setActiveTab('manage');
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0a0a' }}>
      <AdminSidebar activeTab={editingItem ? 'add' : activeTab} onTabChange={(t) => { setActiveTab(t); if (t !== 'add') setEditingItem(null); }} />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'Syne, sans-serif' }}>
            {activeTab === 'add' && !editingItem && 'Add New Work'}
            {activeTab === 'add' && editingItem && 'Edit Work'}
            {activeTab === 'manage' && 'Manage Work'}
            {activeTab === 'settings' && 'Settings'}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            {works.length} items in portfolio
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Add / Edit Tab */}
          {activeTab === 'add' && (
            <motion.div key="add" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <WorkForm
                editItem={editingItem}
                onSuccess={handleFormSuccess}
                onCancel={editingItem ? () => { setEditingItem(null); setActiveTab('manage'); } : undefined}
              />
            </motion.div>
          )}

          {/* Manage Tab */}
          {activeTab === 'manage' && (
            <motion.div key="manage" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {works.length === 0 ? (
                <div
                  className="glass p-12 rounded-2xl text-center"
                  style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'DM Sans, sans-serif' }}
                >
                  No work items added yet. Go to &quot;Add Work&quot; to add your first item.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {works.map((item) => (
                    <motion.div
                      key={item.id}
                      className="glass rounded-2xl overflow-hidden"
                      whileHover={{ y: -3 }}
                    >
                      {/* Thumbnail */}
                      <div
                        className="h-40 w-full"
                        style={{
                          background: item.imageUrl
                            ? `url(${item.imageUrl}) center/cover`
                            : 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                        }}
                      />
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif', color: '#f8fafc' }}>
                            {item.title}
                          </h3>
                          <span
                            className="text-xs px-2 py-1 rounded-lg shrink-0"
                            style={{
                              background: 'rgba(124,58,237,0.15)',
                              color: '#7c3aed',
                              fontFamily: 'DM Sans, sans-serif',
                            }}
                          >
                            {item.category}
                          </span>
                        </div>
                        {item.description && (
                          <p
                            className="text-xs mb-4 line-clamp-2"
                            style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'DM Sans, sans-serif' }}
                          >
                            {item.description}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium"
                            style={{
                              background: 'rgba(124,58,237,0.1)',
                              border: '1px solid rgba(124,58,237,0.2)',
                              color: '#7c3aed',
                              fontFamily: 'DM Sans, sans-serif',
                            }}
                          >
                            <Pencil size={12} /> Edit
                          </button>
                          <button
                            onClick={() => setDeleteItem(item)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium"
                            style={{
                              background: 'rgba(239,68,68,0.1)',
                              border: '1px solid rgba(239,68,68,0.2)',
                              color: '#f87171',
                              fontFamily: 'DM Sans, sans-serif',
                            }}
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="glass p-8 rounded-2xl max-w-lg">
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Account</h3>
                <div className="space-y-3">
                  <div
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span className="text-sm" style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'DM Sans, sans-serif' }}>Email</span>
                    <span className="text-sm" style={{ color: '#f8fafc', fontFamily: 'DM Sans, sans-serif' }}>praveenmanthiramoorthi@gmail.com</span>
                  </div>
                  <div
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span className="text-sm" style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'DM Sans, sans-serif' }}>Storage</span>
                    <span className="text-sm" style={{ color: '#06b6d4', fontFamily: 'DM Sans, sans-serif' }}>localStorage</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteItem && (
          <DeleteModal
            item={deleteItem}
            onConfirm={() => handleDelete(deleteItem.id)}
            onCancel={() => setDeleteItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
