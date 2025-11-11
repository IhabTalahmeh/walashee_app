import { ListDto } from "src/types/dto";
import { ApiService } from "./apiService";


export const getNotifications = async (dto: ListDto) => {
    return await ApiService.get(`notifications?page=${dto.page}&size=${dto.size}`);
}