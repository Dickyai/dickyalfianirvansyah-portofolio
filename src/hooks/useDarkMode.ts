import { useEffect, useState } from 'react';

/**
 * Mengelola state dark/light mode dan sinkronisasi class `.dark`
 * ke <html> (dibaca oleh @variant dark di globals.css).
 * The initial theme is dark unless a caller overrides it.
 */
export function useDarkMode(defaultDark = true) {
  const [isDarkMode, setIsDarkMode] = useState(defaultDark);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return { isDarkMode, toggleTheme };
}
