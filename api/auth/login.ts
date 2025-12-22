import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { ApiError } from '@/types/backend.types';
import {
  LoginCredentials,
  LoginResponse,
  LoginResponseSchema,
} from '@/types/backend/account/login';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from '../axios-instance';
import { AUTH_KEYS } from './keys';

export const login = async (
  userData: LoginCredentials,
  config?: AxiosRequestConfig
): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>('/account/login', userData, config);
    return LoginResponseSchema.parse(data);
  } catch (error) {
    throw getApiErrorMessages(error);
  }
};

export const useLoginMutation = (
  options: Omit<
    UseMutationOptions<LoginResponse, ApiError, LoginCredentials>,
    'mutationFn' | 'onError'
  > = {}
) => {
  return useMutation({
    mutationFn: (data) => login(data),
    mutationKey: AUTH_KEYS.login(),
    onError: getApiErrorMessages,
    ...options,
  });
};
