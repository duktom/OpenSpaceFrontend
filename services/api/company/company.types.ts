import { z } from 'zod';
import { AccountDtoSchema, LoginBodySchema } from '../account/account.types';

const BaseCompanyAddress = z.object({
  street: z.string().trim().nullable(),
  city: z.string().trim().nullable(),
});
const CompanyAddressDto = BaseCompanyAddress.extend({
  postal_code: z.string().trim().nullable(),
  building_num: z.string().trim().nullable(),
  apartment_num: z.string().trim().nullable(),
});
const CompanyAddress = BaseCompanyAddress.extend({
  postalCode: z.string().trim().nullable(),
  buildingNumber: z.string().trim().nullable(),
  apartmentNumber: z.string().trim().nullable(),
});

export const BaseCompanySchema = z.object({
  id: z.number().min(1),
  name: z.string().trim().nonempty(),
  description: z.string().trim().nullable(),
  ein: z
    .string()
    .trim()
    .length(10, 'EIN must be exactly 10 characters')
    .nonempty('EIN is required'),
});

export const CompanySchemaDto = BaseCompanySchema.extend({
  address: CompanyAddressDto,
  profile_img_id: z.string().trim().nullable(),
  profile_img_link: z.url().nullable(),
});
export type CompanyDto = z.infer<typeof CompanySchemaDto>;

export const CompanySchema = BaseCompanySchema.extend({
  address: CompanyAddress,
  profileImgId: z.string().trim().nullable(),
  profileImgLink: z.url().nullable(),
});
export type Company = z.infer<typeof CompanySchema>;

// Register Company
// Frontend DATA
export const RegisterCompanyDataSchema = LoginBodySchema.extend({
  confirmPassword: z.string().trim().nonempty('Please confirm your password'),
  name: z.string().trim().nonempty('Name is required'),
  ein: z
    .string()
    .trim()
    .length(10, 'EIN must be exactly 10 characters')
    .nonempty('EIN is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
export type RegisterCompanyData = z.infer<typeof RegisterCompanyDataSchema>;

export const GetCompanyByIdDataSchema = z.object({
  id: CompanySchema.shape.id,
});
export type GetCompanyByIdData = z.infer<typeof GetCompanyByIdDataSchema>;

// Register Company
// Backend DTO'S
export const RegisterCompanyBodySchema = LoginBodySchema.extend({
  name: z.string().trim().nonempty('Name is required'),
  ein: z
    .string()
    .trim()
    .length(10, 'EIN must be exactly 10 characters')
    .nonempty('EIN is required'),
});
export type RegisterCompanyBody = z.infer<typeof RegisterCompanyBodySchema>;
export const RegisterCompanyResponseSchema = z.object({
  msg: z.string().trim().nonempty(),
  account_id: AccountDtoSchema.shape.id,
  company_id: CompanySchemaDto.shape.id,
});
export type RegisterCompanyResponse = z.infer<typeof RegisterCompanyResponseSchema>;

// Get Company by Id
export const GetCompanyByIdParamsSchema = z.object({
  id: z.number().min(1),
});
export type GetCompanyByIdParams = z.infer<typeof GetCompanyByIdParamsSchema>;
export const GetCompanyByIdResponseSchema = CompanySchemaDto;
export type GetCompanyByIdResponse = z.infer<typeof GetCompanyByIdResponseSchema>;

// Get all companies
export const GetAllCompaniesResponseSchema = z.array(CompanySchemaDto);
export type GetAllCompaniesResponse = z.infer<typeof GetAllCompaniesResponseSchema>;
