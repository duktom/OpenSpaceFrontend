// import HomeIcon from '@/assets/svgs/home-icon.svg';
import { HeartIcon } from '@/assets/svgs/heart-icon';
import { HomeIcon } from '@/assets/svgs/home-icon';
import { UserIcon } from '@/assets/svgs/user-icon.';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#f5f5f5' },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#E81948',
        tabBarInactiveTintColor: '#696969',
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
          tabBarIcon: ({ color, size }) => <HeartIcon color={color} height={size} width={size} />,
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
