import { View, FlatList, Dimensions, ActivityIndicator, Text, TouchableOpacity, Keyboard, Platform } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from 'src/context/ThemeContext'
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import { useGetApproachList, useGetGenders, useGetIndicationList, useGetInsuranceList, useGetInsuranceStatusList, useGetLocationList, useGetOsteotomyList, useGetProcedureList, useGetProcedureTypes, useGetRaceList, useGetSideList, useGetTICIGrade, useGetVendorsList } from 'src/hooks/useLookups';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { useAuth } from 'src/context/AuthContext';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCreateProcedure, useGetProcedureById, useUpdateProcedure, useUpdateProcedureImages } from 'src/hooks/useProcedure';
import { CPT, ICD, ImageItem, LabelValueType } from 'src/types/types/Types';
import { StepOne } from './StepOne';
import { StepThree } from './StepThree';
import { StepTwo } from './StepTwo';
import { StepFour } from './StepFour';
import { checkResponse, getBase64FromUri, stringToArray, stringToDate, validateCaseProcedures } from 'src/common/utils';
import { useScanPatientSticker } from 'src/hooks/useOpenAI';
import * as appService from 'src/services/appService';
import PagerView from 'react-native-pager-view';
import { isInterventional, isNeurosurgery, showApproach } from 'src/common/helpers';
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog';
import { ErrorButton } from 'src/components/buttons/CustomButton/variants';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  if (Platform.OS === 'android') {
    return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
  }
  return <View style={{ flex: 1 }}>{children}</View>;
};

const defaultInitialValues = {
  // Step 1
  patient_first_name: '',
  patient_last_name: '',
  gender: '',
  date_of_birth: new Date(),
  age: '',
  mrn: '',
  race: '',
  insurance: '',
  insurance_status: 'PENDING',
  hospital_id: '',
  diagnosis: '',
  icd: '',

  // Step 2
  date_of_procedure: new Date(),
  procedure_name: '',
  type: '',
  approach: [],
  minimally_invasive: '',
  navigation: '',
  robotic: '',
  indication: [],
  side: '',
  target: '',
  nerve: '',
  location: [],
  _procedure: [],
  tici_grade: '',
  osteotomy: '',
  _fusion: '',
  interbody_fusion: '',
  extension_to_pelvis: '',
  fusion_levels: '',
  decompression_levels: '',
  morphogenic_protein: '',
  implant: '',
  implant_type: '',
  _vendors: [],
  vendors: '',
  access: '',
  vascular_closure_device: '',
  duration_of_radiation: '',
  duration_of_procedure: '',
  findings: '',
  complications: '',
  outcome: '',

  // Step 4
  notes: [],
  images: [],
  case_procedures: [],
};

const caseProcedureInitialValues = {
  date_of_procedure: new Date(),
  procedure_name: '',
  type: '',
  approach: [],
  minimally_invasive: '',
  navigation: '',
  robotic: '',
  indication: [],
  side: '',
  target: '',
  nerve: '',
  location: [],
  _procedure: [],
  tici_grade: '',
  osteotomy: '',
  _fusion: '',
  interbody_fusion: '',
  extension_to_pelvis: '',
  fusion_levels: '',
  decompression_levels: '',
  morphogenic_protein: '',
  implant: '',
  implant_type: '',
  _vendors: [],
  vendors: '',
  access: '',
  vascular_closure_device: '',
  duration_of_radiation: '',
  duration_of_procedure: '',
  findings: '',
  complications: '',
  outcome: '',
};

const { width } = Dimensions.get('window');

export default function AddCaseScreen({ route }: any) {
  const [completed, setCompleted] = useState<boolean>(false);

  const [primarySurgeons, setPrimarySurgeons] = useState<any[]>([]);
  const [coSurgeons, setCoSurgeons] = useState<any[]>([]);
  const [icds, setICDs] = useState<ICD[]>([]);
  const [cpts, setCPTs] = useState<CPT[]>([]);
  const [cptModifier, setCPTModifier] = useState<any>(null);
  const [caseProcedures, setCaseProcedures] = useState<any[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);

  const id = route?.params?.id || undefined;
  const doctorId = route?.params?.doctorId || undefined;
  const [initialValues, setInitialValues] = useState<any>(defaultInitialValues)
  const { user } = useAuth();
  const [sticker, setSticker] = useState<string | null>(null);
  const [discardModalOpen, setDiscardModalOpen] = useState<boolean>(false);
  const [discardConfirmed, setDiscardConfirmed] = useState(false);

  const afterStickerScan = (data: any) => {
    setInitialValues((item: any) => {
      return ({
        ...item,
        ...data,
        date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : new Date()
      })
    });
  }

  const { data: stickerInfo, refetch, isFetching: isScanning } = useScanPatientSticker(sticker as string, {
    enabled: false,
    onSuccess: (data: any) => afterStickerScan(data),
    onError: (error: any) => appService.showToast("Couldn't extract patient info, please try again.", 'error'),
  });

  const onStickerScan = async (filePath: string) => {
    const base64 = await getBase64FromUri(filePath);
    setSticker(base64);
  }

  useEffect(() => {
    if (sticker !== null) {
      refetch();
    }
  }, [sticker]);

  const updateImagesMutation = useUpdateProcedureImages(
    (data: any) => console.log('data update', data),
    (error: any) => console.log('error update images', error),
  )

  const updateProcedureImages = async (pId?: number) => {
    await updateImagesMutation.mutateAsync({
      userId: doctorId ?? user.id,
      procedureId: pId ?? id,
      images: newImages,
    });
  }

  useGetProcedureById(id, user.id, {
    enabled: typeof id == 'number' ? true : false,
    onSuccess: (data: any) => {
      for (let key in data) {

        // Booleans conversion
        if (typeof data[key] == 'boolean') {
          data[key] = data[key] ? '1' : '0';
        }

        if (key == 'date_of_birth') {
          if (data[key]) {
            data[key] = stringToDate(data[key]);
          } else {
            delete data[key];
          }
        }

        // Lists conversion
        if (isMultipleSelection() && ['approach', 'indication', 'location', '_procedure', '_vendors'].includes(key)) {
          data[key] = stringToArray(data[key] ?? "");
        }
      }

      const procedureCPTs = data.procedure_cpt.map((item: any) => {
        return ({
          id: item.cpt_lookup.id,
          code: item.cpt_lookup.code,
          rvu_value: item.cpt_lookup.rvu_value,
          value: item.cpt_lookup.value,
          quantity: item.quantity,
        })
      });

      const procedureICDs = data.procedure_icd.map((item: any) => {
        return ({
          ...item.icd_lookup
        })
      });


      const co = data?.co_surgeons?.map((item: any) => {
        return ({
          invitee_name: item,
          selected: true,
        })
      })


      const primary = data?.primary_surgeons?.map((item: any) => {
        return ({
          invitee_name: item,
          selected: true,
        })
      })

      data.hospital_id = data.hospital.id;
      const cps = [];
      for (let cp of data.case_procedures) {
        cp.date_of_procedure = stringToDate(cp.date_of_procedure);
        for (let key in cp) {
          if (isMultipleSelection() && ['approach', 'indication', 'location', '_procedure', '_vendors'].includes(key)) {
            cp[key] = stringToArray(cp[key] ?? "");
          }
        }
        cps.push(cp);
      }

      data.notes = data?.notes?.map((item: any) => item.note) ?? [];

      data.date_of_procedure = stringToDate(data.date_of_procedure);
      data.date_of_birth = data.date_of_birth ? stringToDate(new Date(data.date_of_birth).toISOString().split('T')[0]) : new Date();

      setImages(data.images);
      setCaseProcedures(cps);
      setCoSurgeons(co);
      setPrimarySurgeons(primary);
      setCPTs(procedureCPTs);
      setCPTModifier(data.cpt_modifier);
      setICDs(procedureICDs);
      setInitialValues(data);
    },
    onError: (error: any) => {
      console.log('error', error);
    },
  })

  const navigation = useNavigation();
  const speciality = user.user_profile[0].speciality?.name;
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const [step, setStep] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const formRef = useRef<FormikProps<typeof initialValues>>(null);
  const [yesNoList] = useState<LabelValueType[]>([
    { key: '1', value: '1', label: 'Yes' },
    { key: '0', value: '0', label: 'No' }
  ]);

  const validationSchema = Yup.object({
    patient_first_name: Yup.string().required('Required'),
    patient_last_name: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    hospital_id: Yup.string().required('Required'),
    date_of_procedure: Yup.string().required('Required'),
    procedure_name: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
  });

  // All lookup hooks...
  const { data: genders, isFetching: isFetchingGenders } = useGetGenders();
  const { data: raceList, isFetching: isFetchingRace } = useGetRaceList();
  const { data: insuranceList, isFetching: isFetchingInsuranceList } = useGetInsuranceList();
  const { data: insuranceStatusList, isFetching: isFetchingInsuranceStatusList } = useGetInsuranceStatusList();
  const { data: procedureTypes, isFetching: isFetchingProcedureTypes } = useGetProcedureTypes(speciality);
  const { data: cranialApproachList, isFetching: isFetchingCranialApproachList } = useGetApproachList('Cranial');
  const { data: spineApproachList, isFetching: isFetchingSpineApproachList } = useGetApproachList('Spine');
  const { data: cranialIndicationList, isFetching: isFetchingCranialIndicationList } = useGetIndicationList('Cranial');
  const { data: spineIndicationList, isFetching: isFetchingSpineIndicationList } = useGetIndicationList('Spine');
  const { data: functionalIndicationList, isFetching: isFetchingFunctionalIndicationList } = useGetIndicationList('Functional');
  const { data: nervesIndicationList, isFetching: isFetchingNervesIndicationList } = useGetIndicationList('Peripheral nerves');
  const { data: interIndicationList, isFetching: isFetchingInterIndicationList } = useGetIndicationList('Interventional');
  const { data: interventionalIndicationList, isFetching: isFetchingInterventionalIndicationList } = useGetIndicationList('Interventional Neurology/Neuroradiology');
  const { data: radiologyIndicationList, isFetching: isFetchingRadiologyIndicationList } = useGetIndicationList('Interventional Radiology');
  const { data: interventionalProcedureTypeList, isFetching: isFetchingInterventionalProcedureTypeList } = useGetProcedureList('Interventional');
  const { data: bedsideProcedureTypeList, isFetching: isFetchingBedsideProcedureTypeList } = useGetProcedureList('Bedside');
  const { data: spineLocationList, isFetching: isFetchingSpineLocationList } = useGetLocationList('Spine');
  const { data: tumorLocationList, isFetching: isFetchingTumorLocationList } = useGetLocationList('Tumor');
  const { data: aneurysmLocationList, isFetching: isFetchingAneurysmLocationList } = useGetLocationList('Aneurysm');
  const { data: aneurysmLocationInterList, isFetching: isFetchingAneurysmLocationInterList } = useGetLocationList('AneurysmInter');
  const { data: hematomaLocationList, isFetching: isFetchingHematomaLocationList } = useGetLocationList('Hematoma');
  const { data: fractureLocationList, isFetching: isFetchingFractureLocationList } = useGetLocationList('Fracture');
  const { data: hydrocephalusLocationList, isFetching: isFetchingHydrocephalusLocationList } = useGetLocationList('Hydro');
  const { data: avmLocationList, isFetching: isFetchingAvmLocationList } = useGetLocationList('AVM');
  const { data: bleedingLocationList, isFetching: isFetchingBleedingLocationList } = useGetLocationList('Bleeding');
  const { data: dissectionLocationList, isFetching: isFetchingDissectionLocationList } = useGetLocationList('Dissection');
  const { data: strokeLocationList, isFetching: isFetchingStrokeLocationList } = useGetLocationList('Stroke');
  const { data: sideList, isFetching: isFetchingSideList } = useGetSideList();
  const { data: ticiGradeList, isFetching: isFetchingTiciGradeList } = useGetTICIGrade();
  const { data: osteotomyList, isFetching: isFetchingOsteotomyList } = useGetOsteotomyList();
  const { data: vendorsList, isFetching: isFetchingVendorsList } = useGetVendorsList();

  const isFetching =
    isFetchingGenders ||
    isFetchingRace ||
    isFetchingInsuranceList ||
    isFetchingInsuranceStatusList ||
    isFetchingProcedureTypes ||
    isFetchingCranialApproachList ||
    isFetchingSpineApproachList ||
    isFetchingCranialIndicationList ||
    isFetchingSpineIndicationList ||
    isFetchingFunctionalIndicationList ||
    isFetchingNervesIndicationList ||
    isFetchingInterIndicationList ||
    isFetchingInterventionalIndicationList ||
    isFetchingRadiologyIndicationList ||
    isFetchingInterventionalProcedureTypeList ||
    isFetchingBedsideProcedureTypeList ||
    isFetchingSpineLocationList ||
    isFetchingTumorLocationList ||
    isFetchingAneurysmLocationList ||
    isFetchingAneurysmLocationInterList ||
    isFetchingHematomaLocationList ||
    isFetchingFractureLocationList ||
    isFetchingHydrocephalusLocationList ||
    isFetchingAvmLocationList ||
    isFetchingBleedingLocationList ||
    isFetchingDissectionLocationList ||
    isFetchingStrokeLocationList ||
    isFetchingSideList ||
    isFetchingTiciGradeList ||
    isFetchingOsteotomyList ||
    isFetchingVendorsList;

  const validateForm = () => {
    formRef.current?.validateForm();
  }

  const procedureDataLists = {
    procedureTypes,
    cranialApproachList,
    spineApproachList,
    cranialIndicationList,
    spineIndicationList,
    functionalIndicationList,
    nervesIndicationList,
    interIndicationList,
    interventionalIndicationList,
    radiologyIndicationList,
    interventionalProcedureTypeList,
    bedsideProcedureTypeList,
    spineLocationList,
    tumorLocationList,
    aneurysmLocationList,
    aneurysmLocationInterList,
    hematomaLocationList,
    fractureLocationList,
    hydrocephalusLocationList,
    avmLocationList,
    bleedingLocationList,
    dissectionLocationList,
    strokeLocationList,
    sideList,
    ticiGradeList,
    osteotomyList,
    vendorsList,
    yesNoList,
  };

  const addCaseProcedure = () => {
    setCaseProcedures(prev => [...prev, { ...caseProcedureInitialValues }]);
  };

  const removeCaseProcedure = (index: number) => {
    setCaseProcedures(prev => prev.filter((_, idx) => idx !== index));
  };

  const updateCaseProcedure = (index: number, updatedProc: any) => {
    setCaseProcedures(prev => prev.map((item, idx) => idx === index ? updatedProc : item));
  };

  const isMultipleSelection = (): boolean => {
    return isNeurosurgery(speciality) || isInterventional(speciality);
  }

  useEffect(() => {
    validateForm();
  }, [step])

  const goToNextPage = () => {
    if (step < 3) {
      const newStep = step + 1;
      setStep(newStep);
      pagerRef.current?.setPage(newStep);
    }
  };

  const goToPrevPage = () => {
    if (step > 0) {
      const newStep = step - 1;
      setStep(newStep);
      pagerRef.current?.setPage(newStep);
    }
  };

  const newImages = useMemo(() => {
    return images.filter(item => !item?.id);
  }, [images]);


  const createMutation = useCreateProcedure(async (data: any) => {
    checkResponse(data?.status_code, data?.data ?? 'Please fill out all required fields');

    if (newImages?.length > 0) {
      await updateProcedureImages(data.data.id);
    }

    setCompleted(true);
    setDiscardConfirmed(true);
    setTimeout(() => navigation.goBack(), 0);
    appService.showToast('Procedure created successfully', 'success');
  }, (error: any) => {
    appService.showToast(error?.message, 'error');
  });

  const updateMutation = useUpdateProcedure(async (data: any) => {
    if (newImages?.length > 0) {
      await updateProcedureImages(data.id);
    }
    setCompleted(true);
    setDiscardConfirmed(true);
    setTimeout(() => {
      navigation.goBack();
      route?.params?.refetch();
    }, 0);
    appService.showToast('Procedure updated successfully', 'success');
  }, (error: any) => {
    appService.showToast(error?.message, 'error');
  });

  const create = async (values: any) => {
    await createMutation.mutateAsync({
      userId: doctorId ?? user.id,
      data: getPayload(values)
    });
  }

  const update = (values: any) => {
    updateMutation.mutate({
      userId: doctorId ?? user.id,
      procedureId: id,
      data: getPayload(values)
    })
  }

  const isSubmitting = updateMutation.isLoading || createMutation.isLoading || updateImagesMutation.isLoading;

  const getPayload = (values: any) => {
    return {
      ...values,
      primary_surgeons: primarySurgeons,
      co_surgeons: coSurgeons,
      case_procedures: caseProcedures,
      icd_id: icds.map(icd => icd.id),
      cpt_modifier_id: cptModifier?.id ?? "",
      cpts,
    }
  }

  const handleSubmit = (values: any) => {
    setCompleted(true);

    if (!validateCaseProcedures(caseProcedures)) {
      appService.showToast('Please fill out all required fields', 'error');
      return
    }

    typeof id == 'number' ? update(values) : create(values);
  }

  useEffect(() => {
    navigation.setOptions({
      title: `Case ${step + 1}/${pages.length}`,
      headerRight: () => (
        <TouchableOpacity
          style={[globalStyles.headerBackImage, globalStyles.mr15]}
          onPress={() => {
            setCompleted(true);
            setTimeout(() => {
              navigation.goBack();
            }, 0);
          }}
        >
          <Ionicons name='close' size={24} color={theme.colors.text} />
        </TouchableOpacity>
      ),
    })
  }, [step]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      Keyboard.dismiss();
      if (discardConfirmed) return;

      if (step === 0 || completed) {
        if (!formRef.current?.dirty && !isScanning) return;
        e.preventDefault();
        setDiscardModalOpen(true);
      } else {
        e.preventDefault();
        goToPrevPage();
      }
    });

    return unsubscribe;
  }, [navigation, step, completed, discardConfirmed, isScanning]);

  const pagerRef = useRef<PagerView>(null);

  const sharedProps = {
    // All shared props for all steps
    genders,
    goToNextPage,
    onStickerScan,
    initialValues,
    raceList,
    insuranceList,
    insuranceStatusList,
    primarySurgeons,
    setPrimarySurgeons,
    coSurgeons,
    setCoSurgeons,
    cranialApproachList,
    spineApproachList,
    procedureTypes,
    showApproach,
    yesNoList,
    icds,
    setICDs,
    speciality,
    isMultipleSelection,
    sideList,
    ticiGradeList,
    osteotomyList,
    vendorsList,
    interventionalIndicationList,
    radiologyIndicationList,
    cranialIndicationList,
    spineIndicationList,
    functionalIndicationList,
    nervesIndicationList,
    interIndicationList,
    interventionalProcedureTypeList,
    bedsideProcedureTypeList,
    tumorLocationList,
    aneurysmLocationList,
    hematomaLocationList,
    fractureLocationList,
    hydrocephalusLocationList,
    spineLocationList,
    avmLocationList,
    bleedingLocationList,
    aneurysmLocationInterList,
    strokeLocationList,
    dissectionLocationList,
    cpts,
    setCPTs,
    setCPTModifier,
    cptModifier,
    procedureDataLists,
    caseProcedureInitialValues,
    caseProcedures,
    addCaseProcedure,
    removeCaseProcedure,
    updateCaseProcedure,
    isSubmitting,
    id,
    images,
    setImages,
    validateForm,
  };

  const pages = useMemo(() => [
    StepOne,
    StepTwo,
    StepThree,
  ], []);



  return (
    <>
      <Container>
        {<Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {(props) => {

            return (
              <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                initialPage={step}
                onPageSelected={(e) => setStep(e.nativeEvent.position)}
                scrollEnabled={true}
                keyboardDismissMode="on-drag"
              >
                {pages.map((PageComponent, index) => (
                  <View key={index.toString()} style={[{ width }, globalStyles.ph15]}>
                    <PageComponent {...props} shared={sharedProps} />
                  </View>
                ))}
              </PagerView>
            )
          }
          }
        </Formik>
        }
        {(isFetching) && (
          <View style={globalStyles.loadingOverlay}>
            <ActivityIndicator size={30} color={theme.colors.text} />
          </View>
        )}
        {isScanning && (
          <View style={globalStyles.loadingOverlay}>
            <View style={styles.loadingMessageContainer}>
              <View style={globalStyles.pr10}>
                <ActivityIndicator size={30} color={theme.colors.text} />
              </View>
              <CustomText text='Extracting patient info' size={18} fontWeight='medium' color={theme.colors.text} />
            </View>
          </View>
        )}

        <CustomDialog
          visible={discardModalOpen}
          title='Discard new case'
          message='By leaving this page you will discard the information you entered.'
          onClose={() => setDiscardModalOpen(false)}
          buttons={[
            {
              text: 'Discard',
              onPress: () => {
                setDiscardModalOpen(false);
                setDiscardConfirmed(true);
                setTimeout(() => navigation.goBack(), 0);
              },
              button: ErrorButton
            },
            {
              text: 'Back',
              onPress: () => setDiscardModalOpen(false),
              button: NeutralButton
            }
          ]}
        />
      </Container>
    </>
  );
}
