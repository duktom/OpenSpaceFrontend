import { getDateOrNull } from '@/helpers/get-date-or-null';
import {
  CreateJobDataSchema,
  GetJobByIdDataSchema,
  GetJobByIdParams,
  Job,
  JobSchemaDto,
  ToggleFavoriteJobDataSchema,
  ToggleFavoriteJobParams,
} from './job.types';

export const JobDtoToEntitySchema = JobSchemaDto.transform(
  (data) =>
    ({
      id: data.id,
      title: data.title,
      payoff: data.payoff,
      description: data.description,
      postingImgId: data.posting_img_id,
      postingImgLink: data.posting_img_link,
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

export const ToggleFavoriteJobDataToDtoSchema = ToggleFavoriteJobDataSchema.transform((data) => ({
  params: {
    id: data.id,
  } satisfies ToggleFavoriteJobParams,
}));

export const CreateJobDataToDtoSchema = CreateJobDataSchema.transform((data) => ({
  body: {
    company_id: data.companyId,
    title: data.title,
    description: data.description,
    payoff: data.payoff,
    expiry_date: data.expiryDate ? data.expiryDate.toISOString() : null,
  },
}));
