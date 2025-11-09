import { StyleSheet } from 'react-native';
import { Theme } from 'src/styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
  });
}
