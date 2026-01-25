import { AddCompanyRatingBody, AddCompanyRatingDataSchema, AddCompanyRatingParams, AddCompanyRatingResponseSchema, CompanyRating, CompanyRatingSchemaDto, DeleteCompanyRatingDataSchema, DeleteCompanyRatingParams, GetCompanyRatingByIdDataSchema, GetCompanyRatingByIdParams } from "./company-rating.types";

export const CompanyRatingDtoToEntitySchema = CompanyRatingSchemaDto.transform(
  (data) =>
    ({
      companyId: data.company_id,
      ratingsCount: data.ratings_count,
      rating: data.rating,
    }) satisfies CompanyRating
);

export const GetCompanyRatingByIdDataToDtoSchema = GetCompanyRatingByIdDataSchema.transform((data) => ({
  params: {
    id: data.id,
  } satisfies GetCompanyRatingByIdParams,
}));

export const AddCompanyRatingDataToDtoSchema = AddCompanyRatingDataSchema.transform((data) => ({
  params: {
    id: data.id,
  } satisfies AddCompanyRatingParams,
  body: {
    score: data.score,
  } satisfies AddCompanyRatingBody,
}));
export const AddCompanyRatingResponseSchemaDtoToData = AddCompanyRatingResponseSchema.transform((data) => ({
  rating: data.rating,
  company_id: data.company_id,
  ratings_count: data.ratings_count,
}));

export const DeleteCompanyRatingDataToDtoSchema = DeleteCompanyRatingDataSchema.transform((data) => ({
  params: {
    id: data.id,
  } satisfies DeleteCompanyRatingParams,
}));
