import { Dimensions, Platform, StyleSheet } from 'react-native';
import { hexWithOpacity } from 'src/common/utils';
import { Theme } from 'src/styles/theme';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    captureContainer: {
      position: 'absolute',
      bottom: 40,
      alignSelf: 'center',
    },
    captureButton: {
      width: 80,
      height: 80,
      backgroundColor: '#ffffff60',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: '#ffffff',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      left: 20,
      top: 20,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 100,
      height: 45,
      width: 45,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    torchButton: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 100,
      height: 45,
      width: 45,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraOptionsContainer: {
      position: 'absolute',
      top: 20,
      right: 20,
    },
    // New: flash overlay style
    flashOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'white',
      opacity: 0.5,
      zIndex: 10,
    },

  });
}
