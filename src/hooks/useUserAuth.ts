import { useMutation, useQuery } from 'react-query';
import * as authService from '../services/authService';
import { LoginDto, LoginPhoneDto, PhoneDto, PhoneWithCodeDto } from 'src/types/dto';
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

const verifyAccount = async (dto: PhoneWithCodeDto) => {
  return await authService.verifyAccount(dto);
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

export const useSignUpWithPhone = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(signUpWithPhone, {
    onSuccess,
    onError,
    ...options
  })
}

export const useVerifyAccount = (onSuccess: any, onError: any, options = {}) => {
  return useMutation(verifyAccount, {
    onSuccess,
    onError,
    ...options
  })
}