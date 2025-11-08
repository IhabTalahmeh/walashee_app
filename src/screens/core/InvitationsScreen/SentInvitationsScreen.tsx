import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { useGetInvitations } from 'src/hooks/useUsers'
import { useAuth } from 'src/context/AuthContext'
import InvitationItem from 'src/components/User/InvitationItem/InvitationItem';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import EmptyView from 'src/components/common/EmptyView/EmptyView';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useGetAgentTeam, useGetAgentTeamInvitations } from 'src/hooks/useAgent';
import { EInvitationType } from 'src/enum/EInvitationType';
import UserCard from 'src/components/User/UserCard/UserCard';

export default function SentInvitationsScreen() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const globalStyles = useGlobalStyles();

    const { data: team } = useGetAgentTeam(user.id);

    const { data: invitations, isLoading, refetch: refetchInvitations } = useGetAgentTeamInvitations({
        userId: user.id,
        teamId: team?.id,
        type: EInvitationType.SENT,
        page: 1,
        size: 10,
    }, {
        onSuccess: (data: any) => {
            console.log('data', data);
        },
        onError: (err: any) => console.log('error', err),
    });

    const renderInvitation = useCallback(({ item }: any) => {
        return (
            <View style={[globalStyles.mt10, globalStyles.ph10]}>
                <UserCard item={item} />
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