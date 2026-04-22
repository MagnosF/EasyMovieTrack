import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const db = useSQLiteContext();
  const router = useRouter();

  async function handleResetPassword() {
    if (!email || !newPassword) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      // 1. Verifica se o e-mail existe no banco
      const user: any = await db.getFirstAsync('SELECT id FROM users WHERE email = ?', [email]);

      if (!user) {
        Alert.alert("Erro", "Este e-mail não está cadastrado.");
        return;
      }

      // 2. Atualiza a senha do usuário
      await db.runAsync('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);

      Alert.alert("Sucesso", "Senha redefinida com sucesso!");
      router.replace('/'); // Volta para o Login
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao redefinir a senha.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>Digite seu e-mail e a nova senha desejada.</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Seu e-mail cadastrado" 
        placeholderTextColor="#aaa"
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput 
        style={styles.input} 
        placeholder="Nova Senha" 
        placeholderTextColor="#aaa"
        secureTextEntry 
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Atualizar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { color: '#aaa', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#333', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#E50914', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  linkText: { color: '#aaa', textAlign: 'center', marginTop: 20 }
});