import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { useMutation } from '@tanstack/react-query';
import { registerCompany } from '../account.service';
import { RegisterCompanyData } from '../account.types';
import { ACCOUNT_KEYS } from './account.keys';

export const useRegisterCompanyMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterCompanyData) => registerCompany(data),
    mutationKey: ACCOUNT_KEYS.registerCompany(),
    onError: getApiErrorMessages,
  });
};
