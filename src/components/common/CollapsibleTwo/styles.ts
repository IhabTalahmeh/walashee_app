import { StyleSheet } from 'react-native';
import { Theme } from 'src/styles/theme';

const HEADER_HEIGHT = 250

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    header: {
      width: '100%',
      backgroundColor: 'pink',
    },
    tabBarItemStyle: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
}
