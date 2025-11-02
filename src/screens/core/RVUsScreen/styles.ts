import { Dimensions, StyleSheet } from "react-native";
import { hexWithOpacity } from "src/common/utils";
import { fonts, Theme } from "src/styles/theme";

const screenWidth = Dimensions.get('window').width;
const cardMargin = 16; // adjust as needed

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.topBackground,
    },
    cardsWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      rowGap: 10
    },
    cardContainer: {
      width: (screenWidth - 16 * 1.7 - cardMargin) / 2,
      aspectRatio: 1,
      minHeight: 250,
      borderRadius: 20,
      padding: 10,
      borderWidth: 1,
    },
    iconCircle: {
      width: 70,
      height: 70,
      backgroundColor: theme.colors.topBackground,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      fontFamily: fonts.regular,
      color: theme.colors.text,
    },
    upgradeText: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: theme.colors.text,
    }
  });
};
