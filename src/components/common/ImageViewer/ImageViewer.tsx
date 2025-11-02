import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React, { useMemo } from 'react'
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';

interface ImageViewerProps {
  onClose: () => void;
  uri: string;
}

export default function ImageViewer({ onClose, uri }: ImageViewerProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  return (
    <>
      <StatusBar hidden={true} backgroundColor={'black'} animated={true} barStyle={'dark-content'} />
      <View style={[styles.modalOverlay, globalStyles.flex1]}>
        <TouchableOpacity onPress={onClose} style={styles.imageButton}>
          <Ionicons name='close-outline' color='white' size={24} />
        </TouchableOpacity>
        <View style={globalStyles.w100}>
          <FastImage
            source={{ uri: uri }}
            style={globalStyles.full}
            resizeMode="contain"
          />
        </View>
      </View>
    </>
  )
}
