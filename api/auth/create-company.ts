import { RegisterCompanyCredentials } from '@/types/backend/account/register-company';

export const createCompany = async (companyData: RegisterCompanyCredentials): Promise<void> => {
  console.info('Fake create company | nothing happen');
};
