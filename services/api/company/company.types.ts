import { z } from 'zod';

const BaseCompanyAddress = z.object({
  street: z.string().trim().nonempty(),
  city: z.string().trim().nonempty(),
});
const CompanyAddressDto = BaseCompanyAddress.extend({
  postal_code: z.string().trim().nonempty(),
  building_num: z.string().trim().nonempty(),
  apartment_num: z.string().trim().nonempty(),
});
const CompanyAddress = BaseCompanyAddress.extend({
  postalCode: z.string().trim().nonempty(),
  buildingNumber: z.string().trim().nonempty(),
  apartmentNumber: z.string().trim().nonempty(),
});

export const BaseCompanySchema = z.object({
  id: z.number().min(1),
  name: z.string().trim().nonempty(),
  description: z.string().trim().nullable(),
  ein: z
    .string()
    .trim()
    .length(10, 'EIN must be exactly 10 characters')
    .nonempty('EIN is required'),
  rating: z.number().min(1),
});

export const CompanySchemaDto = BaseCompanySchema.extend({
  address: CompanyAddressDto,
  creation_date: z.iso.datetime(),
  profile_img_id: z.string().trim().nonempty(),
  profile_img_link: z.url().nullable(),
});
export type CompanyDto = z.infer<typeof CompanySchemaDto>;

export const CompanySchema = BaseCompanySchema.extend({
  address: CompanyAddress,
  creationDate: z.date(),
  profileImgId: z.string().trim().nonempty(),
  profileImgLink: z.url().nullable(),
});
export type Company = z.infer<typeof CompanySchema>;
