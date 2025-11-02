import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    box: {
      borderWidth: 1,
      borderColor: '#ccc',
      height: 70,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      overflow: 'hidden',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
      gap: 8
    },
    input: {
      fontSize: 20,
      textAlign: 'center',
      padding: 0,
      fontFamily: fonts.bold,
      width: '100%',
      height: '100%',
      color: theme.colors.text,
    },
    focusedBox: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
  });
}
