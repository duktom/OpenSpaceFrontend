import { Company, CompanySchemaDto, GetCompanyByIdDataSchema, RegisterCompanyBody, RegisterCompanyDataSchema, RegisterCompanyResponseSchema } from './company.types';

export const CompanyDtoToEntitySchema = CompanySchemaDto.transform(
  (data) =>
    ({
      id: data.id,
      name: data.name,
      ein: data.ein,
      description: data.description,
      profileImgId: data.profile_img_id,
      profileImgLink: data.profile_img_link,
      address: {
        street: data.address.street,
        apartmentNumber: data.address.apartment_num,
        buildingNumber: data.address.building_num,
        city: data.address.city,
        postalCode: data.address.city,
      },
    }) satisfies Company
);

export const RegisterCompanyDataToDtoSchema = RegisterCompanyDataSchema.transform((data) => ({
  body: {
    email: data.email,
    password: data.password,
    name: data.name,
    ein: data.ein,
  } satisfies RegisterCompanyBody,
}));
export const RegisterCompanyResponseSchemaDtoToData = RegisterCompanyResponseSchema.transform((data) => ({
  accountId: data.account_id,
  companyId: data.company_id,
}));

export const GetCompanyByIdDataToDtoSchema = GetCompanyByIdDataSchema.transform((data) => ({
  params: {
    id: data.id,
  },
}));
