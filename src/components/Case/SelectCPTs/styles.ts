import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      height: 64,
      backgroundColor: theme.colors.background,
      borderRadius: 14,
      paddingHorizontal: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    cptItem: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.15),
      borderRadius: 14,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.background,
      marginBottom: 5
    },
    selectedCPTItem: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.15),
      borderRadius: 14,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.background,
      marginBottom: 5
    },
    quantityButton: {
      // backgroundColor: 'pink',
      paddingHorizontal: 10
    }
  });
}
