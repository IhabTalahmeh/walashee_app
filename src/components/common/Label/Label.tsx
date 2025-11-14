import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from '../CustomText/CustomText';

interface Props {
    text: string;
    required?: boolean;
}

export default function Label({ text, required = false }: Props) {
    const { theme } = useTheme();
    const globalStyles = useGlobalStyles();

    return (
        <View style={[globalStyles.flexRow, globalStyles.aic]}>
            <CustomText text={text} size={18} fontWeight='medium' color={theme.colors.text} />
            <CustomText text="*" size={16} color={theme.colors.error} fontWeight="medium" />
        </View>
    )
}