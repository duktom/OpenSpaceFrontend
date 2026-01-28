import {
  GetUserByIdDataSchema,
  RegisterUserBody,
  RegisterUserDataSchema,
  User,
  UserDtoSchema,
} from './user.types';

export const UserDtoToEntitySchema = UserDtoSchema.transform(
  (data) =>
    ({
      id: data.id,
      description: data.description,
      accountId: data.account_id,
      firstName: data.first_name,
      lastName: data.last_name,
      birthDate: new Date(data.birth_date),
      profileImgId: data.profile_img_id,
      profileImgLink: data.profile_img_link,
    }) satisfies User
);

export const RegisterUserDataToDtoSchema = RegisterUserDataSchema.transform((data) => ({
  body: {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    password: data.password,
    birth_date: data.birthDate.toISOString().split('T')[0],
  } satisfies RegisterUserBody,
}));

export const GetUserByIdDataToDtoSchema = GetUserByIdDataSchema.transform((data) => ({
  params: {
    id: data.id,
  },
}));
