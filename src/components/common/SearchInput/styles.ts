import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: 100,
      height: 64,
      paddingHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: theme.colors.text,
      flex: 1,
      marginLeft: 10,      
      height: '100%',
      textAlignVertical: 'center'
    }
  });
}
