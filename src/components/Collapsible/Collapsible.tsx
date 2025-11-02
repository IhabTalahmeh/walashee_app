// CollapsibleTabView.js
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
// import ProfilePhotos from '../../components/profile/ProfilePhotos';
// import ProfileVideos from '../../components/profile/ProfileVideos';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CollapsibleContent from './CollapsibleContent/CollapsibleContent';
import Header from './Header/Header';
import Tabs from './Tabs/Tabs';
import { ESearchFilter, ESearchBy } from 'src/enum/ESearchBy';

const Collapsible = () => {
  const navigation: any = useNavigation();
  const [tabIndex, setIndex] = useState(0);
  const route: any = useRoute();
  const { id } = route?.params || 1;
  const scrollY = useRef<any>(new Animated.Value(0)).current;
  const listRefArr = useRef<any>([]);
  const listOffset = useRef<any>({});
  const isListGliding = useRef<any>(false);
  const userOptionsRef = useRef<BottomSheetModal>(null);

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const [searchBy, setSearchBy] = useState<ESearchBy>(ESearchBy.INFO);
  const [keyword, setKeyword] = useState<string>('');

  const tabs = useMemo(() => [
    { name: 'all', title: 'All', component: () => <CollapsibleContent filter={ESearchFilter.ALL} searchBy={searchBy} keyword={keyword} scrollY={scrollY} /> },
    { name: 'day', title: 'Day', component: () => <CollapsibleContent filter={ESearchFilter.DAY} searchBy={searchBy} keyword={keyword} scrollY={scrollY} /> },
    { name: 'week', title: 'Week', component: () => <CollapsibleContent filter={ESearchFilter.WEEK} searchBy={searchBy} keyword={keyword} scrollY={scrollY} /> },
    { name: 'month', title: 'Month', component: () => <CollapsibleContent filter={ESearchFilter.MONTH} searchBy={searchBy} keyword={keyword} scrollY={scrollY} /> },
  ], [searchBy, keyword, scrollY]);


  const handleOpenUserOptionsRef = useCallback(() => {
    userOptionsRef.current?.present();
  }, []);

  const handleCloseUserOptionsRef = useCallback(() => {
    userOptionsRef.current?.dismiss();
  }, []);

  const getUserById = async () => {
    try {
      navigation.setOptions({
        headerTitle: () => (
          <View>
            <Text style={globalStyles.headerTitle}>asdf</Text>
          </View>
        ),
        headerRight: () => (
          <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.ph5]}>
            <TouchableOpacity style={globalStyles.ph5}>
              <Ionicons name='chatbubble-ellipses-outline' size={24} color={theme.colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.ph5} onPress={handleOpenUserOptionsRef}>
              <Ionicons name='ellipsis-vertical' size={22} color={theme.colors.black} />
            </TouchableOpacity>
          </View>
        )
      });
    } catch (error) {
      console.log('error getting user', error);
    }
  }

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }: any) => {
      const currentRoute = tabs[tabIndex].name;
      listOffset.current[currentRoute] = value;
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [tabs, tabIndex, scrollY]);


  return (
    <View style={styles.container}>
      <Tabs
        tabs={tabs}
        tabIndex={tabIndex}
        setIndex={setIndex}
        scrollY={scrollY}
        listRefArr={listRefArr}
        listOffset={listOffset}
        isListGliding={isListGliding}
      />
      <Header
        scrollY={scrollY}
        keyword={keyword}
        setKeyword={setKeyword}
        setSearchBy={setSearchBy}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Collapsible;
