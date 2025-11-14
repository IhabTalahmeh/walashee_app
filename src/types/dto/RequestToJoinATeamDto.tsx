export interface RequestToJoinATeamDto {
    fullName: string;
    dateOfBirth: string | Date;
    number: string;
    email: string;
    address: string;
    filePath?: string;
}