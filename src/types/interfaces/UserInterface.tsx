import { EGender } from "src/enum/EGender";

export interface IUser {
    id: string;
    fullName: string;
    dateOfBirth: string | Date;
    gender: EGender;
    role: string;
    useAs: string;
    avatar: string;
    languageCode: string;
    verified: string;
    apiToken: string;
    refreshToken: string;
}