import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: [{ translateX: -110 }],
      backgroundColor: theme.colors.background,
      zIndex: 200,
      width: 220,
      borderRadius: 20,
      gap: 10,
      padding: 10,
      marginTop: 5,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    toggleButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
      zIndex: 99,
    },
    button: {
      height: 36,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center'
    },
    selectedButton: {
      height: 36,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
    },
  });
}
