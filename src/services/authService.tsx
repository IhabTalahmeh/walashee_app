import { LoginDto, LoginPhoneDto } from "src/types/dto";
import { ApiService } from "./apiService";
import { ChangePasswordDto } from "src/types/dto/ChangePasswordDto";
import { VerifyEmailDto } from "src/types/dto/VerifyEmailDto";
import { ResetPasswordDto } from "src/types/dto/ResetPasswordDto";
import { RegisterDto } from "src/types/dto/RegisterDto";
import { VerifyAccountDto } from "src/types/dto/VerifyAccountDto";
import { SendPhoneVerificationCodeDto } from "src/types/dto/SendPhoneVerificationCodeDto";

export const login = async (credentials: LoginPhoneDto) => {
  try {
    return await ApiService.post('login', credentials);
  } catch (error) {
    throw error;
  }
}

export const logout = async () => {
  return await ApiService.post(`logout`, {});
}

export const changePassword = async (userId: number, dto: ChangePasswordDto) => {
  return await ApiService.post(`users/${userId}/change_password`, dto);
}

export const forgetPassword = async (email: string) => {
  return await ApiService.post(`forget_password`, {
    email,
  });
}

export const isValidVerificationCode = async (dto: VerifyEmailDto) => {
  return await ApiService.post(`verify_email`, dto);
}

export const resetPassword = async (dto: ResetPasswordDto) => {
  return await ApiService.post(`reset_password`, dto);
}

export const signup = async (dto: RegisterDto) => {
  return await ApiService.post(`registration`, dto);
}

export const resendVerificationCode = async (dto: SendPhoneVerificationCodeDto) => {
  return await ApiService.post(`auth/mobile/resend-code`, dto);
}

export const verifyAccount = async (dto: VerifyAccountDto, userId: number) => {
  return await ApiService.post(`users/${userId}/verification`, dto);
}

export const isEmailAvailable = async (email: string) => {
  const { data } = await ApiService.get(`users/check-email?email=${email}`);
  return data;
}

export const deleteAccount = async (userId: number) => {
  return await ApiService.delete(`users/${userId}`);
}