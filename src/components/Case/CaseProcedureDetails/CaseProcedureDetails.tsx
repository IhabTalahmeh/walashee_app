import { View, Text } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { useTheme } from 'src/context/ThemeContext';
import { createStyles } from './styles';
import { useGlobalStyles } from 'src/hooks/useGlobalStyles';
import CustomText from 'src/components/common/CustomText/CustomText';
import { dateToString } from 'src/common/utils';
import CaseInfoItem from 'src/components/common/CaseInfoItem/CaseInfoItem';
import { useAuth } from 'src/context/AuthContext';
import { showApproach, showMinimallyInvasive, showNavigation, showRobotic, showIndication, showSide, showTarget, showNerve, showLocation, showProcedure, showTiciGrade, showOsteotomy, showFusion, showInterbodyFusion, showExtensionToPelvis, showFusionLevels, showDecompressionLevels, showMorphogenicProtein, showImplant, showImplantType, showVendors, showOtherVendors, showAccess, showVascularClosureDevice, showDurationOfRadiation, showDurationOfProcedure, showFindings, showComplications, showOutcome } from 'src/common/helpers';
import CPTDetails from '../CPTDetails/CPTDetails';
import CPTModifierDetails from '../CPTModifierDetails/CPTModifierDetails';

interface Props {
  procedureData: any;
  index: number;
}

export default function CaseProcedureDetails({ procedureData, index }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const globalStyles = useGlobalStyles();
  const { user } = useAuth();
  const speciality = user.user_profile[0].speciality?.name;

  return (
    <View>
      {/* Procedure Details */}
      <View style={[styles.infoTag, globalStyles.mt10]}>
        <CustomText
          text={`Procedure ${index + 2}`}
          size={18}
          color={theme.colors.text}
          fontWeight="semiBold"
        />
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
        <CPTDetails cpts={procedureData.case_procedure_cpt} />
      </View>

      <View style={globalStyles.mt20}>
        <CPTModifierDetails
          cpts={procedureData.case_procedure_cpt}
          cptModifier={procedureData.cpt_modifier}
        />
      </View>

    </View>
  )
}