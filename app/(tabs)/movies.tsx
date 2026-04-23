import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../constants/theme';
import { globalStyles } from '../../src/styles/globalStyles';

export default function Movies() {
  return (
    <ScrollView 
      style={{ backgroundColor: Theme.colors.background }} 
      contentContainerStyle={styles.container}
    >
      {/* HEADER DA TEMPESTADE */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="weather-lightning" size={40} color={Theme.colors.primary} />
        <Text style={[globalStyles.title, { marginBottom: 0, marginLeft: 10 }]}>
          MOVIES
        </Text>
      </View>

      <Text style={styles.subtitle}>Sua trilha de filmes.</Text>

      {/* CARD DE EXEMPLO (HU4 - Futuro) */}
      <View style={styles.movieCard}>
        <View style={styles.posterPlaceholder}>
          <MaterialCommunityIcons name="movie-open-play" size={50} color={Theme.colors.textSecondary} />
        </View>
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>Em breve...</Text>
          <Text style={styles.movieYear}>Aguardando O próximo filme.</Text>
        </View>
      </View>

      {/* BOTÃO DE AÇÃO (SÓ EXEMPLO) */}
      <TouchableOpacity style={[globalStyles.buttonPrimary, { width: '100%' }]}>
        <Text style={globalStyles.buttonText}>Explorar Catálogo</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: 40,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  movieCard: {
    width: '100%',
    backgroundColor: Theme.colors.surface,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2D333B',
    // Glow sutil no card
    shadowColor: Theme.colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  posterPlaceholder: {
    width: 80,
    height: 120,
    backgroundColor: '#0A0A0B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E252E',
  },
  movieInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  movieTitle: {
    color: Theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieYear: {
    color: Theme.colors.textSecondary,
    fontSize: 13,
  }
});