import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useGetCases } from 'src/hooks/useCases';
import { useAuth } from 'src/context/AuthContext';
import CaseItem from 'src/components/common/CaseItem/CaseItem';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NoCasesAvailable from 'src/components/Placeholders/NoCasesAvailable/NoCasesAvailable';
import { ECaseFilter } from 'src/enum/ECaseFilter';
import { sort } from 'src/common/utils';
import { EPermission } from 'src/enum/EPermission';
import { PeriodFilterItem } from 'src/types/types/Types';

interface Props {
  selected: PeriodFilterItem;
}

function PeriodCasesScreen({ selected }: Props) {
  const navigation = useNavigation();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState<number>(300);
  const [cases, setCases] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [casesLength, setCasesLength] = useState<number>(0);

  const onSuccess = (data: any) => {
    const newCases = data.data?.procedures || [];
    setHasMore(newCases.length >= pageLimit);
    setIsFetching(false);
  };

  const onError = (error: any) => {
    setIsFetching(false);
  };

  const { data: originalCases, refetch } = useGetCases(
    {
      userId: user.id,
      page,
      pageLimit,
      filter: selected?.route == ECaseFilter.THIS_WEEK ? ECaseFilter.THIS_WEEK : ECaseFilter.THIS_MONTH,
      before: '',
    },
    {
      enabled: false,
      onSuccess,
      onError,
    }
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     refreshCurrentPeriod();
  //   }, [])
  // )

  const handleRefetch = async () => {
    if (page > 0) {
      setIsFetching(true);
      await refetch();
      refreshCurrentPeriod();
    }
  };


  useEffect(() => {
    handleRefetch();
  }, [page]);

  useEffect(() => {
    onRefresh();
  }, [selected.route]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(0);
    setHasMore(true);
  }, []);

  useEffect(() => {
    if (refreshing) {
      setIsFetching(true);
      refetch().then(() => {
        refreshCurrentPeriod();
      }).finally(() => {
        setRefreshing(false);
      });
    }
  }, [refreshing]);

  const title = useMemo(() => {
    switch (selected.route) {
      case 'OLDER':
        return 'Older';
      case 'THIS_MONTH':
        return 'This Month';
      case 'THIS_WEEK':
        return 'This Week';
      case 'UPCOMING':
        return 'Upcoming';
      case 'TODAY':
        return 'Today';
    }
  }, [selected.route, casesLength]);

  const isToday = (dateStr: string) => {
    const today = new Date();
    const date = new Date(dateStr);
    return (
      today.toDateString() === date.toDateString()
    );
  };

  const isThisWeek = (dateStr: string) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const date = new Date(dateStr);
    return date >= startOfWeek && date <= endOfWeek;
  };

  const isThisMonth = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    return now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear();
  };

  const getTodayCases = async () => {
    const response = await refetch();
    const filtered = response.data?.data?.procedures?.filter((c: any) =>
      isToday(c.date_of_procedure)
    );
    if (filtered?.length > 0) setCases(sort(filtered));
  };

  const getWeekCases = async () => {
    const response = await refetch();
    const filtered = response.data?.data?.procedures?.filter((c: any) =>
      isThisWeek(c.date_of_procedure)
    );
    if (filtered?.length > 0) setCases(sort(filtered));
  };

  const getMonthCases = async () => {
    const response = await refetch();
    const filtered = response.data?.data?.procedures?.filter((c: any) =>
      isThisMonth(c.date_of_procedure)
    );
    if (filtered?.length > 0) setCases(sort(filtered));
  };

  const refreshCurrentPeriod = async () => {
    const response = await refetch();
    const procedures = response.data?.data?.procedures || [];

    switch (selected.route) {
      case ECaseFilter.TODAY:
        setCases(sort(procedures.filter((c: any) => isToday(c.date_of_procedure))));
        break;
      case ECaseFilter.THIS_WEEK:
        setCases(sort(procedures.filter((c: any) => isThisWeek(c.date_of_procedure))));
        break;
      case ECaseFilter.THIS_MONTH:
        setCases(sort(procedures.filter((c: any) => isThisMonth(c.date_of_procedure))));
        break;
      default:
        setCases([]); // fallback or custom logic for other filters
    }
  };


  useEffect(() => {
    refreshCurrentPeriod();
  }, [selected]);

  useEffect(() => {
    setCasesLength(cases.length);
  }, [cases]);

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const renderItem = useCallback(
    ({ item }: any) => (
      <View style={[
        globalStyles.mt10,
        globalStyles.mh10,
      ]}>
        <CaseItem item={item} permission={EPermission.EDITOR} />
      </View>
    ),
    []
  );

  useEffect(() => {
    navigation.setOptions({
      title: `${title} (${casesLength})`
    })
  }, [selected.route, casesLength])

  return (
    <View style={styles.container}>
      <FlatList
        data={cases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
        ListFooterComponent={
          (hasMore && !refreshing) ? (
            <View style={[globalStyles.aic, globalStyles.jcc, globalStyles.footerLoadingContainer]}>
              <ActivityIndicator size={30} color={theme.colors.text} />
            </View>
          ) : null
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
          const isTrulyEmpty = !casesLength && !isFetching && !refreshing && !hasMore;
          return isTrulyEmpty ? <NoCasesAvailable /> : null;
        }}

      />

    </View>
  );
}

export default memo(PeriodCasesScreen);
