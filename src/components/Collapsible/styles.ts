import { StyleSheet } from "react-native";
import { Theme } from "src/styles/theme";

const TabBarHeight = 48;

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
  })
}