import { z } from 'zod';
import { AuthTokenSchema } from './token';

export const UserSchema = z.object({
  id: z.string().nonempty(),
  email: z.email(),
});

export type User = z.infer<typeof UserSchema>;

export const CurrentUserResponseSchema = z.object({
  access_token: AuthTokenSchema,
  message: z.string(),
});
export type CurrentUserResponse = z.infer<typeof CurrentUserResponseSchema>;
