import { View, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Formik } from 'formik'
import { useTheme } from 'src/context/ThemeContext'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import { ErrorButton, PrimaryButton } from 'src/components/buttons/CustomButton/variants'
import { useUpdateReimbursement } from 'src/hooks/useUsers'
import { useAuth } from 'src/context/AuthContext'
import * as appService from 'src/services/appService';
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog'
import { createStyles } from './styles'
import { UpdateReimbursementDto } from 'src/types/dto/UpdateReimbursementDto'
import { CreateTeamDto } from 'src/types/dto/CreateTeamDto'
import { useGetTeam } from 'src/hooks/useTeam'

const defaultInitialValues: CreateTeamDto = {
  name: '',
}

export default function CreateTeamScreen() {
  const { user, login } = useAuth();
  const [initialValues, setInitialValues] = useState<any>(defaultInitialValues);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const id = route?.params?.id;
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const { data: team, isLoading } = useGetTeam(user?.id);

  const { mutate: updateMutation, isLoading: isUpdating } = useUpdateReimbursement(
    (data: any) => {
      if (data?.status_code == 200) {
        appService.showToast(`Reimbursement info updated successfully`, 'success');
        navigation.goBack();
      } else {
        appService.showToast(data?.data ? data.data : 'Something went wrong', 'error');
      }
    },
    (err: any) => {
      console.log('err', JSON.stringify(err));
    }
  );

  const handleSubmit = (values: any) => {
    Keyboard.dismiss();
    handleUpdate(values);
  }

  const handleUpdate = (values: UpdateReimbursementDto) => {
    updateMutation({
      userId: user.id,
      dto: { ...values },
    });
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
              enableReinitialize={true}
              onSubmit={(values: any) => handleSubmit(values)}
            >
              {(props) => {

                return (
                  <View>




                    <View style={globalStyles.mt20}>
                      <PrimaryButton
                        text={team ? 'Save' : 'Add'}
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


        {(isLoading) && (
          <View style={globalStyles.loadingOverlay}>
            <ActivityIndicator size={30} color={theme.colors.text} />
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  )

}