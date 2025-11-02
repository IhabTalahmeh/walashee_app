import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: theme.colors.text,
      flex: 1
    },
    sidesContainer: {
      minWidth: 40,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
}
