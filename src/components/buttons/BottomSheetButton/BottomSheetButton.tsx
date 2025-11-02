import { TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from 'src/components/common/CustomText/CustomText';
import { PrimaryButtonProps } from 'src/types/props/PrimaryButtonProps';



export default function BottomSheetButton({
  text,
  textColor = '',
  variant = 'filled',
  disabled,
  isLoading,
  bgColor = 'white',
  left,
  right,
  color = 'black',
  ...props }: PrimaryButtonProps) {

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  return (
    <TouchableOpacity style={[styles.container, containerStyle(disabled)]} activeOpacity={0.5} {...props} disabled={disabled}>
      <View style={[globalStyles.flexRow, globalStyles.aic]}>

        {/* Left icon */}
        {left && <View style={[globalStyles.bottomSheetIconContainer, textStyle(disabled, color)]}>
          {left}
        </View>}

        {/* Text */}
        <View style={[left ? undefined : { marginLeft: 10 }]} >
          <CustomText text={text} size={16} color={textColor || theme.colors.text} fontWeight='medium' />
        </View>


        {/* Right icon */}
        {right && <View style={styles.sidesContainer}>
          {right}
        </View>}

      </View>
    </TouchableOpacity>
  );
}

function containerStyle(disabled: boolean) {
  return {
    opacity: disabled ? 0.7 : 1
  };
}

function textStyle(disabled: boolean, color: string) {
  return {
    opacity: disabled ? 0.7 : 1,
    color: color
  };
}