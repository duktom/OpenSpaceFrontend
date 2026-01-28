import { getDateOrNull } from '@/helpers/get-date-or-null';
import {
  Account,
  AccountDtoSchema,
  LoginBody,
  LoginDataSchema,
  LoginResponseSchema,
  LogoutResponseSchema,
} from './account.types';
import { GetMeResponseSchema } from './me.types';
import { CompanyDtoToEntitySchema } from '../company/company.adapter';
import { UserDtoToEntitySchema } from '../user/user.adapter';

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
  accountId: data.account_id,
  accountType: data.account_type,
  user: data.user ? UserDtoToEntitySchema.parse(data.user) : null,
  company: data.company ? CompanyDtoToEntitySchema.parse(data.company) : null,
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
