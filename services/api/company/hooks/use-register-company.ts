import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { useMutation } from '@tanstack/react-query';
import { registerCompany } from '../company.service';
import { RegisterCompanyData } from '../company.types';
import { COMPANY_KEYS } from './company.keys';

export const useRegisterCompanyMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterCompanyData) => registerCompany(data),
    mutationKey: COMPANY_KEYS.registerCompany(),
    onError: getApiErrorMessages,
  });
};
