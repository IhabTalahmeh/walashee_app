import { View } from 'react-native'
import React, { useMemo } from 'react'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { useTheme } from 'src/context/ThemeContext';
import CustomText from '../CustomText/CustomText';

interface Props {
    text: string;
    icon?: React.ReactNode,
}

export default function SectionTitle({ text, icon }: Props) {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const globalStyles = useGlobalStyles();

    return (
        <View style={styles.headerContainer}>
            <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb, globalStyles.flex1]}>
                <View style={[globalStyles.flexRow, globalStyles.aic]}>
                    <View style={styles.iconContainer}>
                        {icon}
                    </View>
                    <CustomText text={text} size={16} color={theme.colors.text} fontWeight='medium' style={globalStyles.ml10} />
                </View>
            </View>
        </View>
    )
}