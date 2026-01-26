import { CompanyDto } from '../company/company.types';
import { CompanyRatingDto } from '../company/rating/company-rating.types';

export const MOCK_DEFAULT_COMPANY_PROFILE_IMAGE = 'https://i.imgur.com/EwbYomy.png';

const MOCK_COMPANY_DESCRIPTION = `### What is important to us?

**Global impact** – we work on projects that matter to millions of users around the world,

**Innovations** – we believe that technology can be a driving force for positive change

**People** – we create a culture of cooperation, diversity, and mutual support,

**Development** – we invest in your professional and personal development by offering mentoring and opportunities to work in international teams.
`;

export const MOCK_COMPANY: CompanyDto = {
  id: 1,
  name: 'Mirosoft',
  description: MOCK_COMPANY_DESCRIPTION,
  profile_img_id: 'EwbYomy',
  profile_img_link: 'https://i.imgur.com/EwbYomy.png',
  address: {
    apartment_num: '1',
    building_num: '195A',
    city: 'Warszawa',
    postal_code: '02-222',
    street: 'Al. Jerozolimskie',
  },
  ein: '8230123543',
};

export const MOCK_COMPANY_RATING: CompanyRatingDto = {
  company_id: 1,
  rating: 4.6,
  ratings_count: 85,
};
