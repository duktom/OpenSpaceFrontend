import { Company } from '@/services/api/company/company.types';

export const formatCompanyAddress = ({
  city,
  street,
  buildingNumber,
  apartmentNumber,
  postalCode,
}: Company['address']): string => {
  const building = buildingNumber && apartmentNumber ? `${buildingNumber}/${apartmentNumber}` : '';
  return `${city ?? ''} ${street ?? ''} ${building} ${postalCode ?? ''}`;
};
