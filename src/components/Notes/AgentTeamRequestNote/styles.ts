import { Platform, StyleSheet } from 'react-native';
import { hexWithOpacity } from 'src/common/utils';
import { fonts, Theme } from 'src/styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    mainText: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 16,
      fontFamily: fonts.medium,
      color: theme.colors.text,
    },
    linkText: {
      color: theme.colors.link,
    }
  });
}
