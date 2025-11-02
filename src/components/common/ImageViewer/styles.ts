import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    modalOverlay: {
      backgroundColor: theme.colors.black,
    },
    imageButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 100
    }
  });
}
