import { z } from 'zod';

// Base cuz the same in BE & FE
export const BaseCompanySchema = z.object({
  id: z.number().min(1),
  name: z.string().trim().nonempty(),
  description: z.string().trim().nullable(),
  logo: z.url(),
  rating: z.number().min(1),
});

// * Full schemas *
const CompanySchemaBE = BaseCompanySchema.extend({
  creationDate: z.iso.datetime(),
});
export type BECompany = z.infer<typeof CompanySchemaBE>;
const CompanySchemaFE = BaseCompanySchema.extend({
  creationDate: z.date(),
});
export type FECompany = z.infer<typeof CompanySchemaFE>;

// * Transformers from BE to FE *
const GetCompanySchema = CompanySchemaBE.transform(
  (data) =>
    ({
      ...data,
      creationDate: new Date(data.creationDate),
    }) satisfies FECompany
);

// * Transformers from FE to BE *
const CreateCompanySchema = CompanySchemaFE.transform((data) => ({
  params: {},
  body: {
    ...data,
    creationDate: data.creationDate.toISOString(),
  },
}));
const UpdateCompanySchema = CompanySchemaFE.transform((data) => ({
  params: {
    id: data.id,
  },
  body: {
    ...data,
    creationDate: data.creationDate.toISOString(),
  },
}));
const DeleteCompanySchema = CompanySchemaFE.pick({ id: true }).transform((data) => ({
  params: {
    id: data.id,
  },
  body: {},
}));

// * Successful responses *
const CreateCompanySchemaResponse = z.object({
  message: z.string().trim().nonempty(),
});
const UpdateCompanySchemaResponse = z.object({
  message: z.string().trim().nonempty(),
});
const DeleteCompanySchemaResponse = z.object({
  message: z.string().trim().nonempty(),
});

export const CompanySchema = {
  get: GetCompanySchema,
  create: CreateCompanySchema,
  update: UpdateCompanySchema,
  delete: DeleteCompanySchema,
};

export const GetCompanyResponseSchema = CompanySchema;
export type GetCompanyResponse = z.infer<typeof GetCompanyResponseSchema>;
