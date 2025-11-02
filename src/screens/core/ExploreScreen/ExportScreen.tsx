import { View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGetReports } from 'src/hooks/useCases';
import { useAuth } from 'src/context/AuthContext';
import CustomText from 'src/components/common/CustomText/CustomText';
import ExcelIcon from 'src/icons/ExcelIcon';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import Feather from 'react-native-vector-icons/Feather';
import PDFIcon from 'src/icons/PDFIcon';
import { useDownloadFile } from 'src/hooks/useUtility';
import * as appService from 'src/services/appService';
import EmptyView from 'src/components/common/EmptyView/EmptyView';

export default function ExportScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const [reports, setReports] = useState<any[]>([]);
  const navigation = useNavigation();
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [pageLimit] = useState<number>(30);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null);

  const { mutate: downloadMutation, isLoading } = useDownloadFile(
    (data: any) => appService.showToast('File downloaded successfully', 'success'),
    (error: any) => appService.showToast(error.message, 'error'),
  )

  const downloadFile = (fileInfo: any) => {
    setDownloadingFileId(fileInfo.id);
    downloadMutation({
      url: fileInfo.path,
      name: fileInfo.file_name,
    }, {
      onSettled: () => setDownloadingFileId(null),
    });
  };


  const onSuccess = (data: any) => {
    const newReports = Array.isArray(data?.data) ? data.data : [];

    const uniqueNewReports = newReports.filter((newReport: any) =>
      !reports.some(existingReport =>
        existingReport.id === newReport.id &&
        existingReport.file_name === newReport.file_name
      )
    );
    if (page == 1) {
      setReports([...newReports])
    } else {
      setReports(prev => [...prev, ...uniqueNewReports]);
    }
    setHasMore(newReports.length >= pageLimit);
    setRefreshing(false);
  };

  const onError = (error: any) => {
    console.log('error', error);
    setRefreshing(false);
  }

  const { data, refetch: refetchReports, isFetching } = useGetReports({
    userId: user.id,
    page,
    pageLimit
  }, {
    onSuccess: onSuccess,
    onError: onError,
  });

  useFocusEffect(
    useCallback(() => {
      const parentNavigation = navigation.getParent();
      parentNavigation?.setOptions({
        headerTitle: 'Export Procedures',
        headerRight: () => null,
        headerLeft: () => null,
      });
    }, [])
  );

  useEffect(() => {
    refetchReports()
  }, [page]);

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (page == 1) {
      refetchReports();
    } else {
      setPage(1);
    }
  }

  const renderItem = useCallback(({ item }: any) => {
    const isItemLoading = downloadingFileId === item.id;

    const Icon = item.extension == 'xlsx' ? ExcelIcon : PDFIcon;
    return (
      <View style={[styles.fileContainer, globalStyles.mb10]}>
        <View>
          <Icon size={45} />
        </View>
        <CustomText text={item.file_name} color={theme.colors.text} size={16} style={[globalStyles.ph10, globalStyles.flex1]} numberOfLines={1} ellipsizeMode='tail' />
        <TouchableOpacity style={globalStyles.p5} onPress={() => downloadFile(item)}>
          {isItemLoading ? (
            <ActivityIndicator size={22} color={theme.colors.primary} />
          ) : (
            <Feather name='download' size={22} color={theme.colors.primary} />
          )}
        </TouchableOpacity>
      </View>
    )
  }, [downloadingFileId]);

  return (
    <View style={[styles.container, globalStyles.ph20]}>
      <FlatList
        data={reports || []}
        keyExtractor={(item) => `${item.id}-${item.file_name}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.text}
          />
        }
        contentContainerStyle={[globalStyles.pb10, globalStyles.flexGrow1]}
        ListFooterComponent={
          (hasMore && !refreshing) ? (
            <View style={[globalStyles.aic, globalStyles.jcc, globalStyles.footerLoadingContainer]}>
              <ActivityIndicator size={30} color={theme.colors.text} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <EmptyView text='You have no exported procedures' />
        }
      />
    </View>
  )
}