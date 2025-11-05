import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { GuestStack, NotCompletedProfileStack, UserStack } from './Navigation';

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {!user ? (
        <GuestStack />
      ) : !user.fullName ? (
        <NotCompletedProfileStack />
      ) : (
        <UserStack />
      )}
    </NavigationContainer>
  );

};

export default AppNavigator;
