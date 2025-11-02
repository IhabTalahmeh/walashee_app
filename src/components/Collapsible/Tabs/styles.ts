import { StyleSheet } from "react-native";
import { Theme } from "src/styles/theme";

const TabBarHeight = 48;

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
tabBarContainer: {
  position: 'absolute',
  top: 300, // Initial visible position
  left: 0,
  right: 0,
  zIndex: 100,
},
tabBar: {
  backgroundColor: theme.colors.white,
  height: 50, // Explicit height
},

    indicator: {
      backgroundColor: theme.colors.black,
    },
    label: {
      fontSize: 16,
      color: theme.colors.black,
    },
  })
}