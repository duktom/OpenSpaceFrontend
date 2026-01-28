import { useRegisterCompanyMutation } from '../../company/hooks/use-register-company';
import { useRegisterUserMutation } from '../../user/hooks/use-register-user';
import { ACCOUNT_KEYS } from './account.keys';
import { useGetMeQuery } from './use-get-me';
import { useLoginMutation } from './use-login';
import { useLogoutMutation } from './use-logout';

export const queries = {
  useGetMe: useGetMeQuery,
};

export const mutations = {
  useLogin: useLoginMutation,
  useLogout: useLogoutMutation,
  useRegisterCompany: useRegisterCompanyMutation,
  useRegisterUser: useRegisterUserMutation,
};

export const keys = ACCOUNT_KEYS;
