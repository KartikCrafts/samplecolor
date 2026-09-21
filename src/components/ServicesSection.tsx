import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { PARLOR_SERVICES, ServiceItem } from '../types/parlor';
import { WheelBox, WheelText, WheelImage } from './WheelMotion';
import { Flower2, Clock, CheckCircle2, Calendar, ArrowRight, Filter } from 'lucide-react';

interface ServicesSectionProps {
  onBookService: (service: ServiceItem) => void;
}

export function ServicesSection({ onBookService }: ServicesSectionProps) {
  const { activeCombo } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'skin', label: 'Skin & Facials' },
    { id: 'bridal', label: 'Bridal Makeovers' },
    { id: 'hair', label: 'Hair Studio' },
    { id: 'nails', label: 'Nails & Art' },
    { id: 'spa', label: 'Body Spa & Scrub' },
    { id: 'lashes', label: 'Lashes & Brow' },
  ];

  const filteredServices = activeCategory === 'all'
    ? PARLOR_SERVICES
    : PARLOR_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-16 lg:py-24 relative">
      <div id="couture" className="absolute -top-16 pointer-events-none" />
      <div id="bridal" className="absolute -top-16 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <WheelBox delay={0.1} direction="left">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs"
                style={{
                  backgroundColor: 'var(--surface-alt)',
                  borderColor: 'var(--border)',
                  color: 'var(--primary-dark)',
                }}
              >
                <Flower2 className="w-3.5 h-3.5" />
                Curated Luxury Menu
              </span>
            </WheelBox>

            <WheelText as="h2" delay={0.2} className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight">
              Signature Parlor Treatments & Spa Rituals
            </WheelText>

            <WheelText as="p" delay={0.3} className="text-sm sm:text-base opacity-80 leading-relaxed">
              Every procedure is customized with dermatologist-approved active peptides, pure organic botanicals, and high-frequency wellness technology.
            </WheelText>
          </div>

          {/* Quick Stats Pill */}
          <WheelBox delay={0.3} direction="right">
            <div
              className="p-4 rounded-2xl border shadow-sm flex items-center gap-4 theme-transition"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--primary-dark)' }}
              >
                10+
              </div>
              <div>
                <span className="text-xs font-bold block">Artisan Rituals</span>
                <span className="text-[11px] opacity-70">Starting at ₹1,699 only</span>
              </div>
            </div>
          </WheelBox>
        </div>

        {/* Category Pills Bar */}
        <WheelBox delay={0.2} direction="down">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-md shadow-xs"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
                    style={{
                      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                      color: isActive ? 'var(--primary-text)' : 'var(--text-main)',
                      boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </WheelBox>

        {/* Services Grid with Wheel Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => (
            <WheelBox
              key={service.id}
              id={`service-card-${service.id}`}
              delay={0.1 + (index % 3) * 0.1}
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
                  {/* Image Header with Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <WheelImage
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {service.badge && (
                      <span
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold shadow-md uppercase tracking-wider backdrop-blur-md"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: 'var(--primary-text)',
                        }}
                      >
                        {service.badge}
                      </span>
                    )}

                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-medium bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-md">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {service.durationMinutes} mins session
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <span className="text-[11px] uppercase font-bold tracking-wider opacity-65 block"
                        style={{ color: 'var(--accent)' }}
                      >
                        {service.categoryLabel}
                      </span>
                      <h3 className="text-xl font-bold font-serif-luxury tracking-tight mt-1 group-hover:text-primary-dark transition-colors">
                        {service.name}
                      </h3>
                      {service.hindiName && (
                        <p className="text-xs opacity-70 mt-0.5">{service.hindiName}</p>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm opacity-80 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Includes Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                      <span className="text-[11px] font-bold opacity-60 uppercase tracking-wider block">
                        Included in Ritual:
                      </span>
                      {service.includes.slice(0, 3).map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs opacity-85">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Pricing & Booking CTA */}
                <div
                  className="p-5 sm:p-6 pt-0 border-t flex items-center justify-between gap-3 mt-4"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold font-serif-luxury" style={{ color: 'var(--text-main)' }}>
                        ₹{service.price.toLocaleString('en-IN')}
                      </span>
                      {service.originalPrice && (
                        <span className="text-xs line-through opacity-50">
                          ₹{service.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] opacity-60 block">All Taxes Included</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookService(service)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-xs hover:shadow-md hover:scale-105 active:scale-95 theme-transition"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-text)',
                    }}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Now</span>
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
