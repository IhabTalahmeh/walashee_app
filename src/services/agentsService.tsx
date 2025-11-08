import { PhoneDto } from "src/types/dto";
import { ApiService } from "./apiService";
import { EInvitationType } from "src/enum/EInvitationType";
import { ListDto } from "src/types/dto/ListDto";
import { ListInvitationsDto } from "src/types/dto/ListInvitationsDto";


export const inviteAgent = async (userId: string, teamId: string, dto: PhoneDto) => {
    console.log('dto', userId, teamId, dto);
    const result = await ApiService.post(`agents/${userId}/teams/${teamId}/invitations`, dto);
    console.log('result', result);
}

export const getTeam = async (userId: string) => {
    return await ApiService.get(`agents/${userId}/teams`);
}

export const getTeamInvitations = async (dto: ListInvitationsDto) => {
    return await ApiService.get(`agents/${dto.userId}/teams/${dto.teamId}/invitations?type=${dto.type}&page=${dto.page}&size=${dto.size}`);
}