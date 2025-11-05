import { Platform, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import HomeScreen from '../HomeScreen/HomeScreen';
import HomeIcon from 'src/icons/HomeIcon';
import RVUsIcon from 'src/icons/RVUsIcon';
import RVUsIconOutline from 'src/icons/RVUsIconOutline';
import HomeIconOutline from 'src/icons/HomeIconOutline';
import UsersIcon from 'src/icons/UsersIcon';
import UsersIconOutline from 'src/icons/UsersIconOutline';
import SearchIconOutline from 'src/icons/SearchIconOutline';
import SearchIcon from 'src/icons/SearchIcon';
import ContactIcon from 'src/icons/ContactIcon';
import ContactIconOutline from 'src/icons/ContactIconOutline';
import RVUsScreen from '../RVUsScreen/RVUsScreen';
import ContactScreen from '../ContactScreen/ContactScreen';
import { fonts } from 'src/styles/theme';
import ExploreScreen from '../ExploreScreen/ExploreScreen';
import UsersScreen from '../UsersScreen/UsersScreen';
import { Host } from 'react-native-portalize';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();

  return (
    <>
      <Host>
        <View style={globalStyles.flex1}>
          <Tab.Navigator
            screenOptions={{
              lazy: true,
              tabBarStyle: {
                height: Platform.OS === 'ios' ? 90 : 75,
                paddingTop: 10,
                backgroundColor: theme.colors.background,
                borderTopWidth: 0,
              },
              headerStyle: globalStyles.header,
              headerLeftContainerStyle: {
                paddingStart: 10
              },
              headerShown: true,
              headerTitleStyle: {
                fontSize: 22,
                fontFamily: fonts.semiBold,
                color: theme.colors.text,
              }
            }}>

            <Tab.Screen
              name="Home"
              options={{
                headerTitleAlign: 'left',
                tabBarIcon: ({ color, size, focused }) =>
                  focused
                    ? <HomeIcon size={26} color={color} />
                    : <HomeIconOutline size={26} color={color} />,
              }}
              component={HomeScreen} />

            <Tab.Screen
              name="Users"
              options={{
                title: 'Users',
                sceneStyle: {
                  backgroundColor: theme.colors.topBackground,
                },
                headerStyle: [globalStyles.header, globalStyles.headerRadius],
                tabBarIcon: ({ color, size, focused }) =>
                  focused
                    ? <UsersIcon size={size} color={color} />
                    : <UsersIconOutline size={size} color={color} />,
              }}
              component={UsersScreen} />

            <Tab.Screen
              name="Explore"
              options={{
                title: 'Explore',
                sceneStyle: {
                  backgroundColor: theme.colors.topBackground,
                },
                headerStyle: [globalStyles.header, globalStyles.headerRadius],
                tabBarIcon: ({ color, size, focused }) =>
                  focused
                    ? <SearchIcon size={size} color={color} />
                    : <SearchIconOutline size={size} color={color} />,
              }}
              component={ExploreScreen} />

            <Tab.Screen
              name="RVUs"
              options={{
                headerTitleAlign: 'left',
                sceneStyle: {
                  backgroundColor: theme.colors.topBackground,
                },
                headerStyle: [globalStyles.header, globalStyles.headerRadius],
                tabBarIcon: ({ color, size, focused }) =>
                  focused
                    ? <RVUsIcon size={size} color={color} />
                    : <RVUsIconOutline size={size} color={color} />,
              }}
              component={RVUsScreen} />

            <Tab.Screen
              name="Contact"
              options={{
                title: 'Contact Us',
                sceneStyle: {
                  backgroundColor: theme.colors.topBackground,
                },
                headerStyle: [globalStyles.header, globalStyles.headerRadius],
                tabBarIcon: ({ color, size, focused }) =>
                  focused
                    ? <ContactIcon size={28} color={color} />
                    : <ContactIconOutline size={28} color={color} />,
              }}
              component={ContactScreen} />

          </Tab.Navigator>
        </View>
      </Host>
    </>
  )
}