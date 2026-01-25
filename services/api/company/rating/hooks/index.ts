import { COMPANY_RATING_KEYS } from './company-rating.keys';
import { useAddCompanyRatingMutation } from './use-add-company-rating';
import { useDeleteCompanyRatingMutation } from './use-delete-company-rating';
import { useGetCompanyRatingByIdQuery } from './use-get-company-rating-by-id';

export const queries = {
  useGetCompanyRatingById: useGetCompanyRatingByIdQuery,
};

export const mutations = {
  useAddCompanyRating: useAddCompanyRatingMutation,
  useDeleteCompanyRating: useDeleteCompanyRatingMutation,
};

export const keys = COMPANY_RATING_KEYS;
