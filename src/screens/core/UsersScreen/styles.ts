import { Dimensions, StyleSheet } from "react-native";
import { hexWithOpacity } from "src/common/utils";
import { fonts, Theme } from "src/styles/theme";

const screenWidth = Dimensions.get('window').width;
const cardMargin = 16; // adjust as needed

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20
    }
  });
};
