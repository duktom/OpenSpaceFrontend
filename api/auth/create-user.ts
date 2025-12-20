import { RegisterUserCredentials } from '@/types/backend/account/register-user';

export const createUser = async (userData: RegisterUserCredentials): Promise<void> => {
  console.info('Fake create user | nothing happen');
};
