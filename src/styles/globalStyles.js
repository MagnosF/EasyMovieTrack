import { StyleSheet } from 'react-native';
import { Theme } from '../../constants/theme';

export const globalStyles = StyleSheet.create({
  // 🌐 Estilos Globais
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    color: Theme.colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 2,
    textShadowColor: Theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  input: {
    backgroundColor: Theme.colors.surface,
    color: Theme.colors.text,
    padding: 15,
    borderRadius: Theme.radius.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D333B',
  },
  buttonPrimary: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
    marginTop: 10,
    elevation: 8,
    shadowColor: Theme.colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  linkText: {
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 15,
  },

  // 🔢 Bloco de Paginação Global
  paginationContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 15, 
    marginBottom: 30, 
    width: '100%' 
  },
  pageButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 8, 
    elevation: 2 
  },
  pageButtonText: { 
    fontSize: 14, 
    fontWeight: '600' 
  },
  pageIndicator: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  pageIndicatorText: { 
    fontWeight: 'bold', 
    fontSize: 15 
  },

  // 🎬 NOVO: CARDS VERTICAIS DE FILME (Usado no feed principal e buscas)
  movieCard: { 
    width: '100%', 
    backgroundColor: Theme.colors.surface, 
    borderRadius: Theme.radius.md, 
    flexDirection: 'row', 
    padding: 15, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#2D333B' 
  },
  posterImage: { 
    width: 80, 
    height: 120, 
    borderRadius: Theme.radius.md, 
    backgroundColor: '#0A0A0B' 
  },
  posterPlaceholder: { 
    width: 80, 
    height: 120, 
    backgroundColor: '#0A0A0B', 
    borderRadius: Theme.radius.md, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#1E252E' 
  },
  movieInfo: { 
    flex: 1, 
    marginLeft: 15, 
    justifyContent: 'flex-start' 
  },
  movieTitle: { 
    color: Theme.colors.primary, 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 3 
  },
  movieYear: { 
    color: Theme.colors.textSecondary, 
    fontSize: 12, 
    marginBottom: 5 
  },
  movieOverview: { 
    color: '#8B949E', 
    fontSize: 12, 
    lineHeight: 16 
  },

  // 🎞️ NOVO: CARROSSEL HORIZONTAL (Estilo Netflix/TMDB)
  horizontalScroll: { 
    paddingRight: 20 
  },
  miniCard: { 
    width: 100, 
    marginRight: 14, 
    alignItems: 'flex-start' 
  },
  miniPoster: { 
    width: 100, 
    height: 145, 
    borderRadius: Theme.radius.md, 
    backgroundColor: '#0A0A0B' 
  },
  miniPlaceholder: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#2D333B' 
  },
  miniTitle: { 
    color: Theme.colors.text, 
    fontSize: 12, 
    fontWeight: '600', 
    marginTop: 5, 
    width: '100%' 
  },
  miniNote: { 
    color: Theme.colors.textSecondary, 
    fontSize: 10, 
    marginTop: 1 
  },

  // 🎛️ NOVO: SELETORES (TOGGLES) E SEÇÕES da HOME
  sectionHeaderContainer: { 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  sectionTitle: { 
    color: Theme.colors.text, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  toggleContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#0D1117', 
    borderRadius: Theme.radius.md, 
    padding: 3, 
    borderWidth: 1, 
    borderColor: '#30363D' 
  },
  toggleBtn: { 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: Theme.radius.md 
  },
  toggleBtnActive: { 
    backgroundColor: Theme.colors.primary 
  },
  toggleText: { 
    color: Theme.colors.textSecondary, 
    fontSize: 11, 
    fontWeight: '600' 
  },
  toggleTextActive: { 
    color: '#000' 
  },

  // Sub-abas (Streaming, Na TV, etc)
  subTabsContainer: { 
    marginBottom: 12, 
    width: '100%' 
  },
  subTabItem: { 
    marginRight: 15, 
    paddingBottom: 4, 
    borderBottomWidth: 2, 
    borderBottomColor: 'transparent' 
  },
  subTabItemActive: { 
    borderBottomColor: Theme.colors.primary 
  },
  subTabText: { 
    color: Theme.colors.textSecondary, 
    fontSize: 13 
  },
  subTabTextActive: { 
    color: Theme.colors.primary, 
    fontWeight: 'bold' 
  },

  // Loading padrão de listas
  loadingContainer: { 
    marginVertical: 40, 
    alignItems: 'center', 
    width: '100%' 
  },
  loadingText: { 
    color: Theme.colors.textSecondary, 
    marginTop: 15, 
    fontSize: 14, 
    textAlign: 'center' 
  },
});