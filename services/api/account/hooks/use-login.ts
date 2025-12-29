import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { useMutation } from '@tanstack/react-query';
import { login } from '../account.service';
import { LoginData } from '../account.types';
import { ACCOUNT_KEYS } from './account.keys';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    mutationKey: ACCOUNT_KEYS.login(),
    onError: getApiErrorMessages,
  });
};
