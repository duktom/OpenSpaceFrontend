import { Job, JobSchema } from '@/types/backend/jobs/job';
import { mockJob } from './mock-job';

export const getJob = async (jobId: Job['id']): Promise<Job> => {
  await setTimeout(() => {}, 1_000);
  console.info('Fake get job | mock job returned');
  const job = JobSchema.parse(mockJob);
  return job;
};
