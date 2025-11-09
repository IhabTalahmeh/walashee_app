import { View, FlatList, Keyboard, RefreshControl } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { useAuth } from 'src/context/AuthContext'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import UserCard from 'src/components/User/UserCard/UserCard';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import CalendarIcon from 'src/icons/CalendarIcon';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTranslation } from 'react-i18next';
import { EInvitationType } from 'src/enum/EInvitationType';
import UsersIconOutline from 'src/icons/UsersIconOutline';
import { useGetTeam, useGetTeamInvitations } from 'src/hooks/useTeam';
import ParentTeam from 'src/screens/Team/ParentTeam/ParentTeam';
import MyTeam from 'src/screens/Team/MyTeam/MyTeam';

export default function AG_TeamScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigation: any = useNavigation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [keyword, setKeyword] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const { data: team, isLoading, refetch: refetchTeam } = useGetTeam(user.id);


  const renderUser = useCallback(({ item }: any) => {
    return (
      <View style={globalStyles.mb10}>
        <UserCard item={item} />
      </View>
    )
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetchTeam()
    }, [])
  );

  return (
    <View style={styles.container}>

      {isLoading
        ? (
          <View style={globalStyles.flex1}>
            <LoadingScreen />
          </View>)
        : (
          <View>

            <View style={globalStyles.mt15}>
              <ParentTeam />
            </View>

            <View style={globalStyles.mt15}>
              <MyTeam />
            </View>

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
    </View>
  )
}