import { JOB_KEYS } from './job.keys';
import { useGetAllJobsQuery } from './use-get-all-jobs';
import { useGetJobByIdQuery } from './use-get-job-by-id';
import { useToggleFavoriteJobMutation } from './use-toggle-favorite-job';

export const queries = {
  useGetAllJobs: useGetAllJobsQuery,
  useGetJobById: useGetJobByIdQuery,
};

export const mutations = {
  useToggleFavoriteJob: useToggleFavoriteJobMutation,
};

export const keys = JOB_KEYS;
