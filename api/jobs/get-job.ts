import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { sleep } from '@/helpers/sleep';
import { ApiError } from '@/types/backend.types';
import { GetJobResponse, GetJobResponseSchema, Job } from '@/types/backend/jobs/job';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { JOBS_KEYS } from './keys';
import { mockJob } from './mock-job';

export const getJob = async (
  id: Job['id'],
  config?: AxiosRequestConfig
): Promise<GetJobResponse> => {
  try {
    // const { data } = await axiosInstance.get<GetJobResponse>(`/job/${id}`, config);
    await sleep(3_000);
    console.info('Fake get job | mock job returned');
    const data = mockJob;
    return GetJobResponseSchema.parse(data);
  } catch (error) {
    throw getApiErrorMessages(error);
  }
};

export const useGetJobQuery = (
  id: Job['id'],
  options: Partial<UseQueryOptions<GetJobResponse, ApiError>> = {}
) => {
  return useQuery({
    queryFn: () => getJob(id),
    queryKey: JOBS_KEYS.getJob(id),
    retry: false,
    ...options,
  });
};
