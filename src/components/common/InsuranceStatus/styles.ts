import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: 20,
      minHeight: 40,
      justifyContent: 'center',
      paddingHorizontal: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      right: 10,
      top: 10,
      zIndex: 99999,
      borderWidth: 1,
      borderColor: theme.colors.border
    },
    circle: {
      backgroundColor: theme.colors.inputBackground,
      width: 30,
      height: 30,
      borderRadius: 100,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',      
    },
    statusText: {
      paddingStart: 10,
      paddingEnd: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemButton: {
      height: 36,
      borderRadius: 100,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: theme.colors.border
    },
  });
}
