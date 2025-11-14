export interface RequestToJoinATeamDto {
    fullName: string;
    dateOfBirth: string | Date;
    docNumber: string;
    email: string;
    address: string;
    filePath?: string;
}