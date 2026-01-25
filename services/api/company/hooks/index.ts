import { useRegisterCompanyMutation } from '../../company/hooks/use-register-company';
import { COMPANY_KEYS } from './company.keys';
import { useGetAllCompaniesQuery } from './use-get-all-companies';
import { useGetCompanyByIdQuery } from './use-get-company-by-id';

export const queries = {
  useGetCompanyById: useGetCompanyByIdQuery,
  useGetAllCompanies: useGetAllCompaniesQuery,
};

export const mutations = {
  useRegisterCompany: useRegisterCompanyMutation,
};

export const keys = COMPANY_KEYS;
