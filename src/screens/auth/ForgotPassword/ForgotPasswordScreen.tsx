import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { FastField, Field, Formik } from 'formik';
import CustomButton from 'src/components/buttons/CustomButton/CustomButton';
import Spacer from 'src/components/common/Spacer/Spacer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LockIcon from 'src/icons/LockIcon';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import FastImage from 'react-native-fast-image';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { createStyles } from './styles';
import CustomText from 'src/components/common/CustomText/CustomText';
import EmailIcon from 'src/icons/EmailIcon';
import { useForgetPassword } from 'src/hooks/useUserAuth';
import * as appService from 'src/services/appService';

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const formRef = useRef<any>(null);

  const navigation: any = useNavigation();
  const [initialValues, setInitialValues] = useState<any>({
    email: '',
  });

  const { mutate: forgetPasswordMutation, isLoading } = useForgetPassword(
    (data: any) => {
      if (data.status_code == 200) {
        navigation.navigate('VerifyEmailScreen', {
          email: formRef.current?.values.email,
        });
      } else {
        appService.showToast(data.data, 'error');
      }
    },
    (error: any) => {
      appService.showToast(error.message, 'error');
    }
  )

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
  });

  const handleSubmit = (values: any) => {
    forgetPasswordMutation(values.email);
  }

  const renderContent = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='none'
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={(values: any) => handleSubmit(values)}
        >
          {(props) => (
            <View style={globalStyles.flex1}>

              <View style={[styles.topSection]}>
                <View style={globalStyles.authLockerImageContainer}>
                  <FastImage source={require('assets/images/password-locker.png')} resizeMode='contain' style={globalStyles.authLockerImage} />
                </View>

                <View style={globalStyles.mt10}>
                  <CustomText text='Forgot Password' size={20} fontWeight='bold' color={theme.colors.text} />
                </View>

                <View style={globalStyles.mt10}>
                  <CustomText text='Enter your email address to verify' size={16} fontWeight='regular' color={theme.colors.pureBorder} style={globalStyles.centerText} />
                </View>
              </View>

              {/* Email */}
              <View style={globalStyles.mt20}>
                <FastField
                  name="email"
                  component={CustomFormTextInput}
                  required
                  label='Email'
                  placeholder='Enter your email'
                  height={68}
                  leftIcon={<EmailIcon size={21} color={theme.colors.primary} />}
                  leftIconWidth={50}
                  rightIconWidth={50}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  lightBorder
                />
              </View>

              <Spacer flex={true} />
              <View style={globalStyles.continueButtonContainer}>
                <CustomButton
                  text='Send'
                  onPress={props.submitForm}
                  fontSize={18}
                  fontWeight='semiBold'
                  disabled={!props.isValid || isLoading}
                  isLoading={isLoading}
                />
              </View>
            </View>

          )}



        </Formik>

      </ScrollView>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={130}
    >
      {renderContent()}
    </KeyboardAvoidingView>
  );


}