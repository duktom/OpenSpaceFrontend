import { api } from '@/api/api';
import { getErrorMessage } from '@/helpers/get-error-message';
import { LoginCredentialsSchema, RegisterCredentialsSchema, User } from '@/types/backend.types';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

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
      const user = await api.auth.getUser();
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
      const loginCredentials = LoginCredentialsSchema.parse({ email, password });
      await api.auth.login(loginCredentials);
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
      const registerCredentials = RegisterCredentialsSchema.parse({ email, password });
      const createdUser = await api.auth.register(registerCredentials);
      setUser(createdUser);
      await login(email, password);
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  const logout: TAuthContext['logout'] = async () => {
    try {
      await api.auth.logout();
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
