import { useMutation, useQuery } from 'react-query';
import { PhoneDto } from 'src/types/dto';
import * as teamService from 'src/services/teamService';
import { ListInvitationsDto } from 'src/types/dto/ListInvitationsDto';

const getTeam = async (userId: string) => {
    return await teamService.getTeam(userId);
}

const sendTeamInvite = async ({ userId, teamId, dto }: {
    userId: string,
    teamId: string,
    dto: PhoneDto,
}) => {
    return await teamService.sendTeamInvite(userId, teamId, dto);
}

const getTeamInvitations = async (dto: ListInvitationsDto) => {
    return await teamService.getTeamInvitations(dto);
}

// ******************************************************************************************************************************
// ******************************************************************************************************************************

export const useGetTeam = (userId: string, options = {}) => {
    return useQuery({
        queryKey: ['team', userId],
        queryFn: () => getTeam(userId),
        ...options,
    })
}

export const useSendTeamInvite = (onSuccess: any, onError: any, options = {}) => {
    return useMutation(sendTeamInvite, {
        onSuccess,
        onError,
        ...options,
    })
}

export const useGetTeamInvitations = (dto: ListInvitationsDto, options = {}) => {
    return useQuery({
        queryKey: ['teamInvitations', dto],
        queryFn: () => getTeamInvitations(dto),
        keepPreviousData: false,
        ...options,
    })
}