import { View, ScrollView, Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from 'src/components/common/CustomText/CustomText';
import { FastField, Field, Formik } from 'formik';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import EmailIcon from 'src/icons/EmailIcon';
import CustomButton from 'src/components/buttons/CustomButton/CustomButton';
import CustomFormTextArea from 'src/components/common/CustomTextArea/CustomFormTextArea';
import CountryCode from 'src/components/common/CountryCode/CountryCode';
import { CountryType } from 'src/types/types/Types';
import { ContactUsDto } from 'src/types/dto';
import { useContactUs } from 'src/hooks/useUtility';
import * as appService from 'src/services/appService';
import * as Yup from 'yup';
import UserIconOutline from 'src/icons/UserIconOutline';
import { useTranslation } from 'react-i18next';

const defaultInitialValues = {
  name: '',
  email: '',
  country_code_lookup_id: '',
  phone: '',
  message: '',
}

export default function ContactScreen() {
  const { t } = useTranslation();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [country, setCountry] = useState<CountryType | null>(null);
  const formikRef = useRef<any>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    country_code_lookup_id: Yup.string(),
    phone: Yup.string(),
    message: Yup.string().required(),
  })

  const { mutate: contactMutation, isLoading } = useContactUs(
    (data: any) => {
      formikRef.current?.resetForm();
      appService.showToast("Thank you! We've received your request and will be in touch with you shortly.", 'success');
    },
    (error: any) => {
      appService.showToast(error.message, 'error');
    }

  )

  useEffect(() => {
    formikRef.current?.setFieldValue('country_code_lookup_id', country?.id);
  }, [country]);

  const handleSubmit = (values: ContactUsDto) => {
    Keyboard.dismiss();
    contactMutation(values);
  }

  const renderContent = () => {
    return (
      <>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          keyboardDismissMode='none'
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Formik
            innerRef={formikRef}
            initialValues={defaultInitialValues}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={(values: any) => handleSubmit(values)}
          >
            {(props) => (
              <View style={[globalStyles.ph20, globalStyles.flex1]}>
                <View style={[globalStyles.mv20]}>
                  <CustomText
                    text='For support or further inquiries, Our team is ready to help you!'
                    size={20}
                    fontWeight='medium'
                    color={theme.colors.text}
                    style={globalStyles.centerText}
                  />
                </View>

                {/* Name */}
                <View style={globalStyles.mt10}>
                  <FastField
                    name="name"
                    component={CustomFormTextInput}
                    required
                    label='Name'
                    placeholder='Enter your full name'
                    leftIcon={<UserIconOutline size={22} color={theme.colors.primary} />}
                    height={68}
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
                    leftIcon={<EmailIcon size={21} color={theme.colors.primary} />}
                    keyboardType='email-address'
                    height={68}
                  />
                </View>

                {/* Phone Number */}
                <View style={globalStyles.mt10}>
                  <Field
                    name="phone"
                    component={CustomFormTextInput}
                    required={false}
                    label="Phone Number"
                    placeholder="Enter phone number"
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

                {/* Message */}
                <View style={globalStyles.mt10}>
                  <FastField
                    name="message"
                    component={CustomFormTextArea}
                    required
                    label='Message'
                    placeholder='Write your message here'
                    minHeight={150}
                  />
                </View>

                <View style={{ flex: 1 }} />
                <View style={globalStyles.continueButtonContainer}>
                  <CustomButton
                    text='Submit'
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