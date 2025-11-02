import { View, SafeAreaView } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from 'src/context/ThemeContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { fonts } from 'src/styles/theme';

// Replace these with your actual screen components
import { createStyles } from './styles';
import SearchScreen from './SearchScreen';
import ExportScreen from './ExportScreen';

const Tab = createMaterialTopTabNavigator();

export default function ExploreScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flashListWrapper}>
        <Tab.Navigator
          screenOptions={({ navigation }) => ({
            lazy: false,
            tabBarPressColor: 'transparent',
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.primary,
              position: 'absolute',
              zIndex: -1,
              height: '82%',
              width: '47%',
              margin: 5,
              borderRadius: 12,
            },
            tabBarLabelStyle: {
              fontFamily: fonts.medium,
              textTransform: 'none',
              fontSize: 16,
              fontWeight: '500',
            },
            tabBarStyle: {
              borderRadius: 14,
              marginHorizontal: 20,
              marginTop: 20,
              marginBottom: 10,
              height: 60,
              backgroundColor: theme.colors.background,
            },
            tabBarItemStyle: {
              flex: 1,
              height: 60,
            },
            tabBarActiveTintColor: theme.colors.white,
            tabBarInactiveTintColor: theme.colors.black,

          })}

        >

          <Tab.Screen name="SEARCH" options={{
            title: 'Search',
            tabBarLabelStyle: styles.label
          }} component={SearchScreen} />

          <Tab.Screen name="EXPORT" options={{
            title: 'Exported Files',
            tabBarLabelStyle: styles.label,
          }} component={ExportScreen} />

        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}
