import { EPermission } from "src/enum/EPermission";

export interface InviteUserDto {
    email: string;
    permission: EPermission
}

export interface InviteUsersDto {
    users: InviteUserDto[]
}

export interface UpdatePermissionDto {
    end_user_id: number;
    permission: EPermission
}