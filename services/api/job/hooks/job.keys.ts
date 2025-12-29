import { GetJobByIdParams } from '../job.types';

export const JOB_KEYS = {
  all: ['jobs'] as const,
  getJobById: (params: GetJobByIdParams) => [...JOB_KEYS.all, { params }] as const,
  getAllJobs: () => [...JOB_KEYS.all] as const,
  toggleFavoriteJob: () => [...JOB_KEYS.all, 'toggle-favorite-job'] as const,
} as const;
