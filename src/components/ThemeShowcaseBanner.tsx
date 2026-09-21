import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { PINTEREST_IMAGE_URL, ORIGINAL_PINTEREST_SRC } from '../types/theme';
import { WheelBox, WheelText } from './WheelMotion';
import { Palette, Check, ExternalLink, Shuffle, ArrowRight, Image as ImageIcon } from 'lucide-react';

export function ThemeShowcaseBanner() {
  const { activeCombo, allCombos, setActiveComboId, setRandomCombo, setIsThemeModalOpen } = useTheme();

  return (
    <section id="palette-showcase" className="py-16 lg:py-24 border-y theme-transition"
      style={{
        backgroundColor: 'var(--surface-alt)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <WheelBox delay={0.1} direction="down">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--primary-dark)',
              }}
            >
              <Palette className="w-3.5 h-3.5" />
              Pinterest Color Inspiration Matrix
            </span>
          </WheelBox>

          <WheelText as="h2" delay={0.2} className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight">
            24 Bespoke Color Combos from Pinterest
          </WheelText>

          <WheelText as="p" delay={0.3} className="text-sm sm:text-base opacity-80 leading-relaxed">
            Neeche di gayi image ke sabhi 24 colour combinations live hain! Kisi bhi palette par touch karein aur poori beauty parlor website usi elegant colour scheme mein transform ho jayegi.
          </WheelText>
        </div>

        {/* Pinterest Image + Interactive Palette Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Pinterest Image Reference Card */}
          <div className="lg:col-span-4">
            <WheelBox delay={0.2} direction="left" className="h-full">
              <div
                className="p-5 rounded-3xl border shadow-lg space-y-4 h-full flex flex-col justify-between theme-transition"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-rose-500" />
                      Original Pinterest Pin
                    </h3>
                    <a
                      href={ORIGINAL_PINTEREST_SRC}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs flex items-center gap-1 opacity-75 hover:opacity-100 underline"
                    >
                      Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border shadow-inner max-h-80 flex items-center justify-center bg-black/5 group">
                    <img
                      src={PINTEREST_IMAGE_URL}
                      alt="Pinterest Color Palette Reference"
                      className="object-contain max-h-80 w-auto rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                      <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
                        6 Rows × 4 Columns
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-black/10 dark:border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="opacity-70">Currently Applied:</span>
                    <span className="font-bold" style={{ color: 'var(--primary-dark)' }}>
                      {activeCombo.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={setRandomCombo}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold hover:bg-black/5 theme-transition"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      Surprise Combo
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsThemeModalOpen(true)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold shadow-sm hover:opacity-90 theme-transition"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-text)',
                      }}
                    >
                      Full Studio <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </WheelBox>
          </div>

          {/* Interactive 24-Palette Grid (Matching the Pin's 6 Rows x 4 Cols) */}
          <div className="lg:col-span-8">
            <WheelBox delay={0.3} direction="right">
              <div
                className="p-5 sm:p-6 rounded-3xl border shadow-lg space-y-4 theme-transition"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div>
                    <h3 className="font-bold text-base font-serif-luxury">
                      Interactive Swatch Grid (Touch 1-by-1 to Switch)
                    </h3>
                    <p className="text-xs opacity-70">
                      Arranged exactly as pictured in the Pinterest moodboard.
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: 'var(--surface-alt)', color: 'var(--text-muted)' }}
                  >
                    24 Color Sets Available
                  </span>
                </div>

                {/* 4-Column Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {allCombos.map((combo) => {
                    const isSelected = activeCombo.id === combo.id;
                    return (
                      <motion.button
                        key={combo.id}
                        type="button"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveComboId(combo.id)}
                        className={`p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isSelected ? 'ring-2 shadow-md' : 'hover:shadow-xs'
                        }`}
                        style={{
                          backgroundColor: isSelected ? 'var(--surface-alt)' : 'var(--surface)',
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                          // @ts-ignore
                          '--tw-ring-color': 'var(--primary)',
                        }}
                      >
                        {/* Dual swatch pill */}
                        <div className="h-8 w-full rounded-xl overflow-hidden flex border border-black/10 shadow-xs mb-2">
                          {combo.swatches.map((hex, i) => (
                            <div
                              key={i}
                              className="flex-1 h-full"
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[9px] uppercase font-bold tracking-wider opacity-60">
                              R{combo.row} · C{combo.col}
                            </span>
                            {isSelected && (
                              <Check className="w-3 h-3 stroke-[3]" style={{ color: 'var(--primary)' }} />
                            )}
                          </div>
                          <h4 className="text-xs font-bold leading-tight line-clamp-1">
                            {combo.name}
                          </h4>
                          {combo.hindiName && (
                            <span className="text-[10px] opacity-65 block truncate">
                              {combo.hindiName}
                            </span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </WheelBox>
          </div>
        </div>
      </div>
    </section>
  );
}
