import { LoginPhoneDto, PhoneWithCodeDto } from "src/types/dto";
import { ApiService } from "./apiService";
import { ChangePasswordDto } from "src/types/dto/ChangePasswordDto";
import { VerifyEmailDto } from "src/types/dto/VerifyEmailDto";
import { ResetPasswordDto } from "src/types/dto/ResetPasswordDto";
import { RegisterDto } from "src/types/dto/RegisterDto";
import { PhoneDto } from "src/types/dto/PhoneDto";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const refreshToken = async () => {
  try {
    const userStr = await AsyncStorage.getItem('@user');
    const userJson = JSON.parse(userStr as string);
    const { apiToken, refreshToken, role, useAs } = await ApiService.put('auth/token/refresh', {
      refreshToken: userJson.refreshToken
    });

    console.log('refresh', apiToken, refreshToken, role, useAs)
    userJson.apiToken = apiToken;
    userJson.refreshToken = refreshToken;
    userJson.role = role;
    userJson.useAs = useAs;
    await AsyncStorage.setItem('@user', JSON.stringify(userJson));
    return userJson;
  } catch (error) {
    throw error;
  }
}

export const loginWithPhoneCode = async (dto: LoginPhoneDto) => {
  return await ApiService.post('auth/login/mobile', dto);
}

export const sendPhoneLoginVerificationCode = async (dto: PhoneDto) => {
  return await ApiService.post(`auth/mobile/send-login-code`, dto);
}

export const signUpWithPhone = async (dto: PhoneDto) => {
  return await ApiService.post(`auth/register/mobile`, dto);
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

export const resendVerificationCode = async (dto: PhoneDto) => {
  return await ApiService.post(`auth/mobile/resend-code`, dto);
}

export const verifyAccount = async (dto: PhoneWithCodeDto) => {
  return await ApiService.post(`auth/mobile/verify`, dto);
}

export const isEmailAvailable = async (email: string) => {
  const { data } = await ApiService.get(`users/check-email?email=${email}`);
  return data;
}

export const deleteAccount = async (userId: number) => {
  return await ApiService.delete(`users/${userId}`);
}

export const registerForPushNotifications = async (token: string) => {
  return await ApiService.post(`fcm/register`, {
    token
  });
}

export const unRegisterforPushNotifications = async () => {
  return await ApiService.delete(`fcm/unregister`);
}
