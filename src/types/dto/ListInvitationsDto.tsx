import { EInvitationType } from "src/enum/EInvitationType";
import { ListDto } from "./ListDto";

export interface ListInvitationsDto extends ListDto {
    type: EInvitationType;
    userId: string;
    teamId?: string;
}