import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import FastImage from 'react-native-fast-image';
import CustomText from 'src/components/common/CustomText/CustomText';
import LoginForm from 'src/components/Forms/LoginForm/LoginForm';
import NewToMSLogger from 'src/components/common/NewToMSLogger/NewToMSLogger';
import { ScrollView } from 'react-native-gesture-handler';

export default function LoginScreen() {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const logo = useMemo(() => {
    return theme.mode === 'light'
      ? require('assets/images/light-mode-logo.png')
      : require('assets/images/dark-mode-logo.png');
  }, [theme.mode]);

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={globalStyles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={[styles.logoContainer, globalStyles.mb20]}>
            <View style={styles.logoImageContainer}>
              <FastImage
                source={logo}
                style={globalStyles.full}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <CustomText
              text={'MS Logger'}
              size={24}
              color={theme.colors.text}
              fontWeight="bold"
            />
          </View>

          <View style={[globalStyles.flex1, globalStyles.mt20]}>
            <LoginForm />
          </View>
        </View>

        {/* Bottom-aligned in ScrollView */}
        <View style={[globalStyles.flex1, globalStyles.jcc, globalStyles.aic, globalStyles.pv20]}>
          <NewToMSLogger />
        </View>
      </ScrollView>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      {renderContent()}
    </KeyboardAvoidingView>
  );
}
