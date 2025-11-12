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
import { useGetTeam, useGetTeamInvitations } from 'src/hooks/useTeam';
import { EInvitationType } from 'src/enum/EInvitationType';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { useFocusEffect } from '@react-navigation/native';

export default function ReceivedInvitationsScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const { data: team } = useGetTeam(user.id);

  const { data: invitations, isLoading, refetch: refetchInvitations } = useGetTeamInvitations({
    type: EInvitationType.RECEIVED,
    userId: user.id,
    teamId: team?.id,
    page: 1,
    size: 30
  }, {
    isEnabled: team?.id,
    onSuccess: (data: any) => {
      console.log('data is', data);
    },
    onError: (err: any) => console.log('error is', err),
  });

  const renderInvitation = useCallback(({ item }: any) => {
    return (
      <View style={globalStyles.mt10}>
        <InvitationItem item={item} refetchInvitations={refetchInvitations} />
      </View>
    )
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetchInvitations();
    }, [refetchInvitations])
  );

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={invitations?.doctors || []}
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