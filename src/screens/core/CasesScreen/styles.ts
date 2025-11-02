import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Theme } from 'src/styles/theme';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.topBackground
    },
    cardSkeleton: {
      height: 170,
      width: '100%',
      borderRadius: 20,
    }
  });
}
