import { apiClient } from '../api-client';
import {
  GetMeResponseSchemaDtoToData,
  LoginResponseSchemaDtoToData,
  LogoutResponseSchemaDtoToData,
} from './account.adapter';
import {
  GetMeResponse,
  LoginBody,
  LoginBodySchema,
  LoginResponse,
  LogoutResponse,
} from './account.types';

export const getMe = async () => {
  const res = await apiClient.get<GetMeResponse>('/account/me');
  return GetMeResponseSchemaDtoToData.parse(res.data);
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
