import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, View, Dimensions, Platform } from 'react-native';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import CaseItem from 'src/components/common/CaseItem/CaseItem';
import { useAuth } from 'src/context/AuthContext';
import { useSearchCases } from 'src/hooks/useCases';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { searchHeaderHeight } from 'src/styles/globalStyles';
import EmptyView from 'src/components/common/EmptyView/EmptyView';
import { hexWithOpacity } from 'src/common/utils';
import DocIcon from 'src/icons/DocIcon';
import FastImage from 'react-native-fast-image';
import { EPermission } from 'src/enum/EPermission';
import Spacer from 'src/components/common/Spacer/Spacer';

const TabBarHeight = 48;

const CollapsibleContent = ({
  scrollY,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  onGetRef,
  filter,
  searchBy,
  keyword,
}: any) => {

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const [cases, setCases] = useState<any[]>([]);
  const { user } = useAuth();
  const [page, setPage] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(30);

  const onSuccess = (data: any) => {
    const newItems = data.data.procedures?.filter(
      (newItem: any) => !cases.some((existingItem) => existingItem.id === newItem.id)
    ) || [];
    setCases(prev => [...prev, ...newItems]);
  }

  const { data, refetch, isLoading } = useSearchCases({
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

  const renderItem = useCallback(
    ({ item, index }: any) => (
      <View style={[
        globalStyles.mt10,
        index == 0 ? { marginTop: 20 } : null,
      ]}>
        <CaseItem item={item} permission={EPermission.EDITOR}/>
      </View>
    ),
    []
  );

  return (
    <Animated.FlatList
      numColumns={1}
      ref={onGetRef}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={{
        paddingTop: searchHeaderHeight + TabBarHeight,
        minHeight: Dimensions.get('window').height - TabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={cases || []}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      bounces={false}
      overScrollMode={Platform.OS === 'android' ? 'never' : 'auto'}
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
      ListEmptyComponent={() => (
        <EmptyView
          text="No Cases Available"
          icon={<FastImage source={require('assets/images/emptyCase.png')}
            style={{ width: 200, height: 200 }}
            resizeMode='contain' />} />
      )}
      ListFooterComponent={() => (
        <Spacer height={20} />
      )}
    />
  );
};

export default memo(CollapsibleContent);
