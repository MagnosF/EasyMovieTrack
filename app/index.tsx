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
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      // 1. Busca simples (sem toLowerCase por enquanto para não dar erro com cadastros antigos)
      const user: any = await db.getFirstAsync(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );

      console.log("Usuário encontrado:", user); // Verifique o que está retornando aqui
      if (user) {
        // 2. Navegação com a rota exata
        // Passa o email como parâmetro para a tela de perfil
        router.replace(`/(tabs)/profile?userEmail=${user.email}` as any); 
      } else {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao acessar o banco de dados.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EasyMovieTrack</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        placeholderTextColor="#aaa" 
        onChangeText={setEmail} 
        autoCapitalize="none" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        placeholderTextColor="#aaa" 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/forgot-password' as any)}>
        <Text style={styles.linkText}>Esqueceu a senha?</Text>
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