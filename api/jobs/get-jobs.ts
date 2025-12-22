import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { sleep } from '@/helpers/sleep';
import { ApiError } from '@/types/backend.types';
import { GetJobsResponse, GetJobsResponseSchema } from '@/types/backend/jobs/jobs';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { JOBS_KEYS } from './keys';
import { mockJob } from './mock-job';

export const getJobs = async (config?: AxiosRequestConfig): Promise<GetJobsResponse> => {
  try {
    // const { data } = await axiosInstance.get<GetJobsResponse>('/jobs', config);
    await sleep(3_000);
    console.info('Fake get jobs | mock jobs returned');
    const data = [mockJob];
    return GetJobsResponseSchema.parse(data);
  } catch (error) {
    throw getApiErrorMessages(error);
  }
};

export const useGetJobsQuery = (
  options: Partial<UseQueryOptions<GetJobsResponse, ApiError>> = {}
) => {
  return useQuery({
    queryFn: () => getJobs(),
    queryKey: JOBS_KEYS.getJobs(),
    retry: false,
    ...options,
  });
};
