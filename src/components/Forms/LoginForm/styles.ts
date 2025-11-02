import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    logoImageContainer: {
      width: 128,
      height: 128,
    },
    logoText: {
      color: theme.colors.text,
      fontSize: 24,
      fontFamily: fonts.black
    }
  });
}
