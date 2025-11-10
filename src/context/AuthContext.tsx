import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authService from '../services/authService';
import { EventRegister } from 'react-native-event-listeners';
import { Text, View } from 'react-native';
import * as notificationsService from 'src/services/notificationsService';

const AuthContext = createContext<any>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  const login = (userData: any) => {
    setUser(userData);
    saveUser(userData);
  };

  const logout = async () => {
    setUser(null);
    try {
      await authService.logout();
      EventRegister.removeAllListeners();
      await AsyncStorage.removeItem('@user');
    } catch (e) {
    }
  };

  const saveUser = async (user: any) => {
    try {
      const jsonUser = JSON.stringify(user);
      await AsyncStorage.setItem('@user', jsonUser);
    } catch (e) {
      // saving error
    }
  };

  const loadUser = async () => {
    try {
      const user = await authService.refreshToken();
      return user;
    } catch (e) {
      console.log('error', e);
      // error reading value
      return null;
    }
  };

  useEffect(() => {
    const checkAuthState = async () => {

      const storedAuthState = await loadUser();

      if (storedAuthState) {
        login(storedAuthState);
      }
      setLoading(false);
      notificationsService.registerToken();
    };
    checkAuthState();
  }, []);

  if (loading) {
    return (<View><Text>Loading...</Text></View>)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, needsOnboarding, setNeedsOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};
