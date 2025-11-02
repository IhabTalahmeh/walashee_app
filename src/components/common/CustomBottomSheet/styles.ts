import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    headline: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000'
    },
    titleContainer: {
      height: 40,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.topBackground
    },
    titleText: {
      color: theme.colors.black,
      fontSize: 16,
      fontWeight: 'bold',
    }
  });
}
