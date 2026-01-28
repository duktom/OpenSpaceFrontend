export const ACCOUNT_KEYS = {
  all: ['auth'] as const,
  getMe: () => [...ACCOUNT_KEYS.all, 'me'] as const,
  login: () => [...ACCOUNT_KEYS.all, 'login'] as const,
  logout: () => [...ACCOUNT_KEYS.all, 'logout'] as const,
} as const;
