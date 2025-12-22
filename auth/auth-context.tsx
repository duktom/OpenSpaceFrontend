import { api } from '@/api/api';
import { ErrorView } from '@/components/error/error-view';
import { LoadingIconView } from '@/components/loading/loading-icon-view';
import { getErrorMessage } from '@/helpers/get-error-message';
import { LoginCredentialsSchema } from '@/types/backend/account/login';
import {
  RegisterCompanyCredentials,
  RegisterCompanyCredentialsSchema,
} from '@/types/backend/account/register-company';
import {
  RegisterUserCredentials,
  RegisterUserCredentialsSchema,
} from '@/types/backend/account/register-user';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { z } from 'zod';
import { deleteAuthToken, saveAuthToken } from './token-storage';

type TAuthContext = {
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

const useAuthLogin = (): TAuthContext['login'] => {
  const { mutateAsync: loginMutateAsync } = api.auth.mutations.useLogin();
  const queryClient = useQueryClient();

  return async (loginData) => {
    try {
      const loginCredentials = LoginCredentialsSchema.parse(loginData);
      await loginMutateAsync(loginCredentials);
      await queryClient.invalidateQueries({
        queryKey: api.auth.keys.getToken(),
      });
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };
};

const useAuthLogout = () => {
  const {
    mutateAsync: logoutMutateAsync,
    isPending,
    isError,
    error,
  } = api.auth.mutations.useLogout();
  const queryClient = useQueryClient();

  const logout: TAuthContext['logout'] = async () => {
    try {
      await logoutMutateAsync();
      await deleteAuthToken();
      queryClient.setQueryData(api.auth.keys.getToken(), null);
      queryClient.removeQueries({
        queryKey: api.auth.keys.getToken(),
      });
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  return {
    logout,
    isPending,
    isError,
    error,
  };
};

const useAuthRegisterUser = (): TAuthContext['registerUserThenLogin'] => {
  const { mutateAsync: registerUserMutateAsync } = api.auth.mutations.useRegisterUser();

  return async (data) => {
    try {
      const credentials = RegisterUserCredentialsSchema.parse(data);
      await registerUserMutateAsync(credentials);
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };
};

const useAuthRegisterCompany = (): TAuthContext['registerCompanyThenLogin'] => {
  const { mutateAsync: registerCompanyMutateAsync } = api.auth.mutations.useRegisterCompany();

  return async (data) => {
    try {
      const credentials = RegisterCompanyCredentialsSchema.parse(data);
      await registerCompanyMutateAsync(credentials);
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };
};

const useAuthToken = () => {
  const { data: tokenData, isLoading, isError } = api.auth.queries.useGetToken();

  useEffect(() => {
    if (!tokenData?.access_token) return;
    saveAuthToken(tokenData.access_token);
  }, [tokenData?.access_token]);

  useEffect(() => {
    if (!isError) return;
    deleteAuthToken();
  }, [isError]);

  return {
    isAuthenticated: Boolean(tokenData),
    isLoading,
  };
};

export function AuthProvider({ children }: PropsWithChildren) {
  const { isLoading: isTokenLoading, isAuthenticated } = useAuthToken();
  const login = useAuthLogin();
  const {
    logout,
    isPending: isLogoutPending,
    isError: isLogoutError,
    error: logoutError,
  } = useAuthLogout();
  const registerUser = useAuthRegisterUser();
  const registerCompany = useAuthRegisterCompany();

  const registerUserThenLogin: TAuthContext['registerUserThenLogin'] = async (data) => {
    const error = await registerUser(data);
    if (error) return error;
    return login(data);
  };

  const registerCompanyThenLogin: TAuthContext['registerCompanyThenLogin'] = async (data) => {
    const error = await registerCompany(data);
    if (error) return error;
    return login(data);
  };

  if (isTokenLoading || isLogoutPending) return <LoadingIconView />;
  if (isLogoutError) return <ErrorView error={logoutError} />;

  return (
    <AuthContext.Provider
      value={{
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
