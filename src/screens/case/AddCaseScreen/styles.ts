import { Dimensions, Platform, StyleSheet } from 'react-native';
import { hexWithOpacity } from 'src/common/utils';
import { Theme } from 'src/styles/theme';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.topBackground,
      flex: 1,
    },
    page: {
      flex: 1,
      paddingHorizontal: 20
    },
    addAnotherProcedureButton: {
      backgroundColor: hexWithOpacity(theme.colors.primary, 0.15),
      height: 60,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingMessageContainer: {
      backgroundColor: theme.colors.background,
      padding: 20,
      minHeight: 100,
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 14,
      shadowColor: theme.mode == 'light' ? theme.colors.black : theme.colors.white,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    }
  });
}
