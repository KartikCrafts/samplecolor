import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { PARLOR_SERVICES, ServiceItem } from '../types/parlor';
import { WheelBox, WheelText } from './WheelMotion';
import { Calculator, Check, Percent, Calendar, Plus, ShieldCheck } from 'lucide-react';

interface PricingCalculatorProps {
  onBookCustomPackage: (selectedServices: ServiceItem[], totalAmount: number) => void;
}

export function PricingCalculator({ onBookCustomPackage }: PricingCalculatorProps) {
  const { activeCombo } = useTheme();
  const [selectedIds, setSelectedIds] = useState<string[]>(['srv-1', 'srv-7']);

  const toggleService = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedServices = PARLOR_SERVICES.filter((s) => selectedIds.includes(s.id));
  const rawTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);

  // Discount rule
  let discountPercentage = 0;
  if (selectedServices.length === 2) discountPercentage = 10;
  else if (selectedServices.length === 3) discountPercentage = 15;
  else if (selectedServices.length >= 4) discountPercentage = 20;

  const discountAmount = Math.round((rawTotal * discountPercentage) / 100);
  const finalTotal = rawTotal - discountAmount;
  const totalMinutes = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  return (
    <section id="pricing" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <WheelBox delay={0.1} direction="down">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs"
              style={{
                backgroundColor: 'var(--surface-alt)',
                borderColor: 'var(--border)',
                color: 'var(--primary-dark)',
              }}
            >
              <Calculator className="w-3.5 h-3.5" />
              Interactive Parlor Bundle Builder
            </span>
          </WheelBox>

          <WheelText as="h2" delay={0.2} className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight">
            Build Your Bespoke Parlor Package
          </WheelText>

          <WheelText as="p" delay={0.3} className="text-sm sm:text-base opacity-80 leading-relaxed">
            Select 2 or more treatments to unlock tiered bundle savings up to 20% OFF. Perfect for pre-wedding glow, parties, and full-body revitalizing retreats.
          </WheelText>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services Checklist */}
          <div className="lg:col-span-8 space-y-3">
            <WheelBox delay={0.2} direction="left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PARLOR_SERVICES.map((srv) => {
                  const isChecked = selectedIds.includes(srv.id);
                  return (
                    <motion.div
                      key={srv.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => toggleService(srv.id)}
                      className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between gap-3 transition-all ${
                        isChecked ? 'ring-2 shadow-md' : 'hover:shadow-xs'
                      }`}
                      style={{
                        backgroundColor: isChecked ? 'var(--surface)' : 'var(--surface)',
                        borderColor: isChecked ? 'var(--primary)' : 'var(--border)',
                        // @ts-ignore
                        '--tw-ring-color': 'var(--primary)',
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors flex-shrink-0`}
                          style={{
                            backgroundColor: isChecked ? 'var(--primary)' : 'transparent',
                            borderColor: isChecked ? 'var(--primary)' : 'var(--border-strong)',
                            color: isChecked ? 'var(--primary-text)' : 'transparent',
                          }}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold truncate leading-tight">
                            {srv.name}
                          </h4>
                          <span className="text-[11px] opacity-60 block mt-0.5">
                            {srv.categoryLabel} · {srv.durationMinutes} mins
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs sm:text-sm font-bold font-serif-luxury block">
                          ₹{srv.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </WheelBox>
          </div>

          {/* Real-time Order Summary Card */}
          <div className="lg:col-span-4 sticky top-28">
            <WheelBox delay={0.3} direction="right">
              <div
                className="p-6 rounded-3xl border shadow-xl space-y-6 theme-transition"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <h3 className="font-bold text-lg font-serif-luxury">Package Summary</h3>
                    <span className="text-xs opacity-70">
                      {selectedServices.length} treatment{selectedServices.length > 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <span
                    className="p-2 rounded-xl text-xs font-bold flex items-center gap-1"
                    style={{ backgroundColor: 'var(--accent-light)', color: 'var(--primary-dark)' }}
                  >
                    <Percent className="w-3.5 h-3.5" />
                    {discountPercentage}% OFF
                  </span>
                </div>

                {/* Selected List */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedServices.length === 0 ? (
                    <p className="text-xs opacity-60 text-center py-4">
                      Please select at least one treatment to build your custom package.
                    </p>
                  ) : (
                    selectedServices.map((s) => (
                      <div key={s.id} className="flex items-center justify-between text-xs py-1 border-b border-black/5 dark:border-white/5">
                        <span className="truncate pr-2 font-medium">{s.name}</span>
                        <span className="font-bold whitespace-nowrap">₹{s.price.toLocaleString('en-IN')}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Savings Tier Info */}
                <div
                  className="p-3 rounded-xl border text-[11px] space-y-1"
                  style={{ backgroundColor: 'var(--surface-alt)', borderColor: 'var(--border)' }}
                >
                  <div className="flex justify-between font-semibold">
                    <span>Bundle Discount Tiers:</span>
                    <span style={{ color: 'var(--primary-dark)' }}>
                      {selectedServices.length >= 4
                        ? 'Max 20% Unlocked!'
                        : selectedServices.length === 3
                        ? 'Add 1 more for 20%'
                        : 'Select 2 for 10%'}
                    </span>
                  </div>
                  <p className="opacity-70">
                    2 services = 10% off · 3 services = 15% off · 4+ services = 20% off
                  </p>
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex justify-between text-xs opacity-75">
                    <span>Base Value:</span>
                    <span>₹{rawTotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-xs font-semibold text-emerald-600">
                      <span>Bundle Savings ({discountPercentage}%):</span>
                      <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs opacity-75">
                    <span>Total Session Time:</span>
                    <span>Approx. {totalMinutes} mins (~{(totalMinutes / 60).toFixed(1)} hrs)</span>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                    <span className="text-sm font-bold">Payable Total:</span>
                    <span className="text-2xl font-bold font-serif-luxury" style={{ color: 'var(--text-main)' }}>
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  disabled={selectedServices.length === 0}
                  onClick={() => onBookCustomPackage(selectedServices, finalTotal)}
                  className="w-full py-3.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-text)',
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm & Book Custom Package</span>
                </button>
              </div>
            </WheelBox>
          </div>
        </div>
      </div>
    </section>
  );
}
