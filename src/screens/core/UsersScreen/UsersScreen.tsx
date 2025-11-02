import { View, FlatList, Keyboard, RefreshControl } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { useGetStaff } from 'src/hooks/useUsers'
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

export default function UsersScreen() {
  const { user } = useAuth();
  const navigation: any = useNavigation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [keyword, setKeyword] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const [staff, setStaff] = useState<any[]>([]);

  const { data, refetch: refetchStaff, isLoading } = useGetStaff(user.id, {
    onSuccess: (data: any) => {
      const filtered = data?.data?.user_staff?.filter((staff: any) => staff.end_user !== null);
      const sorted = filtered.sort((a: any, b: any) => {
        return a.status.localeCompare(b.status);
      });
      setStaff(sorted);
      setRefreshing(false);
    },
    onError: (err: any) => console.log('err', err),
  });

  const renderUser = useCallback(({ item }: any) => {
    return (
      <View style={globalStyles.mb10}>
        <UserCard item={item} refetchStaff={refetchStaff} />
      </View>
    )
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchStaff();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetchStaff();
    }, [])
  );

  const memoizedStaff = useMemo(() => {
    return staff?.filter((item: any) => {
      const email = item?.end_user?.email || '';
      const name = `${item?.end_user?.first_name} ${item?.end_user?.last_name}`;
      const permission = item?.permission;
      return (
        email.toLowerCase().includes(keyword.toLowerCase())
        || name.toLowerCase().includes(keyword.toLowerCase())
        || permission.toLowerCase().includes(keyword.toLowerCase())
      )
    });
  }, [keyword, staff]);


  return (
    <View style={styles.container}>

      <View style={[globalStyles.mv20]}>
        <SearchInput
          onChangeText={setKeyword}
          placeholder="Search"
          value={keyword}
        />
      </View>

      {isLoading
        ? (
          <View style={globalStyles.flex1}>
            <LoadingScreen />
          </View>)
        : (<FlatList
          data={memoizedStaff || []}
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
            (keyword && memoizedStaff.length == 0)&& <View style={[globalStyles.mt10, globalStyles.mb20]}>
              <CustomText text='No users found' size={16} style={globalStyles.centerText} color={theme.colors.text} />
            </View>
          )}
          ListFooterComponent={() => (
            <View>

              <View style={globalStyles.mt10}>
                <PrimaryButton
                  text={'Invitations'}
                  icon={<CalendarIcon size={26} color={theme.colors.white} />}
                  onPress={() => navigation.navigate('InvitationsScreen')}
                />
              </View>

              <View style={[globalStyles.mt10, globalStyles.mb20]}>
                <NeutralButton
                  variant='outlined'
                  text={'Invite users'}
                  icon={<Ionicons name='add-circle-outline' color={theme.colors.text} size={26} />}
                  onPress={() => navigation.navigate('InviteUsers')}
                />
              </View>
            </View>
          )}
        />)}
    </View>
  )
}