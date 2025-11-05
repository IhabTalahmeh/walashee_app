import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from 'src/context/AuthContext';
import CaseItem from 'src/components/common/CaseItem/CaseItem';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGetCases } from 'src/hooks/useCases';
import EmptyView from 'src/components/common/EmptyView/EmptyView';
import FastImage from 'react-native-fast-image';
import { EPermission } from 'src/enum/EPermission';
import Spacer from 'src/components/common/Spacer/Spacer';
import { PeriodFilterItem } from 'src/types/types/Types';
import { ECaseFilter } from 'src/enum/ECaseFilter';

interface Props {
  selected: PeriodFilterItem;
}

function CasesScreen({ selected }: Props) {
  const navigation = useNavigation();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { user } = useAuth();
  const route: any = useRoute();

  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState<number>(30);
  const [cases, setCases] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [casesLength, setCasesLength] = useState<number>(0);
  const [beforeDate, setBeforeDate] = useState<string>('');

  const onSuccess = (data: any) => {
    setCasesLength(data.data.procedures_count);
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
  };

  const onError = (error: any) => {
    console.log('error', JSON.stringify(error));
  };

  const { refetch, isFetching } = useGetCases(
    {
      userId: user.id,
      page,
      pageLimit,
      filter: route.name,
      before: route.name == ECaseFilter.OLDER ? beforeDate : '',
    },
    {
      enabled: false,
      onSuccess,
      onError,
    }
  );

  useEffect(() => {
    refetch();
  }, [beforeDate]);

  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //   }, [])
  // )

  useEffect(() => {
    setPage(0);
    setCases([]);
    setHasMore(true);
    refetch();
  }, [route.name]);

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const onRefresh = () => {
    setHasMore(true);
    setRefreshing(true);
    if (page == 0) {
      refetch();
    } else {
      setPage(0);
    }
  }

  useEffect(() => {
    refetch();
  }, [page])

  const setTodayBeforeDate = () => {
    const today = new Date();
    const ctOptions = { timeZone: 'America/Chicago' };
    const ctYear = today.toLocaleDateString('en-US', { year: 'numeric', ...ctOptions });
    const ctMonth = String(today.getMonth() + 1).padStart(2, '0');
    const ctDay = String(today.getDate()).padStart(2, '0');
    const ctToday = `${ctYear}-${ctMonth}-${ctDay}`;
    setBeforeDate(ctToday);
  }

  const setThisWeekBeforeDate = () => {
    const today = new Date();
    const sunday = new Date(today.setDate(today.getDate() - today.getDay()));
    const date = sunday.toISOString().split('T')[0];
    setBeforeDate(date);
  }

  const setThisMonthBeforeDate = () => {
    const today = new Date();
    setBeforeDate(`${today.getFullYear()}-${today.getMonth()}-1`);
    console.log('before date is', `${today.getFullYear()}-${today.getMonth()}-1`)
  }

  useEffect(() => {
    switch (selected.route) {
      case ECaseFilter.TODAY:
        setTodayBeforeDate();
        break;
      case ECaseFilter.THIS_WEEK:
        setThisWeekBeforeDate();
        break;
      case ECaseFilter.THIS_MONTH:
        setThisMonthBeforeDate();
        break;
      default:
        setBeforeDate('');
    }
  }, [selected]);

  const renderItem = useCallback(
    ({ item, index }: any) => (
      <View style={[
        globalStyles.mt10,
        globalStyles.mh15,
      ]}>
        <CaseItem item={item} permission={EPermission.EDITOR} />
      </View>
    ),
    []
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={cases}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ flexGrow: 1 }}
          ListFooterComponent={
            (hasMore && !refreshing) ? (
              <View style={[globalStyles.aic, globalStyles.jcc, { height: casesLength == 0 ? '100%' : 100 }]}>
                <ActivityIndicator size={30} color={theme.colors.text} />
              </View>
            ) : (
              <Spacer height={20} />
            )
          }
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.text}
            />
          }
          ListEmptyComponent={() => {
            if (!isFetching && !refreshing && casesLength == 0 && !hasMore)
              return (
                <EmptyView
                  text="No Cases Available"
                  icon={<FastImage source={require('assets/images/emptyCase.png')}
                    style={{ width: 200, height: 200 }}
                    resizeMode='contain' />} />
              )
          }}
        />
      </View>

    </>
  );
}

export default memo(CasesScreen);
