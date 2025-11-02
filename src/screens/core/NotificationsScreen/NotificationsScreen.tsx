import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetProcedureInvitations } from 'src/hooks/useProcedure'
import CustomText from 'src/components/common/CustomText/CustomText';
import NotificationItem from 'src/components/common/NotificationItem/NotificationItem';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import Spacer from 'src/components/common/Spacer/Spacer';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import EmptyView from 'src/components/common/EmptyView/EmptyView';
import { useRoute } from '@react-navigation/native';

const intervalTimeout = 10000;

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const route: any = useRoute();
  const [loaded, setLoaded] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<any>([]);

  const { isLoading, isFetching, refetch: refetchNotifications } = useGetProcedureInvitations({
    onSuccess: (data: any) => {
      setLoaded(true);
      const newNotifications = data.data.results;

      setNotifications((prev: any) => {
        const merged = [...prev, ...newNotifications];
        const unique = merged.filter(
          (notif, index, self) =>
            index === self.findIndex((n) => n.id === notif.id)
        );
        return unique;
      });
    }
  });

  const removeNotification = (notificationId: number) => {
    const filtered = notifications.filter((n: any) => n.id != notificationId);
    setNotifications([...filtered])
  }

  const renderItem = useCallback(({ item, index }: any) => {
    return (
      <View style={[
        globalStyles.mh15,
        globalStyles.mt10,
      ]}>
        <NotificationItem item={item} removeNotification={removeNotification} />
      </View>
    )
  }, [globalStyles, removeNotification]);


  useEffect(() => {
    const interval = setInterval(() => {
      refetchNotifications();
    }, intervalTimeout);

    return () => {
      clearInterval(interval);
      route.params.onGoBack();
    }
  }, []);

  if (isLoading || !loaded) {
    return <LoadingScreen />
  }

  return (
    <View style={globalStyles.flex1}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListFooterComponent={<Spacer height={30} />}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={globalStyles.flex1}>
            <EmptyView text="You have no notifications at the moment" />
          </View>
        )}
      />
    </View>
  )
}