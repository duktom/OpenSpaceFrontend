import { useAuth } from '@/services/auth/auth-context';
import { ComponentProps, useState } from 'react';
import { Button } from 'react-native-paper';

type LogoutButtonProps = Omit<
  ComponentProps<typeof Button>,
  'loading' | 'onPress' | 'disabled' | 'children'
>;

export function LogoutButton(props: LogoutButtonProps) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      icon="logout"
      loading={loading}
      mode="text"
      onPress={handleLogout}
      {...props}
    >
      Logout
    </Button>
  );
}
