import { z } from 'zod';

const userAuthBase = z.object({
  firstName: z.string().trim().nonempty('First name is required'),
  surname: z.string().trim().nonempty('Surname is required'),
  email: z.email('Invalid email address'),
  password: z.string().trim().nonempty('Please enter a password').min(8, 'At least 8 characters'),
  confirmPassword: z.string().trim().nonempty('Please confirm your password'),
});

export const registerUserSchema = userAuthBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
);

export const loginUserSchema = userAuthBase.pick({ email: true, password: true });

export const userAuthFormSchema = z.union([registerUserSchema, loginUserSchema]);
