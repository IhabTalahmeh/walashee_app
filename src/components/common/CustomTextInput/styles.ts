import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      height: 68,
      borderWidth: 1,
      borderRadius: 14,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.inputBackground,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      overflow: 'hidden',
      paddingHorizontal: 5
    },
    textInput: {
      fontSize: 16,
      flex: 1,
      fontFamily: fonts.medium,
      color: theme.colors.text,
      height: '100%',
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
