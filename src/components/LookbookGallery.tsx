import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { GALLERY_ITEMS, GalleryItem } from '../types/parlor';
import { WheelBox, WheelText, WheelImage } from './WheelMotion';
import { Gem, Eye, X, ZoomIn, ArrowRight } from 'lucide-react';

export function LookbookGallery() {
  const { activeCombo } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Bridal Glam', 'Hair Art', 'Facial Spa', 'Nail Studio'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="lookbook" className="py-16 lg:py-24 border-y theme-transition"
      style={{
        backgroundColor: 'var(--surface-alt)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <WheelBox delay={0.1} direction="down">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--primary-dark)',
                }}
              >
                <Gem className="w-3.5 h-3.5" />
                Couture Portfolio
              </span>
            </WheelBox>

            <WheelText as="h2" delay={0.2} className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight">
              Client Transformations & Bridal Lookbook
            </WheelText>

            <WheelText as="p" delay={0.3} className="text-sm sm:text-base opacity-80 leading-relaxed">
              Witness the art of understated luxury. From high-fashion editorial weddings to everyday effortless glow.
            </WheelText>
          </div>

          {/* Filter Pills */}
          <WheelBox delay={0.2} direction="left">
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border shadow-xs"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                    color: selectedCategory === cat ? 'var(--primary-text)' : 'var(--text-main)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </WheelBox>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <WheelBox
              key={item.id}
              delay={0.1 + (index % 3) * 0.15}
              direction="up"
              className="cursor-pointer group"
              onClick={() => setActiveItem(item)}
            >
              <div
                className="rounded-3xl border overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 relative aspect-[4/5] theme-transition"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <WheelImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full backdrop-blur-md"
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-text)' }}
                    >
                      {item.category}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif-luxury leading-snug">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-white/80 pt-1 border-t border-white/20">
                    <span>{item.tag}</span>
                    <span className="text-[11px] underline group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Enlarge View →
                    </span>
                  </div>
                </div>
              </div>
            </WheelBox>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border bg-black/90 text-white z-10"
              style={{ borderColor: 'var(--primary)' }}
            >
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close lookbook image"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span
                    className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-text)' }}
                  >
                    {activeItem.category}
                  </span>
                  <h3 className="text-2xl font-bold font-serif-luxury mt-1">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">Technique: {activeItem.tag}</p>
                </div>

                <a
                  href="#services"
                  onClick={() => setActiveItem(null)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs shadow-md flex items-center gap-1.5 hover:scale-105 transition-transform"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-text)' }}
                >
                  <span>Book This Look</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
