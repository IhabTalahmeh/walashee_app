import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../../styles/theme';
import { hexWithOpacity } from 'src/common/utils';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      height: 64,
      backgroundColor: theme.colors.background,
      borderRadius: 14,
      paddingHorizontal: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleContainer: {
      backgroundColor: theme.colors.background,
      height: 65,
      borderRadius: 14,
      justifyContent: 'center',
      paddingLeft: 5
    },
    modal: {
      backgroundColor: theme.colors.topBackground,
      flex: 1,
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.topBackground,
      paddingHorizontal: 20,
      paddingTop: 20
    },
    cptItem: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.15),
      borderRadius: 14,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.background,
      marginTop: 5
    },
    selectedCPTItem: {
      backgroundColor: hexWithOpacity(theme.colors.background, 0.15),
      borderRadius: 14,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.background,
      marginTop: 5
    },
    imageContainer: {
      width: '100%',
      height: 170,
      borderRadius: 14,
      overflow: 'hidden',
    },
    gradientOverlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 8, // optional, match image styling
    },
  });
}
