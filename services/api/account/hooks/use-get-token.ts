import { useQuery } from '@tanstack/react-query';
import { getToken } from '../account.service';
import { ACCOUNT_KEYS } from './account.keys';

export const useGetTokenQuery = () => {
  return useQuery({
    queryFn: () => getToken(),
    queryKey: ACCOUNT_KEYS.getToken(),
    retry: false,
  });
};
