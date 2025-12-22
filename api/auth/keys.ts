export const AUTH_KEYS = {
  all: ['auth'] as const,
  getToken: () => [...AUTH_KEYS.all, 'token'] as const,
  login: () => [...AUTH_KEYS.all, 'login'] as const,
  logout: () => [...AUTH_KEYS.all, 'logout'] as const,
  registerUser: () => [...AUTH_KEYS.all, 'register-user'] as const,
  registerCompany: () => [...AUTH_KEYS.all, 'register-company'] as const,
} as const;
