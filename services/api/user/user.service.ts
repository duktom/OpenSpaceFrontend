import { GetUserByIdDataToDtoSchema, RegisterUserDataToDtoSchema } from './user.adapter';
import * as userApi from './user.api';
import { GetUserByIdData, RegisterUserData } from './user.types';

export const registerUser = async (data: RegisterUserData) => {
  const { body } = RegisterUserDataToDtoSchema.parse(data);
  return await userApi.registerUser(body);
};

export const getUserById = async (data: GetUserByIdData) => {
  const { params } = GetUserByIdDataToDtoSchema.parse(data);
  return await userApi.getUserById(params);
};

export const getAllUsers = async () => {
  return await userApi.getAllUsers();
};
