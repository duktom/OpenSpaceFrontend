import { api } from '@/api/api';
import { Job } from '@/types/backend.types';
import { useState } from 'react';
import { LikeButton } from './like-button';

type FavoriteJobButtonProps = {
  jobId: Job['id'];
};

export function FavoriteJobButton({ jobId }: FavoriteJobButtonProps) {
  const [isFavoriteJob, setIsFavoriteJob] = useState(false);

  const toggleFavoriteJob = () => {
    setIsFavoriteJob((x) => !x);
    api.jobs.toggleFavoriteJob(jobId);
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
