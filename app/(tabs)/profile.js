import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto'; // criptografia da senha para segurança
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
      if (params.userEmail) {
        const result = await db.getFirstAsync(
          'SELECT name, email, role, avatar_color, avatar_icon, image FROM users WHERE email = ?',
          [params.userEmail.trim()]
        );
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

  useEffect(() => { loadUserData(); }, [params.userEmail]);

  // Função para abrir a galeria e selecionar uma foto
  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert("Permissão", "Precisamos de acesso à galeria.");
    }

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

  // Função para lidar com a atualização do perfil do usuário
  async function handleUpdateProfile() {
    if (!newName.trim()) return Alert.alert("Erro", "O nome não pode ficar vazio.");

    try {
      let query = `UPDATE users SET name = ?, avatar_color = ?, avatar_icon = ?, image = ?`;
      let values = [newName.trim(), selectedColor, selectedIcon, userImage];

      if (newPassword.trim().length > 0) {
        if (newPassword.length < 6) return Alert.alert("Erro", "Senha muito fraca! Mínimo 6 caracteres.");
        
        const hashedNewPassword = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          newPassword.trim()
        );

        query += `, password = ?`;
        values.push(hashedNewPassword);
      }
      
      query += ` WHERE email = ?`;
      values.push(user?.email);

      await db.runAsync(query, values);

      if (user) setUser({ ...user, name: newName.trim(), avatar_color: selectedColor, avatar_icon: selectedIcon, image: userImage });
      setIsEditing(false);
      setNewPassword(''); 
      Alert.alert("Sucesso", "Perfil updated com sucesso!");
    } catch (error) { Alert.alert("Erro", "A conexão caiu..."); }
  }

  return (
    <ScrollView style={{backgroundColor: Theme.colors.background}} contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
      <View style={globalStyles.headerCenter}>
        
        {/* Avatar com Brilho Exterior (Glow) usando globalStyles */}
        <TouchableOpacity onPress={isEditing ? pickImage : null} activeOpacity={0.8}>
          <View style={[globalStyles.avatarCircle, { backgroundColor: selectedColor, shadowColor: selectedColor }]}>
            {userImage ? (
              <Image source={{ uri: userImage }} style={globalStyles.avatarImage} />
            ) : (
              <MaterialCommunityIcons name={selectedIcon} size={60} color={selectedColor === '#FFFFFF' ? '#000' : 'white'} />
            )}
            {isEditing && (
              <View style={globalStyles.cameraBadge}>
                <MaterialCommunityIcons name="camera" size={18} color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>

        {user?.role && (
          <Text style={{ color: Theme.colors.primary, fontSize: 10, fontWeight: 'bold', marginBottom: 20 }}>
            {user.role.toUpperCase()}
          </Text>
        )}

        {isEditing ? (
          <View style={{ width: '100%' }}>
            <TouchableOpacity onPress={() => setUserImage(null)}>
               <Text style={{color: Theme.colors.danger, textAlign: 'center', marginBottom: 15, fontSize: 12, fontWeight: 'bold'}}>REMOVER FOTO E USAR AVATAR</Text>
            </TouchableOpacity>

            <Text style={globalStyles.labelForm}>COR:</Text>
            <View style={globalStyles.rowFlex}>
              {COLORS.map(color => (
                <TouchableOpacity 
                  key={color} 
                  style={[globalStyles.colorDot, { backgroundColor: color, borderColor: 'white', borderWidth: selectedColor === color ? 2 : 0 }]} 
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>

            <Text style={globalStyles.labelForm}>ÍCONE:</Text>
            <View style={globalStyles.rowFlex}>
              {ICONS.map(icon => (
                <TouchableOpacity 
                  key={icon} 
                  style={[globalStyles.iconBox, { backgroundColor: selectedIcon === icon ? Theme.colors.primary : Theme.colors.surface }]} 
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
            <Text style={{ color: Theme.colors.primary, fontSize: 10, fontWeight: 'bold', marginBottom: 20 }}>
              {user?.role?.toUpperCase()}
            </Text>
            
            <TouchableOpacity style={globalStyles.buttonPrimary} onPress={() => setIsEditing(true)}>
              <Text style={globalStyles.buttonText}>CUSTOMIZAR PERFIL</Text>
            </TouchableOpacity>

            {user?.role === 'admin' && (
              <TouchableOpacity 
                style={[globalStyles.outlineBtn, { borderColor: Theme.colors.primary, marginTop: 10 }]} 
                onPress={() => router.push({
                  pathname: '/admin-users',
                  params: { userRole: user.role }
                })}
              >
                <Text style={{ color: Theme.colors.primary, fontWeight: 'bold' }}>GERENCIAR USUÁRIOS</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={[globalStyles.outlineBtn, { borderColor: Theme.colors.danger }]} onPress={handleLogout}>
              <Text style={{ color: Theme.colors.danger, fontWeight: 'bold' }}>SAIR DA CONTA</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}