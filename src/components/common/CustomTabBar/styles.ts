import { Platform, StyleSheet } from 'react-native';
import { hexToRgba } from 'src/common/utils';
import { Theme } from 'src/styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: Platform.OS === 'ios' ? 95 : 75,
      paddingHorizontal: 5,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: hexToRgba(theme.colors.background, 0.92),
      paddingBottom: Platform.OS === 'ios' ? 20 : 0,

    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    routeName: {
      fontSize: 13,
      textAlign: 'center'
    },
    messagesBadge: {
      position: 'absolute',
      right: -5,
      top: -5,
      backgroundColor: theme.colors.secondary,
      color: 'white',
      width: 18,
      height: 18,
      borderRadius: 9,
      textAlign: 'center',
      overflow: 'hidden',
      paddingTop: Platform.OS == 'ios' ? 2 : 0,
    }

  });
}
