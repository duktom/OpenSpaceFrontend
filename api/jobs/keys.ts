import { Job } from '@/types/backend/jobs/job';

export const JOBS_KEYS = {
  all: ['jobs'] as const,
  getJob: (id: Job['id']) => [...JOBS_KEYS.all, { id }] as const,
  getJobs: () => [...JOBS_KEYS.all] as const,
} as const;
