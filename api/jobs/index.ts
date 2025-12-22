import { getJob, useGetJobQuery } from './get-job';
import { getJobs, useGetJobsQuery } from './get-jobs';
import { JOBS_KEYS } from './keys';

const JOBS_QUERIES = {
  useGet: useGetJobQuery,
  useGetAll: useGetJobsQuery,
};

const JOBS_MUTATIONS = {};

export const JOBS_API = {
  get: getJob,
  getAll: getJobs,
  keys: JOBS_KEYS,
  queries: JOBS_QUERIES,
  mutations: JOBS_MUTATIONS,
} as const;
