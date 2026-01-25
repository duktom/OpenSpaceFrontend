import { AccountDto } from '../account/account.types';
import { MOCK_PAST_DATE } from './mock-past-date';

export const MOCK_USER: AccountDto = {
  id: 1,
  email: 'test@gmail.com',
  type: 'admin',
  is_verified: true,
  created_at: MOCK_PAST_DATE,
  exp_date: null,
};
