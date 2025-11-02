import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.9),
      padding: 10,
      borderRadius: 14,
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
      fontSize: 18,
      color: theme.colors.text
    }
  });
}
