import { View, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Formik } from 'formik';
import { LoginDto } from 'src/types/dto';
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
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginForm() {
  const { login } = useAuth();
  const globalStyles = useGlobalStyles();
  const { theme, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const navigation: any = useNavigation();

  const validationSchema = Yup.object({
    username: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
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

  const handleLogin = (credentials: LoginDto) => {
    mutate(credentials);
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={(values: LoginDto) => {
        handleLogin(values);
      }}>
      {(props) => (
        <View style={styles.container}>
          <View style={globalStyles.flex1}>

            <View style={globalStyles.mt10}>
              <CustomTextInput
                label='Email'
                placeholder={'Enter your email'}
                leftIcon={<EmailIcon size={22} color={theme.colors.primary} />}
                fontWeight='medium'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={props.handleChange('username')} />
            </View>

            <View style={globalStyles.mt10}>
              <CustomTextInput
                label='Password'
                placeholder={'Enter password'}
                leftIcon={<LockIcon size={18} color={theme.colors.secondary} />}
                rightIcon={<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={theme.colors.secondary} />
                </TouchableOpacity>}
                fontWeight='medium'
                secureTextEntry={!showPassword}
                autoCapitalize='none'
                onChangeText={props.handleChange('password')} />
            </View>

            <View style={[globalStyles.flexRow, globalStyles.jcb, globalStyles.aic, globalStyles.mt10]}>
              <TouchableOpacity style={[globalStyles.flexRow, globalStyles.aic]} onPress={() => setChecked(!checked)}>
                <View style={[, { width: 20, height: 20 }]}>
                  <FontAwesome name={checked ? 'check-square-o' : 'square-o'} size={22} color={theme.colors.text} />
                </View>
                <View style={globalStyles.ml5}>
                  <CustomText text='Remember me' size={16} color={theme.colors.text} fontWeight='medium' />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToForgotPassword}>
                <CustomText text='Forgot Password?' size={16} color={theme.colors.primary} fontWeight='medium' />
              </TouchableOpacity>
            </View>

            <View style={globalStyles.mv20}>
              <View style={globalStyles.mt10}>
                <PrimaryButton
                  text="Log In"
                  onPress={props.submitForm}
                  fontWeight='semiBold'
                  disabled={!props.isValid || isLoading}
                  isLoading={isLoading} />
              </View>
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
        </View>
      )}

    </Formik>

  )
}