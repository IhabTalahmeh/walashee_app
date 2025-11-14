import { RequestToJoinATeamDto } from "src/types/dto/RequestToJoinATeamDto";
import { ApiService } from "./apiService";
import { getUseAs } from "./localStorageService";


export const requestToJoinATeam = async (userId: string, invitationId: string, dto: RequestToJoinATeamDto) => {
    try {
        const path = await getUseAs();
        const url = `${path}/${userId}/invitations/${invitationId}/requests`;

        const { filePath, ...restData } = dto;

        let payload: any = restData;
        let config: any = {};

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

        const response = await ApiService.postFormData(url, payload, config);
        return response;
    } catch (error) {
        console.error('Failed to request to join team:', error);
        throw error;
    }
}