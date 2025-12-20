import { api } from '@/api/api';
import { getErrorMessage } from '@/helpers/get-error-message';
import { LoginCredentialsSchema } from '@/types/backend/account/login';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { deleteAuthToken, saveAuthToken } from './token-storage';
import { z } from 'zod';
import {
  RegisterUserCredentials,
  RegisterUserCredentialsSchema,
} from '@/types/backend/account/register-user';
import {
  RegisterCompanyCredentials,
  RegisterCompanyCredentialsSchema,
} from '@/types/backend/account/register-company';

type TAuthContext = {
  isLoading: boolean;
  isAuthenticated: boolean;
  registerUserThenLogin: (registerUserData: RegisterUserCredentials) => Promise<string | null>;
  registerCompanyThenLogin: (
    registerCompanyData: RegisterCompanyCredentials
  ) => Promise<string | null>;
  login: (loginData: z.infer<typeof LoginCredentialsSchema>) => Promise<string | null>;
  logout: () => Promise<string | null>;
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
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getAndSetCurrentUser = async (shouldDisplayError: boolean = true) => {
    setIsLoading(true);
    try {
      const data = await api.auth.getUser();
      await saveAuthToken(data.access_token);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      await deleteAuthToken();
      setIsAuthenticated(false);
      setIsLoading(false);
      if (!shouldDisplayError) return;
      const errorMessage = getErrorMessage(error);
      console.error('Error fetching user: ', errorMessage);
    }
  };

  useEffect(() => {
    (async () => {
      await getAndSetCurrentUser(false);
    })();
  }, []);

  const login: TAuthContext['login'] = async (loginData) => {
    try {
      const loginCredentials = LoginCredentialsSchema.parse(loginData);
      const data = await api.auth.login(loginCredentials);
      await saveAuthToken(data.access_token);
      setIsAuthenticated(true);
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  const registerUserThenLogin: TAuthContext['registerUserThenLogin'] = async (registerUserData) => {
    try {
      const registerCredentials = RegisterUserCredentialsSchema.parse(registerUserData);
      await api.auth.register.user(registerCredentials);
      await login(registerCredentials);
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  const registerCompanyThenLogin: TAuthContext['registerCompanyThenLogin'] = async (
    registerCompanyData
  ) => {
    try {
      const registerCredentials = RegisterCompanyCredentialsSchema.parse(registerCompanyData);
      await api.auth.register.company(registerCredentials);
      await login(registerCredentials);
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  const logout: TAuthContext['logout'] = async () => {
    try {
      await api.auth.logout();
      await deleteAuthToken();
      setIsAuthenticated(false);
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        login,
        logout,
        registerUserThenLogin,
        registerCompanyThenLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
