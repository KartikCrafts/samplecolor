import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SalonStats } from './components/SalonStats';
import { ThemeShowcaseBanner } from './components/ThemeShowcaseBanner';
import { ServicesSection } from './components/ServicesSection';
import { LookbookGallery } from './components/LookbookGallery';
import { PricingCalculator } from './components/PricingCalculator';
import { StylistsSection } from './components/StylistsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { ThemeSelectorModal, FloatingThemeDock } from './components/ThemeSelectorModal';
import { ScrollWheelIndicator } from './components/WheelMotion';
import { BookingModal } from './components/BookingModal';
import { ServiceItem, Stylist } from './types/parlor';

function ParlorAppContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [customPackageData, setCustomPackageData] = useState<{
    services: ServiceItem[];
    totalAmount: number;
  } | null>(null);

  const handleOpenBooking = (serviceId?: string) => {
    setCustomPackageData(null);
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookService = (service: ServiceItem) => {
    setCustomPackageData(null);
    setSelectedServiceId(service.id);
    setIsBookingOpen(true);
  };

  const handleBookStylist = (stylist: Stylist) => {
    setCustomPackageData(null);
    setIsBookingOpen(true);
  };

  const handleBookCustomPackage = (selectedServices: ServiceItem[], totalAmount: number) => {
    setCustomPackageData({
      services: selectedServices,
      totalAmount,
    });
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Navigation Header */}
      <Header onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        {/* Hero Presentation */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Salon Metrics Dashboard (Reacting to mouse wheel up/down) */}
        <SalonStats />

        {/* Dedicated 24 Pinterest Color Combos Matrix */}
        <ThemeShowcaseBanner />

        {/* Treatment & Rituals Menu */}
        <ServicesSection onBookService={handleBookService} />

        {/* Transformation Lookbook */}
        <LookbookGallery />

        {/* Custom Bundle & Pricing Calculator */}
        <PricingCalculator onBookCustomPackage={handleBookCustomPackage} />

        {/* Master Stylists & Cosmetologists */}
        <StylistsSection onBookStylist={handleBookStylist} />

        {/* Verified Client Reviews */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Theme Switcher Dock on Bottom Right */}
      <FloatingThemeDock />

      {/* Live Scroll & Mouse Wheel Direction Indicator HUD */}
      <ScrollWheelIndicator />

      {/* Pinterest Color Studio Modal */}
      <ThemeSelectorModal />

      {/* Online Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={selectedServiceId}
        customPackageData={customPackageData}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ParlorAppContent />
    </ThemeProvider>
  );
}
