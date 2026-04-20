import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from '../src/database/initializeDatabase';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="easymovie.db" onInit={initializeDatabase}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} /> {/* Tela de Login */}
        <Stack.Screen name="register" options={{ title: 'Cadastro' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> {/* Área Logada */}
      </Stack>
    </SQLiteProvider>
  );
}