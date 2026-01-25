import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../user.service';
import { USER_KEYS } from './user.keys';

export const useGetAllUsersQuery = () => {
  return useQuery({
    queryFn: () => getAllUsers(),
    queryKey: USER_KEYS.getAllUsers(),
    retry: false,
  });
};
