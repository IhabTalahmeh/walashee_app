import { StyleSheet } from "react-native";
import { hexWithOpacity } from "src/common/utils";
import { fonts, Theme } from "src/styles/theme";

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    item: {
      marginLeft: -12
    },
    itemBorder: {
      borderWidth: 1.2,
      borderColor: theme.colors.white,
      borderRadius: 100,
    }
  })
}