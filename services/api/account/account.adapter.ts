import { getDateOrNull } from '@/helpers/get-date-or-null';
import {
  Account,
  AccountDtoSchema,
  GetMeResponseSchema,
  LoginBody,
  LoginDataSchema,
  LoginResponseSchema,
  LogoutResponseSchema,
} from './account.types';

export const AccountDtoToEntitySchema = AccountDtoSchema.transform(
  (data) =>
    ({
      ...data,
      isVerified: data.is_verified,
      createdAt: new Date(data.created_at),
      expDate: getDateOrNull(data.exp_date),
    }) satisfies Account
);

export const GetMeResponseSchemaDtoToData = GetMeResponseSchema.transform((data) => ({
  accountType: data.account_type,
  accessToken: data.access_token,
  message: data.message,
}));

export const LoginDataToDtoSchema = LoginDataSchema.transform((data) => ({
  body: {
    email: data.email,
    password: data.password,
  } satisfies LoginBody,
}));
export const LoginResponseSchemaDtoToData = LoginResponseSchema.transform((data) => ({
  accessToken: data.access_token,
  message: data.message,
}));

export const LogoutResponseSchemaDtoToData = LogoutResponseSchema.transform((data) => ({
  message: data.message,
}));
