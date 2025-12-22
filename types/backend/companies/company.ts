import { z } from 'zod';

export const CompanySchema = z.object({
  id: z.number().min(1),
  name: z.string().trim().nonempty(),
  description: z.string().trim().nullable(),
  logo: z.url(),
  rating: z.number().min(1),
  creationDate: z.iso.datetime().transform((val) => new Date(val)),
});
export type Company = z.infer<typeof CompanySchema>;

export const GetCompanyResponseSchema = CompanySchema;
export type GetCompanyResponse = z.infer<typeof GetCompanyResponseSchema>;
