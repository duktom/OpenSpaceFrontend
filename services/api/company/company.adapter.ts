import { Company, CompanySchemaDto } from './company.types';

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
      rating: data.rating,
      creationDate: new Date(data.creation_date),
    }) satisfies Company
);
