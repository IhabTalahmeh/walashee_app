import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
      marginTop: 10,
      backgroundColor: theme.colors.background,
      borderWidth: 1.5,
      borderColor: hexWithOpacity(theme.colors.pureBorder, 0.5),
      borderRadius: 24,
      padding: 15,
    },
    rightContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      width: '35%'
    },
    mostPopularBadgeContainer: {
      backgroundColor: theme.colors.warning,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderRadius: 100,
      position: 'absolute',
      right: 70,
      top: -5,
      zIndex: 10
    }
  });
}
