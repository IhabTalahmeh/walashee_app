import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from 'react-query';
import { dateToString, stringToDate } from 'src/common/utils';
import { EReimbursementModel } from 'src/enum/EReimbursementModel';
import { EThreshold } from 'src/enum/EThreshold';
import { EUsersFilter } from 'src/enum/EUsersFilter';
import * as usersService from 'src/services/usersService';
import { AddEducationDto } from 'src/types/dto/AddEducationDto';
import { AddExperienceDto } from 'src/types/dto/AddExperienceDto';
import { InviteUsersDto, UpdatePermissionDto } from 'src/types/dto/InviteUsersDto';
import { UpdateProfileDto } from 'src/types/dto/UpdateProfileDto';
import { UpdateReimbursementDto } from 'src/types/dto/UpdateReimbursementDto';
import * as casesService from 'src/services/casesService';
import { ESharedCaseFilter } from 'src/enum/ESharedCaseFilter';

const searchUsers = async (keyword: string) => {
  return await usersService.searchUsers(keyword);
}

const getDashboard = async () => {
  return await usersService.getDashboard();
}

const getUserById = async (userId: number) => {
  return await usersService.getUserById(userId);
}

const getDoctors = async (userId: number, filter: EUsersFilter) => {
  return await usersService.getDoctors(userId, filter);
}

const getStaff = async (userId: number) => {
  return await usersService.getStaff(userId);
}

const revokeUser = async ({ userId, endUserId }: {
  userId: number,
  endUserId: number,
}) => {
  return await usersService.revokeUser(userId, endUserId);
}

const inviteUsers = async ({ userId, dto }: {
  userId: number,
  dto: InviteUsersDto
}) => {
  return await usersService.inviteUsers(userId, dto);
}

const updatePermission = async ({ userId, dto }: {
  userId: number,
  dto: UpdatePermissionDto
}) => {
  return await usersService.updatePermission(userId, dto);
}

const getInvitations = async (userId: number) => {
  return await usersService.getInvitations(userId);
}

const acceptInvitation = async ({ userId, doctorId }: {
  userId: number,
  doctorId: number,
}) => {
  return await usersService.acceptInvitation(userId, doctorId);
}

const rejectInvitation = async ({ userId, doctorId }: {
  userId: number,
  doctorId: number,
}) => {
  return await usersService.rejectInvitation(userId, doctorId);
}

const addExperience = async ({ userId, dto }: {
  userId: number,
  dto: AddExperienceDto
}) => {
  dto.start_date = dateToString(new Date(dto.start_date));
  if (dto.end_date) {
    dto.end_date = dateToString(new Date(dto.end_date));
  }
  dto.speciality_id = Number(dto.speciality_id);
  return await usersService.addExperience(userId, dto);
}

const getExperienceById = async (userId: number, experienceId: number) => {
  const { data } = await usersService.getExperienceById(userId, experienceId);
  if (data.end_date) {
    data.end_date = stringToDate(data.end_date);
  }
  data.start_date = stringToDate(data.start_date);
  return data;
}

const deleteExperience = async ({ userId, experienceId }: {
  userId: number,
  experienceId: number,
}) => {
  return await usersService.deleteExperience(userId, experienceId);
}

const updateExperience = async ({ userId, experienceId, dto }: {
  userId: number,
  experienceId: number,
  dto: AddExperienceDto
}) => {

  dto.start_date = dateToString(new Date(dto.start_date));
  if (dto.end_date) {
    dto.end_date = dateToString(new Date(dto.end_date));
  }
  dto.speciality_id = Number(dto.speciality_id);
  return await usersService.updateExperience(userId, experienceId, dto);
}

const addEducation = async ({ userId, dto }: {
  userId: number,
  dto: AddEducationDto
}) => {
  dto.start_date = dateToString(new Date(dto.start_date));
  if (dto.end_date) {
    dto.end_date = dateToString(new Date(dto.end_date));
  }
  dto.speciality_id = Number(dto.speciality_id);
  return await usersService.addEducation(userId, dto);
}

const updateEducation = async ({ userId, experienceId, dto }: {
  userId: number,
  experienceId: number,
  dto: AddEducationDto
}) => {

  dto.start_date = dateToString(new Date(dto.start_date));
  if (dto.end_date) {
    dto.end_date = dateToString(new Date(dto.end_date));
  }
  dto.speciality_id = Number(dto.speciality_id);
  return await usersService.updateEducation(userId, experienceId, dto);
}

const deleteEducation = async ({ userId, educationId }: {
  userId: number,
  educationId: number,
}) => {
  return await usersService.deleteEducation(userId, educationId);
}

const getEducationById = async (userId: number, educationId: number) => {
  const { data } = await usersService.getEducationById(userId, educationId);
  if (data.end_date) {
    data.end_date = stringToDate(data.end_date);
  }
  data.start_date = stringToDate(data.start_date);
  return data;
}

const updateReimbursement = async ({ userId, dto }: {
  userId: number,
  dto: UpdateReimbursementDto
}) => {
  const newValues = { ...dto };

  switch (newValues.reimbursement_model) {
    case EReimbursementModel.SALARY_BASED:
      newValues.threshold = EThreshold.EMPTY;
      newValues.amount = 0;
      newValues.rvus_multiplier = 0;
      break;
    case EReimbursementModel.RVUS_BASED:
      newValues.threshold = EThreshold.EMPTY;
      newValues.amount = 0;
  }

  return await usersService.updateReimbursement(userId, newValues);
}

const deleteReimbursement = async (userId: number) => {
  return await usersService.deleteReimbursement(userId);
}

const updateProfile = async ({ userId, dto }: {
  userId: number,
  dto: UpdateProfileDto,
}) => {
  return await usersService.updateProfile(userId, dto);
}

const updateProfilePicture = async ({
  userId,
  image,
}: {
  userId: number;
  image: string;
}) => {
  const formData = new FormData();

  formData.append('image_file', {
    uri: image,
    type: 'image/jpeg',
    name: 'profile.jpg',
  } as any);

  formData.append('image_type', 'PROFILE_IMAGE');

  return await usersService.updateProfilePicture(userId, formData);
};

const getDashboardPermission = async (doctorId: number) => {
  const result = await casesService.getCases({
    userId: doctorId,
    page: 0,
    pageLimit: 0,
    filter: ESharedCaseFilter.ALL,
  });

  return result.data.permission;
}


// ******************************************************************************************************************************
// ******************************************************************************************************************************

export const useSearchUsers = (keyword: string, options = {}) => {
  return useQuery({
    queryKey: ['users', keyword],
    queryFn: () => searchUsers(keyword),
    select: (response) => {
      if (!Array.isArray(response.data) || !keyword) return [];
      return response.data.map((item: any) => ({
        id: item.id,
        invitee_name: `${item.last_name}, ${item.first_name}`,
      }));
    },
    ...options
  });
}

export const useGetDashboard = (options = {}) => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
    ...options,
  })
}

export const useGetUserById = (userId: number, options = {}) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    ...options,
  })
}

export const useGetDoctors = ({ userId, filter }: { userId: number, filter: EUsersFilter }, options = {}) => {
  return useQuery({
    queryKey: ['doctors', userId, filter],
    queryFn: () => getDoctors(userId, filter),
    ...options,
  })
}

export const useGetStaff = (userId: number, options = {}) => {
  return useQuery({
    queryKey: ['staff', userId],
    queryFn: () => getStaff(userId),
    ...options,
  })
}

export const useRevokeUser = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(revokeUser, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useInviteUsers = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(inviteUsers, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useUpdatePermission = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(updatePermission, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useGetInvitations = (userId: number, options = {}) => {
  return useQuery({
    queryKey: ['invitations', userId],
    queryFn: () => getInvitations(userId),
    ...options,
  })
}

export const useAcceptInvitation = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(acceptInvitation, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useRejectInvitation = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(rejectInvitation, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useAddExperience = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(addExperience, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useGetExperienceById = ({ userId, experienceId }: { userId: number, experienceId: number }, options = {}) => {
  return useQuery({
    queryKey: ['experience', userId, experienceId],
    queryFn: () => getExperienceById(userId, experienceId),
    ...options,
  })
}

export const useDeleteExperience = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(deleteExperience, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useUpdateExperience = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(updateExperience, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useAddEducation = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(addEducation, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useUpdateEducation = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(updateEducation, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useDeleteEducation = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(deleteEducation, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useGetEducationById = ({ userId, educationId }: { userId: number, educationId: number }, options = {}) => {
  return useQuery({
    queryKey: ['education', userId, educationId],
    queryFn: () => getEducationById(userId, educationId),
    ...options,
  })
}

export const useUpdateReimbursement = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(updateReimbursement, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useDeleteReimbursement = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(deleteReimbursement, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useUpdateProfile = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(updateProfile, {
    onSuccess,
    onError,
    ...options,
  })
}

export const useUpdateProfilePicture = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(updateProfilePicture, {
    onSuccess,
    onError,
    ...options,
  });
}

export const useGetDashboardPermission = (doctorId: number, options = {}) => {
  return useQuery({
    queryKey: ['dashboardPermission', doctorId],
    queryFn: () => getDashboardPermission(doctorId),
    ...options,
  });
}