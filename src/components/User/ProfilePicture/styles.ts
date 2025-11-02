import { StyleSheet } from "react-native";
import { Theme } from "src/styles/theme";

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    imageButton: {
      borderRadius: 100,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      textDecorationStyle: 'dashed'
    },
    imagePlaceholderButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backdrop: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.2)'
    },
    closeImageButton: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: theme.colors.dark,
      borderRadius: 100, padding: 2
    },
    circleButton: {
      width: 32,
      height: 32,
      backgroundColor: theme.colors.background,
      position: 'absolute',
      right: 4,
      bottom: 4,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    }
  })
}