import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { useMutation } from '@tanstack/react-query';
import { registerCompany } from '../account.service';
import { RegisterCompanyBody } from '../account.types';
import { ACCOUNT_KEYS } from './account.keys';

export const useRegisterCompanyMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterCompanyBody) => registerCompany(data),
    mutationKey: ACCOUNT_KEYS.registerCompany(),
    onError: getApiErrorMessages,
  });
};
