import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E50914', // Vermelho EasyMovie
        tabBarStyle: { backgroundColor: '#121212' }, // Fundo escuro nas abas
        headerShown: false,
      }}>
      <Tabs.Screen 
        name="movies"  
        options={{ title: 'Filmes' }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ title: 'Perfil' }} 
      />
    </Tabs>
  );
}