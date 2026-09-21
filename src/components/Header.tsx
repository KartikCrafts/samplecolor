import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { Crown, Palette, Calendar, Phone, Menu, X, Clock, MapPin } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const { activeCombo, setIsThemeModalOpen, toastMessage } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Palettes', href: '#palette-showcase' },
    { label: 'Couture', href: '#couture' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Packages', href: '#pricing' },
    { label: 'Artisans', href: '#stylists' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b theme-transition"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Toast Notification for Color Switch */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 rounded-full border shadow-lg flex items-center gap-2 text-xs font-semibold backdrop-blur-md"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--primary)',
              color: 'var(--text-main)',
            }}
          >
            <div className="flex -space-x-1">
              {activeCombo.swatches.map((hex, idx) => (
                <span
                  key={idx}
                  className="w-3 h-3 rounded-full border border-white"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top micro bar with salon timings & phone - slim & simple margins */}
      <div
        className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-1 text-[11px] font-medium border-b opacity-85"
        style={{
          backgroundColor: 'var(--surface-alt)',
          borderColor: 'var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" />
            Mon - Sun: 09:30 AM – 09:00 PM (Bridal Suites 24/7 on request)
          </span>
          <span className="flex items-center gap-1 opacity-80">
            <MapPin className="w-3 h-3 text-rose-500" />
            Bandra West, Mumbai & New Delhi
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Palette className="w-3 h-3 text-amber-500" />
            24 Pinterest Color Themes
          </span>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1 font-semibold hover:underline"
            style={{ color: 'var(--primary-dark)' }}
          >
            <Phone className="w-3 h-3" />
            +91 98765 43210
          </a>
        </div>
      </div>

      {/* Main Navbar - Compact Size (h-14) with Simple Clean Margins */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 sm:h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-xs border theme-transition group-hover:scale-105"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-text)',
              borderColor: 'var(--border)',
            }}
          >
            <Crown className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold font-serif-luxury tracking-widest block leading-none"
              style={{ color: 'var(--text-main)' }}
            >
              ELYSIAN
            </span>
            <span className="text-[9px] tracking-wider uppercase font-semibold opacity-65 hidden sm:block mt-0.5"
              style={{ color: 'var(--text-muted)' }}
            >
              Haute Beauty & Bridal Salon
            </span>
          </div>
        </a>

        {/* Desktop Nav Links - Short, Concise, Simple Margins */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-wide hover:opacity-100 opacity-75 transition-opacity px-1 py-1"
              style={{ color: 'var(--text-main)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions - Compact */}
        <div className="flex items-center gap-2">
          {/* Quick Palette Button */}
          <button
            type="button"
            onClick={() => setIsThemeModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold shadow-xs hover:opacity-90 theme-transition"
            style={{
              backgroundColor: 'var(--surface-alt)',
              borderColor: 'var(--border)',
              color: 'var(--text-main)',
            }}
            title="Choose from 24 Pinterest Color Combos"
          >
            <div className="flex -space-x-1">
              {activeCombo.swatches.map((hex, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-white"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
            <span className="hidden sm:inline text-[11px]">Theme</span>
            <Palette className="w-3 h-3" style={{ color: 'var(--primary)' }} />
          </button>

          {/* Booking CTA Button */}
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs hover:opacity-95 hover:shadow-sm theme-transition active:scale-95"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-text)',
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg border hover:bg-black/5 theme-transition"
            style={{ borderColor: 'var(--border)' }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t overflow-hidden px-5 py-4 space-y-3"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold py-1.5 border-b border-black/5 flex items-center justify-between"
                  style={{ color: 'var(--text-main)' }}
                >
                  <span>{link.label}</span>
                  <span className="opacity-40 text-[10px]">→</span>
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsThemeModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border font-semibold text-xs"
                style={{
                  backgroundColor: 'var(--surface-alt)',
                  borderColor: 'var(--border)',
                }}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>24-Color Studio</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl font-semibold text-xs shadow-xs"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-text)',
                }}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
