import { z } from 'zod';
import { apiClient } from '../api-client';
import { CompanyDtoToEntitySchema, RegisterCompanyResponseSchemaDtoToData } from './company.adapter';
import { GetAllCompaniesResponse, GetCompanyByIdParams, GetCompanyByIdParamsSchema, GetCompanyByIdResponse, RegisterCompanyBody, RegisterCompanyBodySchema, RegisterCompanyResponse } from './company.types';

export const registerCompany = async (
  body: RegisterCompanyBody
) => {
  const validatedBody = RegisterCompanyBodySchema.parse(body);
  const res = await apiClient.post<RegisterCompanyResponse>(
    '/account/register/company',
    validatedBody
  );
  return RegisterCompanyResponseSchemaDtoToData.parse(res.data);
};

export const getCompanyById = async (
  params: GetCompanyByIdParams
) => {
  const {id} = GetCompanyByIdParamsSchema.parse(params);
  const res = await apiClient.get<GetCompanyByIdResponse>(
    `/company/profile/${id}`
  );
  return CompanyDtoToEntitySchema.parse(res.data);
};

export const getAllCompanies = async () => {
  const res = await apiClient.get<GetAllCompaniesResponse>(
    "/company",
  );
  return z.array(CompanyDtoToEntitySchema).parse(res.data);
};
