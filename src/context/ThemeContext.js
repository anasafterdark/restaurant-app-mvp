import React, { createContext, useContext, useMemo, useState } from 'react';
import { palettes } from '../theme/palettes';
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((value) => !value);
  const value = useMemo(() => ({ isDark, toggleTheme, colors: isDark ? palettes.dark : palettes.light }), [isDark]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider.');
  return value;
}
