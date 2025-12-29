import { apiClient } from '../api-client';
import {
  GetTokenResponse,
  GetTokenResponseSchema,
  LoginBody,
  LoginBodySchema,
  LoginResponse,
  LoginResponseSchema,
  LogoutResponse,
  LogoutResponseSchema,
  RegisterCompanyBody,
  RegisterCompanyBodySchema,
  RegisterCompanyResponse,
  RegisterCompanyResponseSchema,
  RegisterUserBody,
  RegisterUserBodySchema,
  RegisterUserResponse,
  RegisterUserResponseSchema,
} from './account.types';

export const getToken = async (): Promise<GetTokenResponse> => {
  const res = await apiClient.get<GetTokenResponse>('/account/me');
  return GetTokenResponseSchema.parse(res.data);
};

export const login = async (body: LoginBody): Promise<LoginResponse> => {
  const validatedBody = LoginBodySchema.parse(body);
  const res = await apiClient.post<LoginResponse>('/account/login', validatedBody);
  return LoginResponseSchema.parse(res.data);
};

export const logout = async (): Promise<LogoutResponse> => {
  const res = await apiClient.post<LogoutResponse>('/account/logout');
  return LogoutResponseSchema.parse(res.data);
};

export const registerCompany = async (
  body: RegisterCompanyBody
): Promise<RegisterCompanyResponse> => {
  const validatedBody = RegisterCompanyBodySchema.parse(body);
  const res = await apiClient.post<RegisterCompanyResponse>(
    '/account/register/company',
    validatedBody
  );
  return RegisterCompanyResponseSchema.parse(res.data);
};

export const registerUser = async (body: RegisterUserBody): Promise<RegisterUserResponse> => {
  const validatedBody = RegisterUserBodySchema.parse(body);
  const res = await apiClient.post<RegisterUserResponse>('/account/register/user', validatedBody);
  return RegisterUserResponseSchema.parse(res.data);
};
