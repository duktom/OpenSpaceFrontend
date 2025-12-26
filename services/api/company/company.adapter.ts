import { Company, CompanySchemaDto } from './company.types';

export const CompanyDtoToEntitySchema = CompanySchemaDto.transform(
  (data) =>
    ({
      ...data,
      creationDate: new Date(data.creationDate),
    }) satisfies Company
);
