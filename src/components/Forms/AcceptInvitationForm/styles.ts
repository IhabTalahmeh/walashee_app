import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
}
