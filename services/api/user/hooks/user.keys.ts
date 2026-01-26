import { ACCOUNT_KEYS } from '@/services/api/account/hooks/account.keys';
import { GetUserByIdParams } from '../user.types';

export const USER_KEYS = {
  all: [...ACCOUNT_KEYS.all, 'user'] as const,
  registerUser: () => [...USER_KEYS.all, 'register'] as const,
  getUserById: (params: GetUserByIdParams) => [...USER_KEYS.all, 'get', params] as const,
  getAllUsers: () => [...USER_KEYS.all, 'get'] as const,
} as const;
