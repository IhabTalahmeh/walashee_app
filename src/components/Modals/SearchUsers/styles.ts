import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.topBackground,
      flex: 1,
    },
    modal: {
      backgroundColor: theme.colors.topBackground,
      flex: 1,
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.topBackground,
      paddingHorizontal: 20,
      paddingTop: 20
    },
    userItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    footerButton: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border, // optional
    },

  });
}
