import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import PositionIcon from 'src/icons/PositionIcon';
import CustomText from 'src/components/common/CustomText/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DashboardIcon from 'src/icons/DashboardIcon';
import { useGetDoctors } from 'src/hooks/useUsers';
import { useAuth } from 'src/context/AuthContext';
import { EUsersFilter } from 'src/enum/EUsersFilter';
import SharedDashboardItem from 'src/components/User/SharedDashboardItem/SharedDashboardItem';
import LoadingScreen from 'src/screens/core/LoadingScreen/LoadingScreen';
import EmptyView from 'src/components/common/EmptyView/EmptyView';

export default function SharedDashboards() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const { data: dashboard, isLoading, isFetching } = useGetDoctors({
    userId: user.id,
    filter: EUsersFilter.MY_TEAMS,
  }, {
    onSuccess: (data: any) => { },
    onError: (error: any) => { }
  });

  const renderDashboardItem = useCallback(({ item }: any) => {
    return (
      <View style={globalStyles.mt10}>
        <SharedDashboardItem item={item} />
      </View>
    )
  }, []);

  return (
    <View style={globalStyles.flex1}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcb, globalStyles.flex1]}>
          <View style={[globalStyles.flexRow, globalStyles.aic]}>
            <View style={styles.iconContainer}>
              <DashboardIcon size={24} color={theme.colors.primary} />
            </View>
            <CustomText text='Other Dashboards' size={16} color={theme.colors.text} fontWeight='medium' style={globalStyles.ml10} />
          </View>
        </View>
      </View>

      {/* Content */}
      <FlatList
        data={dashboard?.doctors || []}
        keyExtractor={(item) => item.id}
        renderItem={renderDashboardItem}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={() => {
          if (isFetching || isLoading) {
            return <LoadingScreen />
          } else {
            return <EmptyView text="You don't have any shared dashboards"/>
          }
        }}
      />

    </View>
  )
}