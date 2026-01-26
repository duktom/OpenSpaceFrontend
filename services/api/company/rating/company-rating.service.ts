import {
  AddCompanyRatingDataToDtoSchema,
  DeleteCompanyRatingDataToDtoSchema,
  GetCompanyRatingByIdDataToDtoSchema,
} from './company-rating.adapter';
import * as api from './company-rating.api';
import {
  AddCompanyRatingData,
  DeleteCompanyRatingData,
  GetCompanyRatingByIdData,
} from './company-rating.types';

export const getCompanyRatingById = async (data: GetCompanyRatingByIdData) => {
  const { params } = GetCompanyRatingByIdDataToDtoSchema.parse(data);
  return await api.getCompanyRatingById(params);
};

export const addCompanyRating = async (data: AddCompanyRatingData) => {
  const { params, body } = AddCompanyRatingDataToDtoSchema.parse(data);
  return await api.addCompanyRating(params, body);
};

export const deleteCompanyRating = async (data: DeleteCompanyRatingData) => {
  const { params } = DeleteCompanyRatingDataToDtoSchema.parse(data);
  return await api.deleteCompanyRating(params);
};
