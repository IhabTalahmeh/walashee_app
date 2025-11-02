import { useQuery } from 'react-query';
import * as userService from 'src/services/userInfoService';

const getUserHospitals = async (userId: number) => {
  const { data } = await userService.getUserHospitals(userId);
  return data;
}

export const useGetUserHospitals = (userId: number, options = {}) => {
  return useQuery({
    queryKey: ['userHospitals', userId],
    queryFn: () => getUserHospitals(userId),
    select: (response) => {
      if (!Array.isArray(response)) return [];
      return response.map((item: any) => ({
        key: item.id,
        label: item.label,
        value: item.id,
      }));
    },
    ...options
  });
}