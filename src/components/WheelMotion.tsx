import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { ArrowDown, ArrowUp, Compass } from 'lucide-react';

interface WheelBoxProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  id?: string;
  onClick?: () => void;
}

export function WheelBox({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  id,
  onClick,
}: WheelBoxProps) {
  const { scrollDirection } = useTheme();

  // Directional initial offsets
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 35, scale: 0.97 };
      case 'down':
        return { opacity: 0, y: -35, scale: 0.97 };
      case 'left':
        return { opacity: 0, x: 40, scale: 0.97 };
      case 'right':
        return { opacity: 0, x: -40, scale: 0.97 };
      case 'scale':
        return { opacity: 0, scale: 0.92 };
      default:
        return { opacity: 0, y: 30 };
    }
  };

  return (
    <motion.div
      id={id}
      onClick={onClick}
      className={className}
      initial={getInitial()}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.65,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      viewport={{ once: false, amount: 0.15 }}
      animate={{
        y: scrollDirection === 'down' ? -3 : scrollDirection === 'up' ? 3 : 0,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
    >
      {children}
    </motion.div>
  );
}

interface WheelTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  id?: string;
}

export function WheelText({
  children,
  className = '',
  as = 'p',
  delay = 0,
  id,
}: WheelTextProps) {
  const Component = motion[as];

  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      viewport={{ once: false, amount: 0.2 }}
    >
      {children}
    </Component>
  );
}

interface WheelImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  id?: string;
}

export function WheelImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  delay = 0,
  id,
}: WheelImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.03, 0.97]);

  return (
    <div ref={containerRef} id={id} className={`overflow-hidden relative ${className}`}>
      <motion.div
        style={{ y, scale }}
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8, delay, ease: 'easeOut' },
        }}
        viewport={{ once: false, amount: 0.15 }}
        className="w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
}

/**
 * Floating HUD indicating live wheel direction and reactive status
 */
export function ScrollWheelIndicator() {
  const { scrollDirection, wheelCount, activeCombo } = useTheme();

  return (
    <motion.aside
      aria-label="Scroll animation status"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md text-xs font-medium theme-transition"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        color: 'var(--text-main)',
      }}
    >
      <div
        className="w-2 h-2 rounded-full animate-ping"
        style={{ backgroundColor: 'var(--primary)' }}
      />
      <div className="flex items-center gap-1.5">
        <Compass className="w-3.5 h-3.5 text-amber-500" />
        <span>Wheel Motion:</span>
        <span className="font-semibold flex items-center gap-1">
          {scrollDirection === 'down' ? (
            <>
              <ArrowDown className="w-3.5 h-3.5 text-rose-500 animate-bounce" /> Scrolling Down
            </>
          ) : scrollDirection === 'up' ? (
            <>
              <ArrowUp className="w-3.5 h-3.5 text-emerald-500 animate-bounce" /> Scrolling Up
            </>
          ) : (
            <span className="text-slate-400">Active (Try Wheel)</span>
          )}
        </span>
      </div>
      <span
        className="px-2 py-0.5 rounded-full text-[10px] font-bold"
        style={{
          backgroundColor: 'var(--accent-light)',
          color: 'var(--primary-dark)',
        }}
      >
        Row {activeCombo.row}, Col {activeCombo.col}
      </span>
    </motion.aside>
  );
}
