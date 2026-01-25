import { useQuery } from '@tanstack/react-query';
import { getAllCompanies } from '../company.service';
import { COMPANY_KEYS } from './company.keys';

export const useGetAllCompaniesQuery = () => {
  return useQuery({
    queryFn: () => getAllCompanies(),
    queryKey: COMPANY_KEYS.getAllCompanies(),
    retry: false,
  });
};
