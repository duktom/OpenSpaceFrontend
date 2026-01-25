import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { useMutation } from '@tanstack/react-query';
import { addCompanyRating } from '../company-rating.service';
import { AddCompanyRatingData } from '../company-rating.types';
import { COMPANY_RATING_KEYS } from './company-rating.keys';

export const useAddCompanyRatingMutation = () => {
  return useMutation({
    mutationFn: (data: AddCompanyRatingData) => addCompanyRating(data),
    mutationKey: COMPANY_RATING_KEYS.addCompanyRating(),
    onError: getApiErrorMessages,
  });
};
