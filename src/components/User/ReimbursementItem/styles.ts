import { StyleSheet } from "react-native";
import { Theme } from "src/styles/theme";

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: 15,
      borderRadius: 20,
      gap: 3
    },
  });
};
