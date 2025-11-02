import { View, FlatList, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ESearchBy, ESearchFilter } from 'src/enum/ESearchBy'
import { useAuth } from 'src/context/AuthContext';
import { useSearchCases } from 'src/hooks/useCases';
import CaseItem from 'src/components/common/CaseItem/CaseItem';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import EmptyView from 'src/components/common/EmptyView/EmptyView';
import { Tabs } from 'react-native-collapsible-tab-view'
import FastImage from 'react-native-fast-image';
import { EPermission } from 'src/enum/EPermission';
import LoadingScreen from 'src/screens/core/LoadingScreen/LoadingScreen';
import Spacer from 'src/components/common/Spacer/Spacer';

interface Props {
  filter: ESearchFilter;
  searchBy: ESearchBy;
  keyword: string;
}

export default function CasesList({ filter, searchBy, keyword }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { user } = useAuth();
  const [page, setPage] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(30);
  const [cases, setCases] = useState<any[]>([]);
  const globalStyles = useGlobalStyles();
  const [permission, setPermission] = useState<EPermission>(EPermission.VIEWER);
  const [complete, setComplete] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const onSuccess = (data: any) => {
    const newItems = data.data.procedures.filter(
      (newItem: any) => !cases.some((existingItem) => existingItem.id === newItem.id)
    );
    setPermission(data.data.permission);
    setCases(prev => [...prev, ...newItems]);
    setHasMore(newItems.length >= pageLimit);
    setTimeout(() => {
      setComplete(true);
    }, 300);
  }


  const { data, refetch, isLoading, isFetching } = useSearchCases({
    userId: user.id,
    page,
    pageLimit,
    search_by: searchBy,
    filter,
    value: keyword
  }, {
    enabled: false,
    onSuccess,
    onError: (err: any) => console.log('err', err),
  })

  useEffect(() => {
    refetch();
  }, [user.id, page, searchBy, filter]);

  useEffect(() => {
    setCases([]);
    refetch();
  }, [keyword]);

  useEffect(() => {
    refetch()
  }, [page]);

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const renderItem = useCallback(
    ({ item, index }: any) => (
      <View style={[
        styles.caseItemContainer,
        globalStyles.mh15,
        index == 0 ? globalStyles.mt15 : null,
      ]}>
        <CaseItem item={item} permission={permission} />
      </View>
    ),
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.topBackground }}>
      <Tabs.FlatList
        data={cases}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        bounces={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        keyboardDismissMode="on-drag"
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
          if (!complete) {
            return <LoadingScreen />
          } else {
            return <EmptyView
              text="No Cases Available"
              icon={<FastImage source={require('assets/images/emptyCase.png')}
                style={{ width: 200, height: 200 }}
                resizeMode='contain' />} />
          }
        }}
        ListFooterComponent={
          (hasMore && complete) ? (
            <View style={globalStyles.footerLoadingContainer}>
              <LoadingScreen />
            </View>
          ) : (
            <Spacer height={20} />
          )
        }
      />
    </View>
  )
}
