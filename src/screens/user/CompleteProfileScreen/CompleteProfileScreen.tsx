import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { FastField, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { UpdateProfileDto } from 'src/types/dto/UpdateProfileDto';
import * as Yup from 'yup';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import UserIconOutline from 'src/icons/UserIconOutline';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import CustomDatePicker from 'src/components/common/CustomDatePicker/CustomDatePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomSelectList } from 'src/components/InputFields/CustomSelectList/CustomSelectList';
import { useGetGenders } from 'src/hooks/useLookups';
import Spacer from 'src/components/common/Spacer/Spacer';
import { useUpdateProfile } from 'src/hooks/useUsers';
import { updateLocalUser } from 'src/services/localStorageService';
import { useAuth } from 'src/context/AuthContext';

const initialValues = {
  fullName: '',
  dateOfBirth: new Date(),
  gender: '',
}

export default function CompleteProfileScreen() {
  const { t } = useTranslation();
  const { user, login } = useAuth();
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const formRef = useRef<any>(null);
  const [isLoading] = useState<boolean>(false);

  const { data: genders } = useGetGenders();

  const { mutate: updateProfile } = useUpdateProfile(
    (data: any) => {
      const updatedUser = updateLocalUser(data);
      login(updatedUser);
    },
    (error: any) => {
      console.log('error', error);
    }
  )

  const validationSchema = Yup.object({
    fullName: Yup.string().required(t('full-name-is-required')),
    dateOfBirth: Yup.date().required(t('date-of-birth-is-required')),
    gender: Yup.string().required(t('gender-is-required')),
  });

  const handleSubmit = (values: UpdateProfileDto) => {
    const payload = {
      ...values,
      dateOfBirth: new Date(values.dateOfBirth).toISOString().split('T')[0],
    };

    updateProfile(payload);
  };



  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={globalStyles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values: UpdateProfileDto) => {
            handleSubmit(values);
          }}>
          {(props) => (
            <View style={styles.container}>

              {/* <LanguageSelector /> */}

              <View style={[globalStyles.ph20]}>
                {/* Full name */}
                <View style={globalStyles.mt10}>
                  <FastField
                    name="fullName"
                    component={CustomFormTextInput}
                    required
                    label={t('full-name')}
                    placeholder={t('enter-full-name')}
                    leftIcon={<UserIconOutline size={22} color={theme.colors.primary} />}
                    leftIconWidth={50}
                    height={68}
                    withBorder
                  />
                </View>

                {/* Date of birth */}
                <View style={globalStyles.mt10}>
                  <FastField
                    name="dateOfBirth"
                    component={CustomDatePicker}
                    required
                    label={t('date-of-birth')}
                    placeholder={t('enter-date-of-birth')}
                    height={68}
                    withBorder
                    leftIcon={<Ionicons name='calendar-outline' size={22} color={theme.colors.primary} />}
                    leftIconWidth={50}
                  />
                </View>

                {/* Gender */}
                <View style={globalStyles.mt10}>
                  <FastField
                    key={genders ? genders.length : 0}
                    name="gender"
                    component={CustomSelectList}
                    required
                    label={t('gender')}
                    placeholder={t('select-gender')}
                    data={genders || []}
                    height={68}
                    withBorder
                    titleCase
                  />
                </View>
              </View>

              <Spacer flex={true} />

              <View style={[globalStyles.ph20, globalStyles.pv15]}>
                <PrimaryButton
                  text={t('save')}
                  onPress={props.submitForm}
                  fontWeight='semiBold'
                  disabled={!props.isValid || isLoading}
                  isLoading={isLoading} />
              </View>

            </View>
          )
          }

        </Formik >
      </ScrollView>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      {renderContent()}
    </KeyboardAvoidingView>
  );
}