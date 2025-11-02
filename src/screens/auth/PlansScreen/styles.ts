import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
      paddingTop: 40, // Optional: for top spacing
    },
    packageCard: {
      marginBottom: 24,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 20,
      elevation: 3,
      // You can add shadow styles for iOS if needed
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 8,
    },
    lightLogoContainer: {
      width: 300,
      height: 300,
      position: 'absolute',
      // backgroundColor: 'pink',
    },
    box: {
      height: 250,
      width: '100%',
    },
    boxA: {
      backgroundColor: 'white',
    },
    boxB: {
      backgroundColor: '#D8D8D8',
    },
    header: {
      width: '100%',
      backgroundColor: 'pink',
    },
    tabBarItemStyle: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButton: {
      alignSelf: 'flex-end',
      marginRight: 20,
      marginTop: 20,
      backgroundColor: hexWithOpacity(theme.colors.white, 0.3),
      width: 54,
      height: 54,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
    continueButton: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      paddingHorizontal: 20,
    }
  });
}
