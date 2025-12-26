import { getDateOrNull } from '@/helpers/get-date-or-null';
import { Account, AccountDtoSchema } from './account.types';

export const AccountDtoToEntitySchema = AccountDtoSchema.transform(
  (data) =>
    ({
      ...data,
      creationDate: new Date(data.creationDate),
      expDate: getDateOrNull(data.expDate),
    }) satisfies Account
);
