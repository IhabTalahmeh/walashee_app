import { View, FlatList } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { useAuth } from 'src/context/AuthContext'
import InvitationItem from 'src/components/User/InvitationItem/InvitationItem';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import EmptyView from 'src/components/common/EmptyView/EmptyView';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useGetCustomerTeamInvitations } from 'src/hooks/useTeam';
import { EInvitationType } from 'src/enum/EInvitationType';

export default function CU_InvitationsScreen() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const globalStyles = useGlobalStyles();

    const { data: invitations, isLoading, refetch: refetchInvitations } = useGetCustomerTeamInvitations({
        type: EInvitationType.RECEIVED,
        userId: user.id,
        page: 1,
        size: 10,
    }, {
        onSuccess: (data: any) => {
            console.log('data is', data);
        },
        onError: (err: any) => console.log('error is', err),
    });

    const renderInvitation = useCallback(({ item }: any) => {
        return (
            <View style={[globalStyles.mt10, globalStyles.mh10]}>
                <InvitationItem item={item} refetchInvitations={refetchInvitations} />
            </View>
        )
    }, []);

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={invitations || []}
                keyExtractor={(item) => item.id}
                renderItem={renderInvitation}
                contentContainerStyle={globalStyles.flex1}
                ListEmptyComponent={() => {
                    return (
                        <View style={globalStyles.flex1}>
                            <EmptyView text="You have no invitations at the moment" />
                        </View>
                    )
                }}
            />
        </View>
    )
}