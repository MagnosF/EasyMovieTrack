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
      const user = await db.getFirstAsync('SELECT id FROM users WHERE email = ?', [email]);

      if (!user) {
        Alert.alert("Erro", "Este e-mail não está cadastrado.");
        return;
      }

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
      <TextInput style={globalStyles.input} placeholder="E-mail cadastrado" placeholderTextColor={Theme.colors.textSecondary} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={globalStyles.input} placeholder="Nova Senha" placeholderTextColor={Theme.colors.textSecondary} secureTextEntry onChangeText={setNewPassword} />
      <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleResetPassword}>
        <Text style={globalStyles.buttonText}>Atualizar Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={globalStyles.linkText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}