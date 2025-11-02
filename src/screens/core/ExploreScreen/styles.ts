import { Dimensions, Platform, StyleSheet } from 'react-native';
import { fonts, Theme } from 'src/styles/theme';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.topBackground
    },
    scrollViewContent: {
      flexGrow: 1,
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
    },
    fileContainer: {
      backgroundColor: theme.colors.background,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: 75,
      borderRadius: 10,
      padding: 10
    },
    scrollView: {
      padding: 16,
    },
    searchByInputContainer: {
      marginBottom: 12,
    },
    flashListWrapper: {
      flex: 1,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      backgroundColor: theme.colors.card,
      paddingVertical: 10,
      borderRadius: 10,
    },
    tabItem: {
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    activeTabItem: {
      borderBottomWidth: 2,
      borderColor: theme.colors.primary,
    },
    tabText: {
      fontSize: 16,
      fontFamily: 'System',
      fontWeight: '500',
    },
    tabWrapper: {
      flexGrow: 1
    },
    formWrapper: {
      paddingHorizontal: 20,
      backgroundColor: theme.colors.topBackground,
    },
    label: {
      color: theme.colors.text,
      fontSize: 16,
      fontFamily: fonts.medium,
      fontWeight: 500
    }
  });
}
