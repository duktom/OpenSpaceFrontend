import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../user.service';
import { GetUserByIdParams } from '../user.types';
import { USER_KEYS } from './user.keys';

export const useGetUserByIdQuery = (params: GetUserByIdParams) => {
  return useQuery({
    queryFn: () => getUserById(params),
    queryKey: USER_KEYS.getUserById(params),
    retry: false,
  });
};
