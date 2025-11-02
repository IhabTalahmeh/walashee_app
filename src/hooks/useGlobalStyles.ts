import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { createGlobalStyles } from '../styles/globalStyles';

export const useGlobalStyles = () => {
  const { theme } = useTheme();
  return useMemo(() => createGlobalStyles(theme), [theme]);
};