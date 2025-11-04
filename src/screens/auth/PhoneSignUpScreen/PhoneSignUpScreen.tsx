import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import FastImage from 'react-native-fast-image';
import CustomText from 'src/components/common/CustomText/CustomText';
import LoginForm from 'src/components/Forms/LoginForm/LoginForm';
import NewToMSLogger from 'src/components/common/DontHaveAnAccount/DontHaveAnAccount';
import { ScrollView } from 'react-native-gesture-handler';
import DontHaveAnAccount from 'src/components/common/DontHaveAnAccount/DontHaveAnAccount';
import PhoneSignUpForm from 'src/components/Forms/PhoneSignUpForm/PhoneSignUpForm';
import SignUpNote from 'src/components/SignUpNote/SignUpNote';

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
        contentContainerStyle={[globalStyles.flexGrow1]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[globalStyles.flex1, globalStyles.jcc]}>

          {/* Sign Up Form */}
          <View>
            <PhoneSignUpForm />
          </View>

          {/* Sign Up Note */}
          <View style={[globalStyles.jcc, globalStyles.aic]}>
            <SignUpNote />
          </View>
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
