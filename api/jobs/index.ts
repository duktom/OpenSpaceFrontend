import { getJob } from './get-job';
import { toggleFavoriteJob } from './toggle-favorite-job';

export const jobsApi = {
  toggleFavoriteJob,
  get: getJob,
};
