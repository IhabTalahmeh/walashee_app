import { ECaseFilter } from "src/enum/ECaseFilter";
import { EReimbursementModel } from "src/enum/EReimbursementModel";
import { EThreshold } from "src/enum/EThreshold";

export interface LabelValueType {
  key: string;
  label: string;
  value: string;
}

export interface YesNoType {

}

export interface CPT {
  id?: string;
  code: string;
  value: string;
  rvu_value: number;
  quantity: number;
}

export interface ICD {
  id?: string;
  code: string;
  value: string
}

export interface CPTModifier {
  id: string;
  description: string;
  percentage: number;
}

export interface ImageItem {
  id?: number;
  uri: string;
  image_name: string;
  urls?: any;
  procedure?: number;
};

export interface CountryType {
  id: number,
  iso: string,
  iso3: string,
  nice_name: string,
  arabic_name: string,
  phone_code: number,
}

export interface Reimbursement {
  id: number;
  user: number;
  practice_state: string;
  reimbursement_model :EReimbursementModel;
  threshold: EThreshold;
  amount: number;
  rvus_multiplier: number;
}

export interface PeriodFilterItem {
  id: string;
  title: string;
  route: ECaseFilter;
};