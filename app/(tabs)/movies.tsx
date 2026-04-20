import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={{color: '#fff', fontSize: 20, marginBottom: 20}}>Bem-vindo ao EasyMovieTrack</Text>
      <Link href="/register" style={styles.button}>
        <Text style={{color: '#fff'}}>Ir para Cadastro (HU1)</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  button: { backgroundColor: '#E50914', padding: 15, borderRadius: 8 }
});