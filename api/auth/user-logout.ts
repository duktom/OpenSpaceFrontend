import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { ApiError } from '@/types/backend.types';
import { LogoutResponse, LogoutResponseSchema } from '@/types/backend/account/logout';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { axiosInstance } from '../axios-instance';

export const userLogout = async (): Promise<LogoutResponse> => {
  try {
    const { data } = await axiosInstance.post<LogoutResponse>('/account/logout');
    return LogoutResponseSchema.parse(data);
  } catch (error) {
    throw getApiErrorMessages(error);
  }
};

export const useUserLogout = (
  options: Omit<UseMutationOptions<LogoutResponse, ApiError>, 'mutationFn' | 'onError'> = {}
) => {
  return useMutation({
    mutationFn: userLogout,
    onError: getApiErrorMessages,
    mutationKey: ['user', 'logout'],
    ...options,
  });
};
