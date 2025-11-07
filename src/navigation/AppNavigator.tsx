import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { AgentStack, CustomerStack, DriverStack, GuestStack, NotCompletedProfileStack } from './Navigation';
import { ERoleType } from 'src/enum/ERoleType';

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {!user ? (
        <GuestStack />
      ) : !user.fullName ? (
        <NotCompletedProfileStack />
      ) : user.useAs == ERoleType.CUSTOMER ? (
        <CustomerStack />
      ) : user.useAs == ERoleType.AGENT ? (
        <AgentStack />
      ) : user.useAs == ERoleType.DRIVER ? (
        <DriverStack />
      ) : (
        <CustomerStack />
      )}
    </NavigationContainer>
  );

};

export default AppNavigator;
