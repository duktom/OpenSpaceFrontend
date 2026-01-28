import { useMutation } from '@tanstack/react-query';
import { createJob } from '../job.service';
import { CreateJobData } from '../job.types';

export const useCreateJobMutation = () => {
  return useMutation({
    mutationFn: (data: CreateJobData) => createJob(data),
  });
};
