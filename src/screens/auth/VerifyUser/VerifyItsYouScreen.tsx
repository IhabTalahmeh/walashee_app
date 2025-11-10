import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FastField, Formik } from 'formik';
import CustomButton from 'src/components/buttons/CustomButton/CustomButton';
import FastImage from 'react-native-fast-image';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useLoginWithPhoneCode, useResendVerificationCode, useSendPhoneLoginVerificationCode } from 'src/hooks/useUserAuth';
import { createStyles } from './styles';
import { useAuth } from 'src/context/AuthContext';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import { getPhoneNumberWithoutLeadingZero } from 'src/common/utils';
import { LoginPhoneDto } from 'src/types/dto';
import { useTranslation } from 'react-i18next';
import * as notificationsService from 'src/services/notificationsService';

const initialTimer = 59;

const initialValues = {
  phoneCode: '',
  number: '',
  code: '',
};

export default function VerifyItsYouScreen() {
  const { t } = useTranslation();
  const { user, login, logout } = useAuth();
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const formRef = useRef<any>(null);
  const route: any = useRoute();
  const { phoneCode, number } = route?.params || {};
  const [timer, setTimer] = useState<number>(0);
  const navigation: any = useNavigation();

  const { mutate: loginWithPhoneCode, isLoading } = useLoginWithPhoneCode(
    (data: any) => {
      notificationsService.registerToken();
      login(data);
    },
    (error: any) => {
      formRef.current.setFieldError('code', t('invalid-verification-code'));
    }
  );


  const { mutate: resendCode } = useSendPhoneLoginVerificationCode(null, null);

  const validationSchema = Yup.object({
    phoneCode: Yup.string().required(),
    number: Yup.string().required(t('phone-is-required')),
    code: Yup.string().min(6, t('six-digits-code-error')).required(t('code-is-required')),
  });

  const handleSubmit = (dto: LoginPhoneDto) => {
    loginWithPhoneCode(dto)
  }

  const onResendPress = () => {
    resendCode({ phoneCode, number });
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

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setValues({
        phoneCode,
        number,
        code: initialValues.code,
      });
    }
  }, [phoneCode, number, initialValues.code]);


  const renderContent = () => {
    return (
      <>
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
            onSubmit={(values: LoginPhoneDto) => handleSubmit(values)}
          >
            {(props) => (
              <View style={globalStyles.flex1}>

                <View style={[styles.topSection]}>
                  <View style={[globalStyles.jcc, globalStyles.aic]}>
                    <View style={globalStyles.authLockerImageContainer}>
                      <FastImage source={require('assets/images/verify-email-locker.png')} resizeMode='contain' style={globalStyles.authLockerImage} />
                    </View>

                    <View style={globalStyles.mt10}>
                      <CustomText text={t('verify-its-you')} size={20} fontWeight='bold' color={theme.colors.text} />
                    </View>

                    <View style={globalStyles.mt10}>
                      <CustomText text={t('verify-note')} size={16} fontWeight='regular' color={theme.colors.pureBorder} style={globalStyles.centerText} />
                      <CustomText text={`+${phoneCode}${getPhoneNumberWithoutLeadingZero(number)}`} size={16} fontWeight='regular' color={theme.colors.primary} style={[globalStyles.centerText, globalStyles.mt5]} />
                    </View>
                  </View>

                  {/* Verification code */}
                  <View style={[globalStyles.pv20]}>
                    <FastField
                      name="code"
                      component={CustomFormTextInput}
                      required
                      placeholder={t('enter-verification-code')}
                      keyboardType='numeric'
                      height={68}
                      maxLength={6}
                    />
                  </View>

                  <View style={[globalStyles.flexRow, globalStyles.aic, globalStyles.jcc, globalStyles.mv10]}>

                    <CustomText
                      text={
                        timer == 0 ? t('didnt-receive-code') : t('resend-code-in')
                      }
                      size={16}
                      color={theme.colors.text}
                    />

                    <TouchableOpacity style={globalStyles.ml5} onPress={onResendPress} disabled={timer > 0}>
                      {timer == 0 ? (
                        <CustomText
                          text={t('resend')}
                          size={16}
                          color={theme.colors.primary} />
                      ) : (
                        <CustomText
                          text={`${timer} ${t('seconds')}`}
                          size={16}
                          color={theme.colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  </View>


                </View>



                <View style={globalStyles.continueButtonContainer}>

                  <CustomButton
                    text={t('verify')}
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
      </>
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