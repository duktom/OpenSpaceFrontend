import { User } from '@/types/backend/account/user';

const getOneYearAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString();
};

export const mockUser: User = {
  id: 1,
  email: 'test@gmail.com',
  type: 'admin',
  creationDate: getOneYearAgo(),
  expDate: null,
  isVerified: true,
  role: null,
};
