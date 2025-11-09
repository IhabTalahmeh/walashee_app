import { StyleSheet } from "react-native";
import { isRTL } from "src/styles/globalStyles";
import { fonts, Theme } from "src/styles/theme";

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    imageButton: {
      borderRadius: 8,
      overflow: 'hidden'
    },
    imagePlaceholderButton: {
      borderRadius: 8,
      borderWidth: 3,
      borderColor: theme.colors.gray,
      borderStyle: 'dotted',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1
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
  })
}