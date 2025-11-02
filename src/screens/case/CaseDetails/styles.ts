import { Dimensions, Platform, StyleSheet } from 'react-native';
import { hexWithOpacity } from 'src/common/utils';
import { Theme } from 'src/styles/theme';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    infoTag: {
      backgroundColor: theme.colors.background,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      height: 65
    }
  });
}
