import { getErrorMessage } from '@/helpers/getErrorMessage';
import { User } from '@/types/backend.types';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { createUser } from './api/create-user';
import { fetchUser } from './api/fetch-user';
import { userLogin } from './api/user-login';
import { userLogout } from './api/user-logout';

type TAuthContext = {
  user: User | null;
  isLoadingUser: boolean;
  registerThenLogin: (email: string, password: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<TAuthContext['user']>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const getAndSetUser = async (shouldDisplayError: boolean = true) => {
    setIsLoadingUser(true);
    try {
      const user = await fetchUser();
      setUser(user);
      setIsLoadingUser(false);
    } catch (error) {
      setUser(null);
      setIsLoadingUser(false);
      if (!shouldDisplayError) return;
      const errorMessage = getErrorMessage(error);
      console.error('Error fetching user: ', errorMessage);
    }
  };

  useEffect(() => {
    (async () => {
      await getAndSetUser(false);
    })();
  }, []);

  const login: TAuthContext['login'] = async (email: string, password: string) => {
    try {
      await userLogin({ email, password });
      await getAndSetUser();
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  const registerThenLogin: TAuthContext['registerThenLogin'] = async (
    email: string,
    password: string
  ) => {
    try {
      const createdUser = await createUser({ email, password });
      setUser(createdUser);
      await login(email, password);
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  const logout: TAuthContext['logout'] = async () => {
    try {
      await userLogout();
      setUser(null);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error('Error logging out: ', errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registerThenLogin,
        login,
        logout,
        isLoadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
