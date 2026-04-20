import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const db = useSQLiteContext();
  const router = useRouter();

  async function handleLogin() {
    try {
      // Busca o usuário no banco (HU3)
      const user: any = await db.getFirstAsync(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );

      if (user) {
        Alert.alert("Bem-vindo!", `Olá, ${user.name}`);
        // Redireciona para a área logada (movies tab)
        router.replace('/(tabs)/movies'); 
      } else {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao acessar o banco de dados.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EasyMovieTrack</Text>
      
      <TextInput style={styles.input} placeholder="E-mail" onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha" onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 32, color: '#E50914', marginBottom: 40, textAlign: 'center', fontWeight: 'bold' },
  input: { backgroundColor: '#333', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#E50914', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#aaa', textAlign: 'center', marginTop: 15 }
});