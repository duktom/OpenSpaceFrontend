import { z } from 'zod';
import { LoginCredentialsSchema } from './login';

export const RegisterCompanyResponseSchema = z.object({
  message: z.string(),
});
export type RegisterCompanyResponse = z.infer<typeof RegisterCompanyResponseSchema>;

export const RegisterCompanyCredentialsSchema = LoginCredentialsSchema.extend({
  confirmPassword: z.string().trim().nonempty('Please confirm your password'),
  name: z.string().trim().nonempty('Name is required'),
  ein: z.string().trim().nonempty('EIN is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterCompanyCredentials = z.infer<typeof RegisterCompanyCredentialsSchema>;
