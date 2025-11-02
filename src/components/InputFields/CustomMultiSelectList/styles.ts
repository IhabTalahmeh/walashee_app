import { Platform, StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      marginBottom: -10
    },
    dropdown: {
      paddingStart: 15,
      paddingEnd: 10,
      minHeight: 55,
      borderWidth: 1,
      borderRadius: 14,
      borderColor: theme.colors.pureBorder,
      backgroundColor: theme.colors.inputBackground,
      overflow: 'hidden',
    },
    placeholderStyle: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: hexWithOpacity(theme.colors.text, 1),
    },
    selectedTextStyle: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: theme.colors.text,
      marginBottom: 3,
    },
    listContainerStyle: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderRadius: 14,
      overflow: 'hidden',
    },
    itemTextStyle: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: theme.colors.text,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    inputStyle: {
      flex: 1,
      height: '100%',
      textAlignVertical: 'center',
      fontFamily: fonts.medium,
      fontSize: 16,
      color: theme.colors.text,
      ...Platform.select({
        ios: {
          paddingVertical: 5
        },
        android: {
          textAlignVertical: 'center',
        },
      }),
    },
    checkboxStyle: {
      borderColor: theme.colors.primary,
      width: 20,
      height: 20,
    }
  });
}
