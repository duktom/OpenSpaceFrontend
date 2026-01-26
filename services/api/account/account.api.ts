import { apiClient } from '../api-client';
import {
  GetTokenResponseSchemaDtoToData,
  LoginResponseSchemaDtoToData,
  LogoutResponseSchemaDtoToData,
} from './account.adapter';
import {
  GetTokenResponse,
  LoginBody,
  LoginBodySchema,
  LoginResponse,
  LogoutResponse,
} from './account.types';

export const getToken = async () => {
  const res = await apiClient.get<GetTokenResponse>('/account/me');
  return GetTokenResponseSchemaDtoToData.parse(res.data);
};

export const login = async (body: LoginBody) => {
  const validatedBody = LoginBodySchema.parse(body);
  const res = await apiClient.post<LoginResponse>('/account/login', validatedBody);
  return LoginResponseSchemaDtoToData.parse(res.data);
};

export const logout = async () => {
  const res = await apiClient.post<LogoutResponse>('/account/logout');
  return LogoutResponseSchemaDtoToData.parse(res.data);
};
