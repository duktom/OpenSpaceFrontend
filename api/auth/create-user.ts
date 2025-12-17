import { RegisterCredentials } from '@/types/backend/account/register';

export const createUser = async (userData: RegisterCredentials): Promise<void> => {
  console.info('Fake create user | nothing happen');
};
