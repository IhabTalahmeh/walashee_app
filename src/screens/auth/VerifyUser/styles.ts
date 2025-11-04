import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
    },
    topSection: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    }
  });
}
