import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    procedureHeader: {
      height: 60,
      borderRadius: 14,
      backgroundColor: theme.colors.background,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10
    }
  });
}
