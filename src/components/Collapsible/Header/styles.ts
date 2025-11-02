import { StyleSheet } from "react-native";
import { fonts, Theme } from "src/styles/theme";

export const createStyles = (theme: Theme) => {
    return StyleSheet.create({
        header: {
            position: 'absolute',
            top: 0,
            width: '100%',
            backgroundColor: theme.colors.topBackground,
            alignItems: 'center',
            justifyContent: 'center',
        },
        formWrapper: {
            paddingHorizontal: 20,
            backgroundColor: theme.colors.topBackground,
        },

    })
}