import { PhoneDto } from "src/types/dto";
import { ApiService } from "./apiService";
import { EInvitationType } from "src/enum/EInvitationType";
import { ListDto } from "src/types/dto/ListDto";
import { ListInvitationsDto } from "src/types/dto/ListInvitationsDto";
import { getUseAs } from "./localStorageService";


export const sendTeamInvite = async (userId: string, teamId: string, dto: PhoneDto) => {
    const path = getUseAs();
    return await ApiService.post(`${path}/${userId}/teams/${teamId}/invitations`, dto);
}

export const getTeam = async (userId: string) => {
    const path = getUseAs();
    return await ApiService.get(`${path}/${userId}/teams`);
}

export const getTeamInvitations = async (dto: ListInvitationsDto) => {
    const path = getUseAs();
    return await ApiService.get(`${path}/${dto.userId}/teams/${dto.teamId}/invitations?type=${dto.type}&page=${dto.page}&size=${dto.size}`);
}