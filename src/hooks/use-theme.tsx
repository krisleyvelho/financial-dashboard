'use client';

import { useEffect, useState } from 'react';

export function getThemePreference() {
  if(typeof window === 'undefined') return 'light';
  const storedTheme = window.localStorage.getItem('themePreference');
  if (storedTheme && ['dark', 'light'].includes(storedTheme)) {
    return storedTheme;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}



export function useTheme() {
  const [theme, setTheme] = useState(getThemePreference());

  function handleTheme() {
    const root = window.document.documentElement;
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    window.localStorage.setItem('themePreference', theme);
  }

  useEffect(() => {
    handleTheme()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme, handleTheme };
}