import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_access_token';

export const saveAuthToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getAuthToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const deleteAuthToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
