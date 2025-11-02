import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FastField, Formik } from 'formik'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles'
import { useGlobalStyles } from 'src/hooks/useGlobalStyles'
import CustomDatePicker from 'src/components/common/CustomDatePicker/CustomDatePicker'
import { useGetSpecialities } from 'src/hooks/useLookups'
import { CustomSelectList } from 'src/components/InputFields/CustomSelectList/CustomSelectList'
import { ErrorButton, PrimaryButton } from 'src/components/buttons/CustomButton/variants'
import * as Yup from 'yup';
import SelectPlace from 'src/components/User/SelectPlace/SelectPlace'
import { useAddExperience, useDeleteExperience, useGetExperienceById, useUpdateExperience } from 'src/hooks/useUsers'
import { useAuth } from 'src/context/AuthContext'
import * as appService from 'src/services/appService';
import { useNavigation, useRoute } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomText from 'src/components/common/CustomText/CustomText'
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog'
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton'

const defaultInitialValues = {
  start_date: new Date(),
  end_date: new Date(),
  hospital: null,
  speciality_id: null,

}

export default function AddPosition() {
  const { user } = useAuth();
  const [initialValues, setInitialValues] = useState<any>(defaultInitialValues);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const formRef = useRef<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const id = route?.params?.id;
  const [checked, setChecked] = useState<boolean>(true);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const routeName = useMemo(() => {
    return route?.name ? route.name.replace('Add', '') : '';
  }, [route]);

  const { data: experience, isLoading: isFetchingExperience } = useGetExperienceById({
    userId: user.id,
    experienceId: id,
  }, {
    enabled: id ? true : false,
    onSuccess: (data: any) => {
      setChecked(data?.end_date ? false : true);
      setInitialValues({
        start_date: new Date(data.start_date),
        end_date: data.end_date ? new Date(data.end_date) : new Date(),
        speciality_id: String(data.speciality.id),
        hospital: {
          address: data.hospital.address,
          google_place_id: data.hospital.google_place_id,
          name: data.hospital.name,
        }
      });
      setSelectedPlace({ name: data.hospital.name });
    }
  });

  const { mutate: createMutation, isLoading: isCreating } = useAddExperience(
    (data: any) => {
      if (data?.status_code == 200) {
        appService.showToast(`${routeName} added successfully`, 'success');
        navigation.goBack();
      } else {
        appService.showToast(data?.data ? data.data : 'Something went wrong', 'error');
      }
    },
    (err: any) => {
      console.log('err', JSON.stringify(err));
    }
  );

  const { mutate: updateMutation, isLoading: isUpdating } = useUpdateExperience(
    (data: any) => {
      if (data?.status_code == 200) {
        appService.showToast(`${routeName} updated successfully`, 'success');
        navigation.goBack();
      } else {
        appService.showToast(data?.data ? data.data : 'Something went wrong', 'error');
      }
    },
    (err: any) => {
      console.log('err', JSON.stringify(err));
    }
  );

  const { mutate: deleteMutation, isLoading: isDeleting } = useDeleteExperience(
    (data: any) => {
      if (data?.status_code == 200) {
        setDeleteOpen(false);
        appService.showToast(`${routeName} deleted successfully`, 'success');
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

  const validationSchema = Yup.object({
    start_date: Yup.string().required(),
    end_date: Yup.string(),
    hospital: Yup.object().required(),
    speciality_id: Yup.number().required(),
  })

  const { data: specialities } = useGetSpecialities();

  const selectPlace = (place: any) => {
    formRef.current.setFieldValue('hospital', place);
    setSelectedPlace(place);
  }

  const handleSubmit = (values: any) => {
    if (checked) delete values.end_date;
    id ? handleUpdate(values) : handleCreate(values);
  }

  const handleCreate = (values: any) => {
    createMutation({
      userId: user.id,
      dto: { ...values },
    });
  }

  const handleUpdate = (values: any) => {
    updateMutation({
      userId: user.id,
      experienceId: id,
      dto: { ...values },
    });
  }

  const handleDelete = () => {
    deleteMutation({
      userId: user.id,
      experienceId: id,
    });
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
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={globalStyles.scrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Formik
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount={true}
            enableReinitialize={true}
            onSubmit={(values: any) => handleSubmit(values)}
          >
            {(props) => (
              <View>

                {/* Hospital | Institution */}
                <View>
                  <SelectPlace
                    title={'Places'}
                    selectedPlace={selectedPlace}
                    setSelectPlace={selectPlace} />
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

                {/* Start Date */}
                <View style={globalStyles.mt10}>
                  <FastField
                    name="start_date"
                    component={CustomDatePicker}
                    required={true}
                    label={'Start date'}
                    placeholder='Enter start date'
                  />
                </View>

                <TouchableOpacity style={[styles.checkNote, globalStyles.flexRow, globalStyles.aic, globalStyles.mt15]} activeOpacity={0.8} onPress={() => setChecked(!checked)}>
                  <View style={[, { width: 20, height: 20 }]}>
                    <FontAwesome name={checked ? 'check-square-o' : 'square-o'} size={22} color={theme.colors.text} />
                  </View>
                  <View style={[globalStyles.ml5, globalStyles.ph5]}>
                    <CustomText text='I currently work in this role.' size={18} color={theme.colors.text} fontWeight='medium' />
                  </View>
                </TouchableOpacity>


                {/* End Date */}
                {!checked && <View style={globalStyles.mt10}>
                  <FastField
                    name="end_date"
                    component={CustomDatePicker}
                    required={false}
                    label={'End date'}
                    placeholder='Enter end date'
                  />
                </View>}


                <View style={globalStyles.mt20}>
                  <PrimaryButton
                    text={id ? 'Save' : 'Add'}
                    disabled={!props.isValid || isUpdating || isCreating}
                    isLoading={isUpdating || isCreating}
                    onPress={props.submitForm}
                  />
                </View>

                {id && <View style={globalStyles.mt10}>
                  <ErrorButton
                    text={'Delete'}
                    disabled={!props.isValid}
                    onPress={() => setDeleteOpen(true)}
                  />
                </View>}
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>

      <CustomDialog
        visible={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title={'Delete Position'}
        message={'Are you sure you want to delete this position?'}
        buttons={deleteModalButtons}
      />

      {(isFetchingExperience) && (
        <View style={globalStyles.loadingOverlay}>
          <ActivityIndicator size={30} color={theme.colors.text} />
        </View>
      )}
    </>
  )
}