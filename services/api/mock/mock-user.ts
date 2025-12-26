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
  creationDate: getOneYearAgo(),
  expDate: null,
  isVerified: true,
  role: null,
};
