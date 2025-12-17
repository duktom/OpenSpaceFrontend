import { z } from 'zod';

export const RegisterResponseSchema = z.object({
  message: z.string(),
});
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

export const RegisterCredentialsSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;
