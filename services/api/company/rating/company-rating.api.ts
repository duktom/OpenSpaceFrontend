import { sleep } from '@/helpers/sleep';
import { MOCK_COMPANY_RATING } from '../../mock/mock-company';
import {
  AddCompanyRatingResponseSchemaDtoToData,
  CompanyRatingDtoToEntitySchema,
} from './company-rating.adapter';
import {
  AddCompanyRatingBody,
  AddCompanyRatingBodySchema,
  AddCompanyRatingParams,
  AddCompanyRatingParamsSchema,
  DeleteCompanyRatingParams,
  DeleteCompanyRatingParamsSchema,
  GetCompanyRatingByIdParams,
  GetCompanyRatingByIdParamsSchema,
} from './company-rating.types';

export const getCompanyRatingById = async (params: GetCompanyRatingByIdParams) => {
  const { id } = GetCompanyRatingByIdParamsSchema.parse(params);
  // const res = await apiClient.get<GetCompanyRatingByIdResponse>(
  //   `/company_rating/rate/${id}`
  // );
  await sleep(3_000);
  console.info('Fake get company rating by id | mock company rating returned');
  const res = { data: MOCK_COMPANY_RATING };
  return CompanyRatingDtoToEntitySchema.parse(res.data);
};

export const addCompanyRating = async (
  params: AddCompanyRatingParams,
  body: AddCompanyRatingBody
) => {
  const { id } = AddCompanyRatingParamsSchema.parse(params);
  const validatedBody = AddCompanyRatingBodySchema.parse(body);
  // const res = await apiClient.post<AddCompanyRatingResponse>(
  //   `/company_rating/rate/${id}`,
  //   validatedBody
  // );
  await sleep(3_000);
  console.info('Fake add company rating | mock company rating returned');
  const res = { data: MOCK_COMPANY_RATING };
  return AddCompanyRatingResponseSchemaDtoToData.parse(res.data);
};

export const deleteCompanyRating = async (params: DeleteCompanyRatingParams) => {
  const { id } = DeleteCompanyRatingParamsSchema.parse(params);
  // const res = await apiClient.delete<DeleteCompanyRatingResponse>(
  //   `/company_rating/delete_rate/${id}`
  // );
  await sleep(3_000);
  console.info('Fake delete company rating | void');
  return;
};
