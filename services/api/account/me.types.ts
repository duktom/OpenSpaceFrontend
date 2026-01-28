import { z } from 'zod';
import { CompanySchemaDto } from '../company/company.types';
import { UserDtoSchema } from '../user/user.types';
import { AccountSchema, AuthTokenSchema } from './account.types';

export const GetMeResponseSchema = z.object({
  account_id: AccountSchema.shape.id,
  account_type: AccountSchema.shape.type,
  user: UserDtoSchema.nullable(),
  company: CompanySchemaDto.nullable(),
  access_token: AuthTokenSchema,
  message: z.string().trim().nonempty(),
});
export type GetMeResponse = z.infer<typeof GetMeResponseSchema>;
