import { env } from '@/env';
import { getAuthToken } from '@/services/auth/token-storage';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: env.EXPO_PUBLIC_BACKEND_BASE_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
