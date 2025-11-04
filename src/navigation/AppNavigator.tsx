import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { GuestStack, NotCompletedProfileStack, UserStack } from './Navigation';

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {
        user?.firstName ? <UserStack />
          : !user?.firstName ? <NotCompletedProfileStack />
            : (user && !user?.verified) ? <UserStack />
              : <GuestStack />
      }
    </NavigationContainer>


  );
};

export default AppNavigator;
