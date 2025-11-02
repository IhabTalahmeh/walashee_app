import { View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useMemo, useState } from 'react'
import { ChangePasswordDto } from 'src/types/dto/ChangePasswordDto'
import { Field, Formik } from 'formik'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput'
import FastImage from 'react-native-fast-image'
import CustomText from 'src/components/common/CustomText/CustomText'
import LockIcon from 'src/icons/LockIcon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from 'src/components/buttons/CustomButton/CustomButton'
import * as Yup from 'yup';
import Spacer from 'src/components/common/Spacer/Spacer'
import { useChangePassword, useResetPassword } from 'src/hooks/useUserAuth'
import { useAuth } from 'src/context/AuthContext'
import * as appService from 'src/services/appService';
import { useNavigation, useRoute } from '@react-navigation/native'
import { ResetPasswordDto } from 'src/types/dto/ResetPasswordDto'

const defaultInitialValues = {
  password: '',
  confirmPassword: '',
}

export default function ResetPasswordScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const email = route?.params?.email || '';
  const code = route?.params?.code || '';

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>(defaultInitialValues)

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });


  const { mutate: resetMutation, isLoading } = useResetPassword(
    (data: any) => {
      if (data.status_code == 200) {
        appService.showToast('Your password has been updated successfully', 'success');
        navigation.pop(3);
      } else {
        appService.showToast(data?.data, 'error');
      }
    },
    (error: any) => {
      console.log('error', error);

    }
  )

  const handleSubmit = (values: any) => {
    Keyboard.dismiss();
    resetMutation({
      email,
      new_password: values.password,
      verification_code: code,
    })
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
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={(values: any) => handleSubmit(values)}
        >
          {(props) => (
            <View style={globalStyles.flex1}>

              <View style={[styles.topSection]}>
                <View style={globalStyles.authLockerImageContainer}>
                  <FastImage source={require('assets/images/reset-password-locker.png')} resizeMode='contain' style={globalStyles.authLockerImage} />
                </View>

                <View style={globalStyles.mt10}>
                  <CustomText text='Reset Password' size={20} fontWeight='bold' color={theme.colors.text} />
                </View>

                <View style={globalStyles.mt10}>
                  <CustomText text='Create your new password' size={16} fontWeight='regular' color={theme.colors.pureBorder} style={globalStyles.centerText} />
                </View>
              </View>

              {/* New Password */}
              <View style={globalStyles.mt20}>
                <Field
                  name="password"
                  component={CustomFormTextInput}
                  required
                  label='Create password'
                  placeholder='Enter your new password'
                  height={68}
                  leftIcon={<LockIcon size={18} color={theme.colors.primary} />}
                  leftIconWidth={50}
                  rightIconWidth={50}
                  rightIcon={<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={theme.colors.secondary} />
                  </TouchableOpacity>}
                  secureTextEntry={!showPassword}
                  lightBorder
                />
              </View>

              {/* Confirm Password */}
              <View style={globalStyles.mt20}>
                <Field
                  name="confirmPassword"
                  component={CustomFormTextInput}
                  required
                  label='Confirm password'
                  placeholder='Confirm your password'
                  height={68}
                  leftIcon={<LockIcon size={18} color={theme.colors.primary} />}
                  leftIconWidth={50}
                  rightIconWidth={50}
                  rightIcon={<TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={theme.colors.secondary} />
                  </TouchableOpacity>}
                  secureTextEntry={!showConfirmPassword}
                  lightBorder
                />
              </View>

              <Spacer flex={true} />
              <View style={globalStyles.continueButtonContainer}>
                <CustomButton
                  text='Continue'
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