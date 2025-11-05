import { EGender } from "src/enum/EGender";

export interface UpdateProfileDto {
    fullName: string;
    dateOfBirth: Date;
    gender: string;
}