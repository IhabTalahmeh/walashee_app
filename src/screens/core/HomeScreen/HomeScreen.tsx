import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'src/context/AuthContext';
import UserAvatar from 'src/components/common/UserAvatar/UserAvatar';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import BellIcon from 'src/icons/BellIcon';
import { createStyles } from './styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyTabBar from './MyTabBar';
import { fonts } from 'src/styles/theme';
import { Portal } from 'react-native-portalize';

// Replace these with your actual screen components
import CasesScreen from '../CasesScreen/CasesScreen';
import PeriodCasesScreen from '../CasesScreen/PeriodCasesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProcedureNotificationsIcon from 'src/components/Case/ProcedureNotificationsIcon/ProcedureNotificationsIcon';
import { ECaseFilter } from 'src/enum/ECaseFilter';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from 'src/components/common/LanguageSelector/LanguageSelector';


const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const globalStyles = useGlobalStyles();
  const { theme, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();

  const openMenu = () => {
    navigation.navigate('MenuScreen');
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitleContainerStyle: {
        flex: 1,
      },
      headerLeft: () => (
        <UserAvatar size={54} uri={user?.profile_image?.href_small} onPress={openMenu} />
      ),
      headerTitle: () => (
        <TouchableOpacity style={globalStyles.ml10} onPress={openMenu}>
          <CustomText
            text={`${user.fullName}`}
            size={18}
            color={theme.colors.text}
            fontWeight="semiBold"
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <ProcedureNotificationsIcon />
      ),
    });
  }, [user, theme.mode]);


  const CasesScreen2 = () => {
    return (
      <View>
        <LanguageSelector />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flashListWrapper}>
        <Tab.Navigator
          screenOptions={{
            swipeEnabled: true,
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.primary,
              height: 3,
              borderRadius: 2,
              bottom: 0,
            },
            tabBarLabelStyle: {
              textTransform: 'none',
              fontSize: 14,
              fontFamily: fonts.medium,
              textAlignVertical: 'center',
              height: 35,
            },
            tabBarStyle: {
              justifyContent: 'space-evenly',
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              backgroundColor: theme.colors.background,
              overflow: 'hidden'
            },
            tabBarItemStyle: {
              flex: 1,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.text,
          }}
        >
          {/* 👇 HERE ARE YOUR TABS */}
          <Tab.Screen name="Delivered" options={{ title: t('delivered') }} component={CasesScreen2} />
          <Tab.Screen name="Preparing" options={{ title: t('preparing') }} component={CasesScreen2} />
          <Tab.Screen name="OnTheWay" options={{ title: t('on-the-way') }} component={CasesScreen2} />
        </Tab.Navigator>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCase')}>
          <Ionicons name='add-outline' size={30} color={theme.colors.white} />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
