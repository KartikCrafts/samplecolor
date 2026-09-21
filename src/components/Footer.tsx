import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { WheelBox, WheelText } from './WheelMotion';
import { Crown, MapPin, Phone, Mail, Clock, Heart, Palette, Instagram, Send, ShieldCheck } from 'lucide-react';

export function Footer() {
  const { activeCombo, allCombos, setActiveComboId, setIsThemeModalOpen } = useTheme();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSent(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSent(false), 4000);
  };

  return (
    <footer
      className="border-t pt-16 pb-24 lg:pb-16 theme-transition relative"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        color: 'var(--text-main)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <WheelBox delay={0.1} direction="down">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-2xl font-bold font-serif-luxury tracking-widest block leading-none">
                    ELYSIAN
                  </span>
                  <span className="text-[10px] tracking-wider uppercase font-semibold opacity-70 block mt-1">
                    Haute Beauty & Bridal Salon
                  </span>
                </div>
              </div>
            </WheelBox>

            <WheelText as="p" delay={0.2} className="text-xs sm:text-sm opacity-75 leading-relaxed">
              India's premier luxury beauty destination combining clinical aesthetic innovation with holistic spa therapies. Designed with customizable aesthetic palettes from Pinterest inspiration.
            </WheelText>

            <WheelBox delay={0.3} direction="up">
              <div
                className="p-3.5 rounded-2xl border text-xs space-y-1.5"
                style={{ backgroundColor: 'var(--surface-alt)', borderColor: 'var(--border)' }}
              >
                <span className="font-bold flex items-center gap-1.5 text-xs">
                  <Palette className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                  Current Theme: {activeCombo.name}
                </span>
                <p className="text-[11px] opacity-70">
                  Row {activeCombo.row}, Col {activeCombo.col} on reference Pinterest moodboard.
                </p>
                <button
                  type="button"
                  onClick={() => setIsThemeModalOpen(true)}
                  className="text-xs font-semibold underline opacity-90 hover:opacity-100 block"
                  style={{ color: 'var(--primary-dark)' }}
                >
                  Browse all 24 Color Combos →
                </button>
              </div>
            </WheelBox>
          </div>

          {/* Locations & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <WheelBox delay={0.2} direction="up">
              <h4 className="text-sm font-bold uppercase tracking-wider opacity-85 font-serif-luxury">
                Sanctuary Locations
              </h4>
            </WheelBox>

            <div className="space-y-2.5 text-xs opacity-80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold block">Bandra Luxury Atelier</span>
                  <span>42, Waterfield Road, Bandra West, Mumbai 400050</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold block">Diplomatic Enclave Atelier</span>
                  <span>14, Shantipath, Chanakyapuri, New Delhi 110021</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                <Clock className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold block">Operating Timings</span>
                  <span>Mon – Sun: 9:30 AM – 9:00 PM</span>
                  <span className="block text-[11px] opacity-70">Bridal Dressing: 24/7 on reservation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Color Switcher Links */}
          <div className="lg:col-span-2 space-y-3">
            <WheelBox delay={0.3} direction="up">
              <h4 className="text-sm font-bold uppercase tracking-wider opacity-85 font-serif-luxury">
                Popular Themes
              </h4>
            </WheelBox>

            <div className="flex flex-col gap-1.5 text-xs">
              {allCombos.slice(0, 6).map((combo) => (
                <button
                  key={combo.id}
                  type="button"
                  onClick={() => setActiveComboId(combo.id)}
                  className="flex items-center gap-2 py-1 text-left opacity-75 hover:opacity-100 hover:translate-x-1 transition-all"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: combo.swatches[0] }}
                  />
                  <span className="truncate">{combo.name}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsThemeModalOpen(true)}
                className="text-xs font-semibold pt-1 underline text-left"
                style={{ color: 'var(--primary-dark)' }}
              >
                + See All 24 Combos
              </button>
            </div>
          </div>

          {/* Newsletter & Bridal VIP Concierge */}
          <div className="lg:col-span-3 space-y-3">
            <WheelBox delay={0.4} direction="up">
              <h4 className="text-sm font-bold uppercase tracking-wider opacity-85 font-serif-luxury">
                Bridal VIP Updates
              </h4>
            </WheelBox>

            <p className="text-xs opacity-75">
              Receive bespoke bridal beauty guides, seasonal skin consultations, and exclusive VIP slot alerts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: 'var(--surface-alt)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-main)',
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-lg flex items-center justify-center text-white shadow-xs hover:opacity-90"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
              {newsletterSent && (
                <p className="text-xs text-emerald-600 font-semibold">
                  Thank you! We have sent a complimentary consultation pass to your email.
                </p>
              )}
            </form>

            <div className="pt-2 flex items-center gap-3 text-xs opacity-70">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Safe & Private
              </span>
              <span>·</span>
              <span>No spam guarantee</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-70"
          style={{ borderColor: 'var(--border)' }}
        >
          <p>© {new Date().getFullYear()} Elysian Haute Beauty & Bridal Parlor. All Rights Reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Crafted with <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> & Pinterest Color Palette Inspiration
          </p>
        </div>
      </div>
    </footer>
  );
}
