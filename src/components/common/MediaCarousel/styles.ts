import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    imageButton: {
      width: 100,
      height: 100,
      flex: 1,
      borderRadius: 18,
      overflow: 'hidden',
      marginVertical: 10,
      marginLeft: 10
    },
    selectedImageButton: {
      width: 100,
      height: 100,
      flex: 1,
      borderRadius: 18,
      overflow: 'hidden',
      marginVertical: 10,
      marginLeft: 10,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    image: {
      width: SCREEN_WIDTH - 40,
      height: '100%',
      flex: 1,
      borderRadius: 18,
      overflow: 'hidden',
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: hexWithOpacity(theme.colors.primary, 0.3)
    },
    topListContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: 'red'
    },
    downListContainer: {
      backgroundColor: hexWithOpacity(theme.colors.white, 0.3),
      borderRadius: 20,
      height: 120,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: hexWithOpacity(theme.colors.black, 0.65),
      padding: 20,
      paddingVertical: 50,
    },
    imageResizeButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: hexWithOpacity(theme.colors.black, 0.3),
      borderRadius: 100,
      overflow: 'hidden',
    },
    imageViewerContainer: {
      borderRadius: 20,
    }
  });
}
