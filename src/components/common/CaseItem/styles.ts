import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.9),
      padding: 10,
      borderRadius: 20,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: hexWithOpacity(theme.colors.text, 0.1)
    },
    imageIconContainer: {
      position: 'absolute',
      right: 0,
      padding: 10
    },
  });
}
