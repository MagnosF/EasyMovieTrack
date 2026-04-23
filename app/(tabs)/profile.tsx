import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../constants/theme';
import { globalStyles } from '../../src/styles/globalStyles';

interface UserData {
  name: string;
  email: string;
  role: string;
  avatar_color?: string;
  avatar_icon?: string;
}

const COLORS = ['#00E5FF', '#7B61FF', '#FFFFFF', '#4CC9FE', '#3F72AF', '#2D333B'];
const ICONS = ['weather-lightning', 'flash', 'weather-pouring', 'movie-roll', 'popcorn', 'star'];

export default function Profile() {
  const router = useRouter();
  const db = useSQLiteContext();
  const params = useLocalSearchParams();
  
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [selectedColor, setSelectedColor] = useState(Theme.colors.primary);
  const [selectedIcon, setSelectedIcon] = useState('weather-lightning');

  async function loadUserData() {
    try {
      if (params.userEmail) {
        const result = await db.getFirstAsync<UserData>(
          'SELECT name, email, role, avatar_color, avatar_icon FROM users WHERE email = ?',
          [params.userEmail as string]
        );
        if (result) {
          setUser(result);
          setNewName(result.name);
          setSelectedColor(result.avatar_color || Theme.colors.primary);
          setSelectedIcon(result.avatar_icon || 'weather-lightning');
        }
      }
    } catch (error) { console.error(error); }
  }

  useEffect(() => { loadUserData(); }, [params.userEmail]);

  function handleLogout() {
    Alert.alert("Sair", "Deseja encerrar sessão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: () => router.replace('/') }
    ]);
  }

  async function handleUpdateProfile() {
    try {
      let query = `UPDATE users SET name = '${newName}', avatar_color = '${selectedColor}', avatar_icon = '${selectedIcon}'`;
      if (newPassword.trim().length > 0) {
        if (newPassword.length < 6) return Alert.alert("Erro", "Senha muito fraca! Mínimo 6 caracteres.");
        query += `, password = '${newPassword}'`;
      }
      query += ` WHERE email = '${user?.email}'`;
      await db.execAsync(query);
      if (user) setUser({ ...user, name: newName, avatar_color: selectedColor, avatar_icon: selectedIcon });
      setIsEditing(false);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error) { Alert.alert("Erro", "A conexão caiu..."); }
  }

  return (
    <ScrollView style={{backgroundColor: Theme.colors.background}} contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
      <View style={styles.header}>
        {/* Avatar com Brilho Exterior (Glow) */}
        <View style={[styles.avatarCircle, { backgroundColor: selectedColor, shadowColor: selectedColor }]}>
           <MaterialCommunityIcons name={selectedIcon as any} size={60} color={selectedColor === '#FFFFFF' ? '#000' : 'white'} />
        </View>

        {isEditing ? (
          <View style={{ width: '100%' }}>
            <Text style={styles.label}>COR:</Text>
            <View style={styles.row}>
              {COLORS.map(color => (
                <TouchableOpacity 
                  key={color} 
                  style={[styles.colorDot, { backgroundColor: color, borderColor: 'white', borderWidth: selectedColor === color ? 2 : 0 }]} 
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>

            <Text style={styles.label}>ÍCONE:</Text>
            <View style={styles.row}>
              {ICONS.map(icon => (
                <TouchableOpacity 
                  key={icon} 
                  style={[styles.iconBox, { backgroundColor: selectedIcon === icon ? Theme.colors.primary : Theme.colors.surface }]} 
                  onPress={() => setSelectedIcon(icon)}
                >
                  <MaterialCommunityIcons name={icon as any} size={24} color={selectedIcon === icon ? 'black' : 'white'} />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput style={globalStyles.input} value={newName} onChangeText={setNewName} placeholder="Nome" placeholderTextColor="#aaa" />
            <TextInput style={globalStyles.input} value={newPassword} onChangeText={setNewPassword} secureTextEntry placeholder="Nova Senha" placeholderTextColor="#aaa" />
            
            <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleUpdateProfile}>
              <Text style={globalStyles.buttonText}>SALVAR TUDO</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={[globalStyles.title, { marginBottom: 5 }]}>{user?.name}</Text>
            <Text style={{ color: Theme.colors.textSecondary, marginBottom: 20 }}>{user?.email}</Text>
            
            <TouchableOpacity style={globalStyles.buttonPrimary} onPress={() => setIsEditing(true)}>
              <Text style={globalStyles.buttonText}>CUSTOMIZAR PERFIL</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={{ color: Theme.colors.danger, fontWeight: 'bold' }}>SAIR DA CONTA</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center' },
  avatarCircle: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 25, elevation: 15, shadowOpacity: 0.8, shadowRadius: 20 },
  label: { color: Theme.colors.primary, fontSize: 12, fontWeight: '900', marginBottom: 10, marginTop: 10, letterSpacing: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  colorDot: { width: 35, height: 35, borderRadius: 18 },
  iconBox: { width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  logoutBtn: { marginTop: 20, padding: 15, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: Theme.colors.danger, borderRadius: 12 }
});