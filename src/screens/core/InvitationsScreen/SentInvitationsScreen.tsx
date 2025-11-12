import { View, FlatList } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react'
import { useAuth } from 'src/context/AuthContext'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import EmptyView from 'src/components/common/EmptyView/EmptyView';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { EInvitationType } from 'src/enum/EInvitationType';
import UserCard from 'src/components/User/UserCard/UserCard';
import { useGetTeam, useGetTeamInvitations } from 'src/hooks/useTeam';
import { useFocusEffect } from '@react-navigation/native';

function SentInvitationsScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const { data: team } = useGetTeam(user.id);

  const { data: invitations, isLoading, refetch: refetchInvitations } = useGetTeamInvitations({
    userId: user.id,
    teamId: team?.id,
    type: EInvitationType.SENT,
    page: 1,
    size: 10,
  }, {
    onSuccess: (data: any) => {
      console.log('datas', data);
    },
    onError: (err: any) => console.log('errors', err),
  });

  const renderInvitation = useCallback(({ item, index }: any) => {
    return (
      <View style={[globalStyles.ph10, globalStyles.mt10]}>
        <UserCard
          item={item}
          teamId={team.id}
          afterCancelInvitation={refetchInvitations} />
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

export default memo(SentInvitationsScreen);