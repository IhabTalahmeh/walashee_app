import { EReimbursementModel } from "src/enum/EReimbursementModel";

export const isNeurosurgery = (speciality: string): boolean => {
  return speciality === 'Neurological Surgery'
}

export const isInterventional = (speciality: string): boolean => {
  return speciality == 'Interventional Neurology/Neuroradiology';
}

export const isRadiology = (speciality: string): boolean => {
  return speciality == 'Interventional Radiology';
}

export const isFunctional = (procedureType: string) => {
  return procedureType === 'Functional';
}

export const isPeripheral = (procedureType: string) => {
  return procedureType === 'Peripheral nerves';
}

export const isSpine = (procedureType: string): boolean => {
  return procedureType === 'Spine';
}

export const isCranial = (procedureType: string): boolean => {
  return procedureType === 'Cranial';
}

export const isBedside = (procedureType: string): boolean => {
  return procedureType === 'Bedside';
}

export const isPain = (procedureType: string): boolean => {
  return procedureType === 'Pain';
}

export const isRadiosurgery = (procedureType: string): boolean => {
  return procedureType === 'Radiosurgery';
}

export const isOtherProcedure = (procedureType: string): boolean => {
  return procedureType === 'Other';
}

export const isEmptyProcedure = (procedureType: string): boolean => {
  return procedureType === '';
}

export const isInter = (procedureType: string): boolean => {
  return procedureType === 'Neurointerventional';
}

const isEmptyIndication = (indication: string): boolean => {
  return indication === '' || indication?.includes('') || indication?.length == 0;
}

const isOtherIndication = (indication: string): boolean => {
  return indication === 'Other' || indication?.includes('Other');
}

export const isTumor = (indication: string): boolean => {
  return indication === 'Tumor' || indication?.includes('Tumor');
}

export const isPainIndication = (indication: string): boolean => {
  return indication === 'Pain' || indication?.includes('Pain');
}

export const isCarotid = (indication: string): boolean => {
  return indication === 'Carotid stenosis' || indication?.includes('Carotid stenosis');
}

export const isAVF = (indication: string): boolean => {
  return indication === 'AVF' || indication?.includes('AVF');
}

export const isAVM = (indication: string): boolean => {
  return indication === 'AVM' || indication?.includes('AVM');
}

export const isAbscess = (indication: string): boolean => {
  return indication === 'Abscess' || indication?.includes('Abscess');
}

export const isAneurysm = (indication: string): boolean => {
  return indication === 'Aneurysm' || indication?.includes('Aneurysm');
}

export const isHematoma = (indication: string): boolean => {
  return indication === 'Hematoma' || indication?.includes('Hematoma');
}

export const isFracture = (indication: string): boolean => {
  return indication === 'Fracture' || indication?.includes('Fracture');
}

export const isHydrocephalus = (indication: string): boolean => {
  return indication === 'Hydrocephalus' || indication?.includes('Hydrocephalus');
}

export const isBleeding = (indication: string): boolean => {
  return indication === 'Bleeding' || indication?.includes('Bleeding');
}

export const isDissection = (indication: string): boolean => {
  return indication === 'Dissection' || indication?.includes('Dissection');
}

export const isVasospasm = (indication: string): boolean => {
  return indication === 'Vasospasm' || indication?.includes('Vasospasm');
}

export const isStroke = (indication: string): boolean => {
  return indication === 'Stroke' || indication?.includes('Stroke');
}

export const isThrombectomy = (_procedure: string) => {
  return _procedure === 'Thrombectomy' || _procedure?.includes('Thrombectomy');
}

// *********************************************************
// *********************************************************

export const showApproach = (values: any): boolean => {
  return isSpine(values.type) || isCranial(values.type);
}

export const showMinimallyInvasive = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isSpine(values.type)
}

export const showNavigation = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isSpine(values.type);
}

export const showRobotic = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isSpine(values.type);
}

export const showIndication = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && (isBedside(values.type) || isPain(values.type) || isRadiosurgery(values.type)) ||
    isNeurosurgery(speciality) && !isEmptyProcedure(values.type) && !isOtherProcedure(values.type) ||
    isInterventional(speciality) || isRadiology(speciality)
}

export const showTextIndication = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && (isBedside(values.type) || isPain(values.type) || isRadiosurgery(values.type))
}

export const showListIndication = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && !isOtherProcedure(values.type) && !isEmptyProcedure(values.type) ||
    isInterventional(speciality) || isRadiology(speciality)
}

export const showSide = (speciality: string): boolean => {
  return isNeurosurgery(speciality) || isInterventional(speciality);
}

export const showProcedure = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isInter(values.type) && !isEmptyProcedure(values.type) ||
    isNeurosurgery(speciality) && (isBedside(values.type) || isPain(values.type) || isRadiosurgery(values.type)) && !isEmptyProcedure(values.type)
}

export const showLocation = (values: any, speciality: string): boolean => {
  return (((isNeurosurgery(speciality) && isInter(values.type)) && (isCarotid(values.indication) || isPainIndication(values.indication) || isOtherIndication(values.indication)) ||
    (isInterventional(speciality) && (isCarotid(values.indication) || isPainIndication(values.indication) || isOtherIndication(values.indication)))) ||
    ((isNeurosurgery(speciality) && !(isFunctional(values.type) || isPeripheral(values.type))) &&
      !(isEmptyIndication(values.indication) || isOtherIndication(values.indication)) ||
      isNeurosurgery(speciality) && isSpine(values.type)) ||
    (isInterventional(speciality) && !isEmptyIndication(values.indication)) || isRadiology(speciality));
}

export const showTextLocation = (values: any, speciality: string): boolean => {
  return (isNeurosurgery(speciality) && isInter(values.type)) && (isCarotid(values.indication) || isPainIndication(values.indication) || isOtherIndication(values.indication)) ||
    (isInterventional(speciality) && (isCarotid(values.indication) || isPainIndication(values.indication) || isOtherIndication(values.indication))) || isRadiology(speciality);
}

export const showNeuroLocation = (values: any, speciality: string): boolean => {
  return ((isNeurosurgery(speciality) && !(isFunctional(values.type) || isPeripheral(values.type))) &&
    !(isEmptyIndication(values.indication) || isOtherIndication(values.indication)) ||
    isNeurosurgery(speciality) && isSpine(values.type)) && !showTextLocation(values, speciality);
};

export const showInterLocation = (values: any, speciality: string): boolean => {
  return (isInterventional(speciality) && !isEmptyIndication(values.indication)) && !showNeuroLocation(values, speciality);
}

export const showTarget = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isFunctional(values.type) && !isEmptyProcedure(values.type);
}

export const showNerve = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isPeripheral(values.type) && !isEmptyProcedure(values.type);
}

export const showTiciGrade = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isInter(values.type) && isThrombectomy(values._procedure) ||
    isInterventional(speciality) && isThrombectomy(values._procedure);
}

export const showOsteotomy = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isSpine(values.type) && !isEmptyProcedure(values.type);
}

export const showFusion = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isSpine(values.type) && !isEmptyProcedure(values.type);
}

export const showInterbodyFusion = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isSpine(values.type) && !isEmptyProcedure(values.type);
}

export const showExtensionToPelvis = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isSpine(values.type) && !isEmptyProcedure(values.type);
}

export const showFusionLevels = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isSpine(values.type);
}

export const showDecompressionLevels = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isSpine(values.type);
}

export const showMorphogenicProtein = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && isSpine(values.type);
}

export const showImplant = (values: any, speciality: string): boolean => {
  return isInterventional(speciality) || isRadiology(speciality) || isNeurosurgery(speciality) && !isSpine(values.type) && !isEmptyProcedure(values.type);
}

export const showImplantType = (values: any, speciality: string): boolean => {
  return isInterventional(speciality) || isRadiology(speciality) || isNeurosurgery(speciality) && !isSpine(values.type) && !isEmptyProcedure(values.type);
}

export const showVendors = (values: any, speciality: string): boolean => {
  return (isNeurosurgery(speciality) && !isEmptyProcedure(values.type)) || (isInterventional(speciality) && !isEmptyProcedure(values.type));
}

export const showOtherVendors = (values: any): boolean => {
  return values._vendors?.includes('Other');
}

export const showAccess = (speciality: string): boolean => {
  return isInterventional(speciality) || isRadiology(speciality);
}

export const showVascularClosureDevice = (speciality: string): boolean => {
  return isInterventional(speciality) || isRadiology(speciality);
}

export const showDurationOfRadiation = (values: any, speciality: string): boolean => {
  return isNeurosurgery(speciality) && !isEmptyProcedure(values.type) && isInter(values.type) || isInterventional(speciality) || isRadiology(speciality);
}

export const showDurationOfProcedure = (speciality: string): boolean => {
  return isNeurosurgery(speciality) || isInterventional(speciality)
}

export const showFindings = (speciality: string): boolean => {
  return !isRadiology(speciality);
}

export const showComplications = (speciality: string): boolean => {
  return !isRadiology(speciality);
}

export const showOutcome = (speciality: string): boolean => {
  return !isRadiology(speciality);
}

export const showThreshold = (reimbursementModel: EReimbursementModel) => {
  return reimbursementModel == EReimbursementModel.MIXED;
}

export const showAmount = (reimbursementModel: EReimbursementModel) => {
  return reimbursementModel == EReimbursementModel.MIXED;
}

export const showRVUMultiplier = (reimbursementModel: EReimbursementModel) => {
  return reimbursementModel == EReimbursementModel.RVUS_BASED || reimbursementModel == EReimbursementModel.MIXED;
}