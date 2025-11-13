import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import StickerScanner from 'src/components/Case/StickerScanner/StickerScanner'
import IDScanner from 'src/components/User/IDScanner/IDScanner';
import { FastField, Formik, FormikHelpers, FormikValues } from 'formik';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import Spacer from 'src/components/common/Spacer/Spacer';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import CustomDatePicker from 'src/components/common/CustomDatePicker/CustomDatePicker';
import AgentTeamRequestNote from 'src/components/Notes/AgentTeamRequestNote/AgentTeamRequestNote';

const initialValues = {
  fullName: '',
  number: '',
  dateOfBirth: new Date(),
  email: '',
  address: '',
}

export default function AcceptInvitationForm({ props }: any) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const [identity, setIdentity] = useState<string | null>(null);

  useEffect(() => {
    if (identity !== null) {
      // refetch();
      console.log('identity', identity);
    }
  }, [identity]);

  const onIdentityScan = async (path: string) => {
    setIdentity(path);
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
          onSubmit={(values: any) => {
            console.log('values', values);
          }}>
          {(props) => (
            <View style={[globalStyles.flex1]}>

              {/* ID Scanner */}
              <View>
                <IDScanner
                  onSelect={onIdentityScan}
                  onCancel={() => console.log('cance')} />
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
                  onPress={props.submitForm} />
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