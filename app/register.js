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
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    // TENTA INSERIR O NOVO USUÁRIO NO BANCO DE DADOS
    try {
      // INSERE O USUÁRIO COM O PAPEL 'comum' POR PADRÃO
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
      <TextInput style={globalStyles.input} placeholder="Nome" placeholderTextColor={Theme.colors.textSecondary} onChangeText={setName} />
      <TextInput style={globalStyles.input} placeholder="E-mail" placeholderTextColor={Theme.colors.textSecondary} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={globalStyles.input} placeholder="Senha" placeholderTextColor={Theme.colors.textSecondary} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={globalStyles.linkText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}