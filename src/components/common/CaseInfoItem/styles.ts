import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    valueContainer: {
      backgroundColor: theme.colors.background,
      minHeight: 55,
      borderRadius: 14,
      justifyContent: 'center',
      paddingLeft: 20
    }
  });
}
