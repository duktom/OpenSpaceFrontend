import { z } from 'zod';

const AccountTypeSchema = z.enum(['applicant', 'recruiter', 'admin']);
export const AuthTokenSchema = z.string().trim().nonempty();

export const BaseAccountSchema = z.object({
  id: z.number().min(1),
  email: z.email(),
  type: AccountTypeSchema.nullable(),
  isVerified: z.boolean(),
  role: z.string().trim().nullable(),
});

// DTO
export const AccountDtoSchema = BaseAccountSchema.extend({
  creationDate: z.iso.datetime(),
  expDate: z.iso.datetime().nullable(),
});
export type AccountDto = z.infer<typeof AccountDtoSchema>;

// FE Entity
export const AccountSchema = BaseAccountSchema.extend({
  creationDate: z.date(),
  expDate: z.date().nullable(),
});
export type Account = z.infer<typeof AccountSchema>;

// Get token
export const GetTokenResponseSchema = z.object({
  access_token: AuthTokenSchema,
  message: z.string().trim().nonempty(),
});
export type GetTokenResponse = z.infer<typeof GetTokenResponseSchema>;

// Login
const LoginBaseSchema = AccountSchema.pick({ email: true }).extend({
  password: z.string().trim().nonempty('Please enter a password').min(8, 'At least 8 characters'),
});
export const LoginBodySchema = LoginBaseSchema;
export type LoginBody = z.infer<typeof LoginBodySchema>;
export const LoginResponseSchema = z.object({
  access_token: AuthTokenSchema,
  message: z.string().trim().nonempty(),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Logout
export const LogoutResponseSchema = z.object({
  message: z.string().trim().nonempty(),
});
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;

// Register Company
export const RegisterCompanyBodySchema = LoginBaseSchema.extend({
  confirmPassword: z.string().trim().nonempty('Please confirm your password'),
  name: z.string().trim().nonempty('Name is required'),
  ein: z.string().trim().nonempty('EIN is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
export type RegisterCompanyBody = z.infer<typeof RegisterCompanyBodySchema>;
export const RegisterCompanyResponseSchema = z.object({
  message: z.string().trim().nonempty(),
});
export type RegisterCompanyResponse = z.infer<typeof RegisterCompanyResponseSchema>;

// Register User
export const RegisterUserBodySchema = LoginBaseSchema.extend({
  confirmPassword: z.string().trim().nonempty('Please confirm your password'),
  firstName: z.string().trim().nonempty('First name is required'),
  lastName: z.string().trim().nonempty('Last name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
export type RegisterUserBody = z.infer<typeof RegisterUserBodySchema>;
export const RegisterUserResponseSchema = z.object({
  message: z.string().trim().nonempty(),
});
export type RegisterUserResponse = z.infer<typeof RegisterUserResponseSchema>;
