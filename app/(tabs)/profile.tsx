import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const router = useRouter();

  // Função de Logout
  function handleLogout() {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          onPress: () => router.replace('/')
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>M</Text> 
        </View>
        <Text style={styles.userName}>Usuário Magno</Text>
        <Text style={styles.userEmail}>magno@email.com</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Editar Perfil (HU2)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  header: { alignItems: 'center', marginTop: 50, marginBottom: 40 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E50914', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  userName: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  userEmail: { color: '#aaa', fontSize: 16 },
  menu: { width: '100%' },
  menuItem: { backgroundColor: '#333', padding: 15, borderRadius: 8, marginBottom: 10 },
  menuItemText: { color: '#fff', fontSize: 16 },
  logoutItem: { borderStyle: 'solid', borderWidth: 1, borderColor: '#E50914', marginTop: 20 },
  logoutText: { color: '#E50914', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});