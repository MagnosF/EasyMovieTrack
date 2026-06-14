import * as Crypto from 'expo-crypto'; // criptografia da senha para segurança
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '../constants/theme';
import { globalStyles } from '../src/styles/globalStyles';
//Importa o gerenciador de sessão para salvar quem logou
import { AuthSession } from '../src/services/authSession';

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
    
    // Consulta ao banco dados para verificar se existe um usuário com o e-mail e senha fornecidos
    try {
      // Garante que o e-mail do login também fique todo minúsculo para bater com o banco
      const emailLimpo = email.trim().toLowerCase();

      // CRIPTOGRAFIA DA SENHA (Exigência do feedback): Transforma a senha digitada em Hash SHA-256
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password.trim()
      );

      console.log("Hash gerado no login:", hashedPassword);

      // Consulta ao banco de dados usando o hash gerado para verificar as credenciais do usuário
      const user = await db.getFirstAsync(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [emailLimpo, hashedPassword]
      );
      
      // Se um usuário for encontrado, salva seus dados na sessão e redireciona
      if (user) {
        // 🍿 7️⃣ SALVA A SESSÃO: Guarda o ID e o Email do usuário real para a tela de filmes saber quem ele é
        AuthSession.userId = user.id;
        AuthSession.userEmail = user.email;

        console.log(`Usuário conectado com sucesso! ID: ${user.id}, Nome: ${user.name}`);

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
        onChangeText={(text) => setEmail(text)} 
        autoCapitalize="none" 
        value={email} 
      />
      <TextInput 
        style={globalStyles.input} 
        placeholder="Senha" 
        placeholderTextColor={Theme.colors.textSecondary} 
        onChangeText={(text) => setPassword(text)} 
        secureTextEntry 
        value={password} 
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