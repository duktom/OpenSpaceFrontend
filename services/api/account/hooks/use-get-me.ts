import { useQuery } from '@tanstack/react-query';
import { getMe } from '../account.service';
import { ACCOUNT_KEYS } from './account.keys';

export const useGetMeQuery = () => {
  return useQuery({
    queryFn: () => getMe(),
    queryKey: ACCOUNT_KEYS.getMe(),
    retry: false,
  });
};
