import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { ApiError } from '@/types/backend.types';
import { LoginResponse, LoginResponseSchema } from '@/types/backend/account/login';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { axiosInstance } from '../axios-instance';

export const fetchCurrentUser = async (): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.get<LoginResponse>('/account/me');
    return LoginResponseSchema.parse(data);
  } catch (error) {
    throw getApiErrorMessages(error);
  }
};

export const useFetchCurrentUser = (
  options: Partial<UseQueryOptions<LoginResponse, ApiError>> = {}
) => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: fetchCurrentUser,
    retry: false,
    ...options,
  });
};
