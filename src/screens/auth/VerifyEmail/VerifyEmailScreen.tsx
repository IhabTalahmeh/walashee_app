import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Formik } from 'formik';
import CustomButton from 'src/components/buttons/CustomButton/CustomButton';
import Spacer from 'src/components/common/Spacer/Spacer';
import FastImage from 'react-native-fast-image';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
import { createStyles } from './styles';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useForgetPassword, useVerifyEmail } from 'src/hooks/useUserAuth';
import OTPInput from 'src/components/common/OTPInput/OTPInput';

const initialTimer = 59;

export default function VerifyEmailScreen() {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const formRef = useRef<any>(null);
  const route: any = useRoute();
  const email = route?.params?.email || '';
  const [timer, setTimer] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const navigation: any = useNavigation();
  const [initialValues, setInitialValues] = useState<any>({
    code: '',
  });

  const { mutate: verifyMutation, isLoading } = useVerifyEmail(
    (data: any) => {
      if (data.status_code == 200) {
        navigation.navigate('ResetPasswordScreen', {
          email,
          code: formRef.current?.values?.code,
        });
      } else {
        setError(true);
      }
    },
    (error: any) => {
      setError(true);
    }
  );

  const { mutate: forgetPasswordMutation } = useForgetPassword(
    (data: any) => { 
    },
    (error: any) => { 
    }
  )

  const validationSchema = Yup.object({
    code: Yup.string().min(6).required(),
  });


  const handleSubmit = (values: any) => {
    setError(false);
    verifyMutation({
      email,
      verification_code: values.code,
    })
  }

  const onResendPress = () => {
    forgetPasswordMutation(email);
    setError(false);
    formRef.current?.setFieldValue('code', '');
    setTimer(initialTimer);
    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTimer = prev - 1;
        if (newTimer <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newTimer;
      });
    }, 1000);
  };


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
                  <FastImage source={require('assets/images/verify-email-locker.png')} resizeMode='contain' style={globalStyles.authLockerImage} />
                </View>

                <View style={globalStyles.mt10}>
                  <CustomText text='Verify your email' size={20} fontWeight='bold' color={theme.colors.text} />
                </View>

                <View style={globalStyles.mt10}>
                  <CustomText text='Enter the 6 digit code sent to' size={16} fontWeight='regular' color={theme.colors.pureBorder} style={globalStyles.centerText} />
                  <CustomText text={email} size={16} fontWeight='regular' color={theme.colors.primary} style={[globalStyles.centerText, globalStyles.mt5]} />
                </View>
              </View>

              <View>
                <OTPInput
                  value={props.values.code}
                  onChangeText={props.handleChange('code')}
                  error={error}
                />
              </View>

              <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcc, globalStyles.mv10]}>

                <CustomText
                  text={
                    error ? `Please try again or resend code,` :
                      timer == 0 ? `If you didn't receive a code,` : `You can resend code in,`
                  }
                  size={16}
                  color={error ? theme.colors.error : theme.colors.text}
                />

                <TouchableOpacity style={globalStyles.ml5} onPress={onResendPress} disabled={timer > 0}>
                  {timer == 0 ? (
                    <CustomText
                      text={'Resend'}
                      size={16}
                      color={theme.colors.primary} />
                  ) : (
                    <CustomText
                      text={`${timer} seconds`}
                      size={16}
                      color={theme.colors.primary}
                    />
                  )}
                </TouchableOpacity>
              </View>



              <Spacer flex={true} />
              <View style={globalStyles.continueButtonContainer}>
                <CustomButton
                  text='Verify'
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