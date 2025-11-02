import { Platform, StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {

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
    dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingStart: 15,
      paddingEnd: 10,
      borderWidth: 1,
      borderRadius: 14,
      borderColor: theme.colors.pureBorder,
      backgroundColor: theme.colors.inputBackground,
      overflow: 'hidden',
      paddingBottom: 10,
    },
    inputStyle: {
      flex: 1,
      fontFamily: fonts.medium,
      fontSize: 16,
      color: theme.colors.text,
    },
    leftIconContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25
    },
  });
}
