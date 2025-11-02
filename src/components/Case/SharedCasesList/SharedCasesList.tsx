import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from 'src/context/AuthContext';
import { useGetCases } from 'src/hooks/useCases';
import CaseItem from 'src/components/common/CaseItem/CaseItem';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import EmptyView from 'src/components/common/EmptyView/EmptyView';
import FastImage from 'react-native-fast-image';
import { ESharedCaseFilter } from 'src/enum/ESharedCaseFilter';
import { useSharedDashboard } from 'src/context/SharedDashboardContext';

interface Props {
  filter: ESharedCaseFilter;
  doctorId: number;
}

export default function SharedCasesList({ filter, doctorId }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { user } = useAuth();
  const [page, setPage] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(30);
  const [cases, setCases] = useState<any[]>([]);
  const globalStyles = useGlobalStyles();
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { permission } = useSharedDashboard();

  const onSuccess = (data: any) => {
    const newItems = data.data.procedures.filter(
      (newItem: any) => !cases.some((existingItem) => existingItem.id === newItem.id)
    );
    if (page == 0) {
      setCases(data.data.procedures)
      setHasMore(data.data.procedures.length >= pageLimit);
    } else {
      setCases(prev => [...prev, ...newItems]);
      setHasMore(newItems.length >= pageLimit);
    }
    setRefreshing(false);
  }

  const onError = (error: any) => {
    console.log('error', error);
  }

  const { refetch, isFetching, isLoading } = useGetCases(
    {
      userId: doctorId,
      page,
      pageLimit,
      filter: filter,
      before: '',
    },
    {
      enabled: false,
      onSuccess,
      onError,
    }
  );

  useEffect(() => {
    if (doctorId && page === 0) {
      refetch();
    }
  }, [doctorId, filter]);

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    refetch();
  }, [page])

  const onRefresh = () => {
    setHasMore(true);
    setRefreshing(true);
    if (page == 0) {
      refetch();
    } else {
      setPage(0);
    }
  }

  const renderItem = useCallback(
    ({ item, index }: any) => (
      <View style={[
        styles.caseItemContainer,
        globalStyles.mh15,
        index == 0 ? globalStyles.mt10 : null,
      ]}>
        <CaseItem item={item} permission={permission} />
      </View>
    ),
    [permission]
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.topBackground }}>
      <FlatList
        data={cases || []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.text}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        CellRendererComponent={({ item, index, children, style, ...props }) => (
          <View
            {...props}
            style={[
              style,
              {
                zIndex: 999 - index,
                position: 'relative',
              },
            ]}
          >
            {children}
          </View>
        )}
        ListEmptyComponent={() => {
          if (!isFetching && !refreshing && cases.length == 0 && !hasMore) {
            return (
              <EmptyView
                text="No Cases Available"
                icon={<FastImage source={require('assets/images/emptyCase.png')}
                  style={{ width: 200, height: 200 }}
                  resizeMode='contain' />} />
            )
          }
        }}
        ListFooterComponent={
          (hasMore && !refreshing) ? (
            <View style={[globalStyles.aic, globalStyles.jcc, globalStyles.footerLoadingContainer]}>
              <ActivityIndicator size={30} color={theme.colors.text} />
            </View>
          ) : null
        }
      />
    </View>
  )
}
