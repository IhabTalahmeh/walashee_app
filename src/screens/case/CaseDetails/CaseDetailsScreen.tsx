import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDeleteProcedure, useGetProcedureById } from 'src/hooks/useProcedure';
import { useAuth } from 'src/context/AuthContext';
import CustomText from 'src/components/common/CustomText/CustomText';
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CaseInfoItem from 'src/components/common/CaseInfoItem/CaseInfoItem';
import { dateToString, toTitleCase } from 'src/common/utils';
import ICDDetails from 'src/components/Case/ICDDetails/ICDDetails';
import CaseProcedureDetails from 'src/components/Case/CaseProcedureDetails/CaseProcedureDetails';
import Octicons from 'react-native-vector-icons/Octicons';
import CPTDetails from 'src/components/Case/CPTDetails/CPTDetails';
import CPTModifierDetails from 'src/components/Case/CPTModifierDetails/CPTModifierDetails';
import CaseNotesDetails from 'src/components/Case/CaseNotesDetails/CaseNotesDetails';
import { ImageItem } from 'src/types/types/Types';
import { showApproach, showMinimallyInvasive, showNavigation, showRobotic, showIndication, showSide, showTarget, showNerve, showLocation, showProcedure, showTiciGrade, showOsteotomy, showFusion, showInterbodyFusion, showExtensionToPelvis, showFusionLevels, showDecompressionLevels, showMorphogenicProtein, showImplant, showImplantType, showVendors, showOtherVendors, showAccess, showVascularClosureDevice, showDurationOfRadiation, showDurationOfProcedure, showFindings, showComplications, showOutcome } from 'src/common/helpers';
import { ErrorButton } from 'src/components/buttons/CustomButton/variants';
import NeutralButton from 'src/components/buttons/CustomButton/variants/NeutralButton';
import CustomDialog from 'src/components/Modals/CustomDialog/CustomDialog';
import * as appService from 'src/services/appService';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useGetDashboardPermission } from 'src/hooks/useUsers';
import { EPermission } from 'src/enum/EPermission';
import CaseImagesDetails from 'src/components/Case/CaseImagesDetails/CaseImagesDetails';

export default function CaseDetailsScreen({ route }: any) {
  const { id } = route.params;
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const navigation: any = useNavigation();
  const speciality = user.user_profile[0].speciality?.name;
  const [procedureData, setProcedureData] = useState<any>(null);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [permission, setPermission] = useState<EPermission>(EPermission.VIEWER);

  const { refetch, isFetching } = useGetProcedureById(id, user.id, {
    onSuccess: (data: any) => {
      if (data.user == user.id) {
        setPermission(EPermission.EDITOR);
      } else {
        setDoctorId(data.user);
      }
      const newData = { ...data };
      setProcedureData(newData);
      setImages(newData.images ?? [])
    }
  });

  const { refetch: refetchDashboardPermission } = useGetDashboardPermission(doctorId as number, {
    enabled: doctorId ? true : false,
    onSuccess: (data: any) => {
      setPermission(data);
    },
    onError: (error: any) => console.log('error', error),
  })

  const { mutate: deleteMutation, isLoading: isDeleting } = useDeleteProcedure(
    (data: any) => {
      setDeleteOpen(false);
      navigation.goBack();
      appService.showToast('Procedure has been deleted successfully', 'success');
    },
    (error: any) => {
      appService.showToast(error.message, 'error');
    }
  )

  const patientName = useMemo(() => {
    return procedureData ? `${procedureData?.patient_last_name}, ${procedureData?.patient_first_name}` : '';
  }, [procedureData]);


  const isEditor = useMemo(() => {
    return permission != EPermission.VIEWER;
  }, [permission]);

  const setNavigation = () => {
    navigation.setOptions({
      title: patientName,
      headerRight: () => (
        <>
          {isEditor && <Animated.View entering={FadeIn.duration(150)}>
            <TouchableOpacity
              style={[globalStyles.iconCircle, globalStyles.mr15]}
              onPress={() => {
                navigation.navigate('AddCase', {
                  id: procedureData.id,
                  refetch: () => refetch(),
                })
              }}
            >
              <Octicons size={22} color={theme.colors.text} name='pencil' />
            </TouchableOpacity>
          </Animated.View>}
        </>
      )
    })
  }

  useEffect(() => {
    setNavigation();
  }, [procedureData]);

  useEffect(() => {
    if (doctorId) {
      refetchDashboardPermission();
    }
  }, [doctorId])

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        // refetch();
      }, 1000);
    }, [])
  );

  const handleDeleteProcedure = () => {
    deleteMutation({
      userId: user.id,
      procedureId: procedureData.id,
    })
  }

  const deleteModalButtons = [
    {
      text: 'Delete',
      disabled: isDeleting,
      loading: isDeleting,
      onPress: handleDeleteProcedure,
      button: ErrorButton,
    },
    {
      text: 'Cancel',
      onPress: () => setDeleteOpen(false),
      button: NeutralButton,
    }
  ]

  if (!procedureData) {
    return (
      <View style={[globalStyles.flex1, globalStyles.jcc, globalStyles.aic]}>
        <ActivityIndicator size={30} color={theme.colors.text} />
      </View>
    )
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={130}
      >
        <ScrollView style={styles.container}>

          <View style={[styles.infoTag, globalStyles.mt20]}>
            <CustomText text='Patient Info' color={theme.colors.text} size={18} fontWeight='bold' />
          </View>

          {/* Patient Name */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Patient Name' value={patientName} />
          </View>

          {/* Gender */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Gender' value={toTitleCase(procedureData.gender ?? '')} />
          </View>

          {/* Date of Birth */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Date of Birth' value={procedureData.date_of_birth} />
          </View>

          {/* Age */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Age' value={procedureData.age} />
          </View>

          {/* Medical Record Number */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Medical Record Number' value={procedureData.mrn} />
          </View>

          {/* Race */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Race' value={procedureData.race} />
          </View>

          {/* Insurance */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Insurance' value={procedureData.insurance} />
          </View>

          {/* Insurance Status */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Insurance Status' value={toTitleCase(procedureData.insurance_status ?? '')} />
          </View>

          {/* Institution */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Institution' value={procedureData.hospital.address} />
          </View>

          {/* Primary Surgeons */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Primary Surgeons' value={procedureData?.primary_surgeons?.map((item: any) => `(${item})`).join(', ')} />
          </View>

          {/* Co Surgeons */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Co Surgeons' value={procedureData?.co_surgeons?.map((item: any) => `(${item})`).join(', ')} />
          </View>

          {/* Diagnosis */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Diagnosis' value={procedureData.diagnosis} />
          </View>

          {/* Procedure ICDs */}
          <View style={globalStyles.mt10}>
            <ICDDetails icds={procedureData.procedure_icd} />
          </View>

          {/* Procedure Details */}
          <View style={[styles.infoTag, globalStyles.mt20]}>
            <CustomText text='Procedure Details' color={theme.colors.text} size={18} fontWeight='bold' />
          </View>

          {/* Date of Procedure */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Date of Procedure' value={dateToString(new Date(procedureData.date_of_procedure))} />
          </View>

          {/* Procedure Name */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Procedure Name' value={procedureData.procedure_name} />
          </View>

          {/* Procedure Type */}
          <View style={globalStyles.mt10}>
            <CaseInfoItem label='Procedure Type' value={procedureData.type} />
          </View>

          {/* Approach */}
          {showApproach(procedureData) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Approach' value={procedureData.approach} />
          </View>}

          {/* Minimally Invasive */}
          {showMinimallyInvasive(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Minimally Invasive' value={procedureData.minimally_invasive} />
          </View>}

          {/* Navigation */}
          {showNavigation(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Navigation' value={procedureData.navigation} />
          </View>}

          {/* Robotic */}
          {showRobotic(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Robotic' value={procedureData.robotic} />
          </View>}

          {/* Indication */}
          {showIndication(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Indication' value={procedureData.indication} />
          </View>}

          {/* Side */}
          {showSide(speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Side' value={procedureData.side} />
          </View>}

          {/* Target */}
          {showTarget(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Target' value={procedureData.target} />
          </View>}

          {/* Nerve */}
          {showNerve(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Nerve' value={procedureData.nerve} />
          </View>}

          {/* Location */}
          {showLocation(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Location' value={procedureData.location} />
          </View>}

          {/* _Procedure */}
          {showProcedure(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Procedure' value={procedureData._procedure} />
          </View>}

          {/* TICI Grade */}
          {showTiciGrade(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='TICI Grade' value={procedureData.tici_grade} />
          </View>}

          {/* Osteotomy */}
          {showOsteotomy(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Osteotomy' value={procedureData.osteotomy} />
          </View>}

          {/* Fusion */}
          {showFusion(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Fusion' value={procedureData._fusion} />
          </View>}

          {/* Interbody Fusion */}
          {showInterbodyFusion(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Interbody Fusion' value={procedureData.interbody_fusion} />
          </View>}

          {/* Extension To Pelvis */}
          {showExtensionToPelvis(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Extension To Pelvis' value={procedureData.extension_to_pelvis} />
          </View>}

          {/* Fusion Levels */}
          {showFusionLevels(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Fusion Levels' value={procedureData.fusion_levels} />
          </View>}

          {/* Decompression Levels */}
          {showDecompressionLevels(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Decompression Levels' value={procedureData.decompression_levels} />
          </View>}

          {/* Morphogenic Protein */}
          {showMorphogenicProtein(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Morphogenic Protein' value={procedureData.morphogenic_protein} />
          </View>}

          {/* Implant */}
          {showImplant(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Implant' value={procedureData.implant} />
          </View>}

          {/* Implant Type */}
          {showImplantType(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Implant Type' value={procedureData.implant_type} />
          </View>}

          {/* Vendors */}
          {showVendors(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Vendors' value={procedureData._vendors} />
          </View>}

          {/* Other vendors */}
          {showOtherVendors(procedureData) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Other vendors' value={procedureData.vendors} />
          </View>}

          {/* Access */}
          {showAccess(speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Access' value={procedureData.access} />
          </View>}

          {/* Vascular closure device */}
          {showVascularClosureDevice(speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Vascular closure device' value={procedureData.vascular_closure_device} />
          </View>}

          {/* Duration of Radiation */}
          {showDurationOfRadiation(procedureData, speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Duration of Radiation' value={procedureData.duration_of_radiation} />
          </View>}

          {/* Duration of Procedure */}
          {showDurationOfProcedure(speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Duration of Procedure' value={procedureData.duration_of_procedure} />
          </View>}

          {/* Findings */}
          {showFindings(speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Findings' value={procedureData.findings} />
          </View>}

          {/* Complications */}
          {showComplications(speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Complications' value={procedureData.complications} />
          </View>}

          {/* Outcome */}
          {showOutcome(speciality) && <View style={globalStyles.mt10}>
            <CaseInfoItem label='Outcome' value={procedureData.outcome} />
          </View>}

          <View style={globalStyles.mt20}>
            <CPTDetails cpts={procedureData.procedure_cpt} />
          </View>

          <View style={globalStyles.mt20}>
            <CPTModifierDetails
              cpts={procedureData.procedure_cpt}
              cptModifier={procedureData.cpt_modifier}
            />
          </View>

          {/* Case Procedures */}
          {procedureData.case_procedures?.map((item: any, index: number) => {
            return (
              <View key={index} style={globalStyles.mt10}>
                <CaseProcedureDetails procedureData={item} index={index} />
              </View>
            )
          })}

          <View style={globalStyles.mt20}>
            <CaseNotesDetails
              notes={procedureData.notes}
              procedureId={procedureData.id}
              refetch={refetch}
              isEditor={isEditor}
            />
          </View>

          <View style={globalStyles.mt20}>
            <CaseImagesDetails
              images={images}
              setImages={setImages}
              procedureId={procedureData.id}
              refetch={refetch}
              isFetching={isFetching}
              isEditor={isEditor}
            />
          </View>

          {isEditor && <View>
            <ErrorButton
              text='Delete'
              onPress={() => setDeleteOpen(true)}
            />
          </View>}

          <View style={globalStyles.mb30} />

        </ScrollView>


        <CustomDialog
          visible={deleteOpen}
          title={'Delete Case'}
          message={'Note: Deleting this procedure is permanent and cannot be undone.'}
          buttons={deleteModalButtons}
          onClose={() => setDeleteOpen(false)}
        />
      </KeyboardAvoidingView>
    </>
  )
}
