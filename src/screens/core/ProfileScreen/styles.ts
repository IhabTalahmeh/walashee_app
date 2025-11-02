import { StyleSheet } from "react-native";
import { Theme } from "src/styles/theme";

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.topBackground,
      padding: 20,
    },
    topCardContainer: {
      backgroundColor: theme.colors.background,
      padding: 15,
      borderRadius: 20,
      alignItems: 'center',
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
