// import HomeIcon from '@/assets/svgs/home-icon.svg';
import { HomeIcon } from '@/assets/svgs/home-icon';
import { OutlineHeartIcon } from '@/assets/svgs/outline-heart-icon';
import { UserIcon } from '@/assets/svgs/user-icon.';
import { useAppTheme } from '@/providers/app-theme-provider';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  const theme = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.light,
          borderColor: theme.colors.border,
          elevation: 2,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.muted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} height={size} width={size} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <OutlineHeartIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <UserIcon color={color} height={size} width={size} />,
        }}
      />
    </Tabs>
  );
}
