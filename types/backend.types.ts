import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().nonempty(),
  email: z.email(),
});

export type User = z.infer<typeof UserSchema>;

export const LoginCredentialsSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

export const RegisterCredentialsSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;

export const JobSchema = z.object({
  id: z.string().nonempty(),
  createdAt: z.number().transform((val) => new Date(val)),
});

export type JobInput = z.input<typeof JobSchema>;
export type Job = z.infer<typeof JobSchema>;
