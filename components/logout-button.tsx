import { useAuth } from '@/services/auth/auth-context';
import { useState } from 'react';
import { Button } from 'react-native-paper';

export function LogoutButton() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <Button disabled={loading} icon="logout" loading={loading} mode="text" onPress={handleLogout}>
      Logout
    </Button>
  );
}
