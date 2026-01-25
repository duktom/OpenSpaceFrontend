import { z } from "zod";
import { CompanySchema, CompanySchemaDto } from "../company.types";

const BaseCompanyRatingSchema = z.object({
  rating: z.number().min(0).max(5),
});

// Dto
export const CompanyRatingSchemaDto = BaseCompanyRatingSchema.extend({
  company_id: CompanySchemaDto.shape.id,
  ratings_count: z.number().min(0),
});
export type CompanyRatingDto = z.infer<typeof CompanyRatingSchemaDto>;

// FE Entity
export const CompanyRatingSchema = BaseCompanyRatingSchema.extend({
  companyId: CompanySchema.shape.id,
  ratingsCount: z.number().min(0),
});
export type CompanyRating = z.infer<typeof CompanyRatingSchema>;

// Get rating by company id
export const GetCompanyRatingByIdParamsSchema = CompanySchemaDto.pick({ id: true });
export type GetCompanyRatingByIdParams = z.infer<typeof GetCompanyRatingByIdParamsSchema>;
export const GetCompanyRatingByIdDataSchema = GetCompanyRatingByIdParamsSchema;
export type GetCompanyRatingByIdData = z.infer<typeof GetCompanyRatingByIdDataSchema>;
export const GetCompanyRatingByIdResponseSchema = CompanyRatingSchemaDto;
export type GetCompanyRatingByIdResponse = z.infer<typeof GetCompanyRatingByIdResponseSchema>;

// Add rating to company
export const AddCompanyRatingParamsSchema = CompanySchemaDto.pick({ id: true });
export type AddCompanyRatingParams = z.infer<typeof AddCompanyRatingParamsSchema>;
export const AddCompanyRatingBodySchema = z.object({
  score: z.number().min(1).max(5),
});
export type AddCompanyRatingBody = z.infer<typeof AddCompanyRatingBodySchema>;
export const AddCompanyRatingDataSchema = AddCompanyRatingParamsSchema.extend(AddCompanyRatingBodySchema.shape);
export type AddCompanyRatingData = z.infer<typeof AddCompanyRatingDataSchema>;
export const AddCompanyRatingResponseSchema = CompanyRatingSchemaDto;
export type AddCompanyRatingResponse = z.infer<typeof AddCompanyRatingResponseSchema>;

// Delete rating from company
export const DeleteCompanyRatingParamsSchema = CompanySchemaDto.pick({ id: true });
export type DeleteCompanyRatingParams = z.infer<typeof DeleteCompanyRatingParamsSchema>;
export const DeleteCompanyRatingDataSchema = DeleteCompanyRatingParamsSchema;
export type DeleteCompanyRatingData = z.infer<typeof DeleteCompanyRatingDataSchema>;
export const DeleteCompanyRatingResponseSchema = z.void();
export type DeleteCompanyRatingResponse = z.infer<typeof DeleteCompanyRatingResponseSchema>;
