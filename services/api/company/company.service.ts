import { GetCompanyByIdDataToDtoSchema, RegisterCompanyDataToDtoSchema } from './company.adapter';
import * as companyApi from './company.api';
import { GetCompanyByIdData, RegisterCompanyData } from './company.types';

export const registerCompany = async (data: RegisterCompanyData) => {
  const { body } = RegisterCompanyDataToDtoSchema.parse(data);
  return await companyApi.registerCompany(body);
};

export const getCompanyById = async (data: GetCompanyByIdData) => {
  const { params } = GetCompanyByIdDataToDtoSchema.parse(data);
  return await companyApi.getCompanyById(params);
};

export const getAllCompanies = async () => {
  return await companyApi.getAllCompanies();
};
