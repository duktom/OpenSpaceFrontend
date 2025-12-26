import { z } from 'zod';
import { AccountDtoSchema, AccountSchema } from '../account/account.types';
import { CompanySchema, CompanySchemaDto } from '../company/company.types';

const BaseJobSchema = z.object({
  id: z.number().min(1),
  title: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
  location: z.string().trim().nonempty(),
  salary: z.number().min(1),
  photos: z.array(z.url()).min(1),
});

// Dto
export const JobSchemaDto = BaseJobSchema.extend({
  postingDate: z.iso.datetime(),
  expiryDate: z.iso.datetime().nullable(),
  company: CompanySchemaDto,
  poster: AccountDtoSchema,
});
export type JobDto = z.infer<typeof JobSchemaDto>;

// FE Entity
export const JobSchema = BaseJobSchema.extend({
  postingDate: z.date(),
  expiryDate: z.date().nullable(),
  company: CompanySchema,
  poster: AccountSchema,
});
export type Job = z.infer<typeof JobSchema>;

// Get job by id
export const GetJobByIdParamsSchema = JobSchema.pick({ id: true });
export type GetJobByIdParams = z.infer<typeof GetJobByIdParamsSchema>;
export const GetJobByIdResponseSchema = JobSchemaDto;
export type GetJobByIdResponse = z.infer<typeof GetJobByIdResponseSchema>;

// Get all jobs
export const GetAllJobsResponseSchema = z.array(JobSchemaDto);
export type GetAllJobsResponse = z.infer<typeof GetAllJobsResponseSchema>;

// Toggle favorite job
export const ToggleFavoriteJobParamsSchema = JobSchema.pick({ id: true });
export type ToggleFavoriteJobParams = z.infer<typeof ToggleFavoriteJobParamsSchema>;
export const ToggleFavoriteJobResponseSchema = z.void();
export type ToggleFavoriteJobResponse = z.infer<typeof ToggleFavoriteJobResponseSchema>;
