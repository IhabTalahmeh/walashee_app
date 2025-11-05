import { StyleSheet } from "react-native";
import { Theme } from "src/styles/theme";

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.transparent,
      padding: 15,
      borderRadius: 20,
      alignItems: 'center',
      // paddingVertical: 30,
    },
    editProfileButton: {
      backgroundColor: theme.colors.border,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 100,
      height: 42,
      paddingHorizontal: 20,
    }
  });
};
