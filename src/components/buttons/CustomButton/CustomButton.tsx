import React, { memo, useMemo } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import CustomText from 'src/components/common/CustomText/CustomText';
import { CustomButtonProps } from './types';

function CustomButton({
  text,
  variant = 'filled',
  disabled = false,
  isLoading,
  type = 'primary',
  icon,
  fontSize = 18,
  textColor = 'white',
  height = 60,
  ...props
}: CustomButtonProps) {
  const globalStyles = useGlobalStyles();
  const { theme }: any = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const buttonColor = theme.colors[type] || theme.colors.primary;
  const resolvedTextColor =
    variant === 'outlined' ? buttonColor : textColor || theme.colors.white;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerVariantStyles(variant, disabled, buttonColor),
        { height }
      ]}
      activeOpacity={0.7}
      disabled={disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          size={24}
          color={variant === 'outlined' ? buttonColor : theme.colors.white}
        />
      ) : (
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
          {icon && <View style={globalStyles.mr10}>{icon}</View>}
          <CustomText
            style={[textVariantStyles(variant, buttonColor, theme)]}
            text={text}
            size={fontSize}
            color={resolvedTextColor}
            fontWeight={props.fontWeight}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

function containerVariantStyles(
  variant: 'filled' | 'outlined',
  disabled: boolean,
  color: string
) {
  switch (variant) {
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: color,
        opacity: disabled ? 0.7 : 1,
      };
    case 'filled':
    default:
      return {
        backgroundColor: color,
        opacity: disabled ? 0.7 : 1,
      };
  }
}

function textVariantStyles(
  variant: 'filled' | 'outlined',
  color: string,
  theme: any
) {
  switch (variant) {
    case 'outlined':
      return { color };
    case 'filled':
    default:
      return { color: theme.colors.white };
  }
}

export default CustomButton;