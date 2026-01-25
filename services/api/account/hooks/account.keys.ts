export const ACCOUNT_KEYS = {
  all: ['auth'] as const,
  getToken: () => [...ACCOUNT_KEYS.all, 'token'] as const,
  login: () => [...ACCOUNT_KEYS.all, 'login'] as const,
  logout: () => [...ACCOUNT_KEYS.all, 'logout'] as const,
} as const;
