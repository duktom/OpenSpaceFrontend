import { CreateUser, User } from '@/types/backend.types';
import { mockUser } from './mock-user';

export const createUser = async (userData: CreateUser): Promise<User | null> => {
  console.info('Fake create user | mock user returned');

  return mockUser;
};
