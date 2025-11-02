import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    },
    button: {
      backgroundColor: theme.colors.inputBackground,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      borderRadius: 14      
    }
  });
}
