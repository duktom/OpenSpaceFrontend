import { CompanyDto } from '../company/company.types';

const getOneYearAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString();
};

export const MOCK_DEFAULT_COMPANY_PROFILE_IMAGE = 'https://i.imgur.com/EwbYomy.png';

export const MOCK_COMPANY: CompanyDto = {
  id: 1,
  name: 'Mirosoft',
  description: null,
  profile_img_id: 'EwbYomy',
  profile_img_link: 'https://i.imgur.com/EwbYomy.png',
  address: {
    apartment_num: '1',
    building_num: '195A',
    city: 'Warszawa',
    postal_code: '02-222',
    street: 'Al. Jerozolimskie',
  },
  ein: '8230123543',
  rating: 4.8,
  creation_date: getOneYearAgo(),
};
