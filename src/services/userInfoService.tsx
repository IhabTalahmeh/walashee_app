import { ApiService } from "./apiService";

export const getUserHospitals = async (userId: number) => {
  return await ApiService.get(`users/${userId}/current_hospitals`);
}