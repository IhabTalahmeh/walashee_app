import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useGetNotifications } from 'src/hooks/useNotifications';
import NotificationItem from 'src/components/common/NotificationItem/NotificationItem';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';

export default function NotificationsScreen() {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const globalStyles = useGlobalStyles();

  const { data: notifications, refetch: refetchNotifications } = useGetNotifications({ page, size });

  const renderItem = useCallback(({ item }: any) => {
    return (
      <View style={[globalStyles.mt5, globalStyles.mh5]}>
        <NotificationItem item={item} refetchNotifications={refetchNotifications} />
      </View>
    )
  }, [])

  return (
    <View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem} />
    </View>
  )
}