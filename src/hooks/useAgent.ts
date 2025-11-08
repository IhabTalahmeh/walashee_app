import { PhoneDto } from "src/types/dto";
import * as agentsService from 'src/services/agentsService';
import { useMutation, useQuery } from "react-query";

const getTeam = async (userId: string) => {
    return await agentsService.getTeam(userId);
}

const inviteAgent = async ({ userId, teamId, dto }: {
    userId: string,
    teamId: string,
    dto: PhoneDto,
}) => {
    return await agentsService.inviteAgent(userId, teamId, dto);
}


// *********************************************************************
// *********************************************************************

export const useGetAgentTeam = (userId: string, options = {}) => {
    return useQuery({
        queryKey: ['team', userId],
        queryFn: () => getTeam(userId),
        ...options,
    })
}

export const useInviteAgent = (onSuccess: any, onError: any, options = {}) => {
    return useMutation(inviteAgent, {
        onSuccess,
        onError,
        ...options,
    })
}