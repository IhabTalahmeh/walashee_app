import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {

    },
    dropdown: {
      paddingStart: 15,
      paddingEnd: 10,
      height: 55,
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


  });
}
