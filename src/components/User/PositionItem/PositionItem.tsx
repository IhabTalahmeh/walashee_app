import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useNavigation } from '@react-navigation/native';

interface Props {
    item: any;
}

export default function PositionItem({ item }: Props) {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const globalStyles = useGlobalStyles();
    const navigation: any = useNavigation();

    const navigate = () => {
        navigation.navigate('AddPosition', {
            id: item.id,
        });
    }

    return (
        <TouchableOpacity style={styles.container} onPress={navigate}>
            <CustomText text={item.speciality.name} size={18} color={theme.colors.text} fontWeight='medium' />
            <CustomText text={item.hospital.name} size={16} color={theme.colors.text} fontWeight='regular'  style={globalStyles.mt5}/>
            <CustomText text={`${item.start_date} ${item?.end_date ? ('- ' + item.end_date): 'Currently'}`} size={16} color={theme.colors.gray} fontWeight='regular'  style={globalStyles.mt5}/>
        </TouchableOpacity>
    )
}