import { getDateOrNull } from '@/helpers/get-date-or-null';
import {
  Account,
  AccountDtoSchema,
  LoginBody,
  LoginDataSchema,
  RegisterCompanyBody,
  RegisterCompanyDataSchema,
  RegisterUserBody,
  RegisterUserDataSchema,
} from './account.types';

export const AccountDtoToEntitySchema = AccountDtoSchema.transform(
  (data) =>
    ({
      ...data,
      isVerified: data.is_verified,
      creationDate: new Date(data.creation_date),
      expDate: getDateOrNull(data.exp_date),
    }) satisfies Account
);

export const LoginDataToDtoSchema = LoginDataSchema.transform((data) => ({
  body: {
    email: data.email,
    password: data.password,
  } satisfies LoginBody,
}));

export const RegisterCompanyDataToDtoSchema = RegisterCompanyDataSchema.transform((data) => ({
  body: {
    email: data.email,
    password: data.password,
    name: data.name,
    ein: data.ein,
  } satisfies RegisterCompanyBody,
}));

export const RegisterUserDataToDtoSchema = RegisterUserDataSchema.transform((data) => ({
  body: {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    password: data.password,
    birth_date: data.birthDate ? data.birthDate.toISOString() : data.birthDate,
  } satisfies RegisterUserBody,
}));
