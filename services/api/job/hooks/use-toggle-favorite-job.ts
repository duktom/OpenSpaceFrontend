import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { useMutation } from '@tanstack/react-query';
import { toggleFavoriteJob } from '../job.service';
import { ToggleFavoriteJobParams } from '../job.types';
import { JOB_KEYS } from './job.keys';

export const useToggleFavoriteJobMutation = () => {
  return useMutation({
    mutationFn: (data: ToggleFavoriteJobParams) => toggleFavoriteJob(data),
    mutationKey: JOB_KEYS.toggleFavoriteJob(),
    onError: getApiErrorMessages,
  });
};
