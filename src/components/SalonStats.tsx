import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { WheelBox, WheelText } from './WheelMotion';
import { Users, Activity, Award, Heart, ShieldCheck, Clock, Palette } from 'lucide-react';

export function SalonStats() {
  const { activeCombo, wheelCount, scrollDirection } = useTheme();

  const stats = [
    {
      id: 'stat-1',
      icon: Users,
      value: '12,500+',
      label: 'Brides & Clients Styled',
      sublabel: 'Across Mumbai & Delhi suites',
    },
    {
      id: 'stat-2',
      icon: Palette,
      value: '24',
      label: 'Pinterest Aesthetic Palettes',
      sublabel: `Active: ${activeCombo.name}`,
    },
    {
      id: 'stat-3',
      icon: Award,
      value: '18+',
      label: 'Master Cosmetologists',
      sublabel: 'Vidal Sassoon & Kryolan certified',
    },
    {
      id: 'stat-4',
      icon: Heart,
      value: '99.4%',
      label: 'Client Recommendation Rate',
      sublabel: 'Based on 4,800+ reviews',
    },
  ];

  return (
    <section className="py-12 border-y theme-transition"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Live Status Bar */}
        <WheelBox delay={0.1} direction="down">
          <div
            className="p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs theme-transition"
            style={{
              backgroundColor: 'var(--surface-alt)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--primary)' }} />
                <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: 'var(--primary-dark)' }} />
              </span>
              <span className="font-semibold">
                Salon Live Dashboard: <span className="font-normal opacity-80">Both Parlor Suites Open Today</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] opacity-80">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Avg Wait Time: 0 mins (Priority Booking)
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Medical-Grade Autoclave Sterilization
              </span>
              <span className="flex items-center gap-1 font-semibold" style={{ color: 'var(--primary-dark)' }}>
                <Activity className="w-3.5 h-3.5" />
                Wheel Motions Detected: {wheelCount}
              </span>
            </div>
          </div>
        </WheelBox>

        {/* 4 Hero Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <WheelBox
                key={stat.id}
                delay={0.15 + idx * 0.1}
                direction="up"
                className="h-full"
              >
                <div
                  className="p-5 sm:p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group theme-transition"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury tracking-tight"
                      style={{ color: 'var(--text-main)' }}
                    >
                      {stat.value}
                    </span>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: 'var(--surface-alt)',
                        color: 'var(--primary-dark)',
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-tight">
                      {stat.label}
                    </h4>
                    <span className="text-[11px] opacity-65 block mt-0.5">
                      {stat.sublabel}
                    </span>
                  </div>
                </div>
              </WheelBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}
