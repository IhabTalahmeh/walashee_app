import { View, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FastField, Field, Formik } from 'formik';
import { LoginDto, LoginPhoneDto } from 'src/types/dto';
import { useAuth } from 'src/context/AuthContext';
import { useLogin } from 'src/hooks/useUserAuth';
import { createStyles } from './styles';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomTextInput from 'src/components/common/CustomTextInput/CustomTextInput';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import CustomText from 'src/components/common/CustomText/CustomText';
import SignInOptions from 'src/components/common/SignInOptions/SignInOptions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EmailIcon from 'src/icons/EmailIcon';
import LockIcon from 'src/icons/LockIcon';
import * as appService from 'src/services/appService';
import { checkResponse } from 'src/common/utils';
import * as Yup from 'yup';
import { BaseNavigationContainer, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryCode from 'src/components/common/CountryCode/CountryCode';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import { CountryType } from 'src/types/types/Types';
import OTPInput from 'src/components/common/OTPInput/OTPInput';
import PagerView from 'react-native-pager-view';

const initialValues = {
  phoneCode: '',
  number: '',
  code: '',
}

export default function LoginForm() {
  const { login } = useAuth();
  const globalStyles = useGlobalStyles();
  const { theme, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const navigation: any = useNavigation();
  const formRef = useRef<any>(null);
  const [country, setCountry] = useState<CountryType | null>(null);
  const pagerRef = useRef<PagerView>(null);
  const [step, setStep] = useState<number>(0);

  const validationSchema = Yup.object({
    phoneCode: Yup.string().required(),
    number: Yup.string().required(),
    code: Yup.string().required(),
  });

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  }

  const onSuccess = async (result: any) => {
    console.log('data login', result);
    if (result.status_code == 200) {
      login(result.data);
    } else {
      appService.showToast('Invalid email or password', 'error');
    }
  }

  const onError = (error: any) => {
    console.log('error', error);
    appService.showToast('Invalid email or password', 'error');
  }

  const { mutate, isLoading } = useLogin(onSuccess, onError);

  const handleLogin = (credentials: LoginPhoneDto) => {
    navigation.navigate('VerifyUserScreen')
    // mutate(credentials);
  }

  useEffect(() => {
    formRef.current.values.phoneCode = country?.phoneCode || '';
  }, [country])

  useEffect(() => {
    console.log('step', step)
  }, [step])

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      // validationSchema={validationSchema}
      validateOnMount
      onSubmit={(values: LoginPhoneDto) => {
        handleLogin(values);
      }}>
      {(props) => (
        <View style={styles.container}>

          {/* Phone Number */}
          <View style={[globalStyles.flex1, globalStyles.ph20]} key='1'>
            <View style={globalStyles.mt10}>
              <Field
                required={true}
                name="number"
                component={CustomFormTextInput}
                label="Phone Number"
                placeholder="Enter phone number"
                keyboardType='numeric'
                leftIcon={
                  <KeyboardAvoidingView>
                    <CountryCode
                      title={'Select country'}
                      country={country}
                      setCountry={setCountry} />
                  </KeyboardAvoidingView>
                }
                height={68}
                leftIconContainerStyle={styles.leftIconContainerStyle}
              />
            </View>
          </View>



          <View style={[globalStyles.ph20, globalStyles.pv15]}>
            <PrimaryButton
              text={'Log In'}
              onPress={props.submitForm}
              fontWeight='semiBold'
              // disabled={!props.isValid || isLoading}
              isLoading={isLoading} />
          </View>

          <View>
            {/* <View>
                <CustomText text='Or sign in with' size={16} fontWeight='medium' style={globalStyles.centerText} color={theme.colors.text} />
              </View> */}
            {/* <View style={[globalStyles.mt20]}>
                <SignInOptions />
              </View> */}
          </View>

        </View>
  )
}

    </Formik >

  )
}