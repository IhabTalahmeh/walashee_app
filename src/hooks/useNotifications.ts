import { ListDto } from "src/types/dto"
import * as notificationsService from 'src/services/notificationsService';
import { useQuery } from "react-query";

const getNotifications = async (dto: ListDto) => {
    return await notificationsService.getNotifications(dto);
}

// ****************************************************************************************
// ****************************************************************************************

export const useGetNotifications = (dto: ListDto, options = {}) => {
    return useQuery({
        queryKey: ['notifications', dto],
        queryFn: () => getNotifications(dto),
        ...options,
    })
}