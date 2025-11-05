import { EGender } from "src/enum/EGender";

export interface UpdateProfileDto {
    fullName: string;
    dateOfBirth: string | Date;
    gender: string;
}