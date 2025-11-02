import { View } from 'react-native'
import React from 'react'
import CustomText from '../CustomText/CustomText';
import { hexWithOpacity } from 'src/common/utils';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';

interface Props {
    text: string;
    icon?: React.ReactNode;
}

export default function EmptyView({ text, icon }: Props) {
    const { theme } = useTheme();
    const globalStyles = useGlobalStyles();

    return (
        <View style={[globalStyles.flex1, globalStyles.jcc, globalStyles.aic]}>
            {icon && icon}
            <CustomText
                text={text}
                size={20}
                color={hexWithOpacity(theme.colors.text, 0.5)}
                fontWeight='medium'
                style={globalStyles.centerText}
            />
        </View>
    )
}
