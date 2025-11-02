import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useMemo, useRef } from 'react'
import CustomText from 'src/components/common/CustomText/CustomText'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { FastField, Formik } from 'formik';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import { PERMISSIONS_LIST } from 'src/common/constants';
import { CustomSelectList } from 'src/components/InputFields/CustomSelectList/CustomSelectList';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import * as Yup from 'yup';
import { useInviteUsers } from 'src/hooks/useUsers';
import { InviteUserDto } from 'src/types/dto/InviteUsersDto';
import { useAuth } from 'src/context/AuthContext';
import * as appService from 'src/services/appService';
import { useNavigation } from '@react-navigation/native';

const initialValues = {
  email: '',
  permission: '',
}

export default function InviteUsers() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const formRef = useRef<any>(null);
  const navigation: any = useNavigation();

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    permission: Yup.string().required(),
  });

  const { mutate: inviteMutation, isLoading } = useInviteUsers(
    (data: any) => {
      if (data.status_code == 200) {
        const color = data?.data[0]?.includes('invited before') ? 'warning' : 'success';
        appService.showToast(data?.data[0], color);
        navigation.goBack();
        return;
      }

      appService.showToast(data?.data[0], 'warning');
    },
    (err: any) => appService.showToast(err, 'error'),
  )

  const handleInvite = (values: InviteUserDto) => {
    inviteMutation({
      userId: user.id,
      dto: {
        users: [values]
      }
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
        <View style={globalStyles.mv20}>
          <CustomText
            text={"Enter the user’s email you want to invite and select their permissions."}
            size={20}
            fontWeight='medium'
            color={theme.colors.text}
            style={globalStyles.centerText}
          />
        </View>

        {/* Form */}
        <View>
          <Formik
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={(values: any) => handleInvite(values)}
          >
            {(props) => (
              <View style={globalStyles.ph20}>

                {/* Email Address */}
                <View style={globalStyles.mt10}>
                  <FastField
                    name="email"
                    component={CustomFormTextInput}
                    required
                    label='Email Address'
                    placeholder='eg.john@example.com'
                    keyboardType='email-address'
                    height={60}
                  />
                </View>

                {/* Permission */}
                <View style={globalStyles.mt20}>
                  <FastField
                    name="permission"
                    component={CustomSelectList}
                    required
                    label='Permission'
                    placeholder='Select permission'
                    height={60}
                    data={PERMISSIONS_LIST}
                  />
                </View>

                {/* Submit Button */}
                <View style={globalStyles.mt20}>
                  <PrimaryButton
                    text='Invite'
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