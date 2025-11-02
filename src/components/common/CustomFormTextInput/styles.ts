import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { isRTL } from 'src/styles/globalStyles';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      height: 55,
      borderWidth: 1,
      borderRadius: 14,
      borderColor: theme.colors.pureBorder,
      backgroundColor: theme.colors.inputBackground,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      overflow: 'hidden',
    },
    textInput: {
      fontSize: 16,
      flex: 1,
      fontFamily: fonts.medium,
      color: theme.colors.text,
    },
    errorContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    errorMessage: {
      color: theme.colors.error,
      marginLeft: 5,
      fontSize: 13
    }

  });
}
