import { FastField } from "formik";
import React, { useMemo } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import CustomButton from "src/components/buttons/CustomButton/CustomButton";
import SelectICDs from "src/components/Case/SelectICDs/SelectICDs";
import CustomFormTextInput from "src/components/common/CustomFormTextInput/CustomFormTextInput";
import CustomFormTextArea from "src/components/common/CustomTextArea/CustomFormTextArea";
import { useTheme } from "src/context/ThemeContext";
import { createStyles } from "./styles";
import { useGlobalStyles } from "src/hooks/useGlobalStyles";
import CustomDatePicker from "src/components/common/CustomDatePicker/CustomDatePicker";
import { CustomSelectList } from "src/components/InputFields/CustomSelectList/CustomSelectList";
import { CustomMultiSelectList } from "src/components/InputFields/CustomMultiSelectList/CustomMultiSelectList";
import { isCranial, isSpine, isInterventional, isRadiology, isFunctional, isPeripheral, isNeurosurgery, isInter, isBedside, isPain, isRadiosurgery, isTumor, isAVM, isAVF, isAbscess, isAneurysm, isHematoma, isFracture, isHydrocephalus, isBleeding, isStroke, isDissection, isVasospasm, showMinimallyInvasive, showNavigation, showRobotic, showTextIndication, showListIndication, showSide, showTarget, showNerve, showTextLocation, showNeuroLocation, showInterLocation, showProcedure, showTiciGrade, showOsteotomy, showFusion, showInterbodyFusion, showExtensionToPelvis, showFusionLevels, showDecompressionLevels, showMorphogenicProtein, showImplant, showImplantType, showVendors, showOtherVendors, showAccess, showVascularClosureDevice, showDurationOfRadiation } from "src/common/helpers";
import Ionicons from "react-native-vector-icons/Ionicons";
import CaseNotes from "src/components/Case/CaseNotes/CaseNotes";
import CaseProcedure from "src/components/Case/CaseProcedure/CaseProcedure";
import CustomText from "src/components/common/CustomText/CustomText";
import CaseImages from "src/components/Case/CaseImages/CaseImages";
import { PrimaryButton } from "src/components/buttons/CustomButton/variants";


export function StepThree(props: any) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const {
    speciality,
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
  } = props.shared;


  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >

        <View>
          {caseProcedures.map((proc: any, idx: number) => (
            <View key={idx} style={globalStyles.mt15}>
              <CaseProcedure
                data={proc}
                index={idx}
                lists={procedureDataLists}
                speciality={speciality}
                onChange={(updated: any) => {
                  updateCaseProcedure(idx, updated);
                }}
                onRemove={() => removeCaseProcedure(idx)}
                caseProcedureInitialValues={caseProcedureInitialValues}
                updateCaseProcedure={updateCaseProcedure}
              />
            </View>
          ))}
        </View>
        <View style={globalStyles.mv20}>
          <TouchableOpacity
            style={styles.addAnotherProcedureButton}
            onPress={addCaseProcedure}>
            <View style={globalStyles.mr10}>
              <Ionicons name='add-circle-outline' color={theme.colors.primary} size={22} />
            </View>
            <CustomText text='Add Another Procedure' size={18} color={theme.colors.primary} fontWeight='medium' />
          </TouchableOpacity>
        </View>

        <View>
          <CaseNotes />
        </View>

        <View style={[globalStyles.mt10]}>
          <CaseImages images={images} setImages={setImages} />
        </View>

        <View style={{ flex: 1 }} />
        <View style={globalStyles.continueButtonContainer}>
          <CustomButton
            text={id ? 'Save' : 'Add'}
            onPress={props.submitForm}
            fontSize={18}
            fontWeight='semiBold'
            disabled={!props.isValid || isSubmitting}
            isLoading={isSubmitting} />
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