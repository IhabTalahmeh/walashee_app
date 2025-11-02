import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Theme } from 'src/styles/theme';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    flashListWrapper: {
      flex: 1,
      height: SCREEN_HEIGHT - 50,
      backgroundColor: theme.colors.topBackground,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    listContainer: {
      flex: 1,
      paddingBottom: Platform.OS == 'ios' ? 50 : 0,
    },
    pb150: {
      paddingBottom: 150
    },
    headerTitle: {
      color: theme.colors.white,
      fontSize: 24,
    },
    headerSubtitle: {
      color: theme.colors.white,
      fontSize: 14,
      width: SCREEN_WIDTH,
      marginTop: 5,
    },
    handImageContainer: {
      width: 20,
      height: 20,
    },
    addButton: {
      height: 62,
      width: 62,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: theme.colors.primary,
      zIndex: 100,
      position: 'absolute',
      bottom: 20,
      right: 20,
      elevation: 10
    }
  });
}
