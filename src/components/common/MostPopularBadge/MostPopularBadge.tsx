import { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "src/context/ThemeContext";
import CustomText from "../CustomText/CustomText";
import { createStyles } from "./styles";

export const MostPopularBadge = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <View style={styles.mostPopularBadgeContainer}>
            <CustomText text='MOST POPULAR' color={theme.colors.white} size={12} fontWeight='semiBold'/>
        </View>
    )
}