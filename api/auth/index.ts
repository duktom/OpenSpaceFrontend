import { getToken, useGetTokenQuery } from './get-token';
import { AUTH_KEYS } from './keys';
import { login, useLoginMutation } from './login';
import { logout, useLogoutMutation } from './logout';
import { registerCompany, useRegisterCompanyMutation } from './register-company';
import { registerUser, useRegisterUserMutation } from './register-user';

const AUTH_QUERIES = {
  useGetToken: useGetTokenQuery,
};

const AUTH_MUTATIONS = {
  useLogin: useLoginMutation,
  useLogout: useLogoutMutation,
  useRegisterUser: useRegisterUserMutation,
  useRegisterCompany: useRegisterCompanyMutation,
};

export const AUTH_API = {
  getToken,
  login,
  logout,
  registerUser,
  registerCompany,
  keys: AUTH_KEYS,
  queries: AUTH_QUERIES,
  mutations: AUTH_MUTATIONS,
} as const;
