import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useMemo, useState } from 'react'
import { FastField, Formik } from 'formik';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import Spacer from 'src/components/common/Spacer/Spacer';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import CustomDatePicker from 'src/components/common/CustomDatePicker/CustomDatePicker';
import AgentTeamRequestNote from 'src/components/Notes/AgentTeamRequestNote/AgentTeamRequestNote';
import { useRequestToJoinATeam } from 'src/hooks/useInvitations';
import { RequestToJoinATeamDto } from 'src/types/dto/RequestToJoinATeamDto';
import { useAuth } from 'src/context/AuthContext';
import * as Yup from 'yup';

const defaultInitialvalues = {
  fullName: '',
  number: '',
  dateOfBirth: new Date(),
  email: '',
  address: '',
}

interface Props {
  id: string;
  shared: any;
}

export default function AcceptInvitationForm({ id }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [initialValues, setInitialValues] = useState<RequestToJoinATeamDto>(defaultInitialvalues)
  const [filePath, setFilePath] = useState<string>('');

  const validationSchema = Yup.object({
    fullName: Yup.string().required(t('full-name-4-is-required')),
    number: Yup.string().required(t('id-or-passport-number-is-required')),
    dateOfBirth: Yup.string().required(t('date-of-birth-is-required')),
    email: Yup.string().email(t('invalid-email-address')).required(t('email-is-required')),
    address: Yup.string().required(t('address-is-required')),
  })

  const { mutate } = useRequestToJoinATeam(
    (data: any) => {
      console.log('succeed request', data);
    },
    (error: any) => {
      console.log('error request', error);
    }
  )

  const onIdentityScan = async (path: string) => {
    setFilePath(path);
  }

  const onSubmit = (values: RequestToJoinATeamDto) => {
    mutate({
      userId: user.id,
      invitationId: id,
      dto: {
        ...values,
        filePath,
      }
    });
  }

  const renderContenr = () => {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          enableReinitialize={true}
          onSubmit={(values: RequestToJoinATeamDto) => {
            onSubmit(values);
          }}>
          {(props) => (
            <View style={[globalStyles.flex1]}>

              {/* ID Scanner */}
              <View>
                {/* <IDScanner
                  onSelect={onIdentityScan}
                  onCancel={() => console.log('cance')} /> */}
              </View>

              {/* Full name */}
              <View style={globalStyles.mt20}>
                <FastField
                  name="fullName"
                  component={CustomFormTextInput}
                  required
                  label={t('full-name-4')}
                  placeholder={t('enter-full-name-4')}
                  height={68}
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
                />
              </View>

              {/* ID/Passport number */}
              <View style={globalStyles.mt10}>
                <FastField
                  name="number"
                  component={CustomFormTextInput}
                  required
                  label={t('id-or-passport-number')}
                  placeholder={t('enter-id-or-passport-number')}
                  height={68}
                />
              </View>

              {/* Email */}
              <View style={globalStyles.mt10}>
                <FastField
                  name="email"
                  component={CustomFormTextInput}
                  required
                  label={t('email')}
                  placeholder={t('enter-email')}
                  height={68}
                />
              </View>

              {/* Address */}
              <View style={globalStyles.mt10}>
                <FastField
                  name="address"
                  component={CustomFormTextInput}
                  required
                  label={t('address')}
                  placeholder={t('enter-address')}
                  height={68}
                />
              </View>

              {/* Agent team request Note */}
              <View style={[globalStyles.jcc, globalStyles.aic, globalStyles.mt10]}>
                <AgentTeamRequestNote />
              </View>

              <Spacer flex={true} />

              <View style={globalStyles.mv20}>
                <PrimaryButton
                  text={t('send')}
                  onPress={props.submitForm}
                  disabled={!props.isValid || !filePath}
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
      {renderContenr()}
    </KeyboardAvoidingView>
  );
}