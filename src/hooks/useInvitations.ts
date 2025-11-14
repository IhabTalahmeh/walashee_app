import { RequestToJoinATeamDto } from "src/types/dto/RequestToJoinATeamDto";
import * as teamInvitationsService from 'src/services/teamInvitationsService';
import { useMutation } from "react-query";


const requestToJoinATeam = async ({
    userId,
    invitationId,
    dto,
}: {
    userId: string,
    invitationId: string,
    dto: RequestToJoinATeamDto,
}) => {
    return await teamInvitationsService.requestToJoinATeam(userId, invitationId, dto);
};



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


export const useRequestToJoinATeam = (onSuccess: any, onError: any, options = {}) => {
    return useMutation(requestToJoinATeam, {
        onSuccess,
        onError,
        ...options,
    })
}