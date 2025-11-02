import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.text,
      fontFamily: fonts.bold
    }
  });
}
