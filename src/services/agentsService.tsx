import { PhoneDto } from "src/types/dto";
import { ApiService } from "./apiService";


export const inviteAgent = async (userId: string, teamId: string, dto: PhoneDto) => {
    console.log('dto', userId, teamId, dto);
    const result = await ApiService.post(`agents/${userId}/teams/${teamId}/invitations`, dto);
    console.log('result', result);
}

export const getTeam = async (userId: string) => {
    return await ApiService.get(`agents/${userId}/teams`);
}