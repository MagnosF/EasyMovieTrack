import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const router = useRouter();
  const db = useSQLiteContext();
  const params = useLocalSearchParams(); // Captura o userEmail enviado pelo Login
  
  const [user, setUser] = useState<any>(null);

  async function loadUserData() {
    // Verifica se o email do usuário foi passado como parâmetro
    try {
      // Busca os dados do usuário com base no email recebido
      if (params.userEmail) {
        const result = await db.getFirstAsync(
          'SELECT name, email, role FROM users WHERE email = ?',
          [params.userEmail as string]
        );
        // Se encontrar o usuário, atualiza o estado para exibir os dados no perfil
        if (result) {
          setUser(result);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  }

  // Recarrega sempre que entrar na tela ou o e-mail mudar
  useEffect(() => {
    loadUserData();
  }, [params.userEmail]);
  // Função para lidar com logout, redirecionando para a tela de login
  function handleLogout() {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: () => router.replace('/') }
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name[0].toUpperCase() : '?'}
          </Text> 
        </View>
        
        {/* Mostra os dados reais ou um aviso se estiver carregando */}
        <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
        <Text style={styles.userEmail}>{user?.email || "E-mail não identificado"}</Text>
        
        <View style={styles.badge}>
          <Text style={styles.roleText}>{user?.role?.toUpperCase() || 'COMUM'}</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => Alert.alert("Aviso", "Funcionalidade de edição em breve!")}
        >
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
  badge: { backgroundColor: '#333', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20, marginTop: 10 },
  roleText: { color: '#E50914', fontSize: 12, fontWeight: 'bold' },
  menu: { width: '100%' },
  menuItem: { backgroundColor: '#333', padding: 15, borderRadius: 8, marginBottom: 10 },
  menuItemText: { color: '#fff', fontSize: 16 },
  logoutItem: { borderStyle: 'solid', borderWidth: 1, borderColor: '#E50914', marginTop: 20 },
  logoutText: { color: '#E50914', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});