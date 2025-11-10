import { View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from 'src/context/AuthContext'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import UserCard from 'src/components/User/UserCard/UserCard';
import CalendarIcon from 'src/icons/CalendarIcon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useTranslation } from 'react-i18next';
import { useGetTeam } from 'src/hooks/useTeam';
import ParentTeam from 'src/screens/Team/ParentTeam/ParentTeam';
import MyTeam from 'src/screens/Team/MyTeam/MyTeam';
import HeaderCircleButton from 'src/components/buttons/HeaderCircleButton/HeaderCircleButton';

export default function AG_TeamScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigation: any = useNavigation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [refreshing, setRefreshing] = useState(false);

  const { data: team, isLoading, refetch: refetchTeam } = useGetTeam(user.id);


  const renderUser = useCallback(({ item }: any) => {
    return (
      <View style={globalStyles.mb10}>
        <UserCard item={item} teamId={team.id} />
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <HeaderCircleButton
            icon={<CalendarIcon size={24} color={theme.colors.text} />}
            onPress={() => navigation.navigate('InvitationsScreen')}
          />
        </View>
      )
    })
  }, [team]);

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

          </View>
        )}
    </View>
  )
}