import { View, Text, ScrollView, KeyboardAvoidingView, ActivityIndicator, Platform } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { FastField, Formik } from 'formik';
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants';
import { useGetUserById, useUpdateProfile, useUpdateProfilePicture } from 'src/hooks/useUsers';
import { useAuth } from 'src/context/AuthContext';
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput';
import { useGetSpecialities } from 'src/hooks/useLookups';
import { CustomSelectList } from 'src/components/InputFields/CustomSelectList/CustomSelectList';
import * as appService from 'src/services/appService';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from 'src/components/User/ProfilePicture/ProfilePicture';
import UserIconOutline from 'src/icons/UserIconOutline';
import EmailIcon from 'src/icons/EmailIcon';
import * as usersService from 'src/services/usersService';
import ProfileChangePassword from 'src/components/User/ProfileChangePassword/ProfileChangePassword';

const defaultInitialValues = {
  first_name: '',
  last_name: '',
  speciality_id: '',
  email: '',
}

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [initialValues, setInitialValues] = useState<any>(defaultInitialValues);
  const { user, login } = useAuth();
  const navigation: any = useNavigation();
  const [imagePath, setImagePath] = useState<string>('');

  const validationSchema = Yup.object({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    speciality_id: Yup.number().required(),
    email: Yup.string().email().required(),
  })

  const { data: specialities } = useGetSpecialities();

  const { data: fetchedUser, isFetching } = useGetUserById(user.id, {
    onSuccess: (data: any) => {
      setInitialValues({
        first_name: data.first_name,
        last_name: data.last_name,
        speciality_id: String(data?.user_profile[0]?.speciality?.id),
        email: data.email
      });
    }
  });

  const { mutateAsync: updateProfilePictureMutation } = useUpdateProfilePicture(
    (data: any) => {
      console.log('image request', data);
    },
    (error: any) => {
      console.log('image error', error);
    }
  );

  const { mutate: updateMutation, isLoading: isUpdating } = useUpdateProfile(
    async (data: any) => {
      if (imagePath) {
        await updateProfilePictureMutation({
          userId: user.id,
          image: imagePath
        });
      }
      const updatedUser = await usersService.getUserById(user.id);
      login(updatedUser);
      navigation?.goBack();
      appService.showToast('User updated successfully', 'success');
    },
    (error: any) => {
      appService.showToast(error.message, 'error');
    }
  )


  const handleSubmit = (values: any) => {
    updateMutation({
      userId: user.id,
      dto: { ...values }
    })
  }

  return (
    <>
      <KeyboardAvoidingView
        style={globalStyles.flex1}
        behavior={Platform.OS === 'ios' ? 'height' : undefined}
        keyboardVerticalOffset={130}
      >
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={globalStyles.scrollView}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnMount={true}
              enableReinitialize={true}
              onSubmit={(values: any) => handleSubmit(values)}
            >
              {(props) => {
                return (
                  <View style={[globalStyles.flex1, globalStyles.ph20]}>

                    <View style={globalStyles.mt20}>
                      <ProfilePicture
                        onSelect={(filePath: string) => {
                          setImagePath(filePath);
                        }}
                        onCancel={() => console.log('canceled')}
                        size={120}
                        icon={'camera'}
                        crop
                      />
                    </View>

                    {/* First name */}
                    <View style={globalStyles.mt20}>
                      <FastField
                        name="first_name"
                        component={CustomFormTextInput}
                        required
                        label='First name'
                        placeholder='Enter first name'
                        leftIcon={<UserIconOutline size={22} color={theme.colors.primary} />}
                        leftIconWidth={50}
                      />
                    </View>

                    {/* Last name */}
                    <View style={globalStyles.mt10}>
                      <FastField
                        name="last_name"
                        component={CustomFormTextInput}
                        required
                        label='Last Name'
                        placeholder='Enter last name'
                        leftIcon={<UserIconOutline size={22} color={theme.colors.primary} />}
                        leftIconWidth={50}
                      />
                    </View>

                    {/* Speciality */}
                    <View style={globalStyles.mt10}>
                      <FastField
                        key={specialities ? specialities.length : 0}
                        name="speciality_id"
                        component={CustomSelectList}
                        required
                        label='Speciality'
                        placeholder='Select speciality'
                        data={specialities || []}
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
                        keyboardType='email-address'
                        leftIcon={<EmailIcon size={21} color={theme.colors.primary} />}
                        leftIconWidth={50}
                      />
                    </View>

                    <View style={globalStyles.mt10}>
                      <ProfileChangePassword />
                    </View>


                    <View style={globalStyles.flex1} />
                    <View style={globalStyles.continueButtonContainer}>
                      <PrimaryButton
                        text={'Save'}
                        disabled={!props.isValid || isUpdating}
                        isLoading={isUpdating}
                        onPress={props.submitForm}
                      />
                    </View>
                  </View>
                )
              }}
            </Formik>
          </ScrollView>
        </View>


        {(isFetching) && (
          <View style={globalStyles.loadingOverlay}>
            <ActivityIndicator size={30} color={theme.colors.text} />
          </View>
        )}
      </KeyboardAvoidingView>
      {/* {(isFetching) && (
        <View style={globalStyles.loadingOverlay}>
          <ActivityIndicator size={30} color={theme.colors.text} />
        </View>
      )} */}
    </>

  )
}