import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../account.service';
import { ACCOUNT_KEYS } from './account.keys';

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => logout(),
    mutationKey: ACCOUNT_KEYS.logout(),
    onError: getApiErrorMessages,
  });
};
