import { FastField, Field } from "formik";
import React, { useEffect, useMemo } from "react";
import { View, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import CustomButton from "src/components/buttons/CustomButton/CustomButton";
import CustomFormTextInput from "src/components/common/CustomFormTextInput/CustomFormTextInput";
import { useTheme } from "src/context/ThemeContext";
import { createStyles } from "./styles";
import { useGlobalStyles } from "src/hooks/useGlobalStyles";
import SearchUsers from "src/components/Modals/SearchUsers/SearchUsers";
import { CustomSelectList } from "src/components/InputFields/CustomSelectList/CustomSelectList";
import CustomDatePicker from "src/components/common/CustomDatePicker/CustomDatePicker";
import { showMinimallyInvasive, showNavigation, showRobotic, showTextIndication, showListIndication, showSide, showTarget, showNerve, showTextLocation, showNeuroLocation, showInterLocation, showProcedure, showTiciGrade, showOsteotomy, showFusion, showInterbodyFusion, showExtensionToPelvis, showFusionLevels, showDecompressionLevels, showMorphogenicProtein, showImplant, showImplantType, showVendors, showOtherVendors, showAccess, showVascularClosureDevice, showDurationOfRadiation, isAbscess, isAneurysm, isAVF, isAVM, isBedside, isBleeding, isCranial, isDissection, isFracture, isFunctional, isHematoma, isHydrocephalus, isInter, isInterventional, isNeurosurgery, isPain, isPeripheral, isRadiology, isRadiosurgery, isSpine, isStroke, isTumor, isVasospasm, showComplications, showDurationOfProcedure, showFindings, showOutcome } from "src/common/helpers";
import { CustomMultiSelectList } from "src/components/InputFields/CustomMultiSelectList/CustomMultiSelectList";
import CustomFormTextArea from "src/components/common/CustomTextArea/CustomFormTextArea";
import SelectCPTModifier from "src/components/Case/SelectCPTModifier/SelectCPTModifier";
import SelectCPTs from "src/components/Case/SelectCPTs/SelectCPTs";
import SuggestedCPTs from "src/components/Case/SuggestedCPTs/SuggestedCPTs";

const { width } = Dimensions.get('window');

export function StepTwo(props: any) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();

  const { values } = props;
  const procedureName = values.procedure_name;
  const procedureType = values.type;

  const {
    cpts,
    setCPTs,
    setCPTModifier,
    cptModifier,
    cranialApproachList,
    spineApproachList,
    procedureTypes,
    showApproach,
    yesNoList,
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
    goToNextPage,
  } = props.shared;

  const approachList = React.useMemo(() => {
    return isCranial(props.values.type) ? cranialApproachList
      : isSpine(props.values.type) ? spineApproachList
        : [];
  }, [props.values.type]);

  const indicationList = useMemo(() => {
    return isInterventional(speciality) ? interventionalIndicationList
      : isRadiology(speciality) ? radiologyIndicationList
        : isCranial(props.values.type) ? cranialIndicationList
          : isSpine(props.values.type) ? spineIndicationList
            : isFunctional(props.values.type) ? functionalIndicationList
              : isPeripheral(props.values.type) ? nervesIndicationList
                : interIndicationList
  }, [props.values.type]);

  const procedureList = useMemo(() => {
    return (isInterventional(speciality) ||
      isNeurosurgery(speciality) && isInter(props.values.type)) ? interventionalProcedureTypeList
      : isNeurosurgery(speciality) && (isBedside(props.values.type) || isPain(props.values.type) || isRadiosurgery(props.values.type)) ? bedsideProcedureTypeList
        : [];
  }, [props.values.type, speciality]);

  const neuroLocationList = useMemo(() => {
    return isCranial(props.values.type) && (isTumor(props.values.indication) || isAVM(props.values.indication) || isAVF(props.values.indication) || isAbscess(props.values.indication)) ? tumorLocationList
      : isCranial(props.values.type) && isAneurysm(props.values.indication) ? aneurysmLocationList
        : isCranial(props.values.type) && isHematoma(props.values.indication) ? hematomaLocationList
          : isCranial(props.values.type) && isFracture(props.values.indication) ? fractureLocationList
            : isCranial(props.values.type) && isHydrocephalus(props.values.indication) ? hydrocephalusLocationList
              : isSpine(props.values.type) ? spineLocationList
                : isInter(props.values.type) && (isAVM(props.values.indication) || isAVF(props.values.indication)) ? avmLocationList
                  : isInter(props.values.type) && isBleeding(props.values.indication) ? bleedingLocationList
                    : isInter(props.values.type) && isAneurysm(props.values.indication) ? aneurysmLocationInterList
                      : isStroke(props.values.indication) ? strokeLocationList
                        : isInter(props.values.type) && (isDissection(props.values.indication) || isVasospasm(props.values.indication) || isStroke(props.values.indication)) ? dissectionLocationList
                          : []
  }, [props.values.type, props.values.indication])

  const interLocationList = useMemo(() => {
    return (isAVM(props.values.indication) || isAVF(props.values.indication)) ? avmLocationList
      : isBleeding(props.values.indication) ? bleedingLocationList
        : isAneurysm(props.values.indication) ? aneurysmLocationInterList
          : isStroke(props.values.indication) ? strokeLocationList
            : (isDissection(props.values.indication) || isVasospasm(props.values.indication) || isStroke(props.values.indication)) ? dissectionLocationList
              : []
  }, [props.values.type, props.values.indication]);


  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >

        <View style={globalStyles.mt10}>
          <FastField
            name="date_of_procedure"
            component={CustomDatePicker}
            required={true}
            label={'Date Of Procedure'}
          />
        </View>

        <View style={globalStyles.mt10}>
          <FastField
            name="procedure_name"
            component={CustomFormTextInput}
            required={true}
            label='Procedure Name'
            placeholder='Procedure name'
          />
        </View>

        <View style={globalStyles.mt10}>
          {procedureTypes?.length ? (
            <FastField
              key={JSON.stringify(procedureTypes)}
              name="type"
              component={CustomSelectList}
              required
              label='Procedure Type'
              placeholder='Procedure type'
              data={procedureTypes || []}
            />
          ) : (
            <FastField
              name="type"
              component={CustomFormTextInput}
              required={true}
              label='Procedure Type'
              placeholder='Procedure Type'
            />
          )}
        </View>

        {showApproach(props.values) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(approachList)}
              name="approach"
              component={CustomMultiSelectList}
              required={false}
              label='Approach'
              placeholder='Select approach'
              data={approachList || []}
            />
          </View>
        ) : null}

        {showMinimallyInvasive(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(yesNoList)}
              name="minimally_invasive"
              component={CustomSelectList}
              required={false}
              label='Minimally Invasive'
              placeholder='Select option'
              data={yesNoList}
            />
          </View>
        ) : null}

        {showNavigation(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(yesNoList)}
              name="navigation"
              component={CustomSelectList}
              required={false}
              label='Navigation'
              placeholder='Select option'
              data={yesNoList}
            />
          </View>
        ) : null}

        {showRobotic(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(yesNoList)}
              name="robotic"
              component={CustomSelectList}
              required={false}
              label='Robotic'
              placeholder='Select option'
              data={yesNoList}
            />
          </View>
        ) : null}

        {showTextIndication(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="indication"
              component={CustomFormTextInput}
              required={false}
              label='Indication'
              placeholder='Indication'
            />
          </View>
        ) : showListIndication(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            {isMultipleSelection() ? (
              <FastField
                key={JSON.stringify(indicationList)}
                name="indication"
                component={CustomMultiSelectList}
                required={false}
                label='Indication'
                placeholder='Select indication'
                data={indicationList || []}
              />
            ) : (
              <FastField
                key={JSON.stringify(indicationList)}
                name="indication"
                component={CustomSelectList}
                required={false}
                label='Indication'
                placeholder='Select indication'
                data={indicationList || []}
              />
            )}
          </View>
        ) : null}

        {showSide(speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(sideList)}
              name="side"
              component={CustomSelectList}
              required={false}
              label='Side'
              placeholder='Select side'
              data={sideList || []}
            />
          </View>
        ) : null}

        {showTarget(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="target"
              component={CustomFormTextInput}
              required={false}
              label='Target'
              placeholder='Target'
            />
          </View>
        ) : null}

        {showNerve(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="nerve"
              component={CustomFormTextInput}
              required={false}
              label='Nerve'
              placeholder='Nerve'
            />
          </View>
        ) : null}

        {showTextLocation(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="location"
              component={CustomFormTextInput}
              required={false}
              label='Location'
              placeholder='Location'
            />
          </View>
        ) : null}

        {showNeuroLocation(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            {isMultipleSelection() ? (
              <FastField
                key={JSON.stringify(neuroLocationList)}
                name="location"
                component={CustomMultiSelectList}
                required={false}
                label='Location'
                placeholder='Select location'
                data={neuroLocationList || []}
              />
            ) : (
              <FastField
                key={JSON.stringify(neuroLocationList)}
                name="location"
                component={CustomSelectList}
                required={false}
                label='Location'
                placeholder='Select location'
                data={neuroLocationList || []}
              />
            )}
          </View>
        ) : null}

        {showInterLocation(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            {isMultipleSelection() ? (
              <FastField
                key={JSON.stringify(interLocationList)}
                name="location"
                component={CustomMultiSelectList}
                required={false}
                label='Location'
                placeholder='Select location'
                data={interLocationList || []}
              />
            ) : (
              <FastField
                key={JSON.stringify(interLocationList)}
                name="location"
                component={CustomSelectList}
                required={false}
                label='Location'
                placeholder='Select location'
                data={interLocationList || []}
              />
            )}
          </View>
        ) : null}

        {showProcedure(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            {isMultipleSelection() ? (
              <FastField
                key={JSON.stringify(procedureList)}
                name="_procedure"
                component={CustomMultiSelectList}
                required={false}
                label='Procedure'
                placeholder='Select procedure'
                data={procedureList || []}
              />
            ) : (
              <FastField
                key={JSON.stringify(procedureList)}
                name="_procedure"
                component={CustomSelectList}
                required={false}
                label='Procedure'
                placeholder='Select procedure'
                data={procedureList || []}
              />
            )}
          </View>
        ) : null}

        {showTiciGrade(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(ticiGradeList)}
              name="tici_grade"
              component={CustomSelectList}
              required={false}
              label='TICI Grade'
              placeholder='Select tici grade'
              data={ticiGradeList || []}
            />
          </View>
        ) : null}

        {showOsteotomy(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(osteotomyList)}
              name="osteotomy"
              component={CustomSelectList}
              required={false}
              label='Osteotomy'
              placeholder='Select osteotomy'
              data={osteotomyList || []}
            />
          </View>
        ) : null}

        {showFusion(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(yesNoList)}
              name="_fusion"
              component={CustomSelectList}
              required={false}
              label='Fusion'
              placeholder='Select option'
              data={yesNoList}
            />
          </View>
        ) : null}

        {showInterbodyFusion(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(yesNoList)}
              name="interbody_fusion"
              component={CustomSelectList}
              required={false}
              label='Interbody Fusion'
              placeholder='Select option'
              data={yesNoList}
            />
          </View>
        ) : null}

        {showExtensionToPelvis(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(yesNoList)}
              name="extension_to_pelvis"
              component={CustomSelectList}
              required={false}
              label='Extension To Pelvis'
              placeholder='Select option'
              data={yesNoList}
            />
          </View>
        ) : null}

        {showFusionLevels(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="fusion_levels"
              component={CustomFormTextInput}
              required={false}
              label='Fusion Levels'
              placeholder='Fusion Levels'
            />
          </View>
        ) : null}

        {showDecompressionLevels(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="decompression_levels"
              component={CustomFormTextInput}
              required={false}
              label='Decompression Levels'
              placeholder='Decompression Levels'
            />
          </View>
        ) : null}

        {showMorphogenicProtein(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(yesNoList)}
              name="morphogenic_protein"
              component={CustomSelectList}
              required={false}
              label='Morphogenic Protein'
              placeholder='Select option'
              data={yesNoList}
            />
          </View>
        ) : null}

        {showImplant(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={`${JSON.stringify(yesNoList)}`}
              name="implant"
              component={CustomSelectList}
              required={false}
              label='Implant'
              placeholder='Select option'
              data={yesNoList}
            />
          </View>
        ) : null}

        {showImplantType(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="implant_type"
              component={CustomFormTextInput}
              required={false}
              label='Implant Type'
              placeholder='Implant Type'
            />
          </View>
        ) : null}

        {showVendors(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              key={JSON.stringify(vendorsList)}
              name="_vendors"
              component={CustomMultiSelectList}
              required={false}
              label='Vendors'
              placeholder='Select vendors'
              data={vendorsList || []}
            />
          </View>
        ) : null}

        {showOtherVendors(props.values) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="vendors"
              component={CustomFormTextInput}
              required={false}
              label='Other Vendors'
              placeholder='Other Vendors'
            />
          </View>
        ) : null}

        {showAccess(speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="access"
              component={CustomFormTextArea}
              required={false}
              label='Access'
              placeholder='Access'
            />
          </View>
        ) : null}

        {showVascularClosureDevice(speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="vascular_closure_device"
              component={CustomFormTextArea}
              required={false}
              label='Vascular closure device (if used)'
              placeholder='Vascular closure device'
            />
          </View>
        ) : null}

        {showDurationOfRadiation(props.values, speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="duration_of_radiation"
              component={CustomFormTextArea}
              required={false}
              label='Duration of Radiation'
              placeholder='Duration of Radiation'
            />
          </View>
        ) : null}

        {showDurationOfProcedure(speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="duration_of_procedure"
              component={CustomFormTextArea}
              required={false}
              label='Duration of Procedure'
              placeholder='Duration of procedure'
            />
          </View>
        ) : null}

        {showFindings(speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="findings"
              component={CustomFormTextArea}
              required={false}
              label='Findings'
              placeholder='Findings'
            />
          </View>
        ) : null}

        {showComplications(speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="complications"
              component={CustomFormTextArea}
              required={false}
              label='Complications'
              placeholder='Complications'
            />
          </View>
        ) : null}

        {showOutcome(speciality) ? (
          <View style={globalStyles.mt10}>
            <FastField
              name="outcome"
              component={CustomFormTextArea}
              required={false}
              label='Outcome'
              placeholder='Outcome'
            />
          </View>
        ) : null}

        <View style={[globalStyles.mt20]}>
          <SelectCPTs
            key={JSON.stringify(cpts)}
            title={'Select CPTs'}
            selectedCPTs={cpts}
            setSelectedCPTs={setCPTs} />
        </View>

        <View style={globalStyles.mt5}>
          <SuggestedCPTs
            procedureName={procedureName}
            selectedCPTs={cpts}
            setSelectedCPTs={setCPTs} />
        </View>

        {cpts.length > 0 && <View style={[[globalStyles.mt10, globalStyles.mb5]]}>
          <SelectCPTModifier
            title={'CPT Modifier'}
            setCPTModifier={setCPTModifier}
            selectedModifier={cptModifier}
            cpts={cpts} />
        </View>}

        <View style={{ flex: 1 }} />
        <View style={globalStyles.continueButtonContainer}>
          <CustomButton
            text='Continue'
            onPress={goToNextPage}
            fontSize={18}
            fontWeight='semiBold'
          />
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