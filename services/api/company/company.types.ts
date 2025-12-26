import { z } from 'zod';

export const BaseCompanySchema = z.object({
  id: z.number().min(1),
  name: z.string().trim().nonempty(),
  description: z.string().trim().nullable(),
  logo: z.url(),
  rating: z.number().min(1),
});

export const CompanySchemaDto = BaseCompanySchema.extend({
  creationDate: z.iso.datetime(),
});
export type CompanyDto = z.infer<typeof CompanySchemaDto>;

export const CompanySchema = BaseCompanySchema.extend({
  creationDate: z.date(),
});
export type Company = z.infer<typeof CompanySchema>;
