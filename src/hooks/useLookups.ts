import { useQuery } from 'react-query';
import { enumToLabelValueList } from 'src/common/utils';
import * as lookupsService from 'src/services/lookupsService';

const getCountries = async () => {
  return await lookupsService.getCountries();
}

const getGenders = async () => {
  return await lookupsService.getGenders();
}

// ***************************************************************
// ***************************************************************


export const useGetCountries = (options = {}) => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    ...options,
  });
}

export const useGetGenders = (options = {}) => {
  return useQuery({
    queryKey: ['genders'],
    queryFn: getGenders,
    select: (response) => enumToLabelValueList(response),
    ...options,
  });
};