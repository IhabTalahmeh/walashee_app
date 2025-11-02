import { EUsersFilter } from "src/enum/EUsersFilter";
import { ApiService } from "./apiService";
import { InviteUsersDto, UpdatePermissionDto } from "src/types/dto/InviteUsersDto";
import { AddExperienceDto } from "src/types/dto/AddExperienceDto";
import { AddEducationDto } from "src/types/dto/AddEducationDto";
import { UpdateReimbursementDto } from "src/types/dto/UpdateReimbursementDto";
import { UpdateProfileDto } from "src/types/dto/UpdateProfileDto";

export const searchUsers = async (keyword: string) => {
  return await ApiService.get(`users?keyword=${keyword}`);
}

export const getDashboard = async () => {
  const { data } = await ApiService.get(`users/dashboard`);
  return data;
}

export const getUserById = async (userId: number) => {
  const { data } = await ApiService.get(`users/${userId}`);
  return data;
}

export const getDoctors = async (userId: number, filter: EUsersFilter) => {
  const { data } = await ApiService.get(`users/${userId}/doctors?filter=${filter}`);
  return data;
}

export const getInvitations = async (userId: number) => {
  const { data } = await ApiService.get(`users/${userId}/doctors?filter=INVITATIONS`);
  return data;
}

export const getStaff = async (userId: number) => {
  return await ApiService.get(`users/${userId}/staff`);
}

export const revokeUser = async (userId: number, endUserId: number) => {
  return await ApiService.put(`users/${userId}/access_users/revoke_user`, {
    end_user_id: endUserId,
  })
}

export const inviteUsers = async (userId: number, dto: InviteUsersDto) => {
  return await ApiService.post(`users/${userId}/access_users`, dto);
}

export const updatePermission = async (userId: number, dto: UpdatePermissionDto) => {
  return await ApiService.put(`users/${userId}/access_users/change_permission`, dto);
}

export const acceptInvitation = async (userId: number, doctorId: number) => {
  return await ApiService.put(`users/${userId}/access_users/invitation`, {
    doctor_id: doctorId,
    status: 'ACCEPTED',
  });
}

export const rejectInvitation = async (userId: number, doctorId: number) => {
  return await ApiService.put(`users/${userId}/access_users/invitation`, {
    doctor_id: doctorId,
    status: 'DECLINED',
  });
}

export const addExperience = async (userId: number, dto: AddExperienceDto) => {
  return await ApiService.post(`users/${userId}/experience`, dto);
}

export const getExperienceById = async (userId: number, experienceId: number) => {
  return await ApiService.get(`users/${userId}/experience/${experienceId}`);
}

export const updateExperience = async (userId: number, experienceId: number, dto: AddExperienceDto) => {
  return await ApiService.put(`users/${userId}/experience/${experienceId}`, dto);
}

export const deleteExperience = async (userId: number, experienceId: number) => {
  return await ApiService.delete(`users/${userId}/experience/${experienceId}`);
}

export const addEducation = async (userId: number, dto: AddEducationDto) => {
  return await ApiService.post(`users/${userId}/education`, dto);
}

export const updateEducation = async (userId: number, educationId: number, dto: AddEducationDto) => {
  return await ApiService.put(`users/${userId}/education/${educationId}`, dto);
}

export const deleteEducation = async (userId: number, educationId: number) => {
  return await ApiService.delete(`users/${userId}/education/${educationId}`);
}

export const getEducationById = async (userId: number, educationId: number) => {
  return await ApiService.get(`users/${userId}/education/${educationId}`);
}

export const updateReimbursement = async (userId: number, dto: UpdateReimbursementDto) => {
  return await ApiService.put(`users/${userId}/reimbursement`, dto);
}

export const deleteReimbursement = async (userId: number) => {
  return await ApiService.delete(`users/${userId}/reimbursement`);
}

export const updateProfile = async (userId: number, dto: UpdateProfileDto) => {
  return await ApiService.put(`users/${userId}`, dto);
}

export const updateProfilePicture = async (userId: number, formData: FormData) => {
  const { data } = await ApiService.postFormData(`users/${userId}/media`, formData);
  return data;
}
