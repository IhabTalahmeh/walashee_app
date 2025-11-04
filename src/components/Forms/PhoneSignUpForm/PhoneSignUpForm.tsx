import { View, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {  Field, Formik } from 'formik';
import { PhoneDto } from 'src/types/dto';
import { useSendPhoneLoginVerificationCode, useSignUpWithPhone } from 'src/hooks/useUserAuth';
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

const initialValues = {
  phoneCode: '',
  number: '',
}

export default function PhoneSignUpForm() {
  const globalStyles = useGlobalStyles();
  const { theme, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation: any = useNavigation();
  const formRef = useRef<any>(null);
  const [country, setCountry] = useState<CountryType | null>(null);

  const validationSchema = Yup.object({
    phoneCode: Yup.string().required(),
    number: Yup.string().required(),
  });


  const onSuccess = async (result: any) => {
    console.log('res', result);
    navigation.navigate('VerifyAccountScreen', formRef.current.values);
  }

  const onError = (error: any) => {
    console.log('error', error);
    appService.showToast(error.message, 'error');
  }

  const { mutate: signUpWithPhone, isLoading } = useSignUpWithPhone(onSuccess, onError);

  const handleSignUp = (dto: PhoneDto) => {
    signUpWithPhone(dto);
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
      onSubmit={(dto: PhoneDto) => {
        handleSignUp(dto);
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
              text={'Sign Up'}
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