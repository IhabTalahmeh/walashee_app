import { View, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { FastField, Formik } from 'formik'
import { useTheme } from 'src/context/ThemeContext'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import { PrimaryButton } from 'src/components/buttons/CustomButton/variants'
import { useAuth } from 'src/context/AuthContext'
import * as appService from 'src/services/appService';
import { useNavigation, useRoute } from '@react-navigation/native'
import { createStyles } from './styles'
import { CreateTeamDto } from 'src/types/dto/CreateTeamDto'
import { useCreateTeam, useGetTeam, useUpdateTeam } from 'src/hooks/useTeam'
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput'
import { useTranslation } from 'react-i18next'
import Spacer from 'src/components/common/Spacer/Spacer'
import CustomImagePicker from 'src/components/common/CustomImagePicker/CustomImagePicker'

const defaultInitialValues: CreateTeamDto = {
  name: '',
}

export default function CreateTeamScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [initialValues, setInitialValues] = useState<any>(defaultInitialValues);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();
  const [avatar, setAvatar] = useState<string>('');

  const { data: team, isLoading } = useGetTeam(user?.id);

  const { mutate: createMutation, isLoading: isCreating } = useCreateTeam(
    (data: any) => {
      appService.showToast('team-created-successfully', 'success');
      navigation.goBack();
    },
    (err: any) => {
      appService.showToast(err, 'error');
    }
  );

  const { mutate: updateMutation, isLoading: isUpdating } = useUpdateTeam(
    (data: any) => {
      console.log('data', data);
    },
    (err: any) => {
      console.log('err', err);
    }
  );

  const handleSubmit = (dto: CreateTeamDto) => {
    Keyboard.dismiss();
    dto.filePath = avatar;
    team ? handleUpdate(dto) : handleCreate(dto);
  }

  const handleUpdate = (dto: CreateTeamDto) => {
    updateMutation({
      userId: user.id,
      dto,
    });
  }

  const handleCreate = (dto: CreateTeamDto) => {
    createMutation({
      userId: user.id,
      dto,
    });
  }

  const handleAvatarSelect = (path: string) => {
    setAvatar(path);
  }

  const handleAvatarCancel = () => {
    setAvatar('');
  }

  useEffect(() => {
    navigation.setOptions({
      title: team ? team.name : t('create-team'),
    })
  }, [team]);

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
              enableReinitialize={true}
              onSubmit={(values: any) => handleSubmit(values)}
            >
              {(props) => {

                return (
                  <View style={globalStyles.flex1}>

                    <View style={globalStyles.mv20}>
                      <CustomImagePicker
                        size={120}
                        icon='camera'
                        crop={false}
                        onSelect={handleAvatarSelect}
                        onCancel={handleAvatarCancel} />
                    </View>

                    {/* Team name */}
                    <View style={globalStyles.mt10}>
                      <FastField
                        name="name"
                        component={CustomFormTextInput}
                        required
                        label={t('team-name')}
                        placeholder={t('enter-team-name')}
                        height={68}
                        withBorder
                      />
                    </View>

                    <Spacer flex={true} />

                    <View style={globalStyles.mt20}>
                      <PrimaryButton
                        text={team ? t('save') : t('create')}
                        disabled={!props.isValid || isCreating || isUpdating}
                        isLoading={isCreating || isUpdating}
                        onPress={props.submitForm}
                      />
                    </View>
                  </View>
                )
              }}
            </Formik>
          </ScrollView>
        </View>


        {(isLoading) && (
          <View style={globalStyles.loadingOverlay}>
            <ActivityIndicator size={30} color={theme.colors.text} />
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  )

}