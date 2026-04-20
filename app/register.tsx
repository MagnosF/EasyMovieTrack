import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const db = useSQLiteContext();
  const router = useRouter();

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      // Salva no banco de dados (HU1)
      await db.runAsync(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, 'comum']
      );

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      router.replace('/'); // Volta para a tela inicial (Login)
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "E-mail já cadastrado ou erro no banco.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      
      <TextInput style={styles.input} placeholder="Nome" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="E-mail" onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha" onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 24, color: '#fff', marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: { backgroundColor: '#333', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#E50914', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#aaa', textAlign: 'center', marginTop: 15 }
});