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

const data = [
  { id: '1', title: 'Today', route: ECaseFilter.TODAY },
  { id: '2', title: 'This Week', route: ECaseFilter.THIS_WEEK },
  { id: '3', title: 'This Month', route: ECaseFilter.THIS_MONTH },
];

type PeriodFilterItem = {
  id: string;
  title: string;
  route: ECaseFilter;
};

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const globalStyles = useGlobalStyles();
  const { theme, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();
  const { user } = useAuth();
  const [selected, setSelected] = useState<PeriodFilterItem>(data[0]);

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
            text={`${user.first_name} ${user.last_name}`}
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

  const PeriodCasesScreen2 = () => {
    return (
      <PeriodCasesScreen selected={selected} />
    )
  }

  const CasesScreen2 = () => {
    return (
      <CasesScreen selected={selected} />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flashListWrapper}>
        <Tab.Navigator
          tabBar={props => <MyTabBar
            {...props}
            data={data}
            selected={selected}
            setSelected={setSelected}
          />}
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
              minWidth: 125,
              textAlignVertical: 'center',
              height: 35,
            },
            tabBarStyle: {
              justifyContent: 'space-evenly',
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              backgroundColor: theme.colors.background,
              overflow: 'visible'
            },
            tabBarItemStyle: {
              flex: 1,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.text,
          }}
        >
          {/* 👇 HERE ARE YOUR TABS */}
          <Tab.Screen name="OLDER" options={{ title: 'Older (0)' }} component={CasesScreen2} />
          <Tab.Screen name="THIS_MONTH" options={{ title: 'This Month (0)' }} component={PeriodCasesScreen2} />
          <Tab.Screen name="UPCOMING" options={{ title: 'Upcoming (0)' }} component={CasesScreen2} />
        </Tab.Navigator>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCase')}>
          <Ionicons name='add-outline' size={30} color={theme.colors.white} />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
