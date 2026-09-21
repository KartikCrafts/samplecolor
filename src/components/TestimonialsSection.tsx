import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { REVIEWS } from '../types/parlor';
import { WheelBox, WheelText } from './WheelMotion';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';

export function TestimonialsSection() {
  const { activeCombo } = useTheme();

  return (
    <section id="reviews" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <WheelBox delay={0.1} direction="down">
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs"
              style={{
                backgroundColor: 'var(--surface-alt)',
                borderColor: 'var(--border)',
                color: 'var(--primary-dark)',
              }}
            >
              <Heart className="w-3.5 h-3.5" />
              Verified Client Stories
            </span>
          </WheelBox>

          <WheelText as="h2" delay={0.2} className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight">
            Loved by Brides & Beauty Connoisseurs
          </WheelText>

          <WheelText as="p" delay={0.3} className="text-sm sm:text-base opacity-80 leading-relaxed">
            Read how our customized treatments, serene ambience, and couture attention to detail create unforgettable transformations.
          </WheelText>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, index) => (
            <WheelBox
              key={review.id}
              delay={0.1 + index * 0.1}
              direction="up"
              className="h-full"
            >
              <div
                className="h-full p-6 rounded-3xl border shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between space-y-4 relative theme-transition"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 opacity-20" style={{ color: 'var(--primary)' }} />
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed opacity-85 italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover border-2"
                    style={{ borderColor: 'var(--primary)' }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold truncate">{review.author}</span>
                      {review.verified && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] opacity-60 block truncate">
                      {review.city} · {review.service}
                    </span>
                  </div>
                </div>
              </div>
            </WheelBox>
          ))}
        </div>
      </div>
    </section>
  );
}
