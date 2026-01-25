import { getDateOrNull } from '@/helpers/get-date-or-null';
import { GetJobByIdDataSchema, GetJobByIdParams, Job, JobSchemaDto } from './job.types';

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
      companyId: data.company_id,
    }) satisfies Job
);

export const GetJobByIdDataToDtoSchema = GetJobByIdDataSchema.transform((data) => ({
  params: {
    id: data.id,
  } satisfies GetJobByIdParams,
}));
