import { ACCOUNT_KEYS } from './account.keys';
import { useGetTokenQuery } from './use-get-token';
import { useLoginMutation } from './use-login';
import { useLogoutMutation } from './use-logout';
import { useRegisterCompanyMutation } from './use-register-company';
import { useRegisterUserMutation } from './use-register-user';

export const queries = {
  useGetToken: useGetTokenQuery,
};

export const mutations = {
  useLogin: useLoginMutation,
  useLogout: useLogoutMutation,
  useRegisterCompany: useRegisterCompanyMutation,
  useRegisterUser: useRegisterUserMutation,
};

export const keys = ACCOUNT_KEYS;
