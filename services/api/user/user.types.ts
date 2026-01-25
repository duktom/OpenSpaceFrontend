import { z } from 'zod';
import { AccountDtoSchema, AccountSchema, LoginBodySchema } from '../account/account.types';

// Both FE & BE
const BaseUserSchema = z.object({
  id: z.number().min(1),
  description: z.string().trim().nullable(),
});

// DTO
export const UserDtoSchema = BaseUserSchema.extend({
  account_id: AccountDtoSchema.shape.id,
  first_name: z.string().trim().nonempty(),
  last_name: z.string().trim().nonempty(),
  birth_date: z.iso.datetime({ offset: true }),
  profile_img_id: z.string().trim().nullable(),
  profile_img_link: z.url().nullable(),
});
export type UserDto = z.infer<typeof UserDtoSchema>;

// FE Entity
export const UserSchema = BaseUserSchema.extend({
  accountId: AccountSchema.shape.id,
  firstName: z.string().trim().nonempty(),
  lastName: z.string().trim().nonempty(),
  birthDate: z.date(),
  profileImgId: z.string().trim().nonempty(),
  profileImgLink: z.url().nullable(),
});
export type User = z.infer<typeof UserSchema>;

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

// Get User By Id
// Frontend DATA
export const GetUserByIdDataSchema = z.object({
  id: UserSchema.shape.id,
});
export type GetUserByIdData = z.infer<typeof GetUserByIdDataSchema>;

// Register User
// Backend DTO'S
export const RegisterUserBodySchema = LoginBodySchema.extend({
  first_name: z.string().trim().nonempty('First name is required'),
  last_name: z.string().trim().nonempty('Last name is required'),
  birth_date: z.iso.datetime({ offset: true }).nullable(),
});
export type RegisterUserBody = z.infer<typeof RegisterUserBodySchema>;
export const RegisterUserResponseSchema = z.object({
  msg: z.string().trim().nonempty(),
  account_id: AccountDtoSchema.shape.id,
  user_id: UserDtoSchema.shape.id,
});
export type RegisterUserResponse = z.infer<typeof RegisterUserResponseSchema>;

// Get User By Id
// Backend DTO'S
export const GetUserByIdParamsSchema = z.object({
  id: UserSchema.shape.id,
});
export type GetUserByIdParams = z.infer<typeof GetUserByIdParamsSchema>;
export const GetUserByIdResponseSchema = UserDtoSchema;
export type GetUserByIdResponse = z.infer<typeof GetUserByIdResponseSchema>;

// Get all users
// Backend DTO'S
export const GetAllUsersResponseSchema = z.array(UserDtoSchema);
export type GetAllUsersResponse = z.infer<typeof GetAllUsersResponseSchema>;
