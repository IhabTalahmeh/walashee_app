import { FastField, FieldArray } from "formik";
import React, { useEffect, useMemo } from "react";
import { View, ScrollView, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "src/components/buttons/CustomButton/CustomButton";
import SelectCPTModifier from "src/components/Case/SelectCPTModifier/SelectCPTModifier";
import SelectCPTs from "src/components/Case/SelectCPTs/SelectCPTs";
import CustomText from "src/components/common/CustomText/CustomText";
import CustomFormTextArea from "src/components/common/CustomTextArea/CustomFormTextArea";
import { showDurationOfProcedure, showFindings, showComplications, showOutcome } from "src/common/helpers";
import { useTheme } from "src/context/ThemeContext";
import { createStyles } from "./styles";
import { useGlobalStyles } from "src/hooks/useGlobalStyles";
import CaseProcedure from "src/components/Case/CaseProcedure/CaseProcedure";
import CaseNotes from "src/components/Case/CaseNotes/CaseNotes";
import CaseImages from "src/components/Case/CaseImages/CaseImages";
import SuggestedCPTs from "src/components/Case/SuggestedCPTs/SuggestedCPTs";

const { width } = Dimensions.get('window');

export function StepFour(props: any) {
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
        nestedScrollEnabled
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
          {/* <CaseImages images={images} setImages={setImages} /> */}
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