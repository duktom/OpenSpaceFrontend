import { z } from 'zod';

export const AuthTokenSchema = z.string();
export type AuthToken = z.infer<typeof AuthTokenSchema>;
