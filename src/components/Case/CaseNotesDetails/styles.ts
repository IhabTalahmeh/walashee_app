import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      height: 64,
      backgroundColor: theme.colors.background,
      borderRadius: 14,
      paddingHorizontal: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleContainer: {
      backgroundColor: theme.colors.background,
      height: 65,
      borderRadius: 14,
      justifyContent: 'center',
      paddingLeft: 5
    },
    itemContainer: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.3),
      borderRadius: 14,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.colors.background,
      marginTop: 10,
      flex: 1,
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
