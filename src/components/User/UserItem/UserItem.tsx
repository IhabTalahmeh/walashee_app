import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import UserAvatar from 'src/components/common/UserAvatar/UserAvatar';
import CustomText from 'src/components/common/CustomText/CustomText';
import Spacer from 'src/components/common/Spacer/Spacer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function UserItem() {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const globalStyles = useGlobalStyles();
    const navigation: any = useNavigation();

    return (
        <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.flex1]}>
            <UserAvatar
                size={50}
                borderColor={theme.colors.white}
                borderWidth={1.2}
                uri={'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000'}
            />
            <View style={globalStyles.ms10}>
                <CustomText text='Ihab Talahmeh' size={18} />
            </View>

            <Spacer flex={true} />

            <TouchableOpacity onPress={() => navigation.navigate('InviteAgents')}>
                <Ionicons name='chatbubble-ellipses-outline' size={24} color={theme.colors.text} />
            </TouchableOpacity>
        </View>
    )
}