import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    header: {
      marginHorizontal: 30,
      backgroundColor: theme.colors.topBackground,
      marginVertical: 20,

    },
    formWrapper: {
      backgroundColor: theme.colors.topBackground,
    },
  });
}
