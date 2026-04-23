import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Theme } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Um toque de estilo
        tabBarActiveTintColor: Theme.colors.primary, 
        tabBarInactiveTintColor: Theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Theme.colors.background, // Fundo preto profundo
          borderTopColor: '#1E252E',               // Linha sutil azulada
          height: 60,                              
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="movies"
        options={{
          title: 'CineStorm', // Título estilizado para o app
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="weather-lightning" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Avatar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="flash-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}