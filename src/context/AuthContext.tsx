import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authService from '../services/authService';
import { EventRegister } from 'react-native-event-listeners';
import Loading from '../components/common/Loading';
import SplashScreen from 'src/screens/core/SplashScreen/SplashScreen';

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
      EventRegister.removeAllListeners();
      await authService.logout();
      await AsyncStorage.removeItem('@user');
    } catch (e) {
    }
  };

  const saveUser = async (user: any) => {
    try {
      const jsonUser = JSON.stringify(user);
      await AsyncStorage.setItem('@user', jsonUser);
    } catch (e) {
      console.error('Saving error', e);
    }
  };

  const loadUser = async () => {
    try {
      const userString = await AsyncStorage.getItem('@user');
      if (userString) {
        const parsedUser = JSON.parse(userString);
        return parsedUser;
      }
      return null;
    } catch (e) {
      console.error('Error loading user:', e);
      return null;
    }
  };


useEffect(() => {
  const checkAuthState = async () => {
    const start = Date.now();

    const storedAuthState = await loadUser();
    if (storedAuthState) {
      login(storedAuthState);
    }

    const elapsed = Date.now() - start;
    const remaining = 1500 - elapsed;

    if (remaining > 0) {
      setTimeout(() => setLoading(false), remaining);
    } else {
      setLoading(false);
    }
  };

  checkAuthState();
}, []);


  if (loading) {
    return (<SplashScreen />)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, needsOnboarding, setNeedsOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};
