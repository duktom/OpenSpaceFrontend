import { ACCOUNT_KEYS } from "@/services/api/account/hooks/account.keys";
import { COMPANY_KEYS } from "../../hooks/company.keys";
import { GetCompanyRatingByIdParams } from "../company-rating.types";

export const COMPANY_RATING_KEYS = {
  all: [...ACCOUNT_KEYS.all, ...COMPANY_KEYS.all, 'company-rating'] as const,
  getCompanyRatingById: (params: GetCompanyRatingByIdParams) => [...COMPANY_RATING_KEYS.all, { params }] as const,
  addCompanyRating: () => [...COMPANY_RATING_KEYS.all, 'add'] as const,
  deleteCompanyRating: () => [...COMPANY_RATING_KEYS.all, 'delete'] as const,
} as const;
