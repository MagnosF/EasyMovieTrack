import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../constants/theme';
import { globalStyles } from '../../src/styles/globalStyles';

// Opções de cores e ícones para personalização do avatar
const COLORS = ['#00E5FF', '#7B61FF', '#FFFFFF', '#4CC9FE', '#3F72AF', '#2D333B'];
const ICONS = ['weather-lightning', 'flash', 'weather-pouring', 'movie-roll', 'popcorn', 'star'];

// Tela de perfil do usuário, onde ele pode ver e editar suas informações, além de personalizar seu avatar
export default function Profile() {
  // Hooks para navegação, acesso ao banco de dados e parâmetros de rota
  const router = useRouter();
  const db = useSQLiteContext();
  const params = useLocalSearchParams();

  // Estado para armazenar os dados do usuário e controlar o modo de edição
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Estado para personalização do avatar
  const [selectedColor, setSelectedColor] = useState(Theme.colors.primary);
  const [selectedIcon, setSelectedIcon] = useState('weather-lightning');
  const [userImage, setUserImage] = useState(null); // Estado para foto da galeria

  // Função para carregar os dados do usuário a partir do banco de dados usando o e-mail passado como parâmetro
  async function loadUserData() {
    try {
      // Verifica se o e-mail do usuário foi passado como parâmetro e busca os dados correspondentes no banco de dados
      if (params.userEmail) {
        const result = await db.getFirstAsync(
          'SELECT name, email, role, avatar_color, avatar_icon, image FROM users WHERE email = ?',
          [params.userEmail]
        );
        // Se os dados forem encontrados, atualiza o estado do usuário e as opções de personalização do avatar
        if (result) {
          setUser(result);
          setNewName(result.name);
          setSelectedColor(result.avatar_color || Theme.colors.primary);
          setSelectedIcon(result.avatar_icon || 'weather-lightning');
          setUserImage(result.image); // Carrega a imagem do banco
        }
      }
    } catch (error) { console.error(error); }
  }

  // Carrega os dados do usuário quando o componente é montado ou quando o e-mail do usuário nos parâmetros de rota muda
  useEffect(() => { loadUserData(); }, [params.userEmail]);

  // Função para abrir a galeria e selecionar uma foto
  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert("Permissão", "Precisamos de acesso à galeria.");
    }

    // Abre a galeria para o usuário escolher uma imagem, com opções de edição e qualidade reduzida para otimizar o armazenamento
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
    }
  }

  // Função para lidar com o logout do usuário, exibindo uma confirmação antes de redirecionar para a tela de login
  function handleLogout() {
    Alert.alert("Sair", "Deseja encerrar sessão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: () => router.replace('/') }
    ]);
  }

  // Função para lidar com a atualização do perfil do usuário, incluindo validação de senha e atualização dos dados no banco de dados
  async function handleUpdateProfile() {
    // Validação simples para garantir que o nome não esteja vazio e que a nova senha, se fornecida, tenha pelo menos 6 caracteres   
    try {
      let query = `UPDATE users SET name = ?, avatar_color = ?, avatar_icon = ?, image = ?`;
      let values = [newName, selectedColor, selectedIcon, userImage];

      // Se o usuário forneceu uma nova senha, adiciona essa atualização à query SQL
      if (newPassword.trim().length > 0) {
        // Validação de senha: mínimo 6 caracteres
        if (newPassword.length < 6) return Alert.alert("Erro", "Senha muito fraca! Mínimo 6 caracteres.");
        query += `, password = ?`;
        values.push(newPassword);
      }
      
      // Finaliza a query SQL adicionando a condição para atualizar apenas o usuário atual
      query += ` WHERE email = ?`;
      values.push(user?.email);

      await db.runAsync(query, values);

      // Atualiza o estado do usuário com as novas informações para refletir as mudanças na interface
      if (user) setUser({ ...user, name: newName, avatar_color: selectedColor, avatar_icon: selectedIcon, image: userImage });
      setIsEditing(false);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error) { Alert.alert("Erro", "A conexão caiu..."); }
  }

  return (
    <ScrollView style={{backgroundColor: Theme.colors.background}} contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
      <View style={styles.header}>
        
        {/* Avatar com Brilho Exterior (Glow) - Atualizado para suportar Imagem */}
        <TouchableOpacity onPress={isEditing ? pickImage : null} activeOpacity={0.8}>
          <View style={[styles.avatarCircle, { backgroundColor: selectedColor, shadowColor: selectedColor }]}>
            {userImage ? (
              <Image source={{ uri: userImage }} style={styles.avatarImage} />
            ) : (
              <MaterialCommunityIcons name={selectedIcon} size={60} color={selectedColor === '#FFFFFF' ? '#000' : 'white'} />
            )}
            {/* Exibe o ícone de câmera apenas no modo de edição para indicar que o usuário pode alterar a foto do perfil, seja escolhendo uma nova imagem ou removendo a existente para voltar ao avatar padrão */}
            {isEditing && (
              <View style={styles.cameraBadge}>
                <MaterialCommunityIcons name="camera" size={18} color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>
        {/* Exibe o cargo do usuário para facilitar identificação do Admin, mesmo fora do modo de edição */}
        {user?.role && (
          <Text style={{ color: Theme.colors.primary, fontSize: 10, fontWeight: 'bold', marginBottom: 20 }}>
            {user.role.toUpperCase()}
          </Text>
        )}
        {isEditing ? (
          <View style={{ width: '100%' }}>
            {/*Botão para remover a foto da galeria e voltar a usar o avatar padrão, apenas se uma foto estiver atualmente definida*/}
            <TouchableOpacity onPress={() => setUserImage(null)}>
               <Text style={{color: Theme.colors.danger, textAlign: 'center', marginBottom: 15, fontSize: 12, fontWeight: 'bold'}}>REMOVER FOTO E USAR AVATAR</Text>
            </TouchableOpacity>
            {/* Seção de personalização do avatar, permitindo ao usuário escolher entre diferentes cores e ícones para seu perfil */}
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
                  <MaterialCommunityIcons name={icon} size={24} color={selectedIcon === icon ? 'black' : 'white'} />
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
            <Text style={{ color: Theme.colors.textSecondary, marginBottom: 5 }}>{user?.email}</Text>
            {/* Exibe o cargo do usuário para facilitar identificação do Admin */}
            <Text style={{ color: Theme.colors.primary, fontSize: 10, fontWeight: 'bold', marginBottom: 20 }}>
              {user?.role?.toUpperCase()}
            </Text>
            
            <TouchableOpacity style={globalStyles.buttonPrimary} onPress={() => setIsEditing(true)}>
              <Text style={globalStyles.buttonText}>CUSTOMIZAR PERFIL</Text>
            </TouchableOpacity>

            {/* HU4: Botão de gestão exclusivo para usuários com cargo de admin */}
            {user?.role === 'admin' && (
              <TouchableOpacity 
                style={[styles.logoutBtn, { borderColor: Theme.colors.primary, marginTop: 10 }]} 
                onPress={() => router.push({
                  pathname: '/admin-users',
                  params: { userRole: user.role }
                })}
              >
                <Text style={{ color: Theme.colors.primary, fontWeight: 'bold' }}>GERENCIAR USUÁRIOS</Text>
              </TouchableOpacity>
            )}

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
  avatarCircle: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 25, elevation: 15, shadowOpacity: 0.8, shadowRadius: 20, overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  cameraBadge: { position: 'absolute', bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', alignItems: 'center', padding: 2 },
  label: { color: Theme.colors.primary, fontSize: 12, fontWeight: '900', marginBottom: 10, marginTop: 10, letterSpacing: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  colorDot: { width: 35, height: 35, borderRadius: 18 },
  iconBox: { width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  logoutBtn: { marginTop: 20, padding: 15, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: Theme.colors.danger, borderRadius: 12 }
});