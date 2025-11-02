import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import NewToMSLogger from 'src/components/common/NewToMSLogger/NewToMSLogger';
import { ScrollView } from 'react-native-gesture-handler';
import { FastField, Field, Formik } from 'formik';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import SignUpNote from 'src/components/SignUpNote/SignUpNote';
import Spacer from 'src/components/common/Spacer/Spacer';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import UserIconOutline from 'src/icons/UserIconOutline';
import EmailIcon from 'src/icons/EmailIcon';
import LockIcon from 'src/icons/LockIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGetUserRoles } from 'src/hooks/useLookups';
import { CustomSelectList } from 'src/components/InputFields/CustomSelectList/CustomSelectList';
import TagIconOutline from 'src/icons/TagIconOutline';
import PositionIcon from 'src/icons/PositionIcon';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as authService from 'src/services/authService';
import * as appService from 'src/services/appService';
import { isValidEmail } from 'src/common/utils';

const initialValues = {
  first_name: '',
  last_name: '',
  user_role_id: '',
  email: '',
  code: '',
  accepted_privacy_policy: true,
  accepted_terms: true
}

export default function SignUpScreen() {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    code: Yup.string(),
    user_role_id: Yup.string().required(),
  })

  const { data: userRoles } = useGetUserRoles({
    onSuccess: (data: any) => console.log('data', data),
    onError: (error: any) => console.log('error', error),
  });

  const checkEmailAvailability = async (email: string) => {
    setIsLoading(true);
    const data = await authService.isEmailAvailable(email);
    setIsLoading(false);
    return data.available;
  }


  const handleSubmit = async (values: any) => {
    const isAvailable = await checkEmailAvailability(values.email);
    if (isAvailable) {
      navigation.navigate('PlansScreen', {
        userInfo: values,
      });
    } else {
      appService.showToast('Email is already associated with another account', 'error');
    }
  }

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={globalStyles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.flex1}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={(values: any) => {
              handleSubmit(values);
            }}>
            {(props) => (
              <View style={styles.container}>
                <View style={globalStyles.flex1}>

                  {/* First name */}
                  <View style={globalStyles.mt20}>
                    <FastField
                      name="first_name"
                      component={CustomFormTextInput}
                      required
                      label='First Name'
                      placeholder='Enter your first name'
                      leftIcon={<UserIconOutline size={22} color={theme.colors.primary} />}
                      leftIconWidth={50}
                      height={68}
                      lightBorder
                    />
                  </View>

                  {/* last name */}
                  <View style={globalStyles.mt10}>
                    <FastField
                      name="last_name"
                      component={CustomFormTextInput}
                      required
                      label='Last Name'
                      placeholder='Enter your last name'
                      leftIcon={<UserIconOutline size={22} color={theme.colors.primary} />}
                      leftIconWidth={50}
                      height={68}
                      lightBorder
                    />
                  </View>

                  {/* Role */}
                  <View style={globalStyles.mt10}>
                    <Field
                      key={userRoles ? userRoles.length : 0}
                      name="user_role_id"
                      component={CustomSelectList}
                      required
                      label='Role'
                      placeholder='Select role'
                      data={userRoles || []}
                      leftIcon={
                        <PositionIcon size={21} color={theme.colors.primary} />
                      }
                      leftIconWidth={35}
                      height={68}
                      lightBorder
                    />
                  </View>

                  {/* Email */}
                  <View style={globalStyles.mt10}>
                    <FastField
                      name="email"
                      component={CustomFormTextInput}
                      required
                      label='Email'
                      placeholder='Enter your email'
                      keyboardType='email-address'
                      leftIcon={<EmailIcon size={21} color={theme.colors.primary} />}
                      leftIconWidth={50}
                      height={68}
                      lightBorder
                    />
                  </View>

                  {/* Password */}
                  <View style={globalStyles.mt10}>
                    <Field
                      name="password"
                      component={CustomFormTextInput}
                      required
                      label='Password'
                      placeholder='Enter password'
                      height={68}
                      lightBorder
                      leftIcon={<LockIcon size={18} color={theme.colors.primary} />}
                      leftIconWidth={50}
                      rightIconWidth={50}
                      rightIcon={<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={theme.colors.secondary} />
                      </TouchableOpacity>}
                      secureTextEntry={!showPassword}
                    />
                  </View>


                  {/* Promotional Code */}
                  <View style={globalStyles.mt10}>
                    <FastField
                      name="code"
                      component={CustomFormTextInput}
                      required={false}
                      label='Promotional Code'
                      placeholder='Enter promo code (if any)'
                      leftIcon={<TagIconOutline size={24} color={theme.colors.primary} />}
                      leftIconWidth={50}
                      height={68}
                      lightBorder
                    />
                  </View>

                  <Spacer flex={true} />
                  <View style={globalStyles.mv15}>
                    <PrimaryButton
                      text="Sign Up"
                      onPress={props.submitForm}
                      fontWeight='semiBold'
                      disabled={!props.isValid || isLoading && !isValidEmail(props.values.email)}
                      isLoading={isLoading}
                    />
                  </View>

                </View>
              </View>
            )}

          </Formik>

        </View>

        {/* Bottom-aligned in ScrollView */}
        <View style={Platform.OS == 'ios' ? globalStyles.mb40 : globalStyles.mb10}>
          <SignUpNote />
        </View>
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
