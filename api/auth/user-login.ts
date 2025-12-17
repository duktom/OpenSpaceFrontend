import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { ApiError } from '@/types/backend.types';
import {
  LoginCredentials,
  LoginResponse,
  LoginResponseSchema,
} from '@/types/backend/account/login';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { axiosInstance } from '../axios-instance';

export const userLogin = async (userData: LoginCredentials): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>('/account/login', userData);
    return LoginResponseSchema.parse(data);
  } catch (error) {
    throw getApiErrorMessages(error);
  }
};

export const useUserLogin = (
  options: Omit<
    UseMutationOptions<LoginResponse, ApiError, LoginCredentials>,
    'mutationFn' | 'onError'
  > = {}
) => {
  return useMutation({
    mutationFn: userLogin,
    onError: getApiErrorMessages,
    mutationKey: ['user', 'login'],
    ...options,
  });
};
