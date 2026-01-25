import { useQuery } from '@tanstack/react-query';
import { getCompanyRatingById } from '../company-rating.api';
import { GetCompanyRatingByIdParams } from '../company-rating.types';
import { COMPANY_RATING_KEYS } from './company-rating.keys';

export const useGetCompanyRatingByIdQuery = (params: GetCompanyRatingByIdParams) => {
  return useQuery({
    queryFn: () => getCompanyRatingById(params),
    queryKey: COMPANY_RATING_KEYS.getCompanyRatingById(params),
    retry: false,
  });
};
