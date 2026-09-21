import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ColorCombo, COLOR_COMBOS } from '../types/theme';

interface ThemeContextType {
  activeCombo: ColorCombo;
  allCombos: ColorCombo[];
  setActiveComboId: (id: string) => void;
  setNextCombo: () => void;
  setPrevCombo: () => void;
  setRandomCombo: () => void;
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  scrollDirection: 'up' | 'down' | 'idle';
  wheelCount: number;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeCombo, setActiveCombo] = useState<ColorCombo>(() => {
    const saved = localStorage.getItem('elysian_palette_id');
    const found = COLOR_COMBOS.find((c) => c.id === saved);
    return found || COLOR_COMBOS[0];
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'idle'>('idle');
  const [wheelCount, setWheelCount] = useState(0);

  // Apply colors to root CSS variables
  const applyThemeColors = useCallback((combo: ColorCombo) => {
    const root = document.documentElement;
    const { colors } = combo;

    root.style.setProperty('--bg', colors.bg);
    root.style.setProperty('--surface', colors.surface);
    root.style.setProperty('--surface-alt', colors.surfaceAlt);
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-dark', colors.primaryDark);
    root.style.setProperty('--primary-text', colors.primaryText);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--secondary-text', colors.secondaryText);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-light', colors.accentLight);
    root.style.setProperty('--text-main', colors.textMain);
    root.style.setProperty('--text-muted', colors.textMuted);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--border-strong', colors.borderStrong);
    root.style.setProperty('--ring', colors.ring);

    localStorage.setItem('elysian_palette_id', combo.id);
  }, []);

  useEffect(() => {
    applyThemeColors(activeCombo);
  }, [activeCombo, applyThemeColors]);

  // Handle setting combo by ID
  const setActiveComboId = useCallback((id: string) => {
    const found = COLOR_COMBOS.find((c) => c.id === id);
    if (found) {
      setActiveCombo(found);
      setToastMessage(`Theme Applied: ${found.name} (Row ${found.row}, Col ${found.col})`);
      setTimeout(() => setToastMessage(null), 3200);
    }
  }, []);

  const setNextCombo = useCallback(() => {
    const currentIndex = COLOR_COMBOS.findIndex((c) => c.id === activeCombo.id);
    const nextIndex = (currentIndex + 1) % COLOR_COMBOS.length;
    setActiveComboId(COLOR_COMBOS[nextIndex].id);
  }, [activeCombo.id, setActiveComboId]);

  const setPrevCombo = useCallback(() => {
    const currentIndex = COLOR_COMBOS.findIndex((c) => c.id === activeCombo.id);
    const prevIndex = (currentIndex - 1 + COLOR_COMBOS.length) % COLOR_COMBOS.length;
    setActiveComboId(COLOR_COMBOS[prevIndex].id);
  }, [activeCombo.id, setActiveComboId]);

  const setRandomCombo = useCallback(() => {
    const available = COLOR_COMBOS.filter((c) => c.id !== activeCombo.id);
    const randomItem = available[Math.floor(Math.random() * available.length)];
    setActiveComboId(randomItem.id);
  }, [activeCombo.id, setActiveComboId]);

  // Wheel up/down active listener across the window
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      const dir = e.deltaY > 0 ? 'down' : 'up';
      setScrollDirection(dir);
      setWheelCount((prev) => prev + 1);

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setScrollDirection('idle');
      }, 500);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        activeCombo,
        allCombos: COLOR_COMBOS,
        setActiveComboId,
        setNextCombo,
        setPrevCombo,
        setRandomCombo,
        isThemeModalOpen,
        setIsThemeModalOpen,
        toastMessage,
        scrollDirection,
        wheelCount,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
