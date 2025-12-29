import {
  LoginDataToDtoSchema,
  RegisterCompanyDataToDtoSchema,
  RegisterUserDataToDtoSchema,
} from './account.adapter';
import * as api from './account.api';
import { LoginData, RegisterCompanyData, RegisterUserData } from './account.types';

export const getToken = async () => {
  return await api.getToken();
};

export const login = async (data: LoginData) => {
  const { body } = LoginDataToDtoSchema.parse(data);
  return await api.login(body);
};

export const logout = async () => {
  return await api.logout();
};

export const registerCompany = async (data: RegisterCompanyData) => {
  const { body } = RegisterCompanyDataToDtoSchema.parse(data);
  return await api.registerCompany(body);
};

export const registerUser = async (data: RegisterUserData) => {
  const { body } = RegisterUserDataToDtoSchema.parse(data);
  return await api.registerUser(body);
};
