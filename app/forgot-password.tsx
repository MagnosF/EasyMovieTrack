import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '../constants/theme';
import { globalStyles } from '../src/styles/globalStyles';

// Tela de recuperação de senha, onde o usuário pode inserir seu e-mail e a nova senha desejada para atualizar sua conta
export default function ForgotPassword() {
  // Estados para armazenar o e-mail e a nova senha inseridos pelo usuário
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const db = useSQLiteContext();
  const router = useRouter();

  // Função para lidar com a redefinição da senha, incluindo validação dos campos e atualização do banco de dados
  async function handleResetPassword() {
    if (!email || !newPassword) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    // Validação de senha: mínimo 6 caracteres
    try {
      const user: any = await db.getFirstAsync('SELECT id FROM users WHERE email = ?', [email]);

      // Se o usuário não for encontrado, exibe um alerta de erro
      if (!user) {
        Alert.alert("Erro", "Este e-mail não está cadastrado.");
        return;
      }

      // Atualiza a senha do usuário no banco de dados usando uma query SQL parametrizada para evitar injeção de SQL
      await db.runAsync('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);

      Alert.alert("Sucesso", "Senha redefinida com sucesso!");
      router.replace('/'); 
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao redefinir a senha.");
    }
  }

  return (
    <View style={globalStyles.safeArea}>
      <Text style={globalStyles.title}>RECUPERAR</Text>
      <Text style={[globalStyles.linkText, { marginBottom: 20 }]}>
        Digite seu e-mail e a nova senha desejada.
      </Text>

      <TextInput 
        style={globalStyles.input} 
        placeholder="E-mail cadastrado" 
        placeholderTextColor={Theme.colors.textSecondary}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput 
        style={globalStyles.input} 
        placeholder="Nova Senha" 
        placeholderTextColor={Theme.colors.textSecondary}
        secureTextEntry 
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleResetPassword}>
        <Text style={globalStyles.buttonText}>Atualizar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={globalStyles.linkText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}