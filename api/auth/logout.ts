import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { ApiError } from '@/types/backend.types';
import { LogoutResponse, LogoutResponseSchema } from '@/types/backend/account/logout';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from '../axios-instance';
import { AUTH_KEYS } from './keys';

export const logout = async (config?: AxiosRequestConfig): Promise<LogoutResponse> => {
  try {
    const { data } = await axiosInstance.post<LogoutResponse>('/account/logout', config);
    return LogoutResponseSchema.parse(data);
  } catch (error) {
    throw getApiErrorMessages(error);
  }
};

export const useLogoutMutation = (
  options: Omit<UseMutationOptions<LogoutResponse, ApiError>, 'mutationFn' | 'onError'> = {}
) => {
  return useMutation({
    mutationFn: () => logout(),
    mutationKey: AUTH_KEYS.logout(),
    onError: getApiErrorMessages,
    ...options,
  });
};
