import { User } from '@/types/backend.types';
import { mockUser } from './mock-user';

export const fetchUser = async (): Promise<User | null> => {
  console.info('Fake fetch | mock user returned');

  return mockUser;
};
