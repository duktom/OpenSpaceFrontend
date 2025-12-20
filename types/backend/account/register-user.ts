import { z } from 'zod';
import { LoginCredentialsSchema } from './login';

export const RegisterUserResponseSchema = z.object({
  message: z.string(),
});
export type RegisterUserResponse = z.infer<typeof RegisterUserResponseSchema>;

export const RegisterUserCredentialsSchema = LoginCredentialsSchema.extend({
  confirmPassword: z.string().trim().nonempty('Please confirm your password'),
  firstName: z.string().trim().nonempty('First name is required'),
  surname: z.string().trim().nonempty('Surname is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterUserCredentials = z.infer<typeof RegisterUserCredentialsSchema>;
