import { z } from 'zod';

export const AccountTypeSchema = z.enum(['applicant', 'recruiter', 'admin']);

export type AccountType = z.infer<typeof AccountTypeSchema>;
