import { View, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useMemo, useState } from 'react'
import { FastField, Formik } from 'formik'
import { useTheme } from 'src/context/ThemeContext'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import { useGetReimbursementModels, useGetStates, useGetThresholds } from 'src/hooks/useLookups'
import { CustomSelectList } from 'src/components/InputFields/CustomSelectList/CustomSelectList'
import { ErrorButton, PrimaryButton } from 'src/components/buttons/CustomButton/variants'
import { useDeleteReimbursement, useGetEducationById, useGetUserById, useUpdateReimbursement } from 'src/hooks/useUsers'
import { useAuth } from 'src/context/AuthContext'
import * as appService from 'src/services/appService';
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog'
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton'
import { createStyles } from './styles'
import CustomFormTextInput from 'src/components/common/CustomFormTextInput/CustomFormTextInput'
import { showAmount, showRVUMultiplier, showThreshold } from 'src/common/helpers'
import { EReimbursementModel } from 'src/enum/EReimbursementModel'
import { UpdateReimbursementDto } from 'src/types/dto/UpdateReimbursementDto'
import { EThreshold } from 'src/enum/EThreshold'

const defaultInitialValues: UpdateReimbursementDto = {
  practice_state: '',
  reimbursement_model: EReimbursementModel.EMPTY,
  threshold: EThreshold.EMPTY,
  amount: '0.00',
  rvus_multiplier: '0.00',
}

export default function AddReimbursement() {
  const { user, login } = useAuth();
  const [initialValues, setInitialValues] = useState<any>(defaultInitialValues);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const id = route?.params?.id;
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const { data: states } = useGetStates();
  const { data: reimbursementModels } = useGetReimbursementModels();
  const { data: thresholds } = useGetThresholds();

  const { data: fetchedUser, isFetching } = useGetUserById(user.id, {
    onSuccess: (data: any) => {
      setInitialValues(data?.reimbursement || defaultInitialValues);
    }
  });

  const { data: experience, isLoading: isFetchingExperience } = useGetEducationById({
    userId: user.id,
    educationId: id,
  }, {
    enabled: id ? true : false,
    onSuccess: (data: any) => {
      setInitialValues({
        start_date: new Date(data.start_date),
        end_date: data.end_date ? new Date(data.end_date) : new Date(),
        speciality_id: String(data.speciality.id),
        institution_name: data.institution_name,
        degree_id: String(data.degree.id),
      });
    }
  });

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

  const { mutate: deleteMutation, isLoading: isDeleting } = useDeleteReimbursement(
    (data: any) => {
      if (data?.status_code == 200) {
        setDeleteOpen(false);
        appService.showToast(`Reimbursement deleted successfully`, 'success');
        navigation.goBack();
      } else {
        setDeleteOpen(false);
        appService.showToast(data?.data ? data.data : 'Something went wrong', 'error');
      }
    },
    (err: any) => {
      console.log('err', JSON.stringify(err));
    }
  )

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

  const handleDelete = () => {
    deleteMutation(user.id);
  }

  const deleteModalButtons = [
    {
      text: 'Delete',
      disabled: isDeleting,
      loading: isDeleting,
      onPress: handleDelete,
      button: ErrorButton,
    },
    {
      text: 'Cancel',
      disabled: isDeleting,
      onPress: () => setDeleteOpen(false),
      button: NeutralButton,
    }
  ]

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


                const isFormValid = useMemo(() => {
                  const { reimbursement_model, practice_state, threshold, amount, rvus_multiplier } = props.values;

                  if (!practice_state) return false;
                  if (!reimbursement_model) return false;
                  if (showThreshold(reimbursement_model) && !threshold) return false;
                  if (showAmount(reimbursement_model) && (!amount || isNaN(parseFloat(amount)))) return false;
                  if (showRVUMultiplier(reimbursement_model) && (!rvus_multiplier || isNaN(parseFloat(rvus_multiplier)))) return false;

                  return true;
                }, [props.values]);


                return (
                  <View>

                    {/* Practice State */}
                    <View>
                      <FastField
                        key={states ? states.length : 0}
                        name="practice_state"
                        component={CustomSelectList}
                        required={false}
                        label='Practice State'
                        placeholder='Select practice state'
                        data={states || []}
                      />
                    </View>

                    {/* Reimbursement Model */}
                    <View style={globalStyles.mt10}>
                      <FastField
                        key={reimbursementModels ? reimbursementModels.length : 0}
                        name="reimbursement_model"
                        component={CustomSelectList}
                        required
                        label='Reimbursement Model'
                        placeholder='Select reimbursement model'
                        data={reimbursementModels || []}
                      />
                    </View>

                    {/* Threshold */}
                    {showThreshold(props.values.reimbursement_model) && (
                      <View style={globalStyles.mt10}>
                        <FastField
                          key={thresholds ? thresholds.length : 0}
                          name="threshold"
                          component={CustomSelectList}
                          required
                          label='Threshold'
                          placeholder='Select threshold'
                          data={thresholds || []}
                        />
                      </View>
                    )}


                    {/* Amount */}
                    {showAmount(props.values.reimbursement_model) && <View style={globalStyles.mt10}>
                      <FastField
                        name="amount"
                        component={CustomFormTextInput}
                        required
                        label='Amount'
                        placeholder='Enter amount'
                        keyboardType='numeric'
                        selectTextOnFocus
                      />
                    </View>}

                    {/* RVUs Multiplier */}
                    {showRVUMultiplier(props.values.reimbursement_model) && <View style={globalStyles.mt10}>
                      <FastField
                        name="rvus_multiplier"
                        component={CustomFormTextInput}
                        required
                        label='RVUs Multiplier'
                        placeholder='RVUs Multiplier'
                        keyboardType='numeric'
                        note="(Reimbursement per RVU)"
                        selectTextOnFocus
                      />
                    </View>}

                    <View style={globalStyles.mt20}>
                      <PrimaryButton
                        text={fetchedUser.reimbursement ? 'Save' : 'Add'}
                        disabled={!isFormValid || isUpdating}
                        isLoading={isUpdating}
                        onPress={props.submitForm}
                      />
                    </View>

                    {fetchedUser.reimbursement && <View style={globalStyles.mt10}>
                      <ErrorButton
                        text={'Delete'}
                        disabled={isUpdating}
                        onPress={() => setDeleteOpen(true)}
                      />
                    </View>}
                  </View>
                )
              }}
            </Formik>
          </ScrollView>
        </View>

        <CustomDialog
          visible={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          title={'Delete Reimbursement'}
          message={'Are you sure you want to delete reimbursement info?'}
          buttons={deleteModalButtons}
        />

        {(isFetchingExperience) && (
          <View style={globalStyles.loadingOverlay}>
            <ActivityIndicator size={30} color={theme.colors.text} />
          </View>
        )}
      </KeyboardAvoidingView>
      {(isFetching) && (
        <View style={globalStyles.loadingOverlay}>
          <ActivityIndicator size={30} color={theme.colors.text} />
        </View>
      )}
    </>
  )

}