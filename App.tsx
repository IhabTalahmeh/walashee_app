import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import AppNavigator from './src/navigation/AppNavigator';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { toastConfig } from './src/components/common/CustomToast';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ScreenWrapper from 'src/context/ScreenWrapper';
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import { Linking, Platform } from 'react-native';
import { useGetAppVersion } from 'src/hooks/useLookups';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['[Reanimated]']);
LogBox.ignoreLogs(['AxiosError']);
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate`',]);
LogBox.ignoreLogs([
  '[Reanimated] Reading from `value` during component render.'
]);
const queryClient = new QueryClient();
const appVersion = DeviceInfo.getVersion();

function App(): React.JSX.Element {

  // useEffect(() => {
  //   const clearStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log('✅ AsyncStorage cleared on app launch');
  //     } catch (e) {
  //       console.log('❌ Error clearing storage:', e);
  //     }
  //   };

  //   clearStorage();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider>
            <AuthProvider>
              <BottomSheetModalProvider>
                <MainApp />
                <Toast config={toastConfig} />
              </BottomSheetModalProvider>
            </AuthProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const MainApp = () => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState<boolean>(false);
  useGetAppVersion({
    onSuccess: (data: any) => {
      const latestVersion = parseFloat(data.message);
      const currentVersion = parseFloat(appVersion);
      setVisible(latestVersion > currentVersion);
    },
    onError: (error: any) => console.log('error', error),
  });


  const openAppStore = () => {
    const appStoreUrl =
      Platform.OS === 'ios'
        ? 'itms-apps://apps.apple.com/app/1484770342'
        : 'market://details?id=com.walashee.app';

    Linking.openURL(appStoreUrl).catch((err) =>
      console.error('Failed to open store:', err)
    );
  };


  const updateButtons = [
    {
      text: 'Update',
      disabled: false,
      loading: false,
      onPress: () => openAppStore(),
      button: PrimaryButton,
    },
  ]

  return (
    <>
      <ScreenWrapper>
        <AppNavigator />
      </ScreenWrapper>
      <CustomDialog
        visible={visible}
        onClose={() => setVisible(false)}
        title={'Update Available'}
        message={'A new version of MS Logger is available. Please update to continue.'}
        buttons={updateButtons} />

    </>
  );
};

export default App;
