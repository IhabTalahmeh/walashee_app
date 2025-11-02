import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.mode == 'light' ? hexWithOpacity(theme.colors.black, 0.5) : hexWithOpacity(theme.colors.white, 0.5),
    },
    modalContainer: {
      width: '90%',
      backgroundColor: theme.colors.background,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
    },
    note: {
      fontSize: 16,
      color: 'black',
      fontFamily: fonts.regular,
      alignSelf: 'flex-start',
      width: '100%'
    },
    closeButton: {
      alignSelf: 'flex-end',
      marginTop: 20
    },
    buttonText: {
      color: theme.colors.black,
      fontSize: 16,
      fontFamily: fonts.bold,
    },
    title: {
      fontSize: 18,
      color: theme.colors.black,
      fontFamily: fonts.bold,
    },
    message: {
      fontSize: 15,
      color: theme.colors.black,
      fontFamily: fonts.regular,
    }
  });
}
