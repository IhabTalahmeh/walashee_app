import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
    },
    topSection: {
      marginVertical: 30,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
}
