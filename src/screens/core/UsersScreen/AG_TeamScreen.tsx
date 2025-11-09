import { View, FlatList, Keyboard, RefreshControl } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { useAuth } from 'src/context/AuthContext'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import UserCard from 'src/components/User/UserCard/UserCard';
import SearchInput from 'src/components/common/SearchInput/SearchInput';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import CalendarIcon from 'src/icons/CalendarIcon';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTranslation } from 'react-i18next';
import { EInvitationType } from 'src/enum/EInvitationType';
import UserIconOutline from 'src/icons/UserIconOutline';
import UsersIconOutline from 'src/icons/UsersIconOutline';
import { useGetTeam, useGetTeamInvitations } from 'src/hooks/useTeam';

export default function AG_TeamScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigation: any = useNavigation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [keyword, setKeyword] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const { data: team } = useGetTeam(user.id);

  const { data: invitations, isLoading, refetch: refetchInvitations } = useGetTeamInvitations({
    userId: user.id,
    teamId: team?.id,
    page: 1,
    size: 10,
    type: EInvitationType.SENT,
  }, {
    onSuccess: (res: any) => { console.log('res', res) },
    onError: (err: any) => { console.log('err', err) },
  });

  const renderUser = useCallback(({ item }: any) => {
    return (
      <View style={globalStyles.mb10}>
        <UserCard item={item} />
      </View>
    )
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchInvitations();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetchInvitations();
    }, [])
  );

  return (
    <View style={styles.container}>

      <View style={[globalStyles.mv20]}>
        <SearchInput
          onChangeText={setKeyword}
          placeholder={t('search')}
          value={keyword}
        />
      </View>

      {isLoading
        ? (
          <View style={globalStyles.flex1}>
            <LoadingScreen />
          </View>)
        : (<FlatList
          data={invitations || []}
          keyExtractor={(item) => item.id}
          renderItem={renderUser}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.text}
            />
          }
          ListEmptyComponent={() => (
            (keyword && invitations.length == 0) && <View style={[globalStyles.mt10, globalStyles.mb20]}>
              <CustomText text='No users found' size={16} style={globalStyles.centerText} color={theme.colors.text} />
            </View>
          )}
          ListFooterComponent={() => (
            <View>

              {!team && <View style={globalStyles.mt10}>
                <PrimaryButton
                  text={t('create-team')}
                  icon={<UsersIconOutline color={theme.colors.white} size={22} />}
                  onPress={() => navigation.navigate('InvitationsScreen')}
                />
              </View>}

              {team && <View>
                <View style={globalStyles.mt10}>
                  <PrimaryButton
                    text={t('invitations')}
                    icon={<CalendarIcon size={26} color={theme.colors.white} />}
                    onPress={() => navigation.navigate('InvitationsScreen')}
                  />
                </View>

                <View style={[globalStyles.mt10, globalStyles.mb20]}>
                  <NeutralButton
                    variant='outlined'
                    text={t('invite-new-agent')}
                    icon={<Ionicons name='add-circle-outline' color={theme.colors.text} size={26} />}
                    onPress={() => navigation.navigate('InviteAgents')}
                  />
                </View>
              </View>}
            </View>
          )}
        />)}
    </View>
  )
}