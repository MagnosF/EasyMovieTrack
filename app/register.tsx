import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '../constants/theme';
import { globalStyles } from '../src/styles/globalStyles';

// Tela de registro, onde o usuário pode criar uma nova conta inserindo seu nome, e-mail e senha
export default function Register() {
  // Estados para armazenar o nome, e-mail e senha inseridos pelo usuário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Acesso ao banco de dados e navegação
  const db = useSQLiteContext();
  const router = useRouter();

  // Função para lidar com o registro do usuário, incluindo validação dos campos e inserção no banco de dados
  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    // Validação de senha: mínimo 6 caracteres
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    // Insere o novo usuário no banco de dados usando uma query SQL parametrizada para evitar injeção de SQL
    try {
      await db.runAsync(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, 'comum']
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
        onChangeText={setName} 
      />
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

      <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={globalStyles.linkText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}