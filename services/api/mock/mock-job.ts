import { JobDto } from '../job/job.types';
import { mockCompany } from './mock-company';
import { mockUser } from './mock-user';

const getOneMonthAgo = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString();
};

export const mockJob: JobDto = {
  id: 1,
  title: 'Database administrator (DBA)',
  description:
    'Join the Microsoft engineering team and help us manage global database systems that are critical to our business. We are looking for an expert who will ensure optimal performance, availability, and security for our data platforms.\n\nRequired qualifications:\n- Minimum 3 years of experience as a DBA.\n- Proficiency in MS SQL Server and strong experience with the Microsoft Azure Data platform.\n- Ability to write and optimize T-SQL code.\n- Knowledge of database security and automation issues (e.g., PowerShell).',
  location: 'Al. Jerozolimskie 195A, 02-222 Warszawa',
  salary: 6000,
  photos: [
    'https://i.imgur.com/KnGOSrE.png',
    'https://i.imgur.com/KnGOSrE.png',
    'https://i.imgur.com/KnGOSrE.png',
  ],
  postingDate: getOneMonthAgo(),
  expiryDate: null,
  company: mockCompany,
  poster: mockUser,
};
