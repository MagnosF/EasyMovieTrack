import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '..//constants/theme';
import { globalStyles } from '../src/styles/globalStyles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const db = useSQLiteContext();
  const router = useRouter();

  async function handleLogin() {
    if (!email || !password) return Alert.alert("Erro", "Preencha todos os campos.");
    try {
      const user: any = await db.getFirstAsync(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );
      if (user) {
        router.replace(`/(tabs)/profile?userEmail=${user.email}` as any); 
      } else {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao acessar o banco.");
    }
  }

  return (
    <View style={globalStyles.safeArea}>
      <Text style={globalStyles.title}>EASY MOVIE TRACK</Text>
      
      <TextInput 
        style={globalStyles.input} 
        placeholder="E-mail" 
        placeholderTextColor={Theme.colors.textSecondary} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
      />
      <TextInput 
        style={globalStyles.input} 
        placeholder="Senha" 
        placeholderTextColor={Theme.colors.textSecondary} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/forgot-password' as any)}>
        <Text style={globalStyles.linkText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={globalStyles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}