import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    infoTag: {
      backgroundColor: theme.colors.background,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      height: 65,
      borderWidth: 1,
      borderColor: theme.colors.pureBorder
    }
  });
}
