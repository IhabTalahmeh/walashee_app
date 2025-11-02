import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';

interface Props {
  backgroundColor?: string;
}

export default function LoadingScreen({ backgroundColor = 'transparent' }: Props) {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();

  return (
    <View style={[globalStyles.flex1, globalStyles.jcc, globalStyles.aic, { backgroundColor }]}>
      <ActivityIndicator color={theme.colors.text} size={30} />
    </View>
  )
}