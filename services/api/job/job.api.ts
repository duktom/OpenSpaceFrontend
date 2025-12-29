import { sleep } from '@/helpers/sleep';
import { MOCK_JOB } from '@/services/api/mock/mock-job';
import {
  GetAllJobsResponse,
  GetAllJobsResponseSchema,
  GetJobByIdParams,
  GetJobByIdParamsSchema,
  GetJobByIdResponse,
  GetJobByIdResponseSchema,
  ToggleFavoriteJobParams,
  ToggleFavoriteJobParamsSchema,
  ToggleFavoriteJobResponse,
  ToggleFavoriteJobResponseSchema,
} from './job.types';

export const getJobById = async (params: GetJobByIdParams): Promise<GetJobByIdResponse> => {
  const { id } = GetJobByIdParamsSchema.parse(params);
  // const res = await apiClient.get<GetJobByIdResponse>(`/job/${id}`, config);
  await sleep(3_000);
  const res = { data: MOCK_JOB };
  return GetJobByIdResponseSchema.parse(res.data);
};

export const getAllJobs = async (): Promise<GetAllJobsResponse> => {
  // const res = await axiosInstance.get<GetAllJobsResponse>('/jobs', config);
  await sleep(3_000);
  console.info('Fake get jobs | mock jobs returned');
  const res = { data: [MOCK_JOB, MOCK_JOB] };
  return GetAllJobsResponseSchema.parse(res.data);
};

export const toggleFavoriteJob = async (
  params: ToggleFavoriteJobParams
): Promise<ToggleFavoriteJobResponse> => {
  const { id } = ToggleFavoriteJobParamsSchema.parse(params);
  // const res = await axiosInstance.get<GetAllJobsResponse>(`/job/favorite/${id}`, config);
  await sleep(3_000);
  console.info('Fake toggle favorite job | void');
  const res = { data: undefined };
  return ToggleFavoriteJobResponseSchema.parse(res.data);
};
