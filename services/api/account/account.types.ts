import { z } from 'zod';

const AccountTypeSchema = z.enum(['applicant', 'admin']); // 'recruiter' is no longer used
export type AccountType = z.infer<typeof AccountTypeSchema>;
export const AuthTokenSchema = z.string().trim().nonempty();

// Both FE & BE
const BaseAccountSchema = z.object({
  id: z.number().min(1),
  email: z.email(),
  type: AccountTypeSchema.nullable(),
});

// DTO
export const AccountDtoSchema = BaseAccountSchema.extend({
  is_verified: z.boolean(),
  created_at: z.iso.datetime({ offset: true }),
  exp_date: z.iso.datetime({ offset: true }).nullable(),
});
export type AccountDto = z.infer<typeof AccountDtoSchema>;

// FE Entity
export const AccountSchema = BaseAccountSchema.extend({
  isVerified: z.boolean(),
  createdAt: z.date(),
  expDate: z.date().nullable(),
});
export type Account = z.infer<typeof AccountSchema>;

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
