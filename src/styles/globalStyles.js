import { StyleSheet } from 'react-native';
import { Theme } from '../../constants/theme';

export const globalStyles = StyleSheet.create({
  // 🌐 LAYOUT GERAL & ESTILOS BASE
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  containerLayout: { 
    padding: Theme.spacing.lg, 
    paddingTop: 60, 
    alignItems: 'center' 
  },
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 5 
  },
  headerIcon: { 
    textShadowColor: Theme.colors.primary, 
    textShadowOffset: { width: 0, height: 0 }, 
    textShadowRadius: 10 
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
  titleOverride: { 
    marginBottom: 0, 
    marginLeft: 10, 
    textAlign: 'left' 
  },

  // 🔍 INPUTS & COMPONENTES DE BUSCA
  input: {
    backgroundColor: Theme.colors.surface,
    color: Theme.colors.text,
    padding: 15,
    borderRadius: Theme.radius.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D333B',
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%', 
    height: 50, 
    paddingVertical: 0, 
    paddingHorizontal: 12, 
    marginTop: 20, 
    marginBottom: 15 
  },
  searchIcon: { 
    marginRight: 8 
  },
  searchInput: { 
    flex: 1, 
    color: Theme.colors.text, 
    fontSize: 15, 
    height: '100%' 
  },

  // 🏷️ CHIPS DE GÊNERO / FILTROS RAPIDOS
  genreWrapper: { 
    width: '100%', 
    marginBottom: 20 
  },
  genreScroll: { 
    paddingRight: 20 
  },
  genreChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: Theme.colors.surface, 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: Theme.radius.md, 
    marginRight: 10, 
    borderWidth: 1, 
    borderColor: '#2D333B' 
  },
  genreText: { 
    color: Theme.colors.textSecondary, 
    fontSize: 13 
  },

  //  BUTTONS
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

  // 🎬 CARDS VERTICAIS DE FILME (Catálogo principal e futuro Histórico)
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

  // 🍿 INTERAÇÃO DE FILMES (HU 7 - Botão Assistido / Olho)
  actionButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  actionButtonActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)', // Destaque sutil azul/ciano
  },
  floatingMiniCheck: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2D333B'
  },

  // 🎞️ CARROSSEL HORIZONTAL (Estilo Netflix/Tendências)
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

  // 🎛️ SELETORES (TOGGLES) E SEÇÕES DA HOME
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

  // 🔢 BLOCO DE PAGINAÇÃO GLOBAL
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

  // ⏳ LOADINGS PADRÃO
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

  // 👤 PERFIL & AVATARES (Novas chaves adicionadas para unificação)
  headerCenter: { 
    alignItems: 'center' 
  },
  headerRowLeft: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
    marginTop: 20 
  },
  backButton: { 
    marginRight: 15 
  },
  avatarCircle: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 25, 
    elevation: 15, 
    shadowOpacity: 0.8, 
    shadowRadius: 20, 
    overflow: 'hidden' 
  },
  avatarImage: { 
    width: '100%', 
    height: '100%' 
  },
  cameraBadge: { 
    position: 'absolute', 
    bottom: 0, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    width: '100%', 
    alignItems: 'center', 
    padding: 2 
  },
  labelForm: { 
    color: Theme.colors.primary, 
    fontSize: 12, 
    fontWeight: '900', 
    marginBottom: 10, 
    marginTop: 10, 
    letterSpacing: 1 
  },
  rowFlex: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  colorDot: { 
    width: 35, 
    height: 35, 
    borderRadius: 18 
  },
  iconBox: { 
    width: 45, 
    height: 45, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  
  // 🚪 BOTÕES DE BORDA / AÇÕES SECUNDÁRIAS (Sair, Banir, Parcerias)
  outlineBtn: { 
    marginTop: 20, 
    padding: 15, 
    width: '100%', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderRadius: 12 
  },

  // 👥 LISTAS DE USUÁRIOS / CARDS DE ADMINISTRAÇÃO
  userCardLayout: { 
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
  avatarMini: { 
    width: 35, 
    height: 35, 
    borderRadius: 17.5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
});