import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    redDot: {
      backgroundColor: theme.colors.error,
      position: 'absolute',
      top: 14,
      right: 14,
      width: 11,
      height: 11,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: theme.colors.background
    }
  });
}
