import { useMutation, useQuery } from 'react-query';
import * as authService from '../services/authService';
import { LoginDto } from 'src/types/dto';
import { ChangePasswordDto } from 'src/types/dto/ChangePasswordDto';
import { VerifyEmailDto } from 'src/types/dto/VerifyEmailDto';
import { ResetPasswordDto } from 'src/types/dto/ResetPasswordDto';
import { RegisterDto } from 'src/types/dto/RegisterDto';
import { VerifyAccountDto } from 'src/types/dto/VerifyAccountDto';

const login = async (credentials: LoginDto) => {
  const result = await authService.login(credentials);
  if (result.status_code == 200) {
    result.data.verified = true;
  } else if (result.status_code == 603) {
    result.data.verified = false;
  }
  return await result;
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

const signup = async (dto: RegisterDto) => {
  return await authService.signup(dto);
}

const resendVerificationCode = async (userId: number) => {
  return await authService.resendVerificationCode(userId);
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



export const useLogin = (onSuccess: any, onError: any) => {
  return useMutation(login, {
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

export const useSignUp = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(signup, {
    onSuccess,
    onError,
    ...options
  })
}

export const useResendVerificationCode = (userId: number, options = {}) => {
  return useQuery({
    queryKey: ['verificationCode'],
    queryFn: () => resendVerificationCode(userId),
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