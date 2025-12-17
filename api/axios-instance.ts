import { getAuthToken } from '@/auth/token-storage';
import { env } from '@/env';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: env.EXPO_PUBLIC_BACKEND_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
