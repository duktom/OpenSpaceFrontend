import { useQuery } from '@tanstack/react-query';
import { getCompanyById } from '../company.service';
import { GetCompanyByIdData } from '../company.types';
import { COMPANY_KEYS } from './company.keys';

export const useGetCompanyByIdQuery = (data: GetCompanyByIdData) => {
  return useQuery({
    queryFn: () => getCompanyById(data),
    queryKey: COMPANY_KEYS.getCompanyById(data),
    retry: false,
  });
};
