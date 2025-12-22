import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { sleep } from '@/helpers/sleep';
import { ApiError } from '@/types/backend.types';
import {
  RegisterUserCredentials,
  RegisterUserResponse,
  RegisterUserResponseSchema,
} from '@/types/backend/account/register-user';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { AUTH_KEYS } from './keys';

export const registerUser = async (
  userData: RegisterUserCredentials,
  config?: AxiosRequestConfig
): Promise<RegisterUserResponse> => {
  try {
    // const { data } = await axiosInstance.post<RegisterUserResponse>('/account/register/user', userData);
    await sleep(3_000);
    const data: RegisterUserResponse = { message: 'FAKE MESSAGE' };
    console.info('Fake register user | fake message returned');
    return RegisterUserResponseSchema.parse(data);
  } catch (error) {
    throw getApiErrorMessages(error);
  }
};

export const useRegisterUserMutation = (
  options: Omit<
    UseMutationOptions<
      RegisterUserResponse,
      ApiError,
      RegisterUserCredentials,
      RegisterUserResponse
    >,
    'mutationFn' | 'onError'
  > = {}
) => {
  return useMutation({
    mutationFn: (data) => registerUser(data),
    mutationKey: AUTH_KEYS.registerUser(),
    onError: getApiErrorMessages,
    ...options,
  });
};
