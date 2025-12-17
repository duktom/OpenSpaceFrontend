import { api } from '@/api/api';
import { getErrorMessage } from '@/helpers/get-error-message';
import { LoginCredentialsSchema } from '@/types/backend/account/login';
import { RegisterCredentialsSchema } from '@/types/backend/account/register';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { deleteAuthToken, saveAuthToken } from './token-storage';

type TAuthContext = {
  isLoading: boolean;
  isAuthenticated: boolean;
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

  const login: TAuthContext['login'] = async (email: string, password: string) => {
    try {
      const loginCredentials = LoginCredentialsSchema.parse({ email, password });
      const data = await api.auth.login(loginCredentials);
      await saveAuthToken(data.access_token);
      setIsAuthenticated(true);
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
      await api.auth.register(registerCredentials);
      await login(email, password);
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
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error('Error logging out: ', errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerThenLogin,
        login,
        logout,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
