import { useAuth } from '@/auth/auth-context';
import { Button } from 'react-native-paper';

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button icon="logout" mode="text" onPress={logout}>
      Logout
    </Button>
  );
}
