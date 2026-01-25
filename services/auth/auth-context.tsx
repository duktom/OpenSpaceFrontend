import { ErrorView } from '@/components/error/error-view';
import { LoadingIconView } from '@/components/loading/loading-icon-view';
import { getApiErrorMessages } from '@/helpers/get-api-error-messages';
import { api } from '@/services/api';
import {
  LoginData
} from '@/services/api/account/account.types';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { RegisterCompanyData } from '../api/company/company.types';
import { RegisterUserData } from '../api/user/user.types';
import { deleteAuthToken, saveAuthToken } from './token-storage';

type TAuthContext = {
  isAuthenticated: boolean;
  registerUserThenLogin: (registerUserData: RegisterUserData) => Promise<string | null>;
  registerCompanyThenLogin: (registerCompanyData: RegisterCompanyData) => Promise<string | null>;
  login: (loginData: LoginData) => Promise<string | null>;
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
  const { mutateAsync: loginMutateAsync } = api.account.mutations.useLogin();
  const queryClient = useQueryClient();

  return async (loginData) => {
    try {
      const response = await loginMutateAsync(loginData);

      if (response?.accessToken) {
        saveAuthToken(response.accessToken);
        queryClient.setQueryData(api.account.keys.getToken(), response);
      }

      await queryClient.invalidateQueries({
        queryKey: api.account.keys.getToken(),
      });

      return null;
    } catch (error) {
      return getApiErrorMessages(error).join(', ');
    }
  };
};

const useAuthLogout = () => {
  const {
    mutateAsync: logoutMutateAsync,
    isPending,
    isError,
    error,
  } = api.account.mutations.useLogout();
  const queryClient = useQueryClient();

  const logout: TAuthContext['logout'] = async () => {
    try {
      await logoutMutateAsync();
      await deleteAuthToken();
      queryClient.setQueryData(api.account.keys.getToken(), null);
      queryClient.removeQueries({
        queryKey: api.account.keys.getToken(),
      });
      return null;
    } catch (error) {
      return getApiErrorMessages(error).join(', ');
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
  const { mutateAsync: registerUserMutateAsync } = api.account.mutations.useRegisterUser();

  return async (data) => {
    try {
      await registerUserMutateAsync(data);
      return null;
    } catch (error) {
      return getApiErrorMessages(error).join(', ');
    }
  };
};

const useAuthRegisterCompany = (): TAuthContext['registerCompanyThenLogin'] => {
  const { mutateAsync: registerCompanyMutateAsync } = api.account.mutations.useRegisterCompany();

  return async (data) => {
    try {
      await registerCompanyMutateAsync(data);
      return null;
    } catch (error) {
      return getApiErrorMessages(error).join(', ');
    }
  };
};

const useAuthToken = () => {
  const { data: tokenData, isLoading, isError } = api.account.queries.useGetToken();

  useEffect(() => {
    if (!tokenData?.accessToken) return;
    saveAuthToken(tokenData.accessToken);
  }, [tokenData?.accessToken]);

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
