import { useAuth } from '@/services/auth/auth-context';
import CompanyProfileScreen from './_company-profile';
import ApplicantProfileScreen from './_applicant-profile';

export default function ProfileScreen() {
  const { accountType } = useAuth();
  if (accountType === 'admin') return <CompanyProfileScreen />;
  return <ApplicantProfileScreen />;
}
