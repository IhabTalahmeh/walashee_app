import { Platform, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import HomeScreen from '../HomeScreen/HomeScreen';
import HomeIcon from 'src/icons/HomeIcon';
import HomeIconOutline from 'src/icons/HomeIconOutline';
import { fonts } from 'src/styles/theme';
import { Host } from 'react-native-portalize';
import UsersScreen from '../UsersScreen/UsersScreen';
import UsersIcon from 'src/icons/UsersIcon';
import UsersIconOutline from 'src/icons/UsersIconOutline';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

export default function CU_MainScreen() {
  const { t } = useTranslation();
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
                title: t('home'),
                headerTitleAlign: 'left',
                tabBarIcon: ({ color, size, focused }) =>
                  focused
                    ? <HomeIcon size={26} color={color} />
                    : <HomeIconOutline size={26} color={color} />,
              }}
              component={HomeScreen} />


          </Tab.Navigator>
        </View>
      </Host>
    </>
  )
}