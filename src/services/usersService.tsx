import { ApiService } from "./apiService";
import { UpdateProfileDto } from "src/types/dto/UpdateProfileDto";

export const updateProfile = async (dto: UpdateProfileDto) => {
  return await ApiService.patch(`users/me/profile`, dto);
}