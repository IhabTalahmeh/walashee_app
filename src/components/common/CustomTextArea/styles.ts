import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      minHeight: 75,
      borderWidth: 1,
      borderRadius: 14,
      borderColor: theme.colors.pureBorder,
      backgroundColor: theme.colors.inputBackground,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
      overflow: 'hidden',
      paddingHorizontal: 10
    },
    textInput: {
      fontSize: 16,
      flex: 1,
      fontFamily: fonts.medium,
      color: theme.colors.text,
      textAlignVertical: 'top',
      height: '100%',
      paddingVertical: 10
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
