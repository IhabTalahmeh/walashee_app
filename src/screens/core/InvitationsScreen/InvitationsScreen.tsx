import { View, SafeAreaView, Text, Dimensions } from 'react-native'
import React, { useMemo } from 'react'
import { useAuth } from 'src/context/AuthContext'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';
import { fonts } from 'src/styles/theme';
import SentInvitationsScreen from './SentInvitationsScreen';
import ReceivedInvitationsScreen from './ReceivedInvitationsScreen';

const initialLayout = { width: Dimensions.get('window').width };
const Tab = createMaterialTopTabNavigator();

export default function InvitationsScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const Sent = () => <SentInvitationsScreen />;
  const Received = () => <ReceivedInvitationsScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={globalStyles.flashListWrapper}>
        <Tab.Navigator
          {...({ initialLayout } as any)}
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
              height: 60,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.text,
          }}
        >
          {/* 👇 HERE ARE YOUR TABS */}
          <Tab.Screen name="Sent" options={{ title: t('sent-invitations') }} component={Sent} />
          <Tab.Screen name="Received" options={{ title: t('received-invitations') }} component={Received} />
        </Tab.Navigator>

      </View>
    </SafeAreaView>

  )
}