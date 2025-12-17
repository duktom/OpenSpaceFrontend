import { createUser } from './create-user';
import { fetchCurrentUser } from './fetch-current-user';
import { userLogin } from './user-login';
import { userLogout } from './user-logout';

export const authApi = {
  getUser: fetchCurrentUser,
  login: userLogin,
  register: createUser,
  logout: userLogout,
};
