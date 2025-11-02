import { useQuery } from 'react-query';
import { enumToLabelValueList, enumToLabelValueListExp } from 'src/common/utils';
import * as lookupsService from 'src/services/lookupsService';

const getGenders = async () => {
  return await lookupsService.getGenders();
}

const getRaceList = async () => {
  return await lookupsService.getRaceList();
}

const getInsuranceList = async () => {
  return await lookupsService.getInsuranceList();
}

const getInsuranceStatusList = async () => {
  return await lookupsService.getInsuranceStatusList();
}

const getApproachList = async (procedureType: string) => {
  switch (procedureType) {
    case 'Cranial':
      return await lookupsService.getCranialApproachList();
    case 'Spine':
      return await lookupsService.getSpineApproachList();
    default:
      return [];
  }
}

const getProcedureTypes = async (speciality: string) => {
  switch (speciality) {
    case 'Neurological Surgery':
      return await lookupsService.getNeurosurgeryProcedureTypes();
    case 'Interventional Neurology/Neuroradiology':
      return await lookupsService.getInterventionalProcedureTypes();
    case 'Interventional Radiology':
      return await lookupsService.getRadiologyProcedureTypeList();
    default:
      return [];
  }
}

const getIndicationList = async (listType: string) => {
  switch (listType) {
    case 'Interventional Neurology/Neuroradiology':
      return await lookupsService.getInterventionalIndicationList();
    case 'Interventional Radiology':
      return await lookupsService.getRadiologyIndicationList();
    case 'Cranial':
      return await lookupsService.getCranialIndicationList();
    case 'Spine':
      return await lookupsService.getSpineIndicationList();
    case 'Functional':
      return await lookupsService.getFunctionalIndicationList();
    case 'Peripheral nerves':
      return await lookupsService.getNervesIndicationList();
    case 'Interventional':
      return await lookupsService.getInterIndicationList();
    default:
      return [];
  }
}

const getLocationList = async (listType: string) => {
  switch (listType) {
    case 'Spine':
      return await lookupsService.getSpineLocationList();
    case 'Tumor':
      return await lookupsService.getTumorLocationList();
    case 'Aneurysm':
      return await lookupsService.getAneurysmLocationList();
    case 'AneurysmInter':
      return await lookupsService.getAneurysmLocationInterList();
    case 'Hematoma':
      return await lookupsService.getHematomaLocationList();
    case 'Fracture':
      return await lookupsService.getFractureLocationList();
    case 'Hydro':
      return await lookupsService.getHydrocephalusLocationList();
    case 'AVM':
      return await lookupsService.getAVMLocationList();
    case 'Bleeding':
      return await lookupsService.getBleedingLocationList();
    case 'Dissection':
      return await lookupsService.getDissectionLocationList();
    case 'Stroke':
      return await lookupsService.getStrokeLocationList();
    default:
      return [];
  }
}

const getSideList = async () => {
  return await lookupsService.getSidesList();
}

const getProcedureList = async (listType: string) => {
  switch (listType) {
    case 'Interventional':
      return await lookupsService.getInterventionalProcedureTypes();
    case 'Bedside':
      return await lookupsService.getBedsideProcedureTypes();
  }
}

const getTICIGradeList = async () => {
  return await lookupsService.getTICIGradeList();
}

const getOsteotomyList = async () => {
  return await lookupsService.getOsteotomyList();
}

const getVendorsList = async () => {
  return await lookupsService.getVendorsList();
}

const searchICDs = async (keyword: string) => {
  return await lookupsService.searchICDs(keyword);
}

const searchCPTs = async (keyword: string) => {
  return await lookupsService.searchCPTs(keyword);
}

const getCPTModifiers = async () => {
  return await lookupsService.getCPTModifiers();
}

const getCPTSuggestions = async (procedureName: string) => {
  return await lookupsService.getCPTSuggestions(procedureName);
}

const getCountries = async () => {
  return await lookupsService.getCountries();
}

const getSpecialities = async () => {
  return await lookupsService.getSpecialities();
}

const getDegrees = async () => {
  return await lookupsService.getDegrees();
}

const getStates = async () => {
  return await lookupsService.getStates();
}

const getReimbursementModels = async () => {
  return await lookupsService.getReimbursementModels();
}

const getThresholds = async () => {
  return await lookupsService.getThresholds();
}

const getUserRoles = async () => {
  return await lookupsService.getUserRoles();
}

const getPlans = async () => {
  return await lookupsService.getPlans();
}

const getAppVersion = async () => {
  return await lookupsService.getAppVersion();
}


// ***************************************************************
// ***************************************************************


export const useGetGenders = (options = {}) => {
  return useQuery({
    queryKey: ['genders'],
    queryFn: getGenders,
    select: (response) => enumToLabelValueList(response),
    ...options,
  });
};

export const useGetRaceList = (options = {}) => {
  return useQuery({
    queryKey: ['raceList'],
    queryFn: getRaceList,
    select: (response) => enumToLabelValueList(response),
    ...options,
  });
}

export const useGetInsuranceList = (options = {}) => {
  return useQuery({
    queryKey: ['insuranceList'],
    queryFn: getInsuranceList,
    select: (response) => enumToLabelValueList(response),
    ...options,
  });
};

export const useGetInsuranceStatusList = (options = {}) => {
  return useQuery({
    queryKey: ['insuranceStatusList'],
    queryFn: getInsuranceStatusList,
    select: (response) => enumToLabelValueList(response),
    ...options,
  });
};

export const useGetProcedureTypes = (speciality: string, options = {}) => {
  return useQuery({
    queryKey: ['procedureTypes', speciality],
    queryFn: () => getProcedureTypes(speciality),
    select: (response) => enumToLabelValueList(response),
    ...options
  });
}

export const useGetApproachList = (procedureType: string, options = {}) => {
  return useQuery({
    queryKey: ['approachs', procedureType],
    queryFn: () => getApproachList(procedureType),
    select: (response) => enumToLabelValueList(response),
    ...options
  });
}

export const useGetIndicationList = (listType: string, options = {}) => {
  return useQuery({
    queryKey: ['indications', listType],
    queryFn: () => getIndicationList(listType),
    select: (response) => enumToLabelValueList(response),
    ...options
  });
}

export const useGetSideList = (options = {}) => {
  return useQuery({
    queryKey: ['sides'],
    queryFn: () => getSideList(),
    select: (response) => enumToLabelValueList(response),
    ...options
  });
}

export const useGetProcedureList = (listType: string, options = {}) => {
  return useQuery({
    queryKey: ['procedureList', listType],
    queryFn: () => getProcedureList(listType),
    select: (response) => enumToLabelValueList(response),
    ...options
  });
}

export const useGetLocationList = (listType: string, options = {}) => {
  return useQuery({
    queryKey: ['locationList', listType],
    queryFn: () => getLocationList(listType),
    select: (response) => enumToLabelValueList(response),
    ...options
  })
}

export const useGetTICIGrade = (options = {}) => {
  return useQuery({
    queryKey: ['ticiGradeList'],
    queryFn: () => getTICIGradeList(),
    select: (response) => enumToLabelValueList(response),
    ...options
  })
}

export const useGetOsteotomyList = (options = {}) => {
  return useQuery({
    queryKey: ['osteotomyList'],
    queryFn: () => getOsteotomyList(),
    select: (response) => enumToLabelValueList(response),
    ...options
  })
}

export const useGetVendorsList = (options = {}) => {
  return useQuery({
    queryKey: ['vendorsList'],
    queryFn: () => getVendorsList(),
    select: (response) => enumToLabelValueList(response),
    ...options
  })
}

export const useSearchICDs = (keyword: string, options = {}) => {
  return useQuery({
    queryKey: ['icds', keyword],
    queryFn: () => searchICDs(keyword),
    select: (response) => response.data,
    ...options,
  });
}

export const useSearchCPTs = (keyword: string, options = {}) => {
  return useQuery({
    queryKey: ['cpts', keyword],
    queryFn: () => searchCPTs(keyword),
    select: (response) => response.data,
    ...options,
  });
}

export const useGetCPTModifiers = (options = {}) => {
  return useQuery({
    queryKey: ['cptModifiers'],
    queryFn: getCPTModifiers,
    ...options,
  });
}

export const useGetCPTSuggestions = (procedureName: string, options = {}) => {
  return useQuery({
    queryKey: ['cptSuggestions', procedureName],
    queryFn: () => getCPTSuggestions(procedureName),
    ...options,
  });
}

export const useGetCountries = (options = {}) => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    ...options,
  });
}

export const useGetSpecialities = (options = {}) => {
  return useQuery({
    queryKey: ['specialities'],
    queryFn: getSpecialities,
    select: (response) => {
      return enumToLabelValueListExp(response)
    },
    ...options,
  });
}

export const useGetDegrees = (options = {}) => {
  return useQuery({
    queryKey: ['degrees'],
    queryFn: getDegrees,
    select: (response) => enumToLabelValueListExp(response),
    ...options,
  });
}

export const useGetStates = (options = {}) => {
  return useQuery({
    queryKey: ['states'],
    queryFn: getStates,
    select: (response) => enumToLabelValueList(response),
    ...options,
  });
}

export const useGetReimbursementModels = (options = {}) => {
  return useQuery({
    queryKey: ['reimbursementModels'],
    queryFn: getReimbursementModels,
    select: (response) => enumToLabelValueList(response),
    ...options,
  });
}

export const useGetThresholds = (options = {}) => {
  return useQuery({
    queryKey: ['thresholds'],
    queryFn: getThresholds,
    select: (response) => enumToLabelValueList(response),
    ...options,
  });
}

export const useGetUserRoles = (options = {}) => {
  return useQuery({
    queryKey: ['userRoles'],
    queryFn: getUserRoles,
    select: (response) => Object.entries(response).map(([key, value]: any) => ({
      key: value.id,
      label: value.nice_name,
      value: value.id
    })),
    ...options,
  });
}

export const useGetPlans = (options = {}) => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
    ...options,
  });
}

export const useGetAppVersion = (options={}) => {
  return useQuery({
    queryKey: ['app_version'],
    queryFn: getAppVersion,
    ...options,
  });
}