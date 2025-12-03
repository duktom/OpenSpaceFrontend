import { z } from 'zod';

export const authSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().nonempty('Password is required').min(8, 'At least 8 characters'),
});
