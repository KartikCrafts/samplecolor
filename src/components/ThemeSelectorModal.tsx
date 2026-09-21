import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { PINTEREST_IMAGE_URL, ORIGINAL_PINTEREST_SRC, ColorCombo } from '../types/theme';
import { Palette, X, Shuffle, Check, Eye, ChevronRight, Layers, Image as ImageIcon } from 'lucide-react';

export function ThemeSelectorModal() {
  const {
    isThemeModalOpen,
    setIsThemeModalOpen,
    activeCombo,
    allCombos,
    setActiveComboId,
    setRandomCombo,
  } = useTheme();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showImageGuide, setShowImageGuide] = useState<boolean>(true);

  const filters = ['All', 'Bridal', 'Organic', 'Modern', 'Luxe', 'Festive'];

  const filteredCombos = allCombos.filter((combo) => {
    if (activeFilter === 'All') return true;
    return combo.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  if (!isThemeModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsThemeModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border theme-transition"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-main)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-5 border-b"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-alt)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-text)' }}
              >
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif-luxury tracking-wide flex items-center gap-2">
                  Pinterest Color Palette Studio
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-sans font-medium"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: '#ffffff',
                    }}
                  >
                    24 Combos
                  </span>
                </h3>
                <p className="text-xs opacity-75">
                  Click on any color combo below or directly on the Pinterest image to transform the entire website instantly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={setRandomCombo}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border hover:opacity-90 theme-transition"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
                title="Random Palette"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Surprise Me</span>
              </button>
              <button
                type="button"
                onClick={() => setIsThemeModalOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center border hover:bg-black/5 dark:hover:bg-white/10 theme-transition"
                style={{ borderColor: 'var(--border)' }}
                aria-label="Close theme modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Visual Pinterest Reference Banner */}
            <div
              className="p-5 rounded-2xl border space-y-4"
              style={{
                backgroundColor: 'var(--surface-alt)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-rose-500" />
                  <span className="text-sm font-semibold">
                    Original Inspiration Source (Pinterest 24-Color Grid)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowImageGuide(!showImageGuide)}
                    className="text-xs px-3 py-1 rounded-lg border font-medium flex items-center gap-1"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
                  >
                    <Eye className="w-3 h-3" />
                    {showImageGuide ? 'Hide Image' : 'View Original Pin'}
                  </button>
                  <a
                    href={ORIGINAL_PINTEREST_SRC}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs opacity-75 hover:opacity-100 underline"
                  >
                    Open Link
                  </a>
                </div>
              </div>

              {showImageGuide && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-4 relative rounded-xl overflow-hidden border shadow-md max-h-64 flex justify-center bg-black/5">
                    <img
                      src={PINTEREST_IMAGE_URL}
                      alt="Pinterest Color Palette Reference"
                      className="object-contain max-h-64 w-auto rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none flex items-end p-3">
                      <span className="text-[11px] text-white font-medium">
                        6 Rows x 4 Columns = 24 Combinations
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    <div className="text-xs leading-relaxed opacity-85">
                      Har colour combo ko humne is photo se 100% extract kiya hai! Har box ke andar primary aur secondary tone set hai. Aap neeche kisi bhi card par click karenge to poori beauty parlor website usi palette mein shift ho jayegi:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-xl border text-xs" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                        <span className="font-semibold block">Active Palette:</span>
                        <span className="text-[11px] font-bold" style={{ color: 'var(--primary)' }}>
                          {activeCombo.name}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl border text-xs" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                        <span className="font-semibold block">Location on Pin:</span>
                        <span className="text-[11px]">Row {activeCombo.row}, Column {activeCombo.col}</span>
                      </div>
                      <div className="p-2.5 rounded-xl border text-xs col-span-2 sm:col-span-1" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                        <span className="font-semibold block">Swatches:</span>
                        <div className="flex gap-1.5 mt-1">
                          {activeCombo.swatches.map((hex, idx) => (
                            <span
                              key={idx}
                              className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                              style={{ backgroundColor: hex }}
                              title={hex}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-60 flex items-center gap-1 mr-1">
                <Layers className="w-3.5 h-3.5" /> Filter:
              </span>
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                  style={{
                    backgroundColor: activeFilter === f ? 'var(--primary)' : 'var(--surface-alt)',
                    color: activeFilter === f ? 'var(--primary-text)' : 'var(--text-main)',
                    boxShadow: activeFilter === f ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  {f} {f === 'All' ? `(${allCombos.length})` : ''}
                </button>
              ))}
            </div>

            {/* Palette Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredCombos.map((combo) => {
                const isSelected = activeCombo.id === combo.id;
                return (
                  <motion.div
                    key={combo.id}
                    id={`palette-card-${combo.id}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveComboId(combo.id)}
                    className={`relative p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected ? 'ring-2 shadow-md' : 'hover:shadow-sm'
                    }`}
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                      // @ts-ignore
                      '--tw-ring-color': 'var(--primary)',
                    }}
                  >
                    {/* Position Pin */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                        R{combo.row} : C{combo.col}
                      </span>
                      {isSelected && (
                        <span
                          className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: 'var(--primary)',
                            color: 'var(--primary-text)',
                          }}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" /> Active
                        </span>
                      )}
                    </div>

                    {/* Color Swatch Bar */}
                    <div className="h-10 w-full rounded-xl overflow-hidden flex shadow-inner border border-black/5 mb-3">
                      {combo.swatches.map((hex, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex-1 h-full flex items-center justify-center group relative"
                          style={{ backgroundColor: hex }}
                        >
                          <span className="opacity-0 group-hover:opacity-100 text-[9px] font-mono text-white bg-black/60 px-1 rounded transition-opacity">
                            {hex}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-sm font-semibold tracking-tight leading-tight line-clamp-1">
                        {combo.name}
                      </h4>
                      {combo.hindiName && (
                        <p className="text-[11px] opacity-70 mt-0.5">{combo.hindiName}</p>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {combo.tags.map((t, tidx) => (
                        <span
                          key={tidx}
                          className="text-[9px] px-1.5 py-0.5 rounded-md font-medium"
                          style={{
                            backgroundColor: 'var(--surface-alt)',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer Bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t text-xs"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-alt)' }}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">Tip:</span>
              <span className="opacity-75">
                Press next or prev anytime in the bottom floating widget to cycle all 24 looks!
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsThemeModalOpen(false)}
              className="w-full sm:w-auto px-5 py-2 rounded-xl font-semibold shadow-sm hover:opacity-95 theme-transition"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-text)',
              }}
            >
              Done & Explore Website
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/**
 * Quick Floating Dock on bottom-right for instant 1-touch palette switching
 */
export function FloatingThemeDock() {
  const {
    activeCombo,
    allCombos,
    setActiveComboId,
    setNextCombo,
    setPrevCombo,
    setIsThemeModalOpen,
  } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Quick compact bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 px-3 py-2 rounded-2xl border shadow-xl backdrop-blur-md theme-transition"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--text-main)',
        }}
      >
        {/* Swatches preview button */}
        <button
          type="button"
          onClick={() => setIsThemeModalOpen(true)}
          className="flex items-center gap-2 group text-left"
          title="Open 24 Color Combos"
        >
          <div className="flex -space-x-1.5 overflow-hidden p-0.5">
            {activeCombo.swatches.map((hex, idx) => (
              <span
                key={idx}
                className="inline-block w-4 h-4 rounded-full ring-2 ring-white dark:ring-slate-800 shadow-xs"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-bold leading-none block">{activeCombo.name}</span>
            <span className="text-[10px] opacity-60">Row {activeCombo.row}, Col {activeCombo.col} (Pinterest)</span>
          </div>
        </button>

        <div className="h-5 w-[1px] bg-black/10 dark:bg-white/10 mx-1" />

        {/* Next / Prev Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={setPrevCombo}
            aria-label="Previous palette"
            className="w-7 h-7 rounded-lg flex items-center justify-center border hover:bg-black/5 dark:hover:bg-white/10 theme-transition"
            style={{ borderColor: 'var(--border)' }}
            title="Previous Color Combo"
          >
            ←
          </button>
          <button
            type="button"
            onClick={setNextCombo}
            aria-label="Next palette"
            className="w-7 h-7 rounded-lg flex items-center justify-center border hover:bg-black/5 dark:hover:bg-white/10 theme-transition"
            style={{ borderColor: 'var(--border)' }}
            title="Next Color Combo"
          >
            →
          </button>
          <button
            type="button"
            onClick={() => setIsThemeModalOpen(true)}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs theme-transition"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-text)',
            }}
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden md:inline">24 Themes</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
