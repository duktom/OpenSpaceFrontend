import { useRegisterUserMutation } from '../../user/hooks/use-register-user';
import { useGetAllUsersQuery } from './use-get-all-users';
import { useGetUserByIdQuery } from './use-get-user-by-id';
import { USER_KEYS } from './user.keys';

export const queries = {
  useGetUserById: useGetUserByIdQuery,
  useGetAllUsers: useGetAllUsersQuery,
};

export const mutations = {
  useRegisterUser: useRegisterUserMutation,
};

export const keys = USER_KEYS;
