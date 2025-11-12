import { useMutation, useQuery } from 'react-query';
import { CreateTeamDto, ListDto, PhoneDto } from 'src/types/dto';
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

const getCustomerTeamInvitations = async (dto: ListInvitationsDto) => {
    return await teamService.getCustomerTeamInvitations(dto.userId, dto);
}

const cancelTeamInvitation = async ({ userId, teamId, invitationId }: {
    userId: string,
    teamId: string,
    invitationId: string,
}) => {
    return await teamService.cancelTeamInvitations(userId, teamId, invitationId);
}

const createTeam = async ({ userId, dto }: {
    userId: string,
    dto: CreateTeamDto,
}) => {
    return await teamService.createTeam(userId, dto);
}

const updateTeam = async ({ userId, dto }: {
    userId: string,
    dto: CreateTeamDto,
}) => {
    return await teamService.updateTeam(userId, dto);
}

const rejectTeamInvitation = async ({ userId, invitationId }: {
    userId: string,
    invitationId: string,
}) => {
    return await teamService.rejectTeamInvitation(userId, invitationId);
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

export const useGetCustomerTeamInvitations = (dto: ListInvitationsDto, options = {}) => {
    return useQuery({
        queryKey: ['teamInvitations', dto],
        queryFn: () => getCustomerTeamInvitations(dto),
        keepPreviousData: false,
        ...options,
    })
}

export const useCreateTeam = (onSuccess: any, onError: any, options = {}) => {
    return useMutation(createTeam, {
        onSuccess,
        onError,
        ...options,
    })
}

export const useUpdateTeam = (onSuccess: any, onError: any, options = {}) => {
    return useMutation(updateTeam, {
        onSuccess,
        onError,
        ...options,
    })
}

export const useCancelTeamInvitation = (onSuccess: any, onError: any, options = {}) => {
    return useMutation(cancelTeamInvitation, {
        onSuccess,
        onError,
        ...options,
    })
}

export const useRejectTeamInvitation = (onSuccess: any, onError: any, options = {}) => {
    return useMutation(rejectTeamInvitation, {
        onSuccess,
        onError,
        ...options,
    })
}