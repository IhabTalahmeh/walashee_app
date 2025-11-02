import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.9),
      padding: 10,
      borderRadius: 20,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 16,
      overflow: 'hidden'
    },
    actionButtons: {
      position: 'absolute',
      top: 10,
      right: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
}
