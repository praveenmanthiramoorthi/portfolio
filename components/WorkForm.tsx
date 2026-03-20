'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save, X } from 'lucide-react';
import { saveWork, updateWork, type WorkItem } from '@/lib/storage';

interface Props {
  editItem?: WorkItem | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function WorkForm({ editItem, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState({
    title: editItem?.title || '',
    description: editItem?.description || '',
    category: editItem?.category || 'Poster' as 'Poster' | 'Reel' | 'Website',
    imageUrl: editItem?.imageUrl || '',
    url: editItem?.url || '',
  });
  const [preview, setPreview] = useState(editItem?.imageUrl || '');
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setForm((prev) => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    setSaving(true);
    try {
      if (editItem) {
        updateWork(editItem.id, form);
      } else {
        saveWork(form);
      }
      onSuccess();
    } finally {
      setSaving(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all duration-200`;
  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f8fafc',
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-8 rounded-2xl max-w-2xl"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
          {editItem ? 'Edit Work' : 'Add New Work'}
        </h2>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-white/40 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'DM Sans, sans-serif' }}>
            Image
          </label>
          {preview ? (
            <div className="relative mb-3">
              <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
              <button
                type="button"
                onClick={() => { setPreview(''); setForm((f) => ({ ...f, imageUrl: '' })); }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center hover:bg-black"
              >
                <X size={14} className="text-white" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-violet-500"
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <Upload size={24} className="mb-2" style={{ color: 'rgba(248,250,252,0.4)' }} />
              <span className="text-sm" style={{ color: 'rgba(248,250,252,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
                Click to upload image
              </span>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'DM Sans, sans-serif' }}>
            Title *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Tech Event Poster"
            className={inputClass}
            style={inputStyle}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'DM Sans, sans-serif' }}>
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Brief description of the project..."
            rows={3}
            className={inputClass}
            style={{ ...inputStyle, resize: 'none' }}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'DM Sans, sans-serif' }}>
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as 'Poster' | 'Reel' | 'Website' }))}
            className={inputClass}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="Poster">Poster</option>
            <option value="Reel">Reel</option>
            <option value="Website">Website</option>
          </select>
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(248,250,252,0.6)', fontFamily: 'DM Sans, sans-serif' }}>
            URL (optional)
          </label>
          <input
            type="url"
            value={form.url}
            onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            placeholder="https://..."
            className={inputClass}
            style={inputStyle}
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={saving}
          className="w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 mt-2"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            color: 'white',
            fontFamily: 'DM Sans, sans-serif',
            opacity: saving ? 0.7 : 1,
          }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={16} />
          {saving ? 'Saving...' : editItem ? 'Update Work' : 'Save Work'}
        </motion.button>
      </div>
    </motion.form>
  );
}
