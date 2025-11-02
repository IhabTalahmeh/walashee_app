import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Theme } from 'src/styles/theme';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.topBackground,
    },
    title: {
      textAlign: 'center',
    },
    countryCodeButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftIconContainerStyle: {
      width: 80,
      borderRightWidth: 1,
      borderColor: theme.colors.pureBorder,
      marginRight: 15,
      height: '60%',
      paddingLeft: 15,
    }
  });
}
