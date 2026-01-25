import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'; // Importe isso
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 1. StatusBar: Muda a cor dos ícones do celular (bateria, wifi) */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* 2. Navbar: Fica fixa no topo (correto) */}
      <Navbar />

      <ScrollView 
        showsVerticalScrollIndicator={false} // Remove a barra feia no design minimalista
        contentContainerStyle={styles.scrollContent}
      >
        <Hero />
        
        {/* Espaçador opcional para empurrar o conteúdo se necessário */}
        <View style={{ flex: 1, minHeight: 300 }} />

        {/* 3. Footer: Agora ele faz parte do scroll e aparece no fim */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    // Garante que o conteúdo ocupe a tela toda para o Footer descer
    flexGrow: 1, 
  },
});