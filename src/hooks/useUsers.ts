import { useMutation } from 'react-query';
import * as usersService from 'src/services/usersService';
import { UpdateProfileDto } from 'src/types/dto/UpdateProfileDto';

const updateProfile = async (dto: UpdateProfileDto) => {
  return await usersService.updateProfile(dto);
}

// ******************************************************************************************************************************
// ******************************************************************************************************************************

export const useUpdateProfile = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(updateProfile, {
    onSuccess,
    onError,
    ...options,
  })
}