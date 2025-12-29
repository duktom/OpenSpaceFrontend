import { z } from 'zod';

const AccountTypeSchema = z.enum(['applicant', 'recruiter', 'admin']);
export const AuthTokenSchema = z.string().trim().nonempty();

// Both FE & BE
const SharedBaseAccountSchema = z.object({
  id: z.number().min(1),
  email: z.email(),
  type: AccountTypeSchema.nullable(),
  role: z.string().trim().nullable(),
});

// DTO
export const AccountDtoSchema = SharedBaseAccountSchema.extend({
  is_verified: z.boolean(),
  profile_img_id: z.number().min(1).nullable(),
  profile_img_link: z.url().nullable(),
  creation_date: z.iso.datetime(),
  exp_date: z.iso.datetime().nullable(),
});
export type AccountDto = z.infer<typeof AccountDtoSchema>;

// FE Entity
export const AccountSchema = SharedBaseAccountSchema.extend({
  isVerified: z.boolean(),
  profileImgId: z.number().min(1).nullable(),
  profileImgLink: z.url().nullable(),
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
// Frontend DATA
export const LoginDataSchema = AccountSchema.pick({ email: true }).extend({
  password: z.string().trim().nonempty('Please enter a password').min(8, 'At least 8 characters'),
});
export type LoginData = z.infer<typeof LoginDataSchema>;

// Login
// Backend DTO'S
export const LoginBodySchema = AccountSchema.pick({ email: true }).extend({
  password: z.string().trim().nonempty('Please enter a password').min(8, 'At least 8 characters'),
});
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
// Frontend DATA
export const RegisterCompanyDataSchema = LoginBodySchema.extend({
  confirmPassword: z.string().trim().nonempty('Please confirm your password'),
  name: z.string().trim().nonempty('Name is required'),
  ein: z
    .string()
    .trim()
    .length(10, 'EIN must be exactly 10 characters')
    .nonempty('EIN is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
export type RegisterCompanyData = z.infer<typeof RegisterCompanyDataSchema>;

// Register Company
// Backend DTO'S
export const RegisterCompanyBodySchema = LoginBodySchema.extend({
  name: z.string().trim().nonempty('Name is required'),
  ein: z
    .string()
    .trim()
    .length(10, 'EIN must be exactly 10 characters')
    .nonempty('EIN is required'),
});
export type RegisterCompanyBody = z.infer<typeof RegisterCompanyBodySchema>;
export const RegisterCompanyResponseSchema = z.object({
  msg: z.string().trim().nonempty(),
  account_id: AccountDtoSchema.shape.id,
  applicant_id: AccountDtoSchema.shape.id.nullable(),
});
export type RegisterCompanyResponse = z.infer<typeof RegisterCompanyResponseSchema>;

// Register User
// Frontend DATA
export const RegisterUserDataSchema = LoginBodySchema.extend({
  confirmPassword: z.string().trim().nonempty('Please confirm your password'),
  firstName: z.string().trim().nonempty('First name is required'),
  lastName: z.string().trim().nonempty('Last name is required'),
  birthDate: z.date().nullable(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
export type RegisterUserData = z.infer<typeof RegisterUserDataSchema>;

// Register User
// Backend DTO'S
export const RegisterUserBodySchema = LoginBodySchema.extend({
  first_name: z.string().trim().nonempty('First name is required'),
  last_name: z.string().trim().nonempty('Last name is required'),
  birth_date: z.iso.datetime().nullable(),
});
export type RegisterUserBody = z.infer<typeof RegisterUserBodySchema>;
export const RegisterUserResponseSchema = z.object({
  msg: z.string().trim().nonempty(),
  account_id: AccountDtoSchema.shape.id,
  applicant_id: AccountDtoSchema.shape.id.nullable(),
});
export type RegisterUserResponse = z.infer<typeof RegisterUserResponseSchema>;
