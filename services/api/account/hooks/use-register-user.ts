import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../account.service';
import { RegisterUserBody } from '../account.types';
import { ACCOUNT_KEYS } from './account.keys';

export const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterUserBody) => registerUser(data),
    mutationKey: ACCOUNT_KEYS.registerUser(),
    onError: getApiErrorMessages,
  });
};
