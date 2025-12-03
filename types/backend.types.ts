export type User = {
  id: string;
  email: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type CreateUser = LoginCredentials;
