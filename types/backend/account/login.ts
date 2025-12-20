import { z } from 'zod';
import { AuthTokenSchema } from './token';

export const LoginResponseSchema = z.object({
  access_token: AuthTokenSchema,
  message: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const LoginCredentialsSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().trim().nonempty('Please enter a password').min(8, 'At least 8 characters'),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
