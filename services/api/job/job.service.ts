import {
  CreateJobDataToDtoSchema,
  GetJobByIdDataToDtoSchema,
  ToggleFavoriteJobDataToDtoSchema,
} from './job.adapter';
import * as api from './job.api';
import { CreateJobData, GetJobByIdData, ToggleFavoriteJobData } from './job.types';

export const getJobById = async (data: GetJobByIdData) => {
  const { params } = GetJobByIdDataToDtoSchema.parse(data);
  return await api.getJobById(params);
};

export const getAllJobs = async () => {
  return await api.getAllJobs();
};

export const toggleFavoriteJob = async (data: ToggleFavoriteJobData) => {
  const { params } = ToggleFavoriteJobDataToDtoSchema.parse(data);
  return await api.toggleFavoriteJob(params);
};

export const createJob = async (data: CreateJobData) => {
  const { body } = CreateJobDataToDtoSchema.parse(data);
  return await api.createJob(body);
};
