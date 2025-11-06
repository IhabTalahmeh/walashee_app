import { View, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Field, Formik } from 'formik';
import { useAuth } from 'src/context/AuthContext';
import { useSendPhoneLoginVerificationCode } from 'src/hooks/useUserAuth';
import { createStyles } from './styles';
import { useTheme } from 'src/context/ThemeContext';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import * as appService from 'src/services/appService';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import CountryCode from 'src/components/common/CountryCode/CountryCode';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import { CountryType } from 'src/types/types/Types';
import PagerView from 'react-native-pager-view';
import { PhoneDto } from 'src/types/dto';
import { useTranslation } from 'react-i18next';

const initialValues = {
  phoneCode: '',
  number: '',
}

export default function LoginForm() {
  const { t } = useTranslation();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();
  const formRef = useRef<any>(null);
  const [country, setCountry] = useState<CountryType | null>(null);

  const validationSchema = Yup.object({
    phoneCode: Yup.string().required(),
    number: Yup.string().required(t('phone-is-required')),
  });

  const onSuccess = async () => {
    navigation.navigate('VerifyItsYouScreen', formRef.current.values);
  }

  const onError = (error: any) => {
    switch (error.status) {
      case 404:
        formRef.current.setFieldError('number', t('phone-number-not-found-error'));
        break;
      default:
        appService.showToast('Invalid email or password', 'error');
    }
  }

  const { mutate, isLoading } = useSendPhoneLoginVerificationCode(onSuccess, onError);

  const handleSendCode = (dto: PhoneDto) => {
    mutate(dto);
  }

  useEffect(() => {
    formRef.current.values.phoneCode = country?.phoneCode || '';
  }, [country])

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={(values: PhoneDto) => {
        handleSendCode(values);
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
                label={t('phone-number')}
                placeholder={t('enter-phone-number')}
                keyboardType='numeric'
                leftIcon={
                  <KeyboardAvoidingView>
                    <CountryCode
                      title={t('select-country')}
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
              text={t('log-in')}
              onPress={props.submitForm}
              fontWeight='semiBold'
              disabled={!props.isValid || isLoading}
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