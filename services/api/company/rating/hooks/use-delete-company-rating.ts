import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { useMutation } from '@tanstack/react-query';
import { deleteCompanyRating } from '../company-rating.service';
import { DeleteCompanyRatingData } from '../company-rating.types';
import { COMPANY_RATING_KEYS } from './company-rating.keys';

export const useDeleteCompanyRatingMutation = () => {
  return useMutation({
    mutationFn: (data: DeleteCompanyRatingData) => deleteCompanyRating(data),
    mutationKey: COMPANY_RATING_KEYS.deleteCompanyRating(),
    onError: getApiErrorMessages,
  });
};
