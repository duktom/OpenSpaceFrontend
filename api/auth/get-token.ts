import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { ApiError } from '@/types/backend.types';
import { GetTokenResponse, GetTokenResponseSchema } from '@/types/backend/account/token';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from '../axios-instance';
import { AUTH_KEYS } from './keys';

export const getToken = async (config?: AxiosRequestConfig): Promise<GetTokenResponse> => {
  try {
    const { data } = await axiosInstance.get<GetTokenResponse>('/account/me', config);
    return GetTokenResponseSchema.parse(data);
  } catch (error) {
    throw getApiErrorMessages(error);
  }
};

export const useGetTokenQuery = (
  options: Partial<UseQueryOptions<GetTokenResponse, ApiError>> = {}
) => {
  return useQuery({
    queryFn: () => getToken(),
    queryKey: AUTH_KEYS.getToken(),
    retry: false,
    ...options,
  });
};
