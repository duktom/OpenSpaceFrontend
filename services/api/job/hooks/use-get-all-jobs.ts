import { useQuery } from '@tanstack/react-query';
import { getAllJobs } from '../job.service';
import { JOB_KEYS } from './job.keys';

export const useGetAllJobsQuery = () => {
  return useQuery({
    queryFn: () => getAllJobs(),
    queryKey: JOB_KEYS.getAllJobs(),
    retry: false,
  });
};
