import { AccountDto } from '../account/account.types';

const getOneYearAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString();
};

export const MOCK_USER: AccountDto = {
  id: 1,
  email: 'test@gmail.com',
  type: 'admin',
  is_verified: true,
  creation_date: getOneYearAgo(),
  exp_date: null,
};
