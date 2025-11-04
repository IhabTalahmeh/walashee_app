import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
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
    },
    leftIconContainerStyle: {
      width: 80,
      borderRightWidth: 1,
      borderColor: theme.colors.lightgray,
      marginRight: 15,
      height: '60%',
      paddingLeft: 15,
    }
  });
}
