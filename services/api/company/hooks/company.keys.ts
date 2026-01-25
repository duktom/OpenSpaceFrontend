import { ACCOUNT_KEYS } from "@/services/api/account/hooks/account.keys";
import { GetCompanyByIdParams } from "../company.types";

export const COMPANY_KEYS = {
  all: [...ACCOUNT_KEYS.all, 'company'] as const,
  getCompanyById: (params: GetCompanyByIdParams) => [...COMPANY_KEYS.all, 'get', params] as const,
  getAllCompanies: () => [...COMPANY_KEYS.all] as const,
  registerCompany: () => [...COMPANY_KEYS.all, 'register'] as const,
} as const;
