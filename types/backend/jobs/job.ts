import { getDateOrNull } from '@/helpers/get-date-or-null';
import { z } from 'zod';
import { UserSchema } from '../account/user';
import { CompanySchema } from '../companies/company';

export const JobSchema = z.object({
  id: z.number().min(1),
  title: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
  location: z.string().trim().nonempty(),
  salary: z.number().min(1),
  photos: z.array(z.url()).min(1),
  postingDate: z.iso.datetime().transform((val) => new Date(val)),
  expiryDate: z.iso.datetime().transform(getDateOrNull).nullable(),
  company: CompanySchema,
  poster: UserSchema,
});
export type Job = z.infer<typeof JobSchema>;

export const GetJobResponseSchema = JobSchema;
export type GetJobResponse = z.infer<typeof GetJobResponseSchema>;
