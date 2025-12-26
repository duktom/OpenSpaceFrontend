import { getDateOrNull } from '@/helpers/get-date-or-null';
import { AccountDtoToEntitySchema } from '../account/account.adapter';
import { CompanyDtoToEntitySchema } from '../company/company.adapter';
import { Job, JobSchemaDto } from './job.types';

export const JobDtoToEntitySchema = JobSchemaDto.transform(
  (data) =>
    ({
      ...data,
      postingDate: new Date(data.postingDate),
      expiryDate: getDateOrNull(data.expiryDate),
      company: CompanyDtoToEntitySchema.parse(data.company),
      poster: AccountDtoToEntitySchema.parse(data.poster),
    }) satisfies Job
);
