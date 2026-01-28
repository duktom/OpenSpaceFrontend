import { LoginDataToDtoSchema } from './account.adapter';
import * as api from './account.api';
import { LoginData } from './account.types';

export const getMe = async () => {
  return await api.getMe();
};

export const login = async (data: LoginData) => {
  const { body } = LoginDataToDtoSchema.parse(data);
  return await api.login(body);
};

export const logout = async () => {
  return await api.logout();
};
