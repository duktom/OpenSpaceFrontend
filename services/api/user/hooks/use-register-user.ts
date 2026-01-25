import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../user.service';
import { RegisterUserData } from '../user.types';
import { USER_KEYS } from './user.keys';

export const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterUserData) => registerUser(data),
    mutationKey: USER_KEYS.registerUser(),
    onError: getApiErrorMessages,
  });
};
