import { getDateOrNull } from '@/helpers/get-date-or-null';
import { AccountDtoToEntitySchema } from '../account/account.adapter';
import { CompanyDtoToEntitySchema } from '../company/company.adapter';
import { Job, JobSchemaDto } from './job.types';

export const JobDtoToEntitySchema = JobSchemaDto.transform(
  (data) =>
    ({
      id: data.id,
      title: data.title,
      payoff: data.payoff,
      description: data.description,
      profileImgId: data.profile_img_id,
      profileImgLink: data.profile_img_link,
      postingDate: new Date(data.posting_date),
      expiryDate: getDateOrNull(data.expiry_date),
      company: CompanyDtoToEntitySchema.parse(data.company),
      recruiter: AccountDtoToEntitySchema.parse(data.recruiter),
    }) satisfies Job
);
