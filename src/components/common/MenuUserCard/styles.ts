import { StyleSheet } from "react-native";
import { hexWithOpacity } from "src/common/utils";
import { fonts, Theme } from "src/styles/theme";

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    userCardContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background,
      padding: 10,
      borderRadius: 20,
    },
    nameContainer: {
      paddingLeft: 15,
      paddingRight: 10,
    },
    name: {
      fontSize: 18,
      color: theme.colors.black,
      fontFamily: fonts.medium
    },
    editProfile: {
      fontSize: 15,
      color: theme.colors.link,
      fontFamily: fonts.medium
    }

  })
}