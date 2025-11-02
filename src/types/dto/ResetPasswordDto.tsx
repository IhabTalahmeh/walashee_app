export interface ResetPasswordDto {
    email: string;
    new_password: string;
    verification_code: string;
}