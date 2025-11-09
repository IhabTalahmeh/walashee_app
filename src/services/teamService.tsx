import { PhoneDto } from "src/types/dto";
import { ApiService } from "./apiService";
import { EInvitationType } from "src/enum/EInvitationType";
import { ListDto } from "src/types/dto/ListDto";
import { ListInvitationsDto } from "src/types/dto/ListInvitationsDto";
import { getUseAs } from "./localStorageService";
import { CreateTeamDto } from "src/types/dto/CreateTeamDto";


export const sendTeamInvite = async (userId: string, teamId: string, dto: PhoneDto) => {
    const path = await getUseAs();
    return await ApiService.post(`${path}/${userId}/teams/${teamId}/invitations`, dto);
}

export const getTeam = async (userId: string) => {
    const path = await getUseAs();
    return await ApiService.get(`${path}/${userId}/teams`);
}

export const getTeamInvitations = async (dto: ListInvitationsDto) => {
    const path = await getUseAs();
    console.log('url is', `${path}/${dto.userId}/teams/${dto.teamId}/invitations?type=${dto.type}&page=${dto.page}&size=${dto.size}`);
    return await ApiService.get(`${path}/${dto.userId}/teams/${dto.teamId}/invitations?type=${dto.type}&page=${dto.page}&size=${dto.size}`);
}

export const createTeam = async (userId: string, dto: CreateTeamDto) => {
    try {
        const path = await getUseAs();
        const url = `${path}/${userId}/teams`;

        const { filePath, ...restData } = dto;

        let payload: any = restData;
        let config: any = {};

        if (filePath) {
            const formData = new FormData();

            Object.entries(restData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            formData.append('file', {
                uri: filePath,
                type: 'image/jpeg',
                name: 'photo.jpg',
            } as any);

            payload = formData;
            config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };
        }

        const response = await ApiService.post(url, payload, config);
        return response;
    } catch (error) {
        console.error('Failed to create team:', error);
        throw error;
    }
};


export const updateTeam = async (userId: string, dto: CreateTeamDto) => {
    const path = await getUseAs();
    const formData = new FormData();

    formData.append('file', {
        uri: dto.filePath,
        type: 'image/jpeg',
        name: 'photo.jpg',
    });


    const { filePath, ...restData } = dto;
    Object.entries(restData).forEach(([key, value]) => {
        formData.append(key, String(value));
    });

    return await ApiService.put(`${path}/${userId}/teams`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
