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
  postingImgId: z.string().trim().nullable(),
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
export const ToggleFavoriteJobDataSchema = JobSchema.pick({ id: true });
export type ToggleFavoriteJobData = z.infer<typeof ToggleFavoriteJobDataSchema>;
export const ToggleFavoriteJobParamsSchema = JobSchema.pick({ id: true });
export type ToggleFavoriteJobParams = z.infer<typeof ToggleFavoriteJobParamsSchema>;
export const ToggleFavoriteJobResponseSchema = z.void();
export type ToggleFavoriteJobResponse = z.infer<typeof ToggleFavoriteJobResponseSchema>;

// Create job
// Frontend FORM DATA (for react-hook-form)
export const CreateJobFormDataSchema = z.object({
  companyId: CompanySchema.shape.id,
  title: z.string().trim().nonempty('Please enter the offered position'),
  description: z.string().trim().nonempty('Please enter the job description'),
  payoff: z
    .string()
    .trim()
    .nonempty('Please enter the salary')
    .refine(
      (val) => {
        const num = parseFloat(val.replace(/\s/g, '').replace(/[^\d.-]/g, ''));
        return !isNaN(num) && num > 0;
      },
      { message: 'Please enter a valid salary amount' }
    ),
  expiryDate: z.date().nullable().optional(),
});
export type CreateJobFormData = z.infer<typeof CreateJobFormDataSchema>;

// Frontend DATA (transformed for API)
export const CreateJobDataSchema = JobSchema.omit({
  id: true,
  postingDate: true,
  postingImgId: true,
  postingImgLink: true,
});
export type CreateJobData = z.infer<typeof CreateJobDataSchema>;

// Backend DTO
export const CreateJobBodySchema = z.object({
  company_id: CompanySchemaDto.shape.id,
  title: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
  payoff: z.number().min(1),
  expiry_date: z.iso.datetime({ offset: true }).nullable().optional(),
});
export type CreateJobBody = z.infer<typeof CreateJobBodySchema>;
export const CreateJobResponseSchema = JobSchemaDto;
export type CreateJobResponse = z.infer<typeof CreateJobResponseSchema>;
