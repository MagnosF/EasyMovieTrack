import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../constants/theme';
import { globalStyles } from '../src/styles/globalStyles';

// Tela de Gerenciamento de Usuários - Exclusiva para Administradores
export default function AdminUsers() {
  const db = useSQLiteContext();
  const router = useRouter();
  const params = useLocalSearchParams(); // Captura os parâmetros passados na navegação
  const [users, setUsers] = useState([]);

  // Efeito para verificar nível de acesso assim que a tela abre
  useEffect(() => {
    // Requisito HU4: Bloquear funções de edição/gestão para usuários comuns
    if (params.userRole !== 'admin') {
      Alert.alert("Acesso Negado", "Você não tem permissão para acessar esta área.");
      router.replace('/'); // Expulsa o usuário intruso para o Login
    } else {
      loadUsers();
    }
  }, [params.userRole]);

  // Função para carregar a lista de usuários do banco de dados
  async function loadUsers() {
    try {
      // Busca todos os usuários, mas filtramos o próprio admin para evitar auto-exclusão
      const result = await db.getAllAsync('SELECT * FROM users WHERE role != "admin"');
      setUsers(result);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  }

  // Função para banir (deletar) um usuário do banco de dados
  async function handleDeleteUser(id, name) {
    Alert.alert(
      "Banir Usuário", 
      `Tem certeza que deseja remover ${name} da plataforma?`, 
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          style: 'destructive', 
          onPress: async () => {
            try {
              await db.runAsync('DELETE FROM users WHERE id = ?', [id]);
              Alert.alert("Sucesso", "Usuário removido com sucesso.");
              loadUsers(); // Recarrega a lista atualizada
            } catch (error) {
              Alert.alert("Erro", "Não foi possível remover o usuário.");
            }
          }
        }
      ]
    );
  }

  return (
    <View style={globalStyles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={Theme.colors.primary} />
        </TouchableOpacity>
        <Text style={[globalStyles.title, { marginBottom: 0 }]}>PAINEL ADMIN</Text>
      </View>

      <Text style={styles.subtitle}>Gerenciamento de tripulação e acessos.</Text>
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={[styles.avatarMini, { backgroundColor: item.avatar_color || Theme.colors.primary }]}>
                <MaterialCommunityIcons name={item.avatar_icon || 'account'} size={20} color="white" />
              </View>
              <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
            </View>
            
            <TouchableOpacity onPress={() => handleDeleteUser(item.id, item.name)}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color={Theme.colors.danger} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum usuário comum cadastrado.</Text>
        }
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>EPIC 2: Integração TMDB em breve...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 20 },
  backButton: { marginRight: 15 },
  subtitle: { color: Theme.colors.textSecondary, marginBottom: 30, fontSize: 14 },
  userCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: Theme.colors.surface, 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2D333B'
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarMini: { width: 35, height: 35, borderRadius: 17.5, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  userName: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  userEmail: { color: '#888', fontSize: 12 },
  emptyText: { color: '#555', textAlign: 'center', marginTop: 50, fontStyle: 'italic' },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { color: Theme.colors.primary, fontSize: 12, fontWeight: 'bold', opacity: 0.6 }
});