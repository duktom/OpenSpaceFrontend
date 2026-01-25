import { z } from 'zod';
import { apiClient } from '../api-client';
import { UserDtoToEntitySchema } from './user.adapter';
import { GetAllUsersResponse, GetUserByIdParams, GetUserByIdParamsSchema, GetUserByIdResponse, RegisterUserBody, RegisterUserBodySchema, RegisterUserResponse, RegisterUserResponseSchema } from './user.types';

export const registerUser = async (body: RegisterUserBody): Promise<RegisterUserResponse> => {
  const validatedBody = RegisterUserBodySchema.parse(body);
  const res = await apiClient.post<RegisterUserResponse>('/account/register/user', validatedBody);
  return RegisterUserResponseSchema.parse(res.data);
};

export const getUserById = async (
  params: GetUserByIdParams
) => {
  const {id} = GetUserByIdParamsSchema.parse(params);
  const res = await apiClient.get<GetUserByIdResponse>(
    `/user/${id}`
  );
  return UserDtoToEntitySchema.parse(res.data);
};

export const getAllUsers = async () => {
  const res = await apiClient.get<GetAllUsersResponse>(
    "/user",
  );
  return z.array(UserDtoToEntitySchema).parse(res.data);
};
