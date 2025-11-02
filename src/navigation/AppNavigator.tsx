import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { GuestStack, NotVerifiedUserStack, UserStack } from './Navigation';

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user?.verified == true ? <UserStack /> : user?.verified == false ? <NotVerifiedUserStack /> : (user && !user?.verified) ? <UserStack /> : <GuestStack />}
    </NavigationContainer>


  );
};

export default AppNavigator;
