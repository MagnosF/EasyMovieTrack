import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '../constants/theme';
import { globalStyles } from '../src/styles/globalStyles';

// Tela de login, onde o usuário pode inserir seu e-mail e senha para acessar sua conta ou navegar para as telas de recuperação de senha e registro
export default function Login() {
  // Estados para armazenar o e-mail e a senha inseridos pelo usuário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const db = useSQLiteContext();
  const router = useRouter();

  // Função para lidar com o login do usuário, incluindo validação dos campos e consulta ao banco de dados para verificar as credenciais
  async function handleLogin() {
    if (!email || !password) return Alert.alert("Erro", "Preencha todos os campos.");
    
    // Consulta ao banco de dados para verificar se existe um usuário com o e-mail e senha fornecidos
    try {
      const user = await db.getFirstAsync(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );
      
      // Se um usuário for encontrado, redireciona para a tela de perfil passando o e-mail do usuário como parâmetro
      if (user) {
        router.replace(`/(tabs)/profile?userEmail=${user.email}`); 
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
      
      <TouchableOpacity onPress={() => router.push('/forgot-password')}>
        <Text style={globalStyles.linkText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={globalStyles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}