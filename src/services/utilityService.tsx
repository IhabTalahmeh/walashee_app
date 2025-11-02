import { ContactUsDto } from "src/types/dto";
import { ApiService } from "./apiService";



export const contactUs = async (payload: ContactUsDto) => {
    return await ApiService.post(`contacts`, payload);
}