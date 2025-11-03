import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
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
      paddingTop: 20,
    },
    modifierItem: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.15),
      borderRadius: 14,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.background,
      marginTop: 5
    },
    selectedItem: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.15),
      borderRadius: 14,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.background,
      marginTop: 5
    },
    countryCodeButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
    }
  });
}
