import * as Crypto from 'expo-crypto'; // criptografia da senha para segurança
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '../constants/theme';
import { globalStyles } from '../src/styles/globalStyles';

export default function Register() {
  // ESTADO PARA OS CAMPOS DE REGISTRO
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // CONTEXTOS PARA ACESSAR O BANCO DE DADOS E NAVEGAÇÃO
  const db = useSQLiteContext();
  const router = useRouter();

  // FUNÇÃO PARA LIDAR COM O REGISTRO DO USUÁRIO
  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    // VALIDAÇÃO DO FORMATO DE E-MAIL (Exigência do feedback)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Por favor, insira um e-mail em formato válido.");
      return;
    }

    // VALIDAÇÃO BÁSICA DE SEGURANÇA (HU1 e HU3): A senha deve ter pelo menos 6 caracteres
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // TENTA INSERIR O NOVO USUÁRIO NO BANCO DE DADOS
    try {
      const nomeLimpo = name.trim();
      const emailLimpo = email.trim().toLowerCase();

      // CRIPTOGRAFIA DA SENHA (Exigência do feedback)
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password.trim()
      );

      // INSERE O USUÁRIO COM A SENHA CRIPTOGRAFADA E O PAPEL 'comum' POR PADRÃO
      await db.runAsync(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [nomeLimpo, emailLimpo, hashedPassword, 'comum']
      );
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      router.replace('/'); 
    } catch (error) {
      Alert.alert("Erro", "E-mail já cadastrado ou erro no banco.");
    }
  }

  return (
    <View style={globalStyles.safeArea}>
      <Text style={globalStyles.title}>CRIAR CONTA</Text>
      
      <TextInput 
        style={globalStyles.input} 
        placeholder="Nome" 
        placeholderTextColor={Theme.colors.textSecondary} 
        onChangeText={(text) => setName(text)} 
        value={name} 
      />
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

      <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={globalStyles.linkText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}