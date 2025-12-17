import { z } from 'zod';
import { AuthTokenSchema } from './token';

export const LoginResponseSchema = z.object({
  access_token: AuthTokenSchema,
  message: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const LoginCredentialsSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
