import { Platform } from "react-native";
import { ApiService } from "./apiService";

export const getGenders = async () => {
  const { data } = await ApiService.get(`gender_lookups`);
  return data;
}

export const getRaceList = async () => {
  const { data } = await ApiService.get('race_lookups');
  return data;
}

export const getInsuranceList = async () => {
  const { data } = await ApiService.get(`insurance_lookups`);
  return data;
}

export const getInsuranceStatusList = async () => {
  const { data } = await ApiService.get(`insurance_status_lookups`);
  return data;
}

export const getNeurosurgeryProcedureTypes = async () => {
  const { data } = await ApiService.get('proceduretype_neurosurgery_lookups');
  return data;
}

export const getInterventionalProcedureTypes = async () => {
  const { data } = await ApiService.get('proceduretype_neurointerventional_lookups');
  return data;
}

export const getBedsideProcedureTypes = async () => {
  const { data } = await ApiService.get('proceduretype_bedside_lookups');
  return data;
}

export const getRadiologyProcedureTypeList = async () => {
  const { data } = await ApiService.get('proceduretype_radiology_lookups');
  return data;
}

export const getSpineApproachList = async () => {
  const { data } = await ApiService.get('approach_spine_lookups');
  return data;
}

export const getCranialApproachList = async () => {
  const { data } = await ApiService.get('approach_cranial_lookups');
  return data;
}

export const getCranialIndicationList = async () => {
  const { data } = await ApiService.get('indication_cranial_lookups');
  return data;
}

export const getSpineIndicationList = async () => {
  const { data } = await ApiService.get('indication_spine_lookups');
  return data;
}

export const getFunctionalIndicationList = async () => {
  const { data } = await ApiService.get('indication_functional_lookups');
  return data;
}

export const getNervesIndicationList = async () => {
  const { data } = await ApiService.get('indication_nerves_lookups');
  return data;
}

export const getInterventionalIndicationList = async () => {
  const { data } = await ApiService.get('indication_neurointerventional_lookups');
  return data;
}

export const getInterIndicationList = async () => {
  const { data } = await ApiService.get('indication_interventional_lookups');
  return data;
}

export const getRadiologyIndicationList = async () => {
  const { data } = await ApiService.get('indication_radiology_lookups');
  return data;
}

export const getSidesList = async () => {
  const { data } = await ApiService.get('side_lookups');
  return data;
}

export const getSpineLocationList = async () => {
  const { data } = await ApiService.get('location_spine_lookups');
  return data;
}

export const getDissectionLocationList = async () => {
  const { data } = await ApiService.get('dissection_location_lookups');
  return data;
}

export const getStrokeLocationList = async () => {
  const { data } = await ApiService.get('stroke_location_lookups');
  return data;
}

export const getBleedingLocationList = async () => {
  const { data } = await ApiService.get('bleeding_location_lookups');
  return data;
}

export const getAVMLocationList = async () => {
  const { data } = await ApiService.get('avm_location_lookups');
  return data;
}

export const getHydrocephalusLocationList = async () => {
  const { data } = await ApiService.get('hydrocephalus_location_lookups');
  return data;
}

export const getFractureLocationList = async () => {
  const { data } = await ApiService.get('fracture_location_lookups');
  return data;
}

export const getHematomaLocationList = async () => {
  const { data } = await ApiService.get('hematoma_location_lookups');
  return data;
}

export const getAneurysmLocationList = async () => {
  const { data } = await ApiService.get('aneurysm_location_lookups');
  return data;
}

export const getAneurysmLocationInterList = async () => {
  const { data } = await ApiService.get('aneurysm_location_inter_lookups');
  return data;
}

export const getTumorLocationList = async () => {
  const { data } = await ApiService.get('tumor_location_lookups');
  return data;
}

export const getTICIGradeList = async () => {
  const { data } = await ApiService.get('tici_grade_lookups');
  return data;
}

export const getOsteotomyList = async () => {
  const { data } = await ApiService.get('osteotomy_lookups');
  return data;
}

export const getVendorsList = async () => {
  const { data } = await ApiService.get('vendors_lookups');
  return data;
}

export const searchICDs = async (keyword: string, limit = 30) => {
  return await ApiService.get(`icd_lookup?search_term=${keyword}&limit=${limit}`);
}

export const searchCPTs = async (keyword: string, limit = 30) => {
  return await ApiService.get(`cpt_lookups?search_term=${keyword}&limit=${limit}`);
}

export const getCPTModifiers = async () => {
  const { data } = await ApiService.get('cpt_modifiers_lookups');
  return data;
}

export const getCPTSuggestions = async (procedureName: string) => {
  const { data } = await ApiService.get(`cpt_lookups/suggestions?procedure_name=${procedureName}`);
  return data;
}

export const getCountries = async () => {
  const { data } = await ApiService.get(`lookups/countries`);
  return data;
}

export const getSpecialities = async () => {
  const { data } = await ApiService.get(`specialities`);
  return data;
}

export const getDegrees = async () => {
  const { data } = await ApiService.get(`degrees`);
  return data;
}

export const getStates = async () => {
  const { data } = await ApiService.get(`states_lookups`);
  return data;
}

export const getReimbursementModels = async () => {
  const { data } = await ApiService.get(`reimbursement_model_lookups`);
  return data;
}

export const getThresholds = async () => {
  const { data } = await ApiService.get(`threshold_lookups`);
  return data;
}

export const getUserRoles = async () => {
  const { data } = await ApiService.get(`user_roles_lookups`);
  return data;
}

export const getPlans = async () => {
  const { data } = await ApiService.get(`plans`);
  return data;
}

export const getAppVersion = async () => {
  const endpoint = Platform.OS === 'ios' ? 'ios_app_version' : 'android_app_version';
  const { data } = await ApiService.get(endpoint);
  return data;
}