import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../constants/theme';
import { AuthSession } from '../../src/services/authSession';
import { toggleWatchedMovie } from '../../src/services/movieStorage';
import { globalStyles } from '../../src/styles/globalStyles';

export default function History() {
  const db = useSQLiteContext();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega os filmes assistidos cruzando dados com a tabela de cache 'movies'
  async function carregarHistorico() {
    try {
      setLoading(true);
      
      // Faz o INNER JOIN correto agora que o banco foi resetado do zero
      const resultado = await db.getAllAsync(
        `SELECT 
          um.movie_id, 
          m.title, 
          m.poster_path, 
          m.release_date, 
          m.overview 
         FROM user_movies um
         INNER JOIN movies m ON um.movie_id = m.id
         WHERE um.user_id = ? AND um.watched = 1
         ORDER BY um.watched_at DESC;`,
        [AuthSession.userId]
      );
      
      setWatchedMovies(resultado);
    } catch (error) {
      console.error("Erro ao carregar histórico de filmes assistidos:", error);
    } finally {
      setLoading(false);
    }
  }

  // Recarrega o histórico de forma automática e instantânea sempre que o usuário entra na aba
  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [])
  );

  // Função para remover o item instantaneamente da lista e do SQLite, mantendo a consistência com o critério de aceitação
  async function handleRemoverAssistido(movie) {
    try {
      // Monta o objeto no formato esperado pela função toggleWatchedMovie
      const movieData = {
        id: movie.movie_id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        overview: movie.overview
      };

      // Executa a remoção no SQLite através do seu service original
      await toggleWatchedMovie(db, AuthSession.userId, movieData);

      // Estado: remove da tela instantaneamente para cumprir o critério de aceitação
      setWatchedMovies(prev => prev.filter(item => item.movie_id !== movie.movie_id));
    } catch (error) {
      console.error("Erro ao remover filme do histórico:", error);
    }
  }

  return (
    <View style={globalStyles.safeArea}>
      {/* Cabeçalho padrão unificado */}
      <View style={globalStyles.headerRowLeft}>
        <MaterialCommunityIcons name="eye-check" size={34} color={Theme.colors.primary} style={{ marginRight: 10 }} />
        <Text style={[globalStyles.title, { marginBottom: 0 }]}>MEU HISTÓRICO</Text>
      </View>
      <Text style={[globalStyles.linkText, { textAlign: 'left', marginTop: 0, marginBottom: 20 }]}>
        Gerencie e relembre todas as produções que você já assistiu.
      </Text>

      {loading ? (
        <View style={globalStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
          <Text style={globalStyles.loadingText}>Carregando seu histórico...</Text>
        </View>
      ) : (
        <FlatList
          data={watchedMovies}
          keyExtractor={(item) => item.movie_id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={globalStyles.movieCard}>
              {item.poster_path ? (
                <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={globalStyles.posterImage} />
              ) : (
                <View style={globalStyles.posterPlaceholder}>
                  <MaterialCommunityIcons name="movie-open-play" size={40} color={Theme.colors.textSecondary} />
                </View>
              )}
              
              <View style={globalStyles.movieInfo}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <Text style={[globalStyles.movieTitle, { flex: 1, paddingRight: 8 }]} numberOfLines={2}>
                    {item.title}
                  </Text>
                  
                  {/* Botão de lixeira/remover ativo (Olho fechado) */}
                  <TouchableOpacity 
                    style={[globalStyles.actionButton, { backgroundColor: 'rgba(255, 69, 58, 0.1)' }]} 
                    onPress={() => handleRemoverAssistido(item)}
                  >
                    <MaterialCommunityIcons 
                      name="eye-off" 
                      size={20} 
                      color={Theme.colors.danger} 
                    />
                  </TouchableOpacity>
                </View>

                <Text style={globalStyles.movieYear}>
                  Lançamento: {item.release_date ? item.release_date.split('-')[0] : 'N/A'}
                </Text>
                <Text style={globalStyles.movieOverview} numberOfLines={3}>
                  {item.overview || "Sinopse não disponível."}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={[globalStyles.loadingContainer, { marginTop: 40 }]}>
              <MaterialCommunityIcons name="movie-roll" size={50} color={Theme.colors.textSecondary} />
              <Text style={[globalStyles.loadingText, { marginTop: 10, textAlign: 'center' }]}>
                Você ainda não marcou nenhum filme como assistido.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}