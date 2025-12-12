import { useAppTheme } from '@/providers/app-theme-provider';
import { Button } from 'react-native-paper';

export function ToggleThemeButton() {
  const theme = useAppTheme();

  return <Button onPress={theme.toggleTheme}>Toggle Theme</Button>;
}
