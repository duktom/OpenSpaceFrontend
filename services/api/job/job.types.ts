import { z } from 'zod';
import { CompanySchema, CompanySchemaDto } from '../company/company.types';

const BaseJobSchema = z.object({
  id: z.number().min(1),
  title: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
  payoff: z.number().min(1),
});

// Dto
export const JobSchemaDto = BaseJobSchema.extend({
  posting_date: z.iso.datetime({ offset: true }),
  expiry_date: z.iso.datetime({ offset: true }).nullable(),
  posting_img_id: z.string().trim().nullable(),
  posting_img_link: z.url().nullable(),
  company_id: CompanySchemaDto.shape.id,
});
export type JobDto = z.infer<typeof JobSchemaDto>;

// FE Entity
export const JobSchema = BaseJobSchema.extend({
  postingDate: z.date(),
  expiryDate: z.date().nullable(),
  postingImgId: z.string().trim().nonempty(),
  postingImgLink: z.url().nullable(),
  companyId: CompanySchema.shape.id,
});
export type Job = z.infer<typeof JobSchema>;

// Get job by id
export const GetJobByIdParamsSchema = JobSchema.pick({ id: true });
export type GetJobByIdParams = z.infer<typeof GetJobByIdParamsSchema>;
export const GetJobByIdDataSchema = GetJobByIdParamsSchema;
export type GetJobByIdData = z.infer<typeof GetJobByIdDataSchema>;
export const GetJobByIdResponseSchema = JobSchemaDto;
export type GetJobByIdResponse = z.infer<typeof GetJobByIdResponseSchema>;

// Get all jobs
export const GetAllJobsResponseSchema = z.array(JobSchemaDto);
export type GetAllJobsResponse = z.infer<typeof GetAllJobsResponseSchema>;

// Toggle favorite job
export const ToggleFavoriteJobDataSchema = z.object({
  params: z.object({
    id: JobSchema.shape.id,
  }),
});
export type ToggleFavoriteJobData = z.infer<typeof ToggleFavoriteJobDataSchema>;
export const ToggleFavoriteJobParamsSchema = JobSchema.pick({ id: true });
export type ToggleFavoriteJobParams = z.infer<typeof ToggleFavoriteJobParamsSchema>;
export const ToggleFavoriteJobResponseSchema = z.void();
export type ToggleFavoriteJobResponse = z.infer<typeof ToggleFavoriteJobResponseSchema>;
