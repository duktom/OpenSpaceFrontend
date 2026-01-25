
import { GetJobByIdDataToDtoSchema } from './job.adapter';
import * as api from './job.api';
import { GetJobByIdParams, ToggleFavoriteJobData, ToggleFavoriteJobDataSchema } from './job.types';

export const getJobById = async (data: GetJobByIdParams) => {
  const {params} = GetJobByIdDataToDtoSchema.parse(data);
  return await api.getJobById(params);
};

export const getAllJobs = async () => {
  return await api.getAllJobs();
};

export const toggleFavoriteJob = async (data: ToggleFavoriteJobData) => {
  const { params } = ToggleFavoriteJobDataSchema.parse(data);
  return await api.toggleFavoriteJob(params);
};
