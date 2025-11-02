import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    titleContainer: {
      backgroundColor: theme.colors.background,
      height: 65,
      borderRadius: 14,
      justifyContent: 'center',
      paddingLeft: 20
    },
    itemContainer: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.3),
      borderRadius: 14,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.colors.background
    },
    infoTag: {
      backgroundColor: theme.colors.background,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      height: 65
    },
    cptItem: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.15),
      borderRadius: 14,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.background,
      marginTop: 5
    },
  });
}
