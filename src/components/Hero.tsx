import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { WheelBox, WheelText, WheelImage } from './WheelMotion';
import { Star, Calendar, ArrowRight, ShieldCheck, Heart, Palette } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const { activeCombo, setIsThemeModalOpen, setNextCombo } = useTheme();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Dynamic Aesthetic Backdrop Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[550px] h-[550px] rounded-full blur-3xl opacity-30 theme-transition"
        style={{ backgroundColor: 'var(--primary)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-28 w-[450px] h-[450px] rounded-full blur-3xl opacity-20 theme-transition"
        style={{ backgroundColor: 'var(--secondary)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Eyebrow Tag */}
            <WheelBox delay={0.1} direction="down">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-semibold shadow-xs theme-transition cursor-pointer hover:scale-105"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-main)',
                }}
                onClick={() => setIsThemeModalOpen(true)}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--primary)' }}
                />
                <span className="font-serif-luxury tracking-widest text-[11px] uppercase">
                  Haute Salon & Bridal Atelier
                </span>
                <span className="opacity-30">|</span>
                <span className="flex items-center gap-1 font-bold" style={{ color: 'var(--primary-dark)' }}>
                  <Palette className="w-3 h-3" />
                  {activeCombo.name}
                </span>
              </div>
            </WheelBox>

            {/* Main Headline with Luxury Serif */}
            <WheelText as="h1" delay={0.2} className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif-luxury tracking-tight leading-[1.12]">
              Experience Couture{' '}
              <span
                className="italic font-normal underline decoration-wavy decoration-2 transition-all"
                style={{
                  color: 'var(--primary-dark)',
                  textDecorationColor: 'var(--accent)',
                }}
              >
                Beauty & Bridal
              </span>{' '}
              Glow in Every Hue.
            </WheelText>

            {/* Subtitle / Value Proposition */}
            <WheelText as="p" delay={0.3} className="text-base sm:text-lg opacity-85 max-w-2xl leading-relaxed">
              Step into India’s most celebrated luxury aesthetic sanctuary. Specializing in royal HD bridal airbrush makeovers, Korean glass-skin hydra spas, organic hair botox, and customized palettes inspired by your unique radiance.
            </WheelText>

            {/* Active Pinterest Theme Bar Alert */}
            <WheelBox delay={0.35} direction="left">
              <div
                className="p-3.5 sm:p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs theme-transition"
                style={{
                  backgroundColor: 'var(--surface-alt)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1.5 p-1 rounded-lg bg-white/70 shadow-xs">
                    {activeCombo.swatches.map((hex, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 rounded-full border border-black/10"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <div>
                    <span className="text-xs font-bold block">
                      Active Theme: {activeCombo.name} (R{activeCombo.row}, C{activeCombo.col})
                    </span>
                    <span className="text-[11px] opacity-75">
                      Extracted from Pinterest color pin. Scroll wheel up/down for animated dynamics.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={setNextCombo}
                    className="flex-1 sm:flex-none text-xs font-semibold px-3 py-1.5 rounded-xl border hover:opacity-85 theme-transition"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
                  >
                    Next Hue →
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsThemeModalOpen(true)}
                    className="flex-1 sm:flex-none text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs hover:opacity-90 theme-transition"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-text)',
                    }}
                  >
                    All 24 Combos
                  </button>
                </div>
              </div>
            </WheelBox>

            {/* CTAs */}
            <WheelBox delay={0.4} direction="up">
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 theme-transition text-sm"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-text)',
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#services"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold border hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 theme-transition text-sm"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text-main)',
                  }}
                >
                  <span>Explore Menu & Pricing</span>
                </a>
              </div>
            </WheelBox>

            {/* Trust Badges */}
            <WheelBox delay={0.5} direction="up">
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black/10 dark:border-white/10">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.98 / 5.0</span>
                  </div>
                  <span className="text-xs opacity-75 block">12,500+ Happy Brides</span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cruelty-Free</span>
                  </div>
                  <span className="text-xs opacity-75 block">100% Organic Products</span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-rose-500 text-xs font-bold">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span>24 Palettes</span>
                  </div>
                  <span className="text-xs opacity-75 block">Customizable Ambience</span>
                </div>
              </div>
            </WheelBox>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <WheelBox delay={0.2} direction="scale">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Large Portrait */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 theme-transition relative aspect-[4/5]"
                  style={{
                    borderColor: 'var(--surface)',
                    backgroundColor: 'var(--surface-alt)',
                  }}
                >
                  <WheelImage
                    src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=900&auto=format&fit=crop&q=85"
                    alt="Bridal Haute Couture Makeover"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Image Overlay Badge */}
                  <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase font-bold opacity-80 block">
                        Signature Bridal Couture
                      </span>
                      <h4 className="text-lg font-bold font-serif-luxury leading-tight">
                        Maharani 18-Hour Airbrush Finish
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/30">
                      ₹14,999
                    </span>
                  </div>
                </div>

                {/* Floating Card 1: Pinterest Swatch Indicator */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md theme-transition"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-main)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-65 block">
                      Pinterest Inspiration
                    </span>
                    <span className="text-xs font-bold block" style={{ color: 'var(--primary-dark)' }}>
                      {activeCombo.name}
                    </span>
                  </div>
                </motion.div>

                {/* Floating Card 2: Glass Skin Rating */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md theme-transition"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-main)',
                  }}
                >
                  <div className="flex -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                      alt="Client"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                      alt="Client"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80"
                      alt="Client"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold block">100% Client Satisfaction</span>
                  </div>
                </motion.div>
              </div>
            </WheelBox>
          </div>
        </div>
      </div>
    </section>
  );
}
