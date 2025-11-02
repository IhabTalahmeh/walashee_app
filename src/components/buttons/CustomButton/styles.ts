import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      width: '100%'
    },
    text: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: fonts.regular,
    },
  });
}
