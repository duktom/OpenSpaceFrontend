import { api } from '@/services/api';
import { Job } from '@/services/api/job/job.types';
import { useState } from 'react';
import { LikeButton } from './like-button';

type FavoriteJobButtonProps = {
  jobId: Job['id'];
};

export function FavoriteJobButton({ jobId }: FavoriteJobButtonProps) {
  const [isFavoriteJob, setIsFavoriteJob] = useState(false);
  const { mutate } = api.job.mutations.useToggleFavoriteJob();

  const toggleFavoriteJob = () => {
    setIsFavoriteJob((x) => !x);
    mutate({ id: jobId });
  };

  return (
    <LikeButton
      isLiked={isFavoriteJob}
      style={{
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
      }}
      onPress={toggleFavoriteJob}
    />
  );
}
