import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { ESearchBy, ESearchFilter } from 'src/enum/ESearchBy';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from 'src/components/common/CustomText/CustomText';
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog';
import { ErrorButton, SuccessButton } from 'src/components/buttons/CustomButton/variants';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import { useExportCases } from 'src/hooks/useCases';
import { useAuth } from 'src/context/AuthContext';
import * as casesService from 'src/services/casesService';
import { EExportType } from 'src/enum/EExportType';
import * as appService from 'src/services/appService';
import Collapsible from 'src/components/Collapsible/Collapsible';
import CollapsibleTwo from 'src/components/common/CollapsibleTwo/CollapsibleTwo';

const Tab = createMaterialTopTabNavigator();

const defaultInitialValues = {
  search_by: ESearchBy.INFO,
  filter: ESearchFilter.ALL,
};

export default function SearchScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation = useNavigation();
  const formikRef = useRef<any>(null);
  const { user } = useAuth();

  const [currentTab, setCurrentTab] = useState<ESearchFilter>(ESearchFilter.ALL);
  const [searchBy, setSearchBy] = useState<ESearchBy>(ESearchBy.INFO);
  const [keyword, setKeyword] = useState<string>('');

  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);

  const [loadingExportType, setLoadingExportType] = useState<EExportType | null>(null);

  const { mutate: exportMutation } = useExportCases(
    (data: any) => {
      if (data.status_code == 200) {
        console.log('hello world 2');
        setLoadingExportType(null)
        setExportModalOpen(false);
        appService.showToast('Exporting now. Once done, you will find the files under Exported Procedures.', 'success');
      } else {
        console.log('hello world 3');
      }
    },
    (err: any) => {
      appService.showToast(err, 'error');
      setLoadingExportType(null)
    },
  )

  const exportCases = async (exportType: EExportType) => {
    console.log('exporting');
    setLoadingExportType(exportType);
    const { data } = await casesService.searchCases({
      userId: user.id,
      page: 0,
      pageLimit: 1000,
      filter: currentTab,
      search_by: searchBy,
      value: keyword
    });

    if (data.procedures_count == 0) {
      setLoadingExportType(null)
      setExportModalOpen(false);
      appService.showToast('No procedures to export', 'error');
      return;
    }
    const ids = data?.procedures?.map((item: any) => item.id);

    exportMutation({
      userId: user.id,
      dto: {
        procedure_ids: ids,
        type: exportType
      }
    });
  }

  const exportModalButtons = [
    {
      text: 'EXPORT AS EXCEL',
      onPress: () => exportCases(EExportType.EXCEL),
      disabled: loadingExportType !== null,
      loading: loadingExportType === EExportType.EXCEL,
      button: SuccessButton
    },
    {
      text: 'EXPORT AS PDF',
      onPress: () => exportCases(EExportType.PDF),
      disabled: loadingExportType !== null,
      loading: loadingExportType === EExportType.PDF,
      button: ErrorButton
    },
    {
      text: 'NO',
      onPress: () => setExportModalOpen(false),
      disabled: loadingExportType !== null,
      button: NeutralButton
    }
  ];


  const openExportModal = () => {
    setExportModalOpen(true);
  }

  useFocusEffect(
    useCallback(() => {
      const parentNavigation = navigation.getParent();
      parentNavigation?.setOptions({
        headerTitle: 'Search',
        headerRight: () => (
          <TouchableOpacity style={globalStyles.headerRightButton} onPress={openExportModal}>
            <CustomText text={'Export'} size={16} color={theme.colors.text} fontWeight='medium' />
          </TouchableOpacity>
        ),
        headerLeft: () => null,
      });
    }, [])
  );

  return (
    <>
      <KeyboardAvoidingView
        style={[styles.container, { flex: 1 }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <View style={globalStyles.flex1}>
          <CollapsibleTwo
            keyword={keyword}
            setKeyword={setKeyword}
            searchBy={searchBy}
            setSearchBy={setSearchBy} />
        </View>

      </KeyboardAvoidingView>
      {/* Remove and Delete Dialog */}
      <CustomDialog
        visible={exportModalOpen}
        title={'Export Procedures'}
        message={'Are you sure you want to export those procedures?'}
        buttons={exportModalButtons}
        onClose={() => setExportModalOpen(false)} />

    </>
  );
}
