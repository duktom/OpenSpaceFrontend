import { authApi } from './auth';
import { jobsApi } from './jobs';

export const api = {
  jobs: jobsApi,
  auth: authApi,
};
