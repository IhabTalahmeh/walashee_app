import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from 'src/context/AuthContext';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createStyles } from './styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { fonts } from 'src/styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyTabBar from './MyTabBar';
import SharedCasesList from 'src/components/Case/SharedCasesList/SharedCasesList';
import { ESharedCaseFilter } from 'src/enum/ESharedCaseFilter';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SharedDashboardProvider, useSharedDashboard } from 'src/context/SharedDashboardContext';

const Tab = createMaterialTopTabNavigator();

function SharedDashboardInner({ doctorId }: { doctorId: number }) {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();
  const { user } = useAuth();
  const { doctorName, isEditor } = useSharedDashboard();

  useEffect(() => {
    navigation.setOptions({
      title: doctorName,
    });
  }, [doctorName]);

  const AllSharedCasesScreen = useCallback(() => (
    <SharedCasesList filter={ESharedCaseFilter.ALL} doctorId={doctorId} />
  ), [doctorId]);

  const UpcomingSharedCasesScreen = useCallback(() => (
    <SharedCasesList filter={ESharedCaseFilter.UPCOMING} doctorId={doctorId} />
  ), [doctorId]);

  const ThisWeekSharedCasesScreen = useCallback(() => (
    <SharedCasesList filter={ESharedCaseFilter.WEEK} doctorId={doctorId} />
  ), [doctorId]);

  const ThisMonthSharedCasesScreen = useCallback(() => (
    <SharedCasesList filter={ESharedCaseFilter.MONTH} doctorId={doctorId} />
  ), [doctorId]);

  const navigateToAddCase = () => {
    navigation.navigate('AddCase', {
      doctorId,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flashListWrapper}>
        <Tab.Navigator
          tabBar={props => <MyTabBar {...props} />}
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
              overflow: 'hidden',
            },
            tabBarItemStyle: {
              flex: 1,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.text,
          }}
        >
          <Tab.Screen name="ALL" options={{ title: 'All' }} component={AllSharedCasesScreen} />
          <Tab.Screen name="UPCOMING" options={{ title: 'Upcoming' }} component={UpcomingSharedCasesScreen} />
          <Tab.Screen name="WEEK" options={{ title: 'This Week' }} component={ThisWeekSharedCasesScreen} />
          <Tab.Screen name="MONTH" options={{ title: 'This Month' }} component={ThisMonthSharedCasesScreen} />
        </Tab.Navigator>
        {isEditor && (
          <Animated.View entering={FadeIn.duration(150)}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={navigateToAddCase}
              accessibilityLabel="Add a new case"
              accessibilityRole="button"
              activeOpacity={0.8}
            >
              <Ionicons name="add-outline" size={30} color={theme.colors.white} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default function SharedDashboardScreen() {
  const route: any = useRoute();
  const doctorId = route?.params?.id;

  return (
    <SharedDashboardProvider doctorId={doctorId}>
      <SharedDashboardInner doctorId={doctorId} />
    </SharedDashboardProvider>
  );
}
