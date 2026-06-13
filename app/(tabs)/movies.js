import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../constants/theme';
import { getMoviesByAvailability, getMoviesByGenreOnline, getPopularMovies, getTrendingMovies, searchMoviesOnline } from '../../src/services/api';
import { globalStyles } from '../../src/styles/globalStyles';

// 🎬 TELA DE FILMES: Busca, Filtros por Gênero, Tendências e Disponibilidade
const LISTA_GENEROS = [
  { id: null, name: '🔥 Todos', icon: 'star-four-points' },
  { id: 28, name: 'Ação', icon: 'sword' },
  { id: 35, name: 'Comédia', icon: 'emoticon-lol-outline' },
  { id: 18, name: 'Drama', icon: 'theater' },
  { id: 27, name: 'Terror', icon: 'ghost' },
  { id: 878, name: 'Ficção', icon: 'rocket-launch' },
  { id: 10749, name: 'Romance', icon: 'heart' },
  { id: 16, name: 'Animação', icon: 'animation' }
];


export default function Movies() {
  // 🎯 ESTADOS PRINCIPAIS: Filmes, Carregamento, Página, Busca e Filtros
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedGenre, setSelectedGenre] = useState(null);
  // 🌟 ESTADOS SECUNDÁRIOS: Tendências e Disponibilidade para a Home
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTab, setTrendingTab] = useState('day'); 

  const [availMovies, setAvailMovies] = useState([]);
  const [availTab, setAvailTab] = useState('streaming'); 
  // 🎬 REFERÊNCIA PARA SCROLL: Usada para voltar ao topo quando muda de página ou filtro
  const scrollViewRef = useRef(null);
  const exibindoHomePrincipal = searchQuery.trim() === "" && selectedGenre === null;
  // 🎯 EFEITOS DE CARREGAMENTO: Um para a Home Principal e outro para buscas/filtros específicos
  useEffect(() => {
    async function carregarFilmesFiltrados() {
      if (exibindoHomePrincipal) return; 
      setLoading(true);
      try {
        let dados = [];
        if (searchQuery.trim() !== "") {
          dados = await searchMoviesOnline(searchQuery, page);
        } else if (selectedGenre !== null) {
          dados = await getMoviesByGenreOnline(selectedGenre, page);
        }
        setMovies(dados);
        if (scrollViewRef.current) scrollViewRef.current.scrollTo({ y: 0, animated: true });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    carregarFilmesFiltrados();
  }, [page, searchQuery, selectedGenre]);
  // EFEITO DE CARREGAMENTO PARA A HOME PRINCIPAL: Tendências e Disponibilidade
  useEffect(() => {
    async function carregarDadosHome() {
      if (!exibindoHomePrincipal) return;
      setLoading(true);
      try {
        const [dadosTrending, dadosAvail, dadosPopulares] = await Promise.all([
          getTrendingMovies(trendingTab),
          getMoviesByAvailability(availTab),
          getPopularMovies(1) 
        ]);
        setTrendingMovies(dadosTrending);
        setAvailMovies(dadosAvail);
        setMovies(dadosPopulares);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    carregarDadosHome();
  }, [exibindoHomePrincipal, trendingTab, availTab]);
  // FUNÇÕES DE NAVEGAÇÃO DE PÁGINA
  const avancarPagina = () => setPage((prev) => prev + 1);
  const voltarPagina = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));
  // RENDERIZAÇÃO DO CARROSSEL HORIZONTAL: Reutilizado para Tendências e Disponibilidade
  const RenderCarrosselHorizontal = ({ data }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.horizontalScroll}>
      {data.map((item) => (
        <View key={item.id} style={globalStyles.miniCard}>
          {item.poster_path ? (
            <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={globalStyles.miniPoster} />
          ) : (
            <View style={[globalStyles.miniPoster, globalStyles.miniPlaceholder]}>
              <MaterialCommunityIcons name="movie-open" size={24} color={Theme.colors.textSecondary} />
            </View>
          )}
          <Text style={globalStyles.miniTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={globalStyles.miniNote}>⭐ {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}</Text>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <ScrollView ref={scrollViewRef} style={{ backgroundColor: Theme.colors.background }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="weather-lightning" size={38} color={Theme.colors.primary} style={styles.headerIcon} />
        <Text style={[globalStyles.title, styles.titleOverride]}>FILMES</Text>
      </View>
      <Text style={globalStyles.linkText}>Explore o catálogo completo de filmes online.</Text>

      <View style={[globalStyles.input, styles.searchContainer]}>
        <MaterialCommunityIcons name="magnify" size={22} color={Theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar filmes online..."
          placeholderTextColor={Theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setSelectedGenre(null);
            setPage(1); 
          }}
        />
      </View>

      <View style={styles.genreWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.genreScroll}>
          {LISTA_GENEROS.map((genre) => {
            const isSelected = selectedGenre === genre.id && searchQuery.trim() === "";
            return (
              <TouchableOpacity
                key={genre.id ?? 'todos'}
                style={[styles.genreChip, isSelected && { backgroundColor: Theme.colors.primary, borderColor: Theme.colors.primary }]}
                onPress={() => {
                  setSearchQuery("");
                  setSelectedGenre(genre.id);
                  setPage(1);
                }}
              >
                <MaterialCommunityIcons name={genre.icon} size={16} color={isSelected ? '#000' : Theme.colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={[styles.genreText, isSelected && { color: '#000', fontWeight: 'bold' }]}>{genre.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {exibindoHomePrincipal && !loading && (
        <View style={{ width: '100%' }}>
          <View style={globalStyles.sectionHeaderContainer}>
            <Text style={globalStyles.sectionTitle}>Tendências</Text>
            <View style={globalStyles.toggleContainer}>
              <TouchableOpacity style={[globalStyles.toggleBtn, trendingTab === 'day' && globalStyles.toggleBtnActive]} onPress={() => setTrendingTab('day')}>
                <Text style={[globalStyles.toggleText, trendingTab === 'day' && globalStyles.toggleTextActive]}>Hoje</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.toggleBtn, trendingTab === 'week' && globalStyles.toggleBtnActive]} onPress={() => setTrendingTab('week')}>
                <Text style={[globalStyles.toggleText, trendingTab === 'week' && globalStyles.toggleTextActive]}>Na semana</Text>
              </TouchableOpacity>
            </View>
          </View>
          <RenderCarrosselHorizontal data={trendingMovies} />

          <View style={[globalStyles.sectionHeaderContainer, { marginTop: 25 }]}>
            <Text style={globalStyles.sectionTitle}>Populares por categoria</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.subTabsContainer}>
            <TouchableOpacity style={[globalStyles.subTabItem, availTab === 'streaming' && globalStyles.subTabItemActive]} onPress={() => setAvailTab('streaming')}><Text style={[globalStyles.subTabText, availTab === 'streaming' && globalStyles.subTabTextActive]}>Streaming</Text></TouchableOpacity>
            <TouchableOpacity style={[globalStyles.subTabItem, availTab === 'tv' && globalStyles.subTabItemActive]} onPress={() => setAvailTab('tv')}><Text style={[globalStyles.subTabText, availTab === 'tv' && globalStyles.subTabTextActive]}>Na TV</Text></TouchableOpacity>
            <TouchableOpacity style={[globalStyles.subTabItem, availTab === 'alugar' && globalStyles.subTabItemActive]} onPress={() => setAvailTab('alugar')}><Text style={[globalStyles.subTabText, availTab === 'alugar' && globalStyles.subTabTextActive]}>Para Alugar</Text></TouchableOpacity>
            <TouchableOpacity style={[globalStyles.subTabItem, availTab === 'cinema' && globalStyles.subTabItemActive]} onPress={() => setAvailTab('cinema')}><Text style={[globalStyles.subTabText, availTab === 'cinema' && globalStyles.subTabTextActive]}>Nos Cinemas</Text></TouchableOpacity>
          </ScrollView>
          <RenderCarrosselHorizontal data={availMovies} />

          <Text style={[globalStyles.sectionTitle, { marginTop: 30, marginBottom: 15 }]}>Mais Procurados do Catálogo</Text>
        </View>
      )}

      {loading ? (
        <View style={globalStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
          <Text style={globalStyles.loadingText}>Sincronizando com o TMDB...</Text>
        </View>
      ) : movies.length === 0 ? (
        <View style={globalStyles.loadingContainer}>
          <MaterialCommunityIcons name="movie-roll" size={50} color={Theme.colors.textSecondary} />
          <Text style={[globalStyles.loadingText, { marginTop: 10 }]}>Nenhum filme encontrado.</Text>
        </View>
      ) : (
        <View style={{ width: '100%' }}>
          {movies.map((movie) => (
            <View key={movie.id} style={globalStyles.movieCard}>
              {movie.poster_path ? (
                <Image source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }} style={globalStyles.posterImage} />
              ) : (
                <View style={globalStyles.posterPlaceholder}>
                  <MaterialCommunityIcons name="movie-open-play" size={40} color={Theme.colors.textSecondary} />
                </View>
              )}
              <View style={globalStyles.movieInfo}>
                <Text style={globalStyles.movieTitle} numberOfLines={2}>{movie.title}</Text>
                <Text style={globalStyles.movieYear}>Lançamento: {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</Text>
                <Text style={globalStyles.movieOverview} numberOfLines={3}>{movie.overview || "Sinopse não disponível."}</Text>
              </View>
            </View>
          ))}

          {!exibindoHomePrincipal && (
            <View style={globalStyles.paginationContainer}>
              <TouchableOpacity style={[globalStyles.pageButton, { backgroundColor: page === 1 ? '#161B22' : Theme.colors.surface, borderWidth: 1, borderColor: '#2D333B' }]} onPress={voltarPagina} disabled={page === 1}>
                <MaterialCommunityIcons name="chevron-left" size={24} color={page === 1 ? '#484F58' : Theme.colors.text} />
                <Text style={[globalStyles.pageButtonText, { color: page === 1 ? '#484F58' : Theme.colors.text }]}>Anterior</Text>
              </TouchableOpacity>
              <View style={[globalStyles.pageIndicator, { backgroundColor: Theme.colors.primary }]}><Text style={[globalStyles.pageIndicatorText, { color: '#000' }]}>{page}</Text></View>
              <TouchableOpacity style={[globalStyles.pageButton, { backgroundColor: Theme.colors.surface, borderWidth: 1, borderColor: '#2D333B' }]} onPress={avancarPagina}>
                <Text style={[globalStyles.pageButtonText, { color: Theme.colors.text }]}>Próximo</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={Theme.colors.text} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Theme.spacing.lg, paddingTop: 60, alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 },
  headerIcon: { textShadowColor: Theme.colors.primary, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
  titleOverride: { marginBottom: 0, marginLeft: 10, textAlign: 'left' },
  
  searchContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', height: 50, paddingVertical: 0, paddingHorizontal: 12, marginTop: 20, marginBottom: 15 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: Theme.colors.text, fontSize: 15, height: '100%' },
  
  genreWrapper: { width: '100%', marginBottom: 20 },
  genreScroll: { paddingRight: 20 },
  genreChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: Theme.colors.surface, paddingHorizontal: 14, paddingVertical: 8, borderRadius: Theme.radius.md, marginRight: 10, borderWidth: 1, borderColor: '#2D333B' },
  genreText: { color: Theme.colors.textSecondary, fontSize: 13 },
});