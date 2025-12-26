import { useQuery } from '@tanstack/react-query';
import { getJobById } from '../job.service';
import { GetJobByIdParams } from '../job.types';
import { JOB_KEYS } from './job.keys';

export const useGetJobByIdQuery = (params: GetJobByIdParams) => {
  return useQuery({
    queryFn: () => getJobById(params),
    queryKey: JOB_KEYS.getJobById(params),
    retry: false,
  });
};
