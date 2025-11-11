import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: 10,
      borderRadius: 20
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden'
    },
    imageContainer: {
      width: 50,
      height: 50,
      borderRadius: 100,
      overflow: 'hidden'
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    notificationText: {
      fontFamily: fonts.medium,
      fontSize: 18
    }
  });
}
