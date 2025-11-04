import { EGender } from "src/enum/EGender";

export interface UpdateProfileDto {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
}