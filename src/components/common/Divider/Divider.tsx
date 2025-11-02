import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from 'src/context/ThemeContext'

export default function Divider() {
  const { theme } = useTheme();

  return (
    <View style={{ borderTopWidth: 1, borderColor: theme.colors.border }} />
  )
}