import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { STYLISTS, Stylist } from '../types/parlor';
import { WheelBox, WheelText, WheelImage } from './WheelMotion';
import { Star, Award, Calendar, Instagram } from 'lucide-react';

interface StylistsSectionProps {
  onBookStylist: (stylist: Stylist) => void;
}

export function StylistsSection({ onBookStylist }: StylistsSectionProps) {
  const { activeCombo } = useTheme();

  return (
    <section id="stylists" className="py-16 lg:py-24 border-y theme-transition"
      style={{
        backgroundColor: 'var(--surface-alt)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <WheelBox delay={0.1} direction="down">
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--primary-dark)',
              }}
            >
              <Award className="w-3.5 h-3.5" />
              Master Artisans & Cosmetologists
            </span>
          </WheelBox>

          <WheelText as="h2" delay={0.2} className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight">
            Meet the Celebrity Beauty Directors
          </WheelText>

          <WheelText as="p" delay={0.3} className="text-sm sm:text-base opacity-80 leading-relaxed">
            International master certifications from Vidal Sassoon, Kryolan Berlin, and Korean Dermal Academies.
          </WheelText>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STYLISTS.map((stylist, index) => (
            <WheelBox
              key={stylist.id}
              delay={0.1 + index * 0.1}
              direction="up"
              className="h-full"
            >
              <div
                className="h-full rounded-3xl border overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between group theme-transition"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <div>
                  <div className="relative aspect-square overflow-hidden">
                    <WheelImage
                      src={stylist.image}
                      alt={stylist.name}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-md font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {stylist.rating} ({stylist.reviewsCount})
                      </span>
                      <span className="opacity-90 font-medium">{stylist.experienceYears}+ yrs exp</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold font-serif-luxury leading-tight group-hover:text-primary-dark transition-colors">
                        {stylist.name}
                      </h3>
                      <span
                        className="text-xs font-semibold block mt-0.5"
                        style={{ color: 'var(--primary-dark)' }}
                      >
                        {stylist.role}
                      </span>
                    </div>

                    <p className="text-xs opacity-75 leading-relaxed line-clamp-3">
                      {stylist.bio}
                    </p>

                    <div className="pt-2 border-t border-black/5 dark:border-white/5">
                      <span className="text-[10px] uppercase font-bold opacity-60 block">
                        Specialty:
                      </span>
                      <span className="text-xs font-medium opacity-90 block truncate">
                        {stylist.specialty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t flex items-center justify-between gap-2 mt-2" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-xs opacity-60">{stylist.instagram}</span>
                  <button
                    type="button"
                    onClick={() => onBookStylist(stylist)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs hover:scale-105 active:scale-95 theme-transition flex items-center gap-1"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-text)',
                    }}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Book Seat</span>
                  </button>
                </div>
              </div>
            </WheelBox>
          ))}
        </div>
      </div>
    </section>
  );
}
