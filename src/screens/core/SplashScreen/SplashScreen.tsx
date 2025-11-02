import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import FastImage from 'react-native-fast-image';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';

export default function SplashScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage
          source={theme.mode == 'light' ? require('assets/images/light-mode-logo.png') : require('assets/images/dark-mode-logo.png')}
          style={globalStyles.full}
        />
      </View>
    </View>
  )
}