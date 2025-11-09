import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';

export interface Props extends TouchableOpacityProps {
  disabled?: boolean;
  icon: React.ReactNode;
}


export default function HeaderCircleButton({
  onPress,
  icon,
  disabled = false,
}: Props) {
  const globalStyles = useGlobalStyles();
  return (
    <TouchableOpacity
      style={[globalStyles.iconCircle, globalStyles.mr10]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon}
    </TouchableOpacity>
  )
}