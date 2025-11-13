import { StyleSheet } from "react-native";
import { fonts, Theme } from "src/styles/theme";

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.topBackground,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontFamily: fonts.bold,
      marginBottom: 12,
      textAlign: 'center',
      paddingVertical: 10,
      color: theme.colors.text,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: fonts.bold,
      marginTop: 16,
      marginBottom: 8,
      color: theme.colors.text,
    },
    subTitle: {
      fontSize: 18,
      fontFamily: fonts.bold,
      marginTop: 12,
      marginBottom: 4,
      color: theme.colors.text,
    },
    paragraph: {
      fontSize: 18,
      lineHeight: 20,
      marginBottom: 8,
      fontFamily: fonts.regular,
      color: theme.colors.text,
    },
    link: {
      color: theme.colors.link,
    },
    bold: {
      fontFamily: fonts.bold,
    },
  });
};
