import * as Crypto from 'expo-crypto'; // criptografia da senha para segurança
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '../constants/theme';
import { globalStyles } from '../src/styles/globalStyles';

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

    // NOVA VALIDAÇÃO DE SEGURANÇA (HU1 e HU3)
    if (newPassword.length < 6) {
      Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const emailLimpo = email.trim().toLowerCase();

      const user = await db.getFirstAsync('SELECT id FROM users WHERE email = ?', [emailLimpo]);

      if (!user) {
        Alert.alert("Erro", "Este e-mail não está cadastrado.");
        return;
      }

      // CRIPTOGRAFIA DA NOVA SENHA (Exigência do feedback): Transforma a nova senha em Hash SHA-256 antes de salvar
      const hashedNewPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        newPassword.trim()
      );

      // Atualiza o banco de dados salvando o HASH criptografado
      await db.runAsync('UPDATE users SET password = ? WHERE email = ?', [hashedNewPassword, emailLimpo]);

      Alert.alert("Sucesso", "Senha redefinida com sucesso!");
      router.replace('/'); 
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao redefinir a senha.");
    }
  }

  return (
    <View style={globalStyles.safeArea}>
      <Text style={globalStyles.title}>RECUPERAR</Text>
      
      <TextInput 
        style={globalStyles.input} 
        placeholder="E-mail cadastrado" 
        placeholderTextColor={Theme.colors.textSecondary} 
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none" 
        value={email}
      />
      
      <TextInput 
        style={globalStyles.input} 
        placeholder="Nova Senha" 
        placeholderTextColor={Theme.colors.textSecondary} 
        secureTextEntry 
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
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