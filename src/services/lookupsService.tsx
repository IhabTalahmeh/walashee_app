import { ApiService } from "./apiService";

export const getCountries = async () => {
  const { data } = await ApiService.get(`lookups/countries`);
  return data;
}