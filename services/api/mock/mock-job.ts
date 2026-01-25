import { JobDto } from '../job/job.types';
import { MOCK_COMPANY } from './mock-company';
import { MOCK_PAST_DATE } from './mock-past-date';

export const MOCK_DEFAULT_JOB_PROFILE_IMAGE = 'https://i.imgur.com/KnGOSrE.png';

export const MOCK_JOB: JobDto = {
  id: 1,
  title: 'Database administrator (DBA)',
  description:
    'Join the Microsoft engineering team and help us manage global database systems that are critical to our business. We are looking for an expert who will ensure optimal performance, availability, and security for our data platforms.\n\nRequired qualifications:\n- Minimum 3 years of experience as a DBA.\n- Proficiency in MS SQL Server and strong experience with the Microsoft Azure Data platform.\n- Ability to write and optimize T-SQL code.\n- Knowledge of database security and automation issues (e.g., PowerShell).',
  payoff: 6000,
  posting_img_id: 'KnGOSrE',
  posting_img_link: 'https://i.imgur.com/KnGOSrE.png',
  posting_date: MOCK_PAST_DATE,
  expiry_date: null,
  company_id: MOCK_COMPANY.id,
};
