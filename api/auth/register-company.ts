import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { sleep } from '@/helpers/sleep';
import { ApiError } from '@/types/backend.types';
import {
  RegisterCompanyCredentials,
  RegisterCompanyResponse,
  RegisterCompanyResponseSchema,
} from '@/types/backend/account/register-company';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { AUTH_KEYS } from './keys';

export const registerCompany = async (
  companyData: RegisterCompanyCredentials,
  config?: AxiosRequestConfig
): Promise<RegisterCompanyResponse> => {
  try {
    // const { data } = await axiosInstance.post<RegisterCompanyResponse>('/account/register/company', companyData);
    await sleep(3_000);
    const data: RegisterCompanyResponse = { message: 'FAKE MESSAGE' };
    console.info('Fake register company | fake message returned');
    return RegisterCompanyResponseSchema.parse(data);
  } catch (error) {
    throw getApiErrorMessages(error);
  }
};

export const useRegisterCompanyMutation = (
  options: Omit<
    UseMutationOptions<
      RegisterCompanyResponse,
      ApiError,
      RegisterCompanyCredentials,
      RegisterCompanyResponse
    >,
    'mutationFn' | 'onError'
  > = {}
) => {
  return useMutation({
    mutationFn: (data) => registerCompany(data),
    mutationKey: AUTH_KEYS.registerCompany(),
    onError: getApiErrorMessages,
    ...options,
  });
};
