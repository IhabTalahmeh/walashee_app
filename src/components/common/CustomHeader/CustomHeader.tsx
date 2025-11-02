import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import CustomText from '../CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStyles } from './styles';

interface Props {
  title: string;
  onBackPress: () => void;
}

export default function CustomHeader({ title, onBackPress }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={globalStyles.headerBackImage} onPress={onBackPress}>
        <Ionicons name='arrow-back' size={24} color={theme.colors.text} />
      </ TouchableOpacity>

      <View style={styles.titleContainer}>
        <CustomText
          text={title}
          size={22}
          color={theme.colors.text}
          fontWeight='semiBold'
        />
      </View>

      {/* Invisible right button to balance the left */}
      <View style={styles.sideButton} />
    </View>
  );
}
