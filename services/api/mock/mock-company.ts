import { CompanyDto } from '../company/company.types';

const getOneYearAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString();
};

export const mockCompany: CompanyDto = {
  id: 1,
  name: 'Mirosoft',
  description: null,
  logo: 'https://i.imgur.com/EwbYomy.png',
  rating: 4.8,
  creationDate: getOneYearAgo(),
};
