import { z } from 'zod';
import { JobDtoToEntitySchema } from './job.adapter';
import * as api from './job.api';
import { GetJobByIdParams, Job, ToggleFavoriteJobParams } from './job.types';

export const getJobById = async (params: GetJobByIdParams): Promise<Job> => {
  return JobDtoToEntitySchema.parse(await api.getJobById(params));
};

export const getAllJobs = async (): Promise<Job[]> => {
  return z.array(JobDtoToEntitySchema).parse(await api.getAllJobs());
};

export const toggleFavoriteJob = async (params: ToggleFavoriteJobParams): Promise<void> => {
  return await api.toggleFavoriteJob(params);
};
