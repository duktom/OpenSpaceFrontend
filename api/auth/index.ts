import { createUser } from './create-user';
import { fetchUser } from './fetch-user';
import { userLogin } from './user-login';
import { userLogout } from './user-logout';

export const authApi = {
  getUser: fetchUser,
  login: userLogin,
  register: createUser,
  logout: userLogout,
};
