import { z } from 'zod';

const companyAuthBase = z.object({
  name: z.string().trim().nonempty('Name is required'),
  ein: z.string().trim().nonempty('EIN is required'),
  email: z.email('Invalid email address'),
  password: z.string().trim().nonempty('Please enter a password').min(8, 'At least 8 characters'),
  confirmPassword: z.string().trim().nonempty('Please confirm your password'),
});

export const registerCompanySchema = companyAuthBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
);

export const loginCompanySchema = companyAuthBase.pick({ email: true, password: true });

export const companyAuthFormSchema = z.union([registerCompanySchema, loginCompanySchema]);
