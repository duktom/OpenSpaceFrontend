import { LoginDataToDtoSchema } from './account.adapter';
import * as api from './account.api';
import { LoginData } from './account.types';

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
