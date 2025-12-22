import { z } from 'zod';
import { JobSchema } from './job';

export const JobsSchema = z.array(JobSchema);
export type Jobs = z.infer<typeof JobsSchema>;

export const GetJobsResponseSchema = JobsSchema;
export type GetJobsResponse = z.infer<typeof GetJobsResponseSchema>;
