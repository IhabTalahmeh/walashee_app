import { useQuery } from 'react-query';
import * as googlePlacesService from 'src/services/googlePlacesService';

const searchPlaces = async (keyword: string) => {
  return await googlePlacesService.searchPlaces(keyword);
}

// ******************************************************************************************************
// ******************************************************************************************************

export const useSearchPlaces = (keyword: string, options = {}) => {
  return useQuery({
    queryKey: ['places', keyword],
    queryFn: () => searchPlaces(keyword),
    ...options,
  });
}