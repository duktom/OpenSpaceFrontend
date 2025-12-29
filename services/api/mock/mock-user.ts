import { AccountDto } from '../account/account.types';

const getOneYearAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString();
};

export const mockUser: AccountDto = {
  id: 1,
  email: 'test@gmail.com',
  type: 'admin',
  role: null,
  is_verified: true,
  profile_img_id: null,
  profile_img_link: null,
  creation_date: getOneYearAgo(),
  exp_date: null,
};
