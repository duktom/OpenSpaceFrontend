import { z } from 'zod';
import { apiClient } from '../api-client';
import { JobDtoToEntitySchema } from './job.adapter';
import {
  GetAllJobsResponse,
  GetJobByIdParams,
  GetJobByIdParamsSchema,
  GetJobByIdResponse,
  ToggleFavoriteJobParams,
  ToggleFavoriteJobParamsSchema,
  ToggleFavoriteJobResponse,
  ToggleFavoriteJobResponseSchema
} from './job.types';

export const getJobById = async (params: GetJobByIdParams) => {
  const { id } = GetJobByIdParamsSchema.parse(params);
  const res = await apiClient.get<GetJobByIdResponse>(`/job/${id}`);
  return JobDtoToEntitySchema.parse(res.data);
};

export const getAllJobs = async () => {
  const res = await apiClient.get<GetAllJobsResponse>('/job');
  return z.array(JobDtoToEntitySchema).parse(res.data);
};

export const toggleFavoriteJob = async (
  params: ToggleFavoriteJobParams
) => {
  const { id } = ToggleFavoriteJobParamsSchema.parse(params);
  const res = await apiClient.get<ToggleFavoriteJobResponse>(`/job/favorite/${id}`);
  return ToggleFavoriteJobResponseSchema.parse(res.data);
};
