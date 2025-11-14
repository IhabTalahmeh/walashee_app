import { useQuery } from 'react-query';
import * as lookupsService from 'src/services/lookupsService';

const getCountries = async () => {
  return await lookupsService.getCountries();
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