import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { Field, Formik } from 'formik';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import * as Yup from 'yup';
import { useAuth } from 'src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CountryCode from 'src/components/common/CountryCode/CountryCode';
import { CountryType } from 'src/types/types/Types';
import { PhoneDto } from 'src/types/dto';
import { getErrorCode } from 'src/common/utils';
import { useGetTeam, useSendTeamInvite } from 'src/hooks/useTeam';

const initialValues = {
  phoneCode: '',
  number: '',
}

export default function InviteAgents() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const formRef = useRef<any>(null);
  const navigation: any = useNavigation();
  const [country, setCountry] = useState<CountryType | null>(null);

  const validationSchema = Yup.object({
    phoneCode: Yup.string().required(),
    number: Yup.string().required(t('phone-is-required')),
  });

  const { data: team } = useGetTeam(user.id);

  const { mutate: inviteMutation, isLoading } = useSendTeamInvite(
    (data: any) => {
      console.log('data', data);
    },
    (err: any) => {
      formRef.current.setFieldError('number', t(getErrorCode(err)));
    },
  )

  useEffect(() => {
    formRef.current.values.phoneCode = country?.phoneCode || '';
  }, [country])

  const handleInvite = (dto: PhoneDto) => {
    inviteMutation({
      userId: user.id,
      teamId: team.id,
      dto,
    })
  }

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={[globalStyles.mv20, globalStyles.ph20]}>
          <CustomText
            text={t('invite-agent-title')}
            size={20}
            fontWeight='medium'
            color={theme.colors.text}
            style={globalStyles.text}
          />
        </View>

        {/* Form */}
        <View>
          <Formik
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={(dto: PhoneDto) => handleInvite(dto)}
          >
            {(props) => (
              <View style={globalStyles.ph20}>

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
                    leftIconContainerStyle={globalStyles.phoneCodeContainerStyle}
                  />
                </View>

                {/* Submit Button */}
                <View style={globalStyles.mt20}>
                  <PrimaryButton
                    text={t('invite')}
                    onPress={props.submitForm}
                    disabled={!props.isValid || isLoading}
                    isLoading={isLoading}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'height' : undefined}
      keyboardVerticalOffset={130}
    >
      {renderContent()}
    </KeyboardAvoidingView>
  );
}