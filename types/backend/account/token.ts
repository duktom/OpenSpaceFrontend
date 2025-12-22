import { z } from 'zod';

export const AuthTokenSchema = z.string();
export type AuthToken = z.infer<typeof AuthTokenSchema>;

export const GetTokenResponseSchema = z.object({
  access_token: AuthTokenSchema,
  message: z.string(),
});

export type GetTokenResponse = z.infer<typeof GetTokenResponseSchema>;
