import { AccountTypeSchema } from '@/types/backend-enums.types';
import { z } from 'zod';
import { AuthTokenSchema } from './token';

export const UserSchema = z.object({
  id: z.number().min(1),
  email: z.email(),
  type: AccountTypeSchema.nullable(),
  creationDate: z.iso.datetime(),
  expDate: z.iso.datetime().nullable(),
  isVerified: z.boolean(),
  role: z.string().trim().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export const CurrentUserResponseSchema = z.object({
  access_token: AuthTokenSchema,
  message: z.string(),
});
export type CurrentUserResponse = z.infer<typeof CurrentUserResponseSchema>;
