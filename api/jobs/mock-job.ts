import { JobInput } from '@/types/backend/jobs/job';

const date = new Date();
date.setFullYear(date.getFullYear() - 1);
const ONE_YEAR_AGO = date.getTime();

export const mockJob: JobInput = {
  id: '1',
  createdAt: ONE_YEAR_AGO,
};
