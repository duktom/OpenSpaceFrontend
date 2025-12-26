import * as api from './account.api';
import { LoginBody, RegisterCompanyBody, RegisterUserBody } from './account.types';

export const getToken = async () => {
  return await api.getToken();
};

export const login = async (body: LoginBody) => {
  return await api.login(body);
};

export const logout = async () => {
  return await api.logout();
};

export const registerCompany = async (body: RegisterCompanyBody) => {
  return await api.registerCompany(body);
};

export const registerUser = async (body: RegisterUserBody) => {
  return await api.registerUser(body);
};
