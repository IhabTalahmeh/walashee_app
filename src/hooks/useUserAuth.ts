import { useMutation, useQuery } from 'react-query';
import * as authService from '../services/authService';
import { LoginDto, LoginPhoneDto, PhoneDto } from 'src/types/dto';
import { ChangePasswordDto } from 'src/types/dto/ChangePasswordDto';
import { VerifyEmailDto } from 'src/types/dto/VerifyEmailDto';
import { ResetPasswordDto } from 'src/types/dto/ResetPasswordDto';
import { RegisterDto } from 'src/types/dto/RegisterDto';
import { VerifyAccountDto } from 'src/types/dto/VerifyAccountDto';

const loginWithPhoneCode = async (dto: LoginPhoneDto) => {
  return await authService.loginWithPhoneCode(dto);
}

const sendPhoneLoginVerificationCode = async (dto: PhoneDto) => {
  return await authService.sendPhoneLoginVerificationCode(dto);
}

const signUpWithPhone = async (dto: PhoneDto) => {
  return await authService.signUpWithPhone(dto);
}

const changePassword = async ({ userId, dto }: {
  userId: number,
  dto: ChangePasswordDto
}) => {
  return await authService.changePassword(userId, dto);
}

const forgetPassword = async (email: string) => {
  return await authService.forgetPassword(email);
}

const verifyEmail = async (dto: VerifyEmailDto) => {
  return await authService.isValidVerificationCode(dto);
}

const resetPassword = async (dto: ResetPasswordDto) => {
  return await authService.resetPassword(dto);
}

const resendVerificationCode = async (dto: PhoneDto) => {
  return await authService.resendVerificationCode(dto);
}

const verifyAccount = async ({ userId, dto }: {
  userId: number,
  dto: VerifyAccountDto,
}) => {
  return await authService.verifyAccount(dto, userId);
}

const deleteAccount = async (userId: number) => {
  return await authService.deleteAccount(userId);
}

// ************************************************************************
// ************************************************************************



export const useLoginWithPhoneCode = (onSuccess: any, onError: any) => {
  return useMutation(loginWithPhoneCode, {
    onSuccess,
    onError
  });
}

export const useSendPhoneLoginVerificationCode = (onSuccess: any, onError: any) => {
  return useMutation(sendPhoneLoginVerificationCode, {
    onSuccess,
    onError
  });
}

export const useChangePassword = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(changePassword, {
    onSuccess,
    onError,
    ...options
  })
}

export const useForgetPassword = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(forgetPassword, {
    onSuccess,
    onError,
    ...options
  })
}

export const useVerifyEmail = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(verifyEmail, {
    onSuccess,
    onError,
    ...options
  })
}

export const useResetPassword = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(resetPassword, {
    onSuccess,
    onError,
    ...options
  })
}

export const useSignUpWithPhone = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(signUpWithPhone, {
    onSuccess,
    onError,
    ...options
  })
}

export const useResendVerificationCode = (dto: PhoneDto, options = {}) => {
  return useQuery({
    queryKey: ['verificationCode'],
    queryFn: () => resendVerificationCode(dto),
    ...options,
  })
}

export const useVerifyAccount = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(verifyAccount, {
    onSuccess,
    onError,
    ...options
  })
}

export const useDeleteAccount = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(deleteAccount, {
    onSuccess,
    onError,
    ...options
  })
}