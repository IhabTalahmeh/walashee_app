import { TouchableOpacityProps } from 'react-native';
import React from 'react';
import { fonts, Theme } from 'src/styles/theme';

export type ButtonType = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'neutral' | 'transparent';

export interface CustomButtonProps extends TouchableOpacityProps {
  text: string;
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
  isLoading?: boolean;
  type?: ButtonType;
  icon?: React.ReactNode;
  fontSize?: number;
  textColor?: string;
  fontWeight?: keyof typeof fonts;
  height?: number;
}

